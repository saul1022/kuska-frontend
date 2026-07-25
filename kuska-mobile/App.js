import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useHankenGrotesk,
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from '@expo-google-fonts/hanken-grotesk';
import { JetBrainsMono_600SemiBold } from '@expo-google-fonts/jetbrains-mono';

import CapturaScreen from './src/screens/CapturaScreen';
import ReporteGuardadoScreen from './src/screens/ReporteGuardadoScreen';
import ReporteDetalleScreen from './src/screens/ReporteDetalleScreen';
import MisReportesScreen from './src/screens/MisReportesScreen';
import { mockReports } from './src/data/mockReports';
import { colors } from './src/theme';
import { generateUuid } from './src/utils/uuid';
import { initDb, insertReport, updateReportStatus, getAllReports, countReports } from './src/storage/db';
import { persistMedia } from './src/storage/mediaStorage';
import { mapDbRowToReport } from './src/storage/mapReport';
import { useNetworkSync } from './src/hooks/useNetworkSync';
import { payloadFromRow, refreshIncidentDetail, synchronizeReport } from './src/services/reportSync';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs({ reports, onSubmit, onRetry }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: { height: 80, paddingBottom: 16, paddingTop: 8 },
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name={route.name === 'Reportar' ? 'alert-octagon' : 'clipboard-text'}
            size={24}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Reportar">
        {(props) => <CapturaScreen {...props} onSubmit={onSubmit} />}
      </Tab.Screen>
      <Tab.Screen name="MisReportes" options={{ title: 'Mis Reportes' }}>
        {(props) => <MisReportesScreen {...props} reports={reports} onRetry={onRetry} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function seedIfEmpty() {
  if (countReports() > 0) return;
  const now = Date.now();
  mockReports.forEach((mock, index) => {
    insertReport({
      clientId: mock.id,
      title: mock.title,
      description: mock.description,
      lat: null,
      lon: null,
      photoUri: mock.imageUrl,
      videoUri: null,
      createdAtClient: new Date(now - index * 60000).toISOString(),
      status: mock.status,
      incidentId: null,
    });
  });
}

export default function App() {
  const [reports, setReports] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [initError, setInitError] = useState(null);

  const [fontsLoaded, fontsError] = useHankenGrotesk({
    HankenGrotesk_400Regular,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    JetBrainsMono_600SemiBold,
  });

  const reloadReports = useCallback(() => {
    setReports(getAllReports().map(mapDbRowToReport));
  }, []);

  useEffect(() => {
    try {
      initDb();
      seedIfEmpty();
      reloadReports();
    } catch (e) {
      console.error('Error inicializando la base de datos local:', e);
      setInitError(e?.message ?? String(e));
    } finally {
      setDbReady(true);
    }
  }, [reloadReports]);

  useNetworkSync(reloadReports);

  const handleSubmit = useCallback(
    async ({ description, photoUri, videoUri, location }) => {
      const clientId = generateUuid();
      const createdAtClient = new Date().toISOString();

      const persistedPhotoUri = photoUri
        ? await persistMedia(photoUri, `${clientId}.jpg`)
        : null;
      const persistedVideoUri = videoUri
        ? await persistMedia(videoUri, `${clientId}.mp4`)
        : null;

      insertReport({
        clientId,
        title: description ? description.slice(0, 40) : null,
        description,
        lat: location?.lat ?? null,
        lon: location?.lon ?? null,
        photoUri: persistedPhotoUri,
        videoUri: persistedVideoUri,
        createdAtClient,
        status: 'pending',
        incidentId: null,
      });
      reloadReports();

      // Intento de envío inmediato si hay red; si falla o no hay red, queda
      // "pendiente" en SQLite y useNetworkSync lo reintentará automáticamente.
      try {
        const payload = {
          clientId,
          description,
          lat: location?.lat,
          lon: location?.lon,
          createdAtClient,
          photoUris: persistedPhotoUri ? [persistedPhotoUri] : [],
          videoUri: persistedVideoUri,
        };
        synchronizeReport(payload)
          .catch(() => updateReportStatus(clientId, 'error', null))
          .finally(reloadReports);
      } catch (e) {
        updateReportStatus(clientId, 'error', null);
      }
      reloadReports();
      return clientId;
    },
    [reloadReports]
  );

  const handleRetry = useCallback(
    async (clientId) => {
      const row = getAllReports().find((r) => r.client_id === clientId);
      if (!row) return;

      updateReportStatus(clientId, 'pending', null);
      reloadReports();

      try {
        await synchronizeReport(payloadFromRow(row));
      } catch (e) {
        updateReportStatus(clientId, 'error', null);
      }
      reloadReports();
    },
    [reloadReports]
  );

  const handleRefreshDetail = useCallback(async (report) => {
    try {
      await refreshIncidentDetail(report.id, report.incidentId);
    } finally {
      reloadReports();
    }
  }, [reloadReports]);

  const onReady = useCallback(async () => {
    if ((fontsLoaded || fontsError) && dbReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError, dbReady]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  if (!dbReady) {
    return null;
  }

  if (initError) {
    return (
      <View style={styles.errorScreen}>
        <Text style={styles.errorTitle}>No se pudo iniciar la app</Text>
        <Text style={styles.errorBody}>{initError}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs">
          {(props) => (
            <Tabs {...props} reports={reports} onSubmit={handleSubmit} onRetry={handleRetry} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ReporteGuardado"
          options={{ presentation: 'modal' }}
        >
          {(props) => (
            <ReporteGuardadoScreen
              {...props}
              report={reports.find((item) => item.id === props.route.params?.clientId)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ReporteDetalle">
          {(props) => (
            <ReporteDetalleScreen
              {...props}
              report={reports.find((item) => item.id === props.route.params?.clientId)}
              onRefresh={handleRefreshDetail}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fcf8f8',
    gap: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ba1a1a',
    textAlign: 'center',
  },
  errorBody: {
    fontSize: 14,
    color: '#44474a',
    textAlign: 'center',
  },
});
