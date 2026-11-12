import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useUserStore } from "../store/user";
import { looiTheme } from "../ui/looi-theme";
import {
  DISC_COLORS,
  DISC_COLOR_LABELS,
  DISC_LANGUAGE_OPTIONS,
  DISC_TEXT_LIMITS,
  type DiscColor,
} from "./disc-demo";

const SWATCH: Record<DiscColor, string> = {
  red: "#E5484D",
  blue: "#3E8EF7",
  yellow: "#F5C518",
  green: "#30A46C",
};

function ColorRow({
  value,
  onChange,
  allowNone,
}: {
  value: DiscColor | null;
  onChange: (color: DiscColor | null) => void;
  allowNone?: boolean;
}) {
  return (
    <View style={styles.row}>
      {allowNone ? (
        <Pressable onPress={() => onChange(null)} style={[styles.chip, value === null && styles.chipSelected]}>
          <Text style={styles.chipText}>{value === null ? "✓ Aucune" : "Aucune"}</Text>
        </Pressable>
      ) : null}
      {DISC_COLORS.map((color) => (
        <Pressable
          key={color}
          onPress={() => onChange(color)}
          style={[styles.chip, { borderColor: SWATCH[color] }, value === color && { backgroundColor: SWATCH[color] }]}
        >
          <Text style={[styles.chipText, value === color && styles.chipTextSelected]}>
            {value === color ? `✓ ${DISC_COLOR_LABELS[color].fr}` : DISC_COLOR_LABELS[color].fr}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

/** Settings block for the DISC trade-show demo (fork addition). */
export function DiscDemoSettingsSection() {
  const { preferences, updatePreferences } = useUserStore();
  const enabled = preferences.discDemoEnabled;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Démo DISC (salon)</Text>
      <View style={styles.card}>
        <Pressable onPress={() => updatePreferences({ discDemoEnabled: !enabled })} style={styles.switchRow}>
          <Text style={styles.value}>Mode démo DISC</Text>
          <Text style={[styles.pill, enabled && styles.pillOn]}>{enabled ? "ACTIVÉ" : "DÉSACTIVÉ"}</Text>
        </Pressable>
        <Text style={styles.help}>
          Activé : le robot joue le profil couleur choisi, réagit avec des émotions et n'utilise aucune mémoire personnelle.
          Les changements s'appliquent dès le retour sur l'écran du visage.
        </Text>

        {enabled ? (
          <>
            <Text style={styles.label}>Couleur principale du robot</Text>
            <ColorRow value={preferences.discRobotPrimary} onChange={(color) => color && updatePreferences({ discRobotPrimary: color })} />
            <Text style={styles.label}>Couleur secondaire du robot</Text>
            <ColorRow allowNone value={preferences.discRobotSecondary} onChange={(color) => updatePreferences({ discRobotSecondary: color })} />

            <View style={styles.divider} />
            <Text style={styles.label}>Visiteur — couleur principale</Text>
            <ColorRow allowNone value={preferences.discVisitorPrimary} onChange={(color) => updatePreferences({ discVisitorPrimary: color })} />
            <Text style={styles.label}>Visiteur — couleur secondaire</Text>
            <ColorRow allowNone value={preferences.discVisitorSecondary} onChange={(color) => updatePreferences({ discVisitorSecondary: color })} />
            <Text style={styles.label}>Visiteur — profil détaillé ou notes (facultatif)</Text>
            <TextInput
              value={preferences.discVisitorNotes}
              onChangeText={(text) => updatePreferences({ discVisitorNotes: text.slice(0, DISC_TEXT_LIMITS.visitorNotes) })}
              placeholder="Ex. : prénom, résultat détaillé du questionnaire…"
              placeholderTextColor={looiTheme.muted}
              multiline
              style={[styles.input, styles.multiline]}
            />
            <Pressable
              onPress={() => updatePreferences({ discVisitorPrimary: null, discVisitorSecondary: null, discVisitorNotes: "" })}
              style={styles.action}
            >
              <Text style={styles.actionText}>Nouveau visiteur (effacer le profil)</Text>
            </Pressable>

            <View style={styles.divider} />
            <Text style={styles.label}>Langue de la démo</Text>
            <View style={styles.row}>
              {DISC_LANGUAGE_OPTIONS.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => updatePreferences({ discDemoLanguage: item.id })}
                  style={[styles.chip, preferences.discDemoLanguage === item.id && styles.chipSelected]}
                >
                  <Text style={styles.chipText}>{preferences.discDemoLanguage === item.id ? `✓ ${item.label}` : item.label}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={() => updatePreferences({ discPhysicalReactions: !preferences.discPhysicalReactions })} style={styles.switchRow}>
              <Text style={styles.value}>Gestes physiques avec les émotions</Text>
              <Text style={[styles.pill, preferences.discPhysicalReactions && styles.pillOn]}>{preferences.discPhysicalReactions ? "OUI" : "NON"}</Text>
            </Pressable>
            <Text style={styles.help}>« En colère » et « victoire » font une petite rotation sur place, protégée par les capteurs anti-chute. Désactive-le si le robot est au bord d'une table encombrée.</Text>

            <Text style={styles.label}>Instructions supplémentaires (prompt libre)</Text>
            <TextInput
              value={preferences.discExtraInstructions}
              onChangeText={(text) => updatePreferences({ discExtraInstructions: text.slice(0, DISC_TEXT_LIMITS.extraInstructions) })}
              placeholder="Ex. : nom de l'entreprise, présentation du logiciel, ton à adopter, réponses aux questions fréquentes…"
              placeholderTextColor={looiTheme.muted}
              multiline
              style={[styles.input, styles.multilineLarge]}
            />
            <Text style={styles.help}>{preferences.discExtraInstructions.length} / {DISC_TEXT_LIMITS.extraInstructions} caractères. Le référentiel des couleurs est déjà intégré.</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 14 },
  sectionTitle: { color: looiTheme.text, fontSize: 17, fontWeight: "800", marginBottom: 8 },
  card: { borderWidth: 1, borderColor: looiTheme.line, borderRadius: 20, backgroundColor: looiTheme.rail, padding: 14, gap: 10 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  value: { color: looiTheme.text, fontSize: 13, fontWeight: "700" },
  label: { color: looiTheme.muted, fontSize: 12, fontWeight: "700", marginTop: 4 },
  help: { color: looiTheme.muted, fontSize: 12, lineHeight: 17 },
  pill: { color: looiTheme.muted, borderWidth: 1, borderColor: looiTheme.line, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, overflow: "hidden" },
  pillOn: { color: looiTheme.cyan, borderColor: looiTheme.cyan },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: looiTheme.line, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  chipSelected: { borderColor: looiTheme.cyan, backgroundColor: "rgba(40,213,255,0.07)" },
  chipText: { color: looiTheme.text, fontSize: 13, fontWeight: "700" },
  chipTextSelected: { color: "#0B0F14" },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: looiTheme.line, marginVertical: 4 },
  input: { color: looiTheme.text, borderWidth: 1, borderColor: looiTheme.line, borderRadius: 14, backgroundColor: looiTheme.bg, paddingHorizontal: 12, paddingVertical: 10 },
  multiline: { minHeight: 70, textAlignVertical: "top" },
  multilineLarge: { minHeight: 130, textAlignVertical: "top" },
  action: { alignSelf: "flex-start", borderRadius: 12, backgroundColor: looiTheme.cyan, paddingHorizontal: 13, paddingVertical: 9 },
  actionText: { color: "#041319", fontWeight: "800", fontSize: 12 },
});
