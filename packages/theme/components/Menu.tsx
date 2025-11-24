import { forwardRef } from "react";
import {
    Menu as HeadlessMenu, type MenuProps as HeadlessMenuProps,
    MenuButton as HeadlessMenuButton, type MenuButtonProps as HeadlessMenuButtonProps,
    MenuItem as HeadlessMenuItem, type MenuItemProps as HeadlessMenuItemProps,
    MenuItems as HeadlessMenuItems, type MenuItemsProps as HeadlessMenuItemsProps,
    MenuSeparator as HeadlessMenuSeparator, type MenuSeparatorProps as HeadlessMenuSeparatorProps,
    MenuSection as HeadlessMenuSection, type MenuSectionProps as HeadlessMenuSectionProps
} from "@headlessui/react";
import { cn } from "../tools";

export type MenuProps = HeadlessMenuProps<"div">;
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "relative"
        return <HeadlessMenu as="div" className={cn(baseStyles, className)} ref={ref} {...props} />;
    });

export type MenuButtonProps = HeadlessMenuButtonProps;
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "text-gray-600 hover:bg-gray-100 rounded-lg transition-colors outline-none"
        return <HeadlessMenuButton ref={ref} className={cn(baseStyles, className)} {...props} />;
    });

export type MenuItemsProps = HeadlessMenuItemsProps;
export const MenuItems = forwardRef<HTMLDivElement, MenuItemsProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-120"
        return <HeadlessMenuItems ref={ref} className={cn(baseStyles, className)} {...props} />;
    });

export type MenuItemButtonProps = HeadlessMenuItemProps<"button">;
export const MenuItemButton = forwardRef<HTMLButtonElement, MenuItemButtonProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
        return <HeadlessMenuItem as="button" ref={ref} className={cn(baseStyles, className)} {...props} />;
    });

export type MenuItemLinkProps = HeadlessMenuItemProps<"a">;
export const MenuItemLink = forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
        return <HeadlessMenuItem as="a" ref={ref} className={cn(baseStyles, className)} {...props} />;
    });

export type MenuSeparatorProps = HeadlessMenuSeparatorProps;
export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "h-px my-1 bg-gray-200"
        return <HeadlessMenuSeparator ref={ref} className={cn(baseStyles, className)} {...props} />;
    });

export type MenuSectionProps = HeadlessMenuSectionProps;
export const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "py-1"
        return <HeadlessMenuSection ref={ref} className={cn(baseStyles, className)} {...props} />;
    });