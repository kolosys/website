import { AppNavProps, NavIconItem, NavItem, NavPlugin, NavThemeTogglePlugin } from "@kolosys-sites/theme";

export const primary: NavItem[] = [
    {
        label: "Home",
        href: "/",
        description: "Return to homepage"
    },
    {
        label: "Libraries",
        href: "/libraries",
        description: "Explore libraries"
    },
    {
        label: "Docs",
        href: "/docs",
        description: "Browse documentation"
    }
];

export const social: NavIconItem[] = [
    {
        icon: ["brands", "github", "sm"],
        href: "https://github.com/kolosys",
        external: true
    },
    {
        icon: ["brands", "discord-alt", "sm"],
        href: "/join-discord",
        external: true
    }
];

export const plugins: NavPlugin[] = [
    NavThemeTogglePlugin
];

const props: AppNavProps = {
    items: primary,
    icons: social,
    plugins: plugins
}

export default {
    primary,
    social,
    plugins,
    props
}