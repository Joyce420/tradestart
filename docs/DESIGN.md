---
name: TradeStart Global Logistics System
colors:
  surface: '#FFFFFF'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#43474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#74777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#49607c'
  primary: '#00152a'
  on-primary: '#ffffff'
  primary-container: '#102a43'
  on-primary-container: '#7a92b0'
  inverse-primary: '#b0c9e8'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#79f3e8'
  on-secondary-container: '#006f68'
  tertiary: '#001529'
  on-tertiary: '#ffffff'
  tertiary-container: '#122a41'
  on-tertiary-container: '#7b92ad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b0c9e8'
  on-primary-fixed: '#011d35'
  on-primary-fixed-variant: '#314863'
  secondary-fixed: '#7cf6eb'
  secondary-fixed-dim: '#5dd9ce'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504b'
  tertiary-fixed: '#d0e4ff'
  tertiary-fixed-dim: '#b1c9e6'
  on-tertiary-fixed: '#021d33'
  on-tertiary-fixed-variant: '#324861'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
  success: '#27AB83'
  warning: '#F59E0B'
  danger: '#EF4444'
  border: '#D9E2EC'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans SC
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans SC
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Noto Sans SC
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Noto Sans SC
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  section-gap: 80px
  card-padding: 24px
---

## Brand & Style

The design system for the product is rooted in the **Corporate / Modern** aesthetic, specifically tailored for a professional SaaS environment that bridges the gap between educational learning and practical utility. The personality is **trustworthy, international, and action-oriented**, avoiding the typical "get rich quick" tropes of trade training in favor of a clean, tool-first interface.

The visual direction uses a **Card-Based Layout** to organize complex data into digestible modules. It features **medium rounded corners** and **subtle, layered shadows** to create a sense of depth without overwhelming the user. The style emphasizes clarity through:
- **Structural Precision:** Clear borders and generous whitespace to reduce cognitive load.
- **Functional Decoration:** Using actual UI components (charts, progress trackers) as visual elements rather than generic stock photography.
- **Informative Indicators:** A strict "Color + Text + Icon" rule for all status indicators to ensure accessibility and professional rigor.

## Colors

The color palette is dominated by **Deep Sea Blue (#102A43)**, evoking stability and the "Blue Ocean" of international trade. **Cyan/Green (#13A89E)** serves as the primary action color, used for CTA buttons and progress indicators to represent growth and navigation.

- **Primary:** Deep Sea Blue for navigation, headings, and core brand elements.
- **Secondary:** Cyan/Green for interactive elements and primary conversion paths.
- **Background:** A warm neutral grey (#F7F9FC) provides a soft canvas that reduces eye strain compared to pure white.
- **Functional Palette:** A standard semantic system (Red/Orange/Green) is used for the profit calculator results to provide immediate visual feedback on business viability.

## Typography

The system utilizes a hybrid typographic approach. **Hanken Grotesk** is used for headlines to provide a sharp, modern SaaS feel, while **Noto Sans SC** ensures maximum legibility for long-form Chinese educational content. **JetBrains Mono** is introduced for "data labels" and "calculation values" to lean into the technical, precise nature of trade logistics and profit counting.

For mobile, display sizes scale down aggressively to prevent text wrapping issues in the 8-step roadmap and calculator modules. Line heights are kept generous (1.6x for body) to ensure a comfortable reading experience during 5-minute core knowledge sessions.

## Layout & Spacing

This design system employs a **12-column Fluid Grid** for desktop and a **Single Column Stack** for mobile.

- **Grid Logic:** On desktop, the "8-step Roadmap" uses a horizontal flex layout that wraps into a 2x4 or 4x2 grid on tablets. On mobile, this automatically reflows into a vertical timeline.
- **Calculator Layout:** Uses a split-pane model on desktop (Inputs left, sticky Results right). On mobile, this stacks into a progressive flow: Input Groups -> Calculate Action -> Result Summary.
- **Spacing Rhythm:** An 8px base grid is used. Cards utilize 24px internal padding to maintain a "lightweight" feel despite high information density.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** combined with soft shadows.
- **Level 0 (Background):** #F7F9FC (Warm White).
- **Level 1 (Cards/Content):** Pure White (#FFFFFF) with a 1px border (#D9E2EC) and a very subtle shadow (Y: 2px, Blur: 4px, Opacity: 4%).
- **Level 2 (Interactive/Hover):** When hovering over roadmap nodes or feature cards, the shadow deepens (Y: 8px, Blur: 16px, Opacity: 8%) and the border color shifts to the primary blue.
- **Level 3 (Modals/Popovers):** Higher contrast shadows to separate from the main calculation surface.

No heavy gradients or glassmorphism are used, ensuring the focus remains on data and text.

## Shapes

The design system uses a **Rounded (0.5rem / 8px)** base. This level of rounding strikes a balance between professional software (sharp) and a friendly learning platform (round).

- **Standard Elements:** Buttons, Input Fields, and small cards use 8px.
- **Large Containers:** Section containers and the main profit summary card use 16px (`rounded-lg`).
- **Status Chips:** Use a full pill-shape (999px) to clearly differentiate them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid #13A89E with white text. High contrast for "Start Learning" or "Calculate" actions.
- **Secondary:** Outlined with #102A43. Used for "View Example" or "Back" actions.
- **States:** Hover states should darken the background color by 10%. Disabled states use #D9E2EC background with grey text.

### Cards
- Always use a white background.
- For the **Profit Calculator**, cards should have a colored top-border (4px) to indicate status: Green (Profitable), Orange (Low Margin), Red (Loss).

### Inputs
- Bordered style (1px #D9E2EC). On focus, the border changes to #13A89E with a soft cyan outer glow.
- Numeric inputs in the calculator should include unit suffixes (e.g., "CNY", "%") inside the field.

### Roadmap Nodes
- Vertical lines on mobile, horizontal on desktop.
- **Completed:** Icon checkmark + primary blue theme.
- **Active:** Pulsing cyan border.
- **Locked:** Greyscale with 50% opacity.

### Progress & Charts
- Use **Donut Charts** for cost breakdown in the calculator.
- Use a linear **Step Tracker** for the Export Wizard to show 1-6 completion stages.