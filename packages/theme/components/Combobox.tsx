import { forwardRef } from "react";
import {
    Combobox as HeadlessCombobox,
    ComboboxInput as HeadlessComboboxInput, type ComboboxInputProps as HeadlessComboboxInputProps,
    ComboboxButton as HeadlessComboboxButton, type ComboboxButtonProps as HeadlessComboboxButtonProps,
    ComboboxOption as HeadlessComboboxOption,
    ComboboxOptions as HeadlessComboboxOptions, type ComboboxOptionsProps as HeadlessComboboxOptionsProps,
} from "@headlessui/react";
import { cn } from "../tools";

export const Combobox = HeadlessCombobox;

export type ComboboxInputProps = HeadlessComboboxInputProps;
export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "w-full flex items-center justify-between gap-2 pl-3 pr-10 py-2 text-sm font-medium transition-colors outline-hidden";
        const colorStyles = "text-foreground bg-surface hover:bg-subtle placeholder:text-caption";
        const borderStyles = "border border-border rounded-lg";
        const focusStyles = "data-focus:ring-2 data-focus:ring-focus-ring data-focus:border-primary-emphasis";
        return <HeadlessComboboxInput ref={ref} className={cn(baseStyles, colorStyles, borderStyles, focusStyles, className)} {...props} autoComplete="off" spellCheck="false" />;
    });

export type ComboboxButtonProps = HeadlessComboboxButtonProps;
export const ComboboxButton = forwardRef<HTMLButtonElement, ComboboxButtonProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer";
        const colorStyles = "text-caption hover:text-body transition-colors";
        return <HeadlessComboboxButton ref={ref} className={cn(baseStyles, colorStyles, className)} {...props} />;
    });

export type ComboboxOptionsProps = HeadlessComboboxOptionsProps;
export const ComboboxOptions = forwardRef<HTMLDivElement, ComboboxOptionsProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "z-[60] w-[var(--input-width)] overflow-y-auto bg-panel py-1 shadow-sm-lg mt-1 !max-h-80";
        const borderStyles = "border border-divider rounded-lg";
        return <HeadlessComboboxOptions
            ref={ref}
            className={cn(baseStyles, borderStyles, className)}
            anchor={{
                to: "bottom start",
                gap: "4px",
            }}
            {...props}
        />;
    });

export type ComboboxOptionProps = typeof HeadlessComboboxOption;
export const ComboboxOption = forwardRef<HTMLDivElement, React.ComponentProps<typeof HeadlessComboboxOption>>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "relative cursor-pointer select-none py-2 px-4 text-sm text-body transition-colors";
        const hoverStyles = "data-hover:bg-hover data-hover:text-foreground";
        const focusStyles = "data-focus:bg-hover data-focus:text-foreground";
        const selectedStyles = "data-selected:bg-primary-base data-selected:text-primary-emphasis";
        return <HeadlessComboboxOption ref={ref} className={cn(baseStyles, hoverStyles, focusStyles, selectedStyles, className)} {...props} />;
    });

ComboboxInput.displayName = "ComboboxInput";
ComboboxButton.displayName = "ComboboxButton";
ComboboxOptions.displayName = "ComboboxOptions";
ComboboxOption.displayName = "ComboboxOption";
