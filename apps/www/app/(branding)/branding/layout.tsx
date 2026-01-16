import { AppFrame, AppHeader, AppNav, NavThemeTogglePlugin, PageContainer } from "@kolosys-sites/theme";

const navItems = [
    {
        label: "Return Home",
        href: "/",
        description: "Return to homepage"
    },
    {
        label: "Typography",
        href: "/branding/typography",
        description: "Explore the typography"
    },
    {
        label: "Colors",
        href: "/branding/colors",
        description: "Explore the colors"
    },
    {
        label: "Icons",
        href: "/branding/icons",
        description: "Explore the spacing"
    },
    {
        label: "Components",
        href: "/branding/components",
        description: "Explore the components"
    }
];

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppFrame>
            <AppHeader siteName="Branding">
                <AppNav items={navItems} plugins={[NavThemeTogglePlugin]} />
            </AppHeader>
            <PageContainer>
                {children}
            </PageContainer>
        </AppFrame>
    )
}