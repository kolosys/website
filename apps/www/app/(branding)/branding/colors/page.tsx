import { SectionHeader } from "../_components/SectionHeader";
import { ColorSwatch } from "../_components/ColorSwatch";
import { AppContent, AppSection, PageHeader } from "@kolosys-sites/theme";

const colorScales = [
    {
        name: "Primary (Cyan)",
        description: "Brand color based on #0fd4e4. Used for interactive elements, links, buttons, and focus states.",
        prefix: "primary",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    },
    {
        name: "Accent (Orange)",
        description: "Accent color based on #e4610f. Used for secondary CTAs, highlights, and special badges.",
        prefix: "accent",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    },
    {
        name: "Neutral (Cool Gray)",
        description: "Custom gray with subtle cool tint. Used for text, borders, backgrounds, and disabled states.",
        prefix: "neutral",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    },
    {
        name: "Success (Green)",
        description: "Semantic scale for positive states, success messages, and status indicators.",
        prefix: "success",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    },
    {
        name: "Error (Red)",
        description: "Semantic scale for error states, destructive actions, and negative indicators.",
        prefix: "error",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    }
];

const semanticTokens = {
    backgrounds: [
        { name: "Page", token: "page", description: "Default page background" },
        { name: "Card", token: "card", description: "Card/surface background (pure white)" },
        { name: "Panel", token: "panel", description: "Panel background (pure white)" },
        { name: "Well", token: "well", description: "Subtle inset background" },
        { name: "Muted", token: "muted", description: "Muted background for less emphasis" }
    ],
    text: [
        { name: "Foreground", token: "foreground", description: "Primary text color (headings, important text)" },
        { name: "Body", token: "body", description: "Body text color (paragraphs, readable content)" },
        { name: "Caption", token: "caption", description: "Secondary text (labels, captions)" },
        { name: "Disabled", token: "disabled", description: "Disabled text state" },
        { name: "Inverse", token: "inverse", description: "Text on dark backgrounds (pure white)" }
    ],
    borders: [
        { name: "Border", token: "border", description: "Default border color" },
        { name: "Divider", token: "divider", description: "Divider lines and separators" },
        { name: "Outline", token: "outline", description: "Subtle outline color" }
    ],
    interactive: [
        { name: "Link", token: "link", description: "Default link color" },
        { name: "Link Hover", token: "link-hover", description: "Link hover state" },
        { name: "Link Active", token: "link-active", description: "Link active state" }
    ]
};

