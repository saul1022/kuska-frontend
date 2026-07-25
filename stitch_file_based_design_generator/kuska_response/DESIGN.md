---
name: Kuska Response
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1eded'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#44474a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#75777a'
  outline-variant: '#c5c6ca'
  surface-tint: '#5d5e61'
  primary: '#000101'
  on-primary: '#ffffff'
  primary-container: '#1a1c1e'
  on-primary-container: '#838486'
  inverse-primary: '#c6c6c9'
  secondary: '#5d5e62'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e6'
  on-secondary-container: '#636468'
  tertiary: '#010100'
  on-tertiary: '#ffffff'
  tertiary-container: '#201b17'
  on-tertiary-container: '#8b837d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#e2e2e6'
  secondary-fixed-dim: '#c6c6ca'
  on-secondary-fixed: '#1a1c1f'
  on-secondary-fixed-variant: '#45474a'
  tertiary-fixed: '#ebe0da'
  tertiary-fixed-dim: '#cfc5be'
  on-tertiary-fixed: '#201b17'
  on-tertiary-fixed-variant: '#4c4641'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  status-high-error: '#D32F2F'
  status-medium-sync: '#FF8F00'
  status-low-synced: '#2E7D32'
  background-surface: '#FFFFFF'
  input-active: '#005FB8'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-status:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base-unit: 8px
  margin-mobile: 20px
  gutter: 16px
  touch-target-min: 56px
---

## Brand & Style

The design system for this emergency response application is built on the principles of **Functional Minimalism**. In a post-earthquake scenario, users face extreme stress, physical instability, and unpredictable lighting. The brand identity must retreat to the background, serving only to facilitate high-speed, high-accuracy data entry without "corporate fluff."

The visual language emphasizes:
- **Calmness and Trust:** A neutral foundation that avoids adding to the user's anxiety.
- **Urgency without Panic:** Using high-contrast elements to guide the eye immediately to critical actions.
- **Tactile Reliability:** Large, unmistakable touch targets that accommodate shaky hands or low-dexterity conditions.
- **Offline Transparency:** Clear, persistent visual cues regarding synchronization status that manage user expectations without blocking their workflow.

The style avoids decorative elements, gradients, or complex blurs in favor of raw, high-visibility utility.

## Colors

The palette is strictly functional. A high-contrast **Neutral-on-White** base ensures readability in direct sunlight or low-light dust clouds. 

- **Primary:** A deep, near-black charcoal used for primary text and critical action buttons to ensure maximum contrast.
- **Secondary:** A cool grey for borders, inactive states, and secondary actions.
- **Semantic Accents:** 
    - **Red (#D32F2F):** Reserved for "High Priority" damage or "Sync Error."
    - **Amber (#FF8F00):** Indicates "Medium Priority" or "Syncing/In Progress."
    - **Green (#2E7D32):** Confirms "Low Priority" or "Successfully Synced."

Avoid using brand colors for aesthetic purposes; color in this design system is a data point.

## Typography

We use **Hanken Grotesk** for its exceptional legibility and modern, clean appearance. The typeface features generous x-heights and open counters, making it readable even when the screen is dimmed to save battery.

For technical data, timestamps, and status badges, we utilize **JetBrains Mono**. This monospaced font provides a "systematic" and "accurate" feel, distinguishing raw data (GPS coordinates, sync status) from human-entered descriptions.

**Mobile-First Scaling:**
- Headlines are kept compact to ensure forms are visible above the keyboard.
- The base body size is set to 18px (Large) by default to accommodate users under physical stress or those with visual impairments.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model optimized for one-handed mobile use. 

- **Safe Zones:** Content is inset by a 20px margin on all sides to avoid screen edges.
- **Rhythm:** An 8px linear grid governs all spacing.
- **Touch Targets:** The minimum height for any interactive element (buttons, toggles, list items) is 56px. This is non-negotiable to ensure the app is usable in high-vibration environments or with gloved hands.
- **Visual Hierarchy:** Grouping is achieved through generous whitespace (24px-32px between sections) rather than lines or boxes, reducing visual noise.

## Elevation & Depth

This design system uses **Tonal Layers** rather than traditional shadows to maintain high contrast and clarity.

- **Level 0 (Background):** Pure white (#FFFFFF).
- **Level 1 (Cards/Containers):** Flat, subtle light grey (#F4F4F7) with a defined 1px border (#E2E2E6).
- **Interactive State:** No shadows are used. Instead, interactive elements use "High-Contrast Outlines" or solid color fills.
- **Modals/Overlays:** Use a high-opacity (80%) dark overlay to focus the user entirely on the confirmation or permission task at hand.

By avoiding diffused shadows, we ensure that the UI remains crisp on lower-quality LCD screens often found on budget mobile devices.

## Shapes

We use **Soft (0.25rem)** roundedness. While a "Rounded" or "Pill" style feels friendly and casual, "Soft" corners maintain a professional, utilitarian, and serious tone appropriate for emergency services.

- **Small elements (Chips/Badges):** 0.25rem.
- **Large elements (Buttons/Cards):** 0.5rem (rounded-lg).
- **Inputs:** 0.25rem.

This slight rounding prevents the UI from feeling "aggressive" (as sharp corners might) while staying grounded in a structured, grid-based aesthetic.

## Components

### Buttons
- **Primary:** Full width, #1A1C1E background, white text. Height: 64px.
- **Secondary/Ghost:** 2px border, clear background, high-contrast label.
- **Status Buttons:** Used for camera/video capture, using large circular triggers (80px diameter).

### Input Fields
- Labels are always visible (never floating) and use `body-md` bold.
- Focus state uses a 3px solid border in `input-active` (#005FB8).
- Placeholders must use high-contrast examples to guide the user under stress.

### Status Badges (The "Sync" Badge)
- Must include both an icon and text.
- `label-status` typography (Monospaced).
- Backgrounds use 10% opacity of the semantic color, with the text/icon using 100% opacity of the same color for accessibility.

### Cards (Report List)
- 1px border.
- Fixed aspect-ratio for thumbnails (1:1).
- Metadata (date/time) in `label-status` font style.

### Iconography
- Use thick strokes (2px minimum).
- Icons must be accompanied by text labels whenever possible to eliminate ambiguity in emergency contexts.