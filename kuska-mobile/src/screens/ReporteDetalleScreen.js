import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';
import StatusBadge from '../components/StatusBadge';
import PrimaryButton from '../components/PrimaryButton';

function Field({ label, value }) {
  if (value == null || value === '') return null;
  return <View style={styles.field}><Text style={[typography.labelStatus, styles.fieldLabel]}>{label}</Text><Text style={[typography.bodyMd, styles.fieldValue]}>{String(value)}</Text></View>;
}

export default function ReporteDetalleScreen({ navigation, report, onRefresh }) {
  if (!report) return <SafeAreaView style={styles.safe}><View style={styles.center}><Text>Reporte no encontrado.</Text></View></SafeAreaView>;
  const confidence = report.confidence == null ? null : `${Math.round(report.confidence * 100)}%`;
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" size={26} color={colors.primary} onPress={() => navigation.goBack()} />
        <Text style={[typography.headlineMd, styles.headerTitle]}>Detalle del reporte</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {report.imageUrl ? <Image source={{ uri: report.imageUrl }} style={styles.photo} /> : null}
        <View style={styles.titleRow}><Text style={[typography.headlineMd, styles.title]}>{report.title}</Text><StatusBadge status={report.displayStatus} /></View>
        <Text style={[typography.bodyMd, styles.description]}>{report.description}</Text>
        <View style={styles.card}>
          <Text style={[typography.bodyLg, styles.sectionTitle]}>Análisis del backend</Text>
          {report.incidentId ? <>
            <Field label="PRIORIDAD" value={report.priority?.toUpperCase()} />
            <Field label="TIPO" value={report.incidentType} />
            <Field label="NIVEL DE DAÑO" value={report.damageLevel} />
            <Field label="CONFIANZA" value={confidence} />
            <Field label="PERSONAS ATRAPADAS" value={report.trappedPeoplePossible == null ? null : report.trappedPeoplePossible ? 'Posible' : 'No detectado'} />
            <Field label="EXPLICACIÓN DE GEMMA" value={report.explanation} />
            <Field label="RIESGOS SECUNDARIOS" value={report.secondaryRisks.length ? report.secondaryRisks.join(', ') : null} />
          </> : <Text style={[typography.bodyMd, styles.muted]}>Pendiente de sincronización. El análisis aparecerá cuando haya conexión.</Text>}
        </View>
        <View style={styles.card}><Field label="ID DEL INCIDENTE" value={report.incidentId} /><Field label="FECHA" value={report.date} /><Field label="UBICACIÓN" value={report.location} /></View>
        {report.incidentId ? <PrimaryButton label="Actualizar resultado" variant="secondary" onPress={() => onRefresh(report)} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { height: 64, paddingHorizontal: spacing.marginMobile, flexDirection: 'row', alignItems: 'center', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.surfaceVariant, backgroundColor: colors.backgroundSurface },
  headerTitle: { color: colors.primary }, content: { padding: spacing.marginMobile, gap: 18, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, photo: { width: '100%', height: 220, borderRadius: radius.xl, backgroundColor: colors.surfaceContainer },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 }, title: { flex: 1, color: colors.onSurface }, description: { color: colors.onSurfaceVariant },
  card: { padding: 18, borderRadius: radius.xl, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant, gap: 14 },
  sectionTitle: { color: colors.onSurface, fontWeight: '700' }, field: { gap: 4 }, fieldLabel: { color: colors.onSurfaceVariant, fontSize: 11 }, fieldValue: { color: colors.onSurface }, muted: { color: colors.onSurfaceVariant },
});
