import { forwardRef } from 'react';
import { Switch as HeadlessSwitch, SwitchProps as HeadlessSwitchProps } from '@headlessui/react'
import { cn } from '../tools';

export type SwitchProps = HeadlessSwitchProps;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className = "", checked, ...props }, ref) => {
        const baseStyles = "relative inline-flex h-6 w-10 p-1 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";
        const checkedStyles = "bg-gray-900";
        const uncheckedStyles = "bg-white border border-gray-300 focus:border-gray-900";

        return <HeadlessSwitch ref={ref} checked={checked} className={cn(baseStyles, checked ? checkedStyles : uncheckedStyles, className)} {...props} >
            <span
                className={cn(
                    "inline-block h-4 w-4 rounded-full shadow-sm transition-transform duration-200 ease-in-out",
                    // checked ? "bg-white" : "bg-gray-300",
                    "data-checked:translate-x-[16px]",
                    "data-unchecked:translate-x-[0px]",
                    "data-checked:bg-white",
                    "data-unchecked:bg-gray-300"
                )}
            // style={{
            //     transform: checked ? 'translateX(16px)' : 'translateX(0px)',
            // }}
            />
        </HeadlessSwitch>;
    }
);

Switch.displayName = "Switch";