export default function ColorsPage() {
    return (
        <AppContent>
            <AppSection>
                <PageHeader
                    title="Colors"
                    description="Comprehensive color system with 50-950 scales for light and dark modes. Toggle between themes to see how colors adapt automatically."
                />

                <section className="mt-12 mb-12">
                    <SectionHeader
                        title="Color Scales"
                        description="Each color family has 11 shades from 50 (lightest) to 950 (darkest). In dark mode, these scales automatically invert to maintain proper contrast and hierarchy."
                    />
                    {colorScales.map((scale) => (
                        <div key={scale.prefix} className="mb-12">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-foreground">{scale.name}</h3>
                                <p className="text-sm text-body mt-1">{scale.description}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-11 gap-4">
                                {scale.shades.map((shade) => (
                                    <ColorSwatch
                                        key={shade}
                                        name={`${shade}`}
                                        value={`var(--theme-${scale.prefix}-${shade})`}
                                        cssVar={`--color-${scale.prefix}-${shade}`}
                                        tailwindClass={`bg-${scale.prefix}-${shade}`}
                                    />
                                ))}
                            </div>

                            {scale.prefix === "primary" && (
                                <div className="mt-4 p-4 bg-primary-100 border-l-4 border-primary-600 rounded">
                                    <p className="text-sm text-body">
                                        <strong className="text-foreground">Note:</strong> Step 500 has the highest chroma (saturation) for the purest, most vibrant color, following the Radix Colors pattern.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                <section className="mb-12">
                    <SectionHeader
                        title="Semantic Tokens"
                        description="Context-specific color tokens that automatically adapt to the current theme. Use these for common patterns instead of direct color scale references."
                    />
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Backgrounds</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {semanticTokens.backgrounds.map((token) => (
                                    <ColorSwatch
                                        key={token.token}
                                        name={token.name}
                                        value={`var(--color-${token.token})`}
                                        cssVar={`--color-${token.token}`}
                                        tailwindClass={`bg-${token.token}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Text Colors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {semanticTokens.text.map((token) => (
                                    <div key={token.token} className="border border-border rounded-lg p-4 bg-panel">
                                        <div className={`text-${token.token} font-semibold mb-2`}>
                                            {token.name}
                                        </div>
                                        <div className="text-xs font-mono text-caption mb-1">
                                            text-{token.token}
                                        </div>
                                        <div className="text-xs text-body">
                                            {token.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Borders</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {semanticTokens.borders.map((token) => (
                                    <div key={token.token} className="border border-border rounded-lg p-4 bg-panel">
                                        <div className={`border-${token.token} border-4 rounded h-12 mb-3`} />
                                        <div className="font-semibold text-sm text-foreground mb-1">
                                            {token.name}
                                        </div>
                                        <div className="text-xs font-mono text-caption mb-1">
                                            border-{token.token}
                                        </div>
                                        <div className="text-xs text-body">
                                            {token.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Interactive States</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {semanticTokens.interactive.map((token) => (
                                    <div key={token.token} className="border border-border rounded-lg p-4 bg-panel">
                                        <div className={`text-${token.token} font-semibold mb-2 text-lg`}>
                                            {token.name}
                                        </div>
                                        <div className="text-xs font-mono text-caption mb-1">
                                            text-{token.token}
                                        </div>
                                        <div className="text-xs text-body">
                                            {token.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <SectionHeader
                        title="Usage Guidelines"
                        description="Best practices for using the color system effectively."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-border rounded-lg bg-panel">
                            <h4 className="font-bold text-foreground mb-3">Color Scale Numbers</h4>
                            <ul className="space-y-2 text-sm text-body">
                                <li><strong className="text-foreground">50-200:</strong> Backgrounds and subtle accents</li>
                                <li><strong className="text-foreground">300-500:</strong> Borders and secondary elements</li>
                                <li><strong className="text-foreground">600-700:</strong> Primary interactive states</li>
                                <li><strong className="text-foreground">800-950:</strong> Text and dark accents</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-border rounded-lg bg-panel">
                            <h4 className="font-bold text-foreground mb-3">Dark Mode</h4>
                            <ul className="space-y-2 text-sm text-body">
                                <li>Colors automatically invert (50 becomes darkest)</li>
                                <li>Chroma boosted ~15% for vibrancy on dark backgrounds</li>
                                <li>Neutrals have reduced chroma for truer grays</li>
                                <li>All semantic tokens adapt automatically</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-border rounded-lg bg-panel">
                            <h4 className="font-bold text-foreground mb-3">Accessibility</h4>
                            <ul className="space-y-2 text-sm text-body">
                                <li>All combinations meet WCAG AA contrast standards</li>
                                <li>Primary text on backgrounds: ~19:1 ratio</li>
                                <li>Interactive cyan on white: ~4.8:1 ratio</li>
                                <li>Perceptually balanced using OKLch color space</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-border rounded-lg bg-panel">
                            <h4 className="font-bold text-foreground mb-3">Best Practices</h4>
                            <ul className="space-y-2 text-sm text-body">
                                <li>Use semantic tokens for common patterns</li>
                                <li>Primary (cyan) for interactive elements</li>
                                <li>Accent (orange) for highlights and CTAs</li>
                                <li>Success/Error sparingly for states only</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </AppSection>
        </AppContent>
    );
}
