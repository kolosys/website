import { SectionHeader } from "../_components/SectionHeader";
import { AppSection, PageHeader } from "@kolosys-sites/theme";

export default function TypographyPage() {
    return (
        <AppSection id="typography">
            <PageHeader
                title="Typography"
                description="Typography hierarchy and text styles. All styles automatically adapt to light and dark modes."
            />

            <section className="mt-12 mb-12">
                <SectionHeader
                    title="Headings"
                    description="Heading styles from h1 through h6 with predefined sizes, weights, and margins."
                />
                <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h1>Heading 1</h1>
                        <p className="text-sm font-mono text-caption mt-2">text-4xl font-bold mb-4</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h2>Heading 2</h2>
                        <p className="text-sm font-mono text-caption mt-2">text-3xl font-bold mb-3</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h3>Heading 3</h3>
                        <p className="text-sm font-mono text-caption mt-2">text-xl font-semibold</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4>Heading 4</h4>
                        <p className="text-sm font-mono text-caption mt-2">text-lg font-bold</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h5>Heading 5</h5>
                        <p className="text-sm font-mono text-caption mt-2">text-base font-bold</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h6>Heading 6</h6>
                        <p className="text-sm font-mono text-caption mt-2">text-sm font-bold uppercase tracking-wide</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Body Text"
                    description="Standard paragraph and text color variants for different contexts."
                />
                <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <p className="text-foreground mb-2">
                            <strong>Foreground:</strong> This is primary text color used for headings and important content. It has the highest contrast against the background.
                        </p>
                        <p className="text-sm font-mono text-caption">text-foreground</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <p className="text-body mb-2">
                            <strong>Body:</strong> This is the default body text color used for paragraphs and readable content. It's slightly softer than foreground for comfortable reading.
                        </p>
                        <p className="text-sm font-mono text-caption">text-body</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <p className="text-caption mb-2">
                            <strong>Caption:</strong> This is secondary text used for labels, captions, and less prominent content. It's more subtle than body text.
                        </p>
                        <p className="text-sm font-mono text-caption">text-caption</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <p className="text-disabled mb-2">
                            <strong>Disabled:</strong> This text color indicates disabled or inactive states. It has lower contrast and should not be used for important content.
                        </p>
                        <p className="text-sm font-mono text-caption">text-disabled</p>
                    </div>

                    <div className="p-6 border border-neutral-800 rounded-lg bg-neutral-900">
                        <p className="text-inverse mb-2">
                            <strong>Inverse:</strong> This is white text used on dark backgrounds. It maintains readability on dark surfaces.
                        </p>
                        <p className="text-sm font-mono text-neutral-400">text-inverse</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Lists"
                    description="Ordered and unordered list styles."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Unordered List</h4>
                        <ul>
                            <li>First item in the list</li>
                            <li>Second item in the list</li>
                            <li>Third item in the list
                                <ul className="ml-6 mt-2">
                                    <li>Nested item one</li>
                                    <li>Nested item two</li>
                                </ul>
                            </li>
                            <li>Fourth item in the list</li>
                        </ul>
                        <p className="text-sm font-mono text-caption mt-4">list-disc list-inside mb-4</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Ordered List</h4>
                        <ol>
                            <li>First step in the process</li>
                            <li>Second step in the process</li>
                            <li>Third step in the process
                                <ol className="ml-6 mt-2">
                                    <li>Sub-step one</li>
                                    <li>Sub-step two</li>
                                </ol>
                            </li>
                            <li>Fourth step in the process</li>
                        </ol>
                        <p className="text-sm font-mono text-caption mt-4">list-decimal list-inside mb-4</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Code Typography"
                    description="Inline code and code block styles with syntax highlighting."
                />
                <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Inline Code</h4>
                        <p className="text-body mb-4">
                            Use inline code like <code>const example = true</code> within paragraphs.
                            You can also reference <code>variables</code>, <code>functions()</code>, and <code>file-names.tsx</code> inline.
                        </p>
                        <p className="text-sm font-mono text-caption">rounded-md bg-neutral-200 px-1.5 py-0.5 text-sm font-mono</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Code Block Example</h4>
                        <div className="bg-neutral-950 rounded-lg p-4 overflow-x-auto">
                            <pre className="shiki"><code className="text-neutral-300">{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`}</code></pre>
                        </div>
                        <p className="text-sm text-caption mt-4">
                            Code blocks use the Shiki syntax highlighter with monospace font and precise spacing.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Links & Interactive Text"
                    description="Link styles with hover and active states."
                />
                <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Default Links</h4>
                        <p className="text-body mb-4">
                            This is a paragraph with a <a href="#" className="text-link hover:text-link-hover active:text-link-active">standard link</a> that
                            uses the theme colors. Links automatically adapt to light and dark modes.
                        </p>
                        <p className="text-sm font-mono text-caption">text-link hover:text-link-hover active:text-link-active</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Interactive Utility Class</h4>
                        <p className="text-body mb-4">
                            Use the <code>text-interactive</code> utility class for <span className="text-interactive">clickable text</span> that
                            includes hover, active states, and cursor pointer automatically.
                        </p>
                        <p className="text-sm font-mono text-caption">text-interactive (includes hover, active, transition, cursor)</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Font Families"
                    description="Available font stacks for different content types."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3 font-sans">Sans-Serif (Default)</h4>
                        <p className="font-sans text-body mb-4">
                            The quick brown fox jumps over the lazy dog.
                            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                        </p>
                        <p className="text-sm font-mono text-caption">font-sans</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Monospace</h4>
                        <p className="font-mono text-body mb-4">
                            The quick brown fox jumps over the lazy dog.
                            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                        </p>
                        <p className="text-sm font-mono text-caption">font-mono</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Font Weights & Sizes"
                    description="Available font weights and text size utilities."
                />
                <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-4">Font Weights</h4>
                        <div className="space-y-2">
                            <p className="font-normal text-foreground">Normal Weight - Regular text content (font-normal)</p>
                            <p className="font-semibold text-foreground">Semibold Weight - Slightly emphasized (font-semibold)</p>
                            <p className="font-bold text-foreground">Bold Weight - Strong emphasis and headings (font-bold)</p>
                        </div>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-4">Text Sizes</h4>
                        <div className="space-y-3">
                            <p className="text-xs text-foreground">Extra Small - text-xs (0.75rem)</p>
                            <p className="text-sm text-foreground">Small - text-sm (0.875rem)</p>
                            <p className="text-base text-foreground">Base - text-base (1rem) - Default</p>
                            <p className="text-lg text-foreground">Large - text-lg (1.125rem)</p>
                            <p className="text-xl text-foreground">Extra Large - text-xl (1.25rem)</p>
                            <p className="text-2xl text-foreground">2XL - text-2xl (1.5rem)</p>
                            <p className="text-3xl text-foreground">3XL - text-3xl (1.875rem)</p>
                            <p className="text-4xl text-foreground">4XL - text-4xl (2.25rem)</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <SectionHeader
                    title="Line Height"
                    description="Leading (line height) utilities for different content types."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Normal Leading</h4>
                        <p className="leading-normal text-body">
                            This paragraph uses normal line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-sm font-mono text-caption mt-2">leading-normal</p>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-panel">
                        <h4 className="font-bold mb-3">Relaxed Leading (Default)</h4>
                        <p className="leading-relaxed text-body">
                            This paragraph uses relaxed line height for comfortable reading. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-sm font-mono text-caption mt-2">leading-relaxed (default for body)</p>
                    </div>
                </div>
            </section>
        </AppSection>
    );
}
