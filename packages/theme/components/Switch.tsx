import { forwardRef } from 'react';
import { Switch as HeadlessSwitch, SwitchProps as HeadlessSwitchProps } from '@headlessui/react'
import { cn } from '../tools';

export type SwitchProps = HeadlessSwitchProps;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className = "", checked, ...props }, ref) => {
        const baseStyles = "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";
        const checkedStyles = "bg-gray-900";
        const uncheckedStyles = "bg-gray-200";
        const checkedThumbStyles = "translate-x-6";
        const uncheckedThumbStyles = "translate-x-1";

        return <HeadlessSwitch ref={ref} checked={checked} className={cn(baseStyles, checked ? checkedStyles : uncheckedStyles, className)} {...props} >
            <span className={`${checked ? checkedThumbStyles : uncheckedThumbStyles} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
        </HeadlessSwitch>;
    }
);

Switch.displayName = "Switch";
