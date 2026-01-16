'use client';

import { useState } from "react"
import { AppContent, AppSection, AppSidebar, PageHeader, Button, Badge, Card, CardHeader, CardContent, CardFooter, Alert, Icon, Switch, Tabs, Menu, MenuButton, MenuItems, MenuItemButton, MenuItemLink, MenuSeparator, MenuSection, Listbox, ListboxButton, ListboxOptions, ListboxOption, Fieldset, Field, Label, Input, Legend, Description, StatusBadge, EmptyState, CodeBlockClient, SkeletonBar, SkeletonGroup, SkeletonCircle } from "@kolosys-sites/theme"
import { ComponentExample } from "../_components/ComponentExample"
import { SectionHeader } from "../_components/SectionHeader"
import { ComponentNav } from "../_components/ComponentNav"

const navItems = [
    { id: "core-actions", label: "Core Actions" },
    { id: "indicators", label: "Indicators" },
    { id: "layout", label: "Layout" },
    { id: "forms", label: "Forms" },
    { id: "navigation", label: "Navigation" },
    { id: "selection", label: "Selection" },
    { id: "media", label: "Media" },
    { id: "code", label: "Code" },
    { id: "loading", label: "Loading States" },
];

export default function ComponentsPage() {
    const [switchEnabled, setSwitchEnabled] = useState(false);
    const [switchLabeled, setSwitchLabeled] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState('Wade Cooper');

    const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox'];

    const tabItems = [
        { label: 'Profile', content: <div className="text-body">Profile content goes here...</div> },
        { label: 'Settings', content: <div className="text-body">Settings content goes here...</div> },
        { label: 'Messages', content: <div className="text-body">Messages content goes here...</div> },
    ];

    return (
        <>
            <AppSidebar sticky>
                <div className="p-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-caption mb-4">
                        Components
                    </h4>
                    <ComponentNav items={navItems} />
                </div>
            </AppSidebar>

            <AppContent>
                <PageHeader
                    title="Components"
                    description="Comprehensive component library with variants, sizes, and interactive examples. All components support light and dark modes."
                    className="px-6 py-4"
                />

                {/* Core Actions Section */}
                <AppSection id="core-actions">
                    <SectionHeader
                        title="Core Actions"
                        description="Primary interactive components for user actions."
                    />

                    <ComponentExample
                        title="Button Variants"
                        description="Buttons are available in four variants: primary, secondary, outline, and ghost."
                        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
                    >
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                    </ComponentExample>

                    <ComponentExample
                        title="Button Sizes"
                        description="Buttons come in five sizes: xs, sm, md, lg, and xl."
                        code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
                    >
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                    </ComponentExample>

                    <ComponentExample
                        title="Button States"
                        description="Buttons support disabled and active states."
                        code={`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button isActive>Active</Button>`}
                    >
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button isActive>Active</Button>
                    </ComponentExample>

                    <ComponentExample
                        title="Buttons with Icons"
                        description="Combine buttons with icons for enhanced visual communication."
                        code={`<Button>
  <Icon name="rocket" size="sm" />
  Launch
</Button>
<Button variant="secondary">
  <Icon name="arrow-down" size="sm" />
  Download
</Button>`}
                    >
                        <Button>
                            <Icon name="rocket" size="sm" />
                            Launch
                        </Button>
                        <Button variant="secondary">
                            <Icon name="arrow-down" size="sm" />
                            Download
                        </Button>
                    </ComponentExample>

                    <ComponentExample
                        title="Buttons as Links"
                        description="Buttons can function as links using the href prop."
                        code={`<Button href="/" variant="outline">
  Go Home
</Button>`}
                    >
                        <Button href="/" variant="outline">
                            Go Home
                        </Button>
                    </ComponentExample>
                </AppSection>

                {/* Indicators Section */}
                <AppSection id="indicators" elevated>
                    <SectionHeader
                        title="Indicators"
                        description="Components for displaying status, notifications, and alerts."
                    />

                    <ComponentExample
                        title="Badge Variants"
                        description="Badges display status in five semantic variants."
                        code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}
                    >
                        <Badge variant="default">Default</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="error">Error</Badge>
                        <Badge variant="info">Info</Badge>
                    </ComponentExample>

                    <ComponentExample
                        title="Badge Sizes"
                        description="Badges are available in three sizes."
                        code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
                    >
                        <Badge size="sm">Small</Badge>
                        <Badge size="md">Medium</Badge>
                        <Badge size="lg">Large</Badge>
                    </ComponentExample>

                    <ComponentExample
                        title="Alert Variants"
                        description="Alerts communicate important messages in four variants."
                        code={`<Alert variant="info">
  This is an informational message.
</Alert>
<Alert variant="success">
  Operation completed successfully.
</Alert>
<Alert variant="warning">
  Please review this warning.
</Alert>
<Alert variant="error">
  An error occurred.
</Alert>`}
                    >
                        <div className="space-y-4 w-full">
                            <Alert variant="info">
                                This is an informational message.
                            </Alert>
                            <Alert variant="success">
                                Operation completed successfully.
                            </Alert>
                            <Alert variant="warning">
                                Please review this warning.
                            </Alert>
                            <Alert variant="error">
                                An error occurred.
                            </Alert>
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Alerts with Icons"
                        description="Enhance alerts with custom icons."
                        code={`<Alert
  variant="success"
  icon={<Icon name="check-circle" size="md" />}
>
  Changes saved successfully!
</Alert>`}
                    >
                        <div className="w-full">
                            <Alert
                                variant="success"
                                icon={<Icon name="check-circle" size="md" />}
                            >
                                Changes saved successfully!
                            </Alert>
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Status Badges"
                        description="Display library or repository status with semantic colors."
                        code={`<StatusBadge status="Stable" />
<StatusBadge status="Beta" />
<StatusBadge status="Alpha" />
<StatusBadge status="active" />
<StatusBadge status="syncing" />`}
                    >
                        <StatusBadge status="Stable" />
                        <StatusBadge status="Beta" />
                        <StatusBadge status="Alpha" />
                        <StatusBadge status="active" />
                        <StatusBadge status="syncing" />
                    </ComponentExample>

                    <ComponentExample
                        title="Empty State"
                        description="Display when there's no content available."
                        code={`<EmptyState
  icon={<Icon name="inbox" size="lg" />}
  title="No messages"
  description="You don't have any messages yet."
  action={<Button size="sm">Compose Message</Button>}
/>`}
                    >
                        <div className="w-full">
                            <EmptyState
                                icon={<Icon name="inbox" size="lg" className="text-neutral-400" />}
                                title="No messages"
                                description="You don't have any messages yet."
                                action={<Button size="sm">Compose Message</Button>}
                            />
                        </div>
                    </ComponentExample>
                </AppSection>

                {/* Layout Section */}
                <AppSection id="layout">
                    <SectionHeader
                        title="Layout"
                        description="Structural components for organizing content."
                    />

                    <ComponentExample
                        title="Card Variants"
                        description="Cards come in three variants for different visual hierarchies."
                        code={`<Card variant="default">
  <CardContent>Default card</CardContent>
</Card>
<Card variant="outlined">
  <CardContent>Outlined card</CardContent>
</Card>
<Card variant="elevated">
  <CardContent>Elevated card</CardContent>
</Card>`}
                    >
                        <Card variant="default" className="w-48">
                            <CardContent>Default card</CardContent>
                        </Card>
                        <Card variant="outlined" className="w-48">
                            <CardContent>Outlined card</CardContent>
                        </Card>
                        <Card variant="elevated" className="w-48">
                            <CardContent>Elevated card</CardContent>
                        </Card>
                    </ComponentExample>

                    <ComponentExample
                        title="Card Composition"
                        description="Combine CardHeader, CardContent, and CardFooter for rich layouts."
                        code={`<Card variant="outlined">
  <CardHeader>
    <h3 className="font-semibold">Card Title</h3>
  </CardHeader>
  <CardContent>
    <p className="text-body">Card content goes here with descriptive text.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm" variant="outline">Learn More</Button>
  </CardFooter>
</Card>`}
                    >
                        <Card variant="outlined" className="w-80">
                            <CardHeader>
                                <h3 className="font-semibold">Card Title</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body">Card content goes here with descriptive text.</p>
                            </CardContent>
                            <CardFooter>
                                <Button size="sm" variant="outline">Learn More</Button>
                            </CardFooter>
                        </Card>
                    </ComponentExample>

                    <ComponentExample
                        title="Page Header"
                        description="Standard page header component for consistent page titles."
                        code={`<PageHeader
  title="Page Title"
  description="A brief description of what this page contains."
/>`}
                    >
                        <div className="w-full">
                            <PageHeader
                                title="Page Title"
                                description="A brief description of what this page contains."
                            />
                        </div>
                    </ComponentExample>
                </AppSection>

                {/* Forms Section */}
                <AppSection id="forms" elevated>
                    <SectionHeader
                        title="Forms"
                        description="Input and form components for collecting user data."
                    />

                    <ComponentExample
                        title="Basic Form"
                        description="Fieldset with Legend, Field, Label, and Input for structured forms."
                        code={`<Fieldset>
  <Legend>Account Details</Legend>
  <Field>
    <Label>Email</Label>
    <Input type="email" placeholder="you@example.com" />
  </Field>
  <Field>
    <Label>Password</Label>
    <Input type="password" placeholder="••••••••" />
  </Field>
</Fieldset>`}
                    >
                        <div className="w-full max-w-md">
                            <Fieldset>
                                <Legend>Account Details</Legend>
                                <Field>
                                    <Label>Email</Label>
                                    <Input type="email" placeholder="you@example.com" />
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Input type="password" placeholder="••••••••" />
                                </Field>
                            </Fieldset>
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Field with Description"
                        description="Add helper text using the Description component."
                        code={`<Field>
  <Label>Username</Label>
  <Description>Choose a unique username for your account.</Description>
  <Input type="text" placeholder="johndoe" />
</Field>`}
                    >
                        <div className="w-full max-w-md">
                            <Field>
                                <Label>Username</Label>
                                <Description>Choose a unique username for your account.</Description>
                                <Input type="text" placeholder="johndoe" />
                            </Field>
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Switch Toggle"
                        description="Interactive toggle switch for boolean settings."
                        code={`const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onChange={setEnabled} />`}
                    >
                        <Switch checked={switchEnabled} onChange={setSwitchEnabled} />
                    </ComponentExample>

                    <ComponentExample
                        title="Switch with Labels"
                        description="Combine Switch with Field and Label for better context."
                        code={`const [enabled, setEnabled] = useState(true);

<Field className="flex items-center justify-between">
  <div>
    <Label>Enable notifications</Label>
    <Description>Receive email notifications for updates.</Description>
  </div>
  <Switch checked={enabled} onChange={setEnabled} />
</Field>`}
                    >
                        <div className="w-full max-w-md">
                            <Field className="flex items-center justify-between">
                                <div>
                                    <Label>Enable notifications</Label>
                                    <Description>Receive email notifications for updates.</Description>
                                </div>
                                <Switch checked={switchLabeled} onChange={setSwitchLabeled} />
                            </Field>
                        </div>
                    </ComponentExample>
                </AppSection>

                {/* Navigation Section */}
                <AppSection id="navigation">
                    <SectionHeader
                        title="Navigation"
                        description="Components for organizing and navigating content."
                    />

                    <ComponentExample
                        title="Tabs (Underline)"
                        description="Tabbed interface with underline style."
                        code={`const tabs = [
  { label: 'Profile', content: <div>Profile content...</div> },
  { label: 'Settings', content: <div>Settings content...</div> },
  { label: 'Messages', content: <div>Messages content...</div> },
];

<Tabs tabs={tabs} variant="underline" />`}
                    >
                        <div className="w-full">
                            <Tabs tabs={tabItems} variant="underline" />
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Tabs (Pills)"
                        description="Tabbed interface with pills style."
                        code={`<Tabs tabs={tabs} variant="pills" />`}
                    >
                        <div className="w-full">
                            <Tabs tabs={tabItems} variant="pills" />
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Menu"
                        description="Dropdown menu with button items."
                        code={`<Menu>
  <MenuButton className="px-4 py-2">
    Options
    <Icon name="chevron-down" size="xs" />
  </MenuButton>
  <MenuItems>
    <MenuSection>
      <MenuItemButton>Edit</MenuItemButton>
      <MenuItemButton>Duplicate</MenuItemButton>
    </MenuSection>
    <MenuSeparator />
    <MenuSection>
      <MenuItemButton>Delete</MenuItemButton>
    </MenuSection>
  </MenuItems>
</Menu>`}
                    >
                        <Menu>
                            <MenuButton className="px-4 py-2">
                                Options
                                <Icon name="chevron-down" size="xs" />
                            </MenuButton>
                            <MenuItems>
                                <MenuSection>
                                    <MenuItemButton>Edit</MenuItemButton>
                                    <MenuItemButton>Duplicate</MenuItemButton>
                                </MenuSection>
                                <MenuSeparator />
                                <MenuSection>
                                    <MenuItemButton>Delete</MenuItemButton>
                                </MenuSection>
                            </MenuItems>
                        </Menu>
                    </ComponentExample>

                    <ComponentExample
                        title="Menu with Links"
                        description="Menu items can be links for navigation."
                        code={`<Menu>
  <MenuButton className="px-4 py-2">
    Navigate
  </MenuButton>
  <MenuItems>
    <MenuItemLink href="/">Home</MenuItemLink>
    <MenuItemLink href="/about">About</MenuItemLink>
    <MenuItemLink href="/contact">Contact</MenuItemLink>
  </MenuItems>
</Menu>`}
                    >
                        <Menu>
                            <MenuButton className="px-4 py-2">
                                Navigate
                            </MenuButton>
                            <MenuItems>
                                <MenuItemLink href="/">Home</MenuItemLink>
                                <MenuItemLink href="/about">About</MenuItemLink>
                                <MenuItemLink href="/contact">Contact</MenuItemLink>
                            </MenuItems>
                        </Menu>
                    </ComponentExample>
                </AppSection>

                {/* Selection Section */}
                <AppSection id="selection" elevated>
                    <SectionHeader
                        title="Selection"
                        description="Components for selecting from a list of options."
                    />

                    <ComponentExample
                        title="Listbox"
                        description="Accessible select dropdown with custom styling."
                        code={`const [selected, setSelected] = useState('Wade Cooper');
const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb'];

<Listbox value={selected} onChange={setSelected}>
  <ListboxButton>
    {selected}
    <Icon name="chevron-down" size="xs" />
  </ListboxButton>
  <ListboxOptions>
    {people.map((person) => (
      <ListboxOption key={person} value={person}>
        {person}
      </ListboxOption>
    ))}
  </ListboxOptions>
</Listbox>`}
                    >
                        <div className="w-64">
                            <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                                <ListboxButton>
                                    {selectedPerson}
                                    <Icon name="chevron-down" size="xs" />
                                </ListboxButton>
                                <ListboxOptions>
                                    {people.map((person) => (
                                        <ListboxOption key={person} value={person}>
                                            {person}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                        </div>
                    </ComponentExample>
                </AppSection>

                {/* Media Section */}
                <AppSection id="media">
                    <SectionHeader
                        title="Media"
                        description="Icon system and visual components."
                    />

                    <ComponentExample
                        title="Basic Icons"
                        description="Icons from the Boxicons library with various names."
                        code={`<Icon name="home" />
<Icon name="user" />
<Icon name="heart" />
<Icon name="star" />
<Icon name="rocket" />`}
                    >
                        <Icon name="home" />
                        <Icon name="user" />
                        <Icon name="heart" />
                        <Icon name="star" />
                        <Icon name="rocket" />
                    </ComponentExample>

                    <ComponentExample
                        title="Icon Sizes"
                        description="Icons support four sizes: xs, sm, md, lg."
                        code={`<Icon name="cloud" size="xs" />
<Icon name="cloud" size="sm" />
<Icon name="cloud" size="md" />
<Icon name="cloud" size="lg" />`}
                    >
                        <Icon name="cloud" size="xs" />
                        <Icon name="cloud" size="sm" />
                        <Icon name="cloud" size="md" />
                        <Icon name="cloud" size="lg" />
                    </ComponentExample>

                    <ComponentExample
                        title="Icon Types"
                        description="Toggle between regular and solid icon styles."
                        code={`<Icon name="heart" type="regular" />
<Icon name="heart" type="solid" />`}
                    >
                        <Icon name="heart" type="regular" size="lg" />
                        <Icon name="heart" type="solid" size="lg" />
                    </ComponentExample>

                    <ComponentExample
                        title="Icon with Emoji"
                        description="Use the emoji prop to display emoji instead of icons."
                        code={`<Icon emoji="🚀" size="lg" />
<Icon emoji="💡" size="lg" />
<Icon emoji="🎉" size="lg" />`}
                    >
                        <Icon emoji="🚀" size="lg" />
                        <Icon emoji="💡" size="lg" />
                        <Icon emoji="🎉" size="lg" />
                    </ComponentExample>
                </AppSection>

                {/* Code & Theme Section */}
                <AppSection id="code" elevated>
                    <SectionHeader
                        title="Code & Theme"
                        description="Components for displaying code and theme customization."
                    />

                    <ComponentExample
                        title="Code Block"
                        description="Display syntax-highlighted code with copy functionality."
                        code={`<CodeBlockClient
  codeString={\`const greeting = "Hello, World!";
console.log(greeting);\`}
  language="typescript"
/>`}
                    >
                        <div className="w-full">
                            <CodeBlockClient
                                codeString={`const greeting = "Hello, World!";
console.log(greeting);`}
                                language="typescript"
                            />
                        </div>
                    </ComponentExample>

                    <ComponentExample
                        title="Code Block Without Header"
                        description="Code block with header hidden for inline code snippets."
                        code={`<CodeBlockClient
  codeString="npm install @kolosys-sites/theme"
  language="bash"
  showHeader={false}
/>`}
                    >
                        <div className="w-full">
                            <CodeBlockClient
                                codeString="npm install @kolosys-sites/theme"
                                language="bash"
                                showHeader={false}
                            />
                        </div>
                    </ComponentExample>
                </AppSection>

                <AppSection id="loading" elevated className="mb-12">
                    <SectionHeader
                        title="Loading States"
                        description="Loading states for components."
                    />

                    <ComponentExample title="Skeleton Bar">
                        <SkeletonBar className="" elevated />
                    </ComponentExample>

                    <ComponentExample title="Skeleton Group" depressed>
                        <SkeletonGroup type="row">
                            <SkeletonCircle />
                            <SkeletonGroup>
                                <SkeletonBar className="w-5/6" />
                                <SkeletonBar className="w-3/4" />
                                <SkeletonBar className="w-4/5" />
                            </SkeletonGroup>
                        </SkeletonGroup>
                    </ComponentExample>
                </AppSection>
            </AppContent>
        </>
    )
}
