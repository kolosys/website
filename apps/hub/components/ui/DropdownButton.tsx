"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type DropdownButtonProps = {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    className?: string;
};

export default function DropdownButton({
    value,
    onChange,
    options,
    className,
}: DropdownButtonProps) {
    const [selectedOption, setSelectedOption] = useState<string>(value);
    const handleChange = useCallback((option: string) => {
        setSelectedOption(option);
        onChange(option);
    }, [selectedOption, onChange]);
    return (
        <Listbox value={selectedOption} onChange={handleChange}>
            <div className={cn("relative w-56", className)}>
                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-2.5 pl-4 pr-10 text-left border border-gray-300 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors">
                    <span className="block truncate text-gray-900">{selectedOption}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 text-gray-500" aria-hidden="true" />
                    </span>
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border border-gray-200 focus:outline-none">
                    {options.map((option: string) => (
                        <ListboxOption
                            key={option}
                            value={option}
                            className="group relative cursor-pointer select-none py-2.5 pl-4 pr-10 text-gray-900 hover:bg-gray-50 data-focus:bg-gray-50 transition-colors"
                        >
                            <span className="block truncate">
                                {option}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="h-4 w-4 invisible group-data-selected:visible"
                                    aria-hidden="true"
                                />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}