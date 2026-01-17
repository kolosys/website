'use client';

import { usePathname } from "next/navigation";
import { cn } from "../tools";
import { Button, Icon, IconName } from "../components";
import { Menu, MenuButton, MenuItems, MenuItemLink } from "../components/Menu";
import { Fragment } from "react";
import { IconPack, IconSize } from "../components/Icon";

export type NavItem = {
    key?: string;
    label?: string;
    href?: string;
    description?: string;
    external?: boolean;
}

// Good to use for things like social media links or a search icon
export type NavIconItem = {
    key?: string;
    href?: string;
    external?: boolean;
    icon?: [IconPack, IconName, IconSize?];
}

// Good to use for things like a theme toggle or a search bar
export type NavPlugin = {
    name: string
    component: React.ReactNode;
}

export type AppNavProps = {
    items?: NavItem[];
    icons?: NavIconItem[];
    plugins?: NavPlugin[];
    className?: string;
}

export function AppNav({ items = [], icons = [], plugins = [], className }: AppNavProps) {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-end gap-2">
            {/* Inline navigation - Desktop only */}
            {items.length > 0 && (
                <nav key="items" className={cn("hidden md:flex items-center justify-end gap-2", className)}>
                    {items.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Button
                                key={item.key || item.href}
                                href={item.href}
                                variant="ghost"
                                size="sm"
                                isActive={isActive}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </nav>
            )}

            {/* Dropdown navigation - Mobile only */}
            {items.length > 0 && (
                <Menu>
                    {(() => {
                        const activeItem = items.find(item => pathname === item.href || pathname.startsWith(`${item.href}/`));
                        const buttonText = activeItem?.label || "Menu";

                        return (
                            <>
                                <MenuButton className={cn("md:hidden inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-body hover:bg-hover rounded-md transition-colors", className)}>
                                    {buttonText}
                                    <Icon name="chevron-down" size="xs" />
                                </MenuButton>
                                <MenuItems className="w-48">
                                    {items.map((item) => {
                                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                                        return (
                                            <MenuItemLink
                                                key={item.href}
                                                href={item.href}
                                                target={item.external ? "_blank" : undefined}
                                                rel={item.external ? "noopener noreferrer" : undefined}
                                                className={isActive ? "bg-primary-100 text-primary-700 font-semibold" : ""}
                                            >
                                                {item.label}
                                            </MenuItemLink>
                                        );
                                    })}
                                </MenuItems>
                            </>
                        );
                    })()}
                </Menu>
            )}

            {/* Icon-only items - Always visible */}
            {icons.length > 0 && (
                <nav key="icons" className={cn("flex items-center justify-end gap-2", className)}>
                    {icons.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Button
                                key={item.href}
                                href={item.href}
                                variant="ghost"
                                size="xs"
                                isActive={isActive}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                            >
                                {item.icon && <Icon pack={item.icon[0]} name={item.icon[1]} size={item.icon[2] || "md"} />}
                            </Button>
                        );
                    })}
                </nav>
            )}

            {plugins.length > 0 && (
                <nav key="plugins" className={cn("flex items-center justify-end gap-2", className)}>
                    {plugins.map((plugin) => (
                        <Fragment key={plugin.name}>
                            {plugin.component}
                        </Fragment>
                    ))}
                </nav>
            )}
        </div>
    );
}
