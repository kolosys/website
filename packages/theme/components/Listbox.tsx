import { forwardRef } from "react";
import {
    Listbox as HeadlessListbox, type ListboxProps as HeadlessListboxProps,
    ListboxButton as HeadlessListboxButton, type ListboxButtonProps as HeadlessListboxButtonProps,
    ListboxOption as HeadlessListboxOption, type ListboxOptionProps as HeadlessListboxOptionProps,
    ListboxOptions as HeadlessListboxOptions, type ListboxOptionsProps as HeadlessListboxOptionsProps,
} from "@headlessui/react";
import { cn } from "../tools";

export type ListboxProps<TValue> = HeadlessListboxProps<'div', TValue>;
export const Listbox = forwardRef(<TValue,>(
    { className = "", ...props }: ListboxProps<TValue>,
    ref: React.Ref<HTMLDivElement>
) => {
    const baseStyles = "relative";
    return <HeadlessListbox as="div" className={cn(baseStyles, className)} ref={ref} {...props} />;
}) as <TValue>(
    props: ListboxProps<TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export type ListboxButtonProps = HeadlessListboxButtonProps;
export const ListboxButton = forwardRef<HTMLButtonElement, ListboxButtonProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium transition-colors outline-hidden";
        const colorStyles = "text-foreground bg-subtle hover:bg-hover";
        const borderStyles = "border border-divider rounded-lg";
        const focusStyles = "data-focus:border-primary-emphasis";
        return <HeadlessListboxButton ref={ref} className={cn(baseStyles, colorStyles, borderStyles, focusStyles, className)} {...props} />;
    });

export type ListboxOptionsProps = HeadlessListboxOptionsProps;
export const ListboxOptions = forwardRef<HTMLDivElement, ListboxOptionsProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "z-[60] w-[var(--button-width)] overflow-y-auto bg-panel py-2 shadow-sm-lg mt-1 !max-h-80";
        const borderStyles = "border border-divider rounded-lg";
        return <HeadlessListboxOptions
            ref={ref}
            className={cn(baseStyles, borderStyles, className)}
            anchor={{
                to: "bottom start",
                gap: "4px",
            }}
            {...props}
        />;
    });

export type ListboxOptionProps<TValue> = HeadlessListboxOptionProps<'div', TValue>;
export const ListboxOption = forwardRef(<TValue,>(
    { className = "", ...props }: ListboxOptionProps<TValue>,
    ref: React.Ref<HTMLDivElement>
) => {
    const baseStyles = "relative cursor-pointer select-none py-2 px-4 text-sm text-body transition-colors";
    const hoverStyles = "data-hover:bg-hover data-hover:text-foreground";
    const focusStyles = "data-focus:bg-hover data-focus:text-foreground";
    const selectedStyles = "data-selected:bg-primary-base data-selected:text-primary-emphasis";
    return <HeadlessListboxOption ref={ref} className={cn(baseStyles, hoverStyles, focusStyles, selectedStyles, className)} {...props} />;
}) as <TValue>(
    props: ListboxOptionProps<TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
