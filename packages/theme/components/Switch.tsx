import { forwardRef } from 'react';
import { Switch as HeadlessSwitch, SwitchProps as HeadlessSwitchProps } from '@headlessui/react'
import { cn } from '../tools';

export type SwitchProps = HeadlessSwitchProps;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className = "", checked, ...props }, ref) => {
        const baseStyles = "relative inline-flex h-6 w-10 p-1 items-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2";
        const checkedStyles = "bg-neutral-900 focus:ring-neutral-900";
        const uncheckedStyles = "bg-panel border border-neutral-300 focus:border-neutral-300";

        return (
            <HeadlessSwitch
                ref={ref}
                checked={checked}
                className={cn(baseStyles, checked ? checkedStyles : uncheckedStyles, className)} {...props} >
                <span
                    className={cn(
                        "inline-block h-4 w-4 rounded-full shadow-sm-xs transition-transform duration-200 ease-in-out",
                        checked ? "bg-panel" : "bg-neutral-300",
                        checked ? "translate-x-4" : "translate-x-0",
                    )}
                />
            </HeadlessSwitch>
        );
    }
);

Switch.displayName = "Switch";
