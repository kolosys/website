import { forwardRef } from "react";
import {
  Input as HeadlessInput, InputProps as HeadlessInputProps,
  Label as HeadlessLabel, LabelProps as HeadlessLabelProps,
  Field as HeadlessField, FieldProps as HeadlessFieldProps,
  Fieldset as HeadlessFieldset, FieldsetProps as HeadlessFieldsetProps,
  Legend as HeadlessLegend, LegendProps as HeadlessLegendProps,
  Description as HeadlessDescription, DescriptionProps as HeadlessDescriptionProps,
} from "@headlessui/react"
import { cn } from "../tools";

export type FieldsetProps = HeadlessFieldsetProps;
export const Fieldset = forwardRef<HTMLDivElement, FieldsetProps>(
  ({ className = "", children, ...props }, _) => {
    const baseStyles = "space-y-4"
    return <HeadlessFieldset className={cn(baseStyles, className)} {...props} >
      {children}
    </HeadlessFieldset>;
  }
);

export type LegendProps = HeadlessLegendProps;
export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  ({ className = "", ...props }, _) => {
    const baseStyles = "text-lg font-semibold text-foreground"
    return <HeadlessLegend className={cn(baseStyles, className)} {...props} />;
  }
);

export type DescriptionProps = HeadlessDescriptionProps;
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles = "text-xs text-caption"
    return <HeadlessDescription ref={ref} className={cn(baseStyles, className)} {...props} />;
  }
);

export type FieldProps = HeadlessFieldProps;
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className = "", children, ...props }, _) => {
    const baseStyles = "space-y-2"
    return <HeadlessField className={cn(baseStyles, className)} {...props} >
      {children}
    </HeadlessField>;
  }
);

export type LabelProps = HeadlessLabelProps;
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles = "block text-sm font-semibold text-foreground"
    return <HeadlessLabel ref={ref} className={cn(baseStyles, className)} {...props} />;
  }
);

export type InputProps = HeadlessInputProps;
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles = "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium transition-colors outline-hidden";
    const colorStyles = "text-foreground bg-surface hover:bg-subtle placeholder:text-caption";
    const borderStyles = "border border-border rounded-lg";
    const focusStyles = "data-focus:ring-2 data-focus:ring-focus-ring data-focus:border-primary-emphasis";
    return (
      <HeadlessInput ref={ref} className={cn(baseStyles, colorStyles, borderStyles, focusStyles, className)} {...props} autoComplete="off" />
    );
  }
);

Fieldset.displayName = "Fieldset";
Legend.displayName = "Legend";
Description.displayName = "Description";
Field.displayName = "Field";
Input.displayName = "Input";
Label.displayName = "Label";