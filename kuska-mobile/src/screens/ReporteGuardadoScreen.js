import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme';
import PrimaryButton from '../components/PrimaryButton';

export default function ReporteGuardadoScreen({ navigation, route, report }) {
  const isSynced = report?.status === 'synced';
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="check-circle" size={64} color={colors.statusLowSynced} />
        </View>

        <Text style={[typography.headlineLg, styles.title]}>Reporte Guardado</Text>
        <Text style={[typography.bodyLg, styles.subtitle]}>
          {isSynced
            ? `El backend recibió el reporte. Estado: ${report.displayStatus}.`
            : 'Tu información se guardó en el dispositivo y se sincronizará automáticamente cuando haya conexión.'}
        </Text>

        <View style={styles.actions}>
          {report ? <PrimaryButton label="Ver resultado" onPress={() => navigation.replace('ReporteDetalle', { clientId: route.params?.clientId })} /> : null}
          <PrimaryButton
            label="Ver mis reportes"
            variant="secondary"
            onPress={() => navigation.navigate('Tabs', { screen: 'MisReportes' })}
          />
          <PrimaryButton
            label="Crear otro reporte"
            variant="secondary"
            onPress={() => navigation.navigate('Tabs', { screen: 'Reportar' })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.marginMobile,
    gap: 16,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.statusLowSynced + '1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 24,
  },
  actions: {
    width: '100%',
    gap: 8,
  },
});
