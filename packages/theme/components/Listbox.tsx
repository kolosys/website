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
        const colorStyles = "text-neutral-900 bg-neutral-50 hover:bg-neutral-100";
        const borderStyles = "border border-strong rounded-lg";
        const focusStyles = "data-focus:border-primary-500";
        return <HeadlessListboxButton ref={ref} className={cn(baseStyles, colorStyles, borderStyles, focusStyles, className)} {...props} />;
    });

export type ListboxOptionsProps = HeadlessListboxOptionsProps;
export const ListboxOptions = forwardRef<HTMLDivElement, ListboxOptionsProps>(
    ({ className = "", ...props }, ref) => {
        const baseStyles = "absolute z-120 mt-1 w-full max-h-60 overflow-auto bg-panel py-1 shadow-sm-lg";
        const borderStyles = "border border-strong rounded-lg";
        return <HeadlessListboxOptions ref={ref} className={cn(baseStyles, borderStyles, className)} {...props} />;
    });

export type ListboxOptionProps<TValue> = HeadlessListboxOptionProps<'div', TValue>;
export const ListboxOption = forwardRef(<TValue,>(
    { className = "", ...props }: ListboxOptionProps<TValue>,
    ref: React.Ref<HTMLDivElement>
) => {
    const baseStyles = "relative cursor-pointer select-none py-2 px-4 text-sm text-neutral-700";
    const colorStyles = "text-neutral-900 hover:bg-neutral-100";
    const focusStyles = "data-focus:bg-neutral-100 data-focus:text-neutral-900";
    const selectedStyles = "data-selected:bg-primary-50 data-selected:text-primary-700";
    return <HeadlessListboxOption ref={ref} className={cn(baseStyles, colorStyles, focusStyles, selectedStyles, className)} {...props} />;
}) as <TValue>(
    props: ListboxOptionProps<TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
