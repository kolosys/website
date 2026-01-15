"use client";

import icon_dictionary from "../icons/dictionary.json";
import { useState } from "react";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "./Listbox";
import { AppSection } from "../layout";
import { Input } from "./Fieldset";
import { Icon, IconName, IconPack, IconType, IconWeight, IconSize } from "./Icon";

const packOptions: { value: IconPack; label: string }[] = [
    { value: "basic", label: "Basic" },
    { value: "basic-rounded", label: "Basic Rounded" },
    { value: "basic-sharp", label: "Basic Sharp" },
    { value: "duo", label: "Duo" },
    { value: "duo-rounded", label: "Duo Rounded" },
    { value: "duo-sharp", label: "Duo Sharp" },
    { value: "duosolid", label: "Duosolid" },
    { value: "duosolid-rounded", label: "Duosolid Rounded" },
    { value: "duosolid-sharp", label: "Duosolid Sharp" },
    { value: "brands", label: "Brands" },
];

const typeOptions: { value: IconType; label: string }[] = [
    { value: "regular", label: "Regular" },
    { value: "solid", label: "Solid" },
];

const weightOptions: { value: IconWeight; label: string }[] = [
    { value: "thin", label: "Thin" },
    { value: "normal", label: "Normal" },
    { value: "bold", label: "Bold" },
];

const sizeOptions: { value: IconSize; label: string }[] = [
    { value: "xs", label: "XS" },
    { value: "sm", label: "SM" },
    { value: "md", label: "MD" },
    { value: "lg", label: "LG" },
];

export function IconDictionary() {
    const [pack, setPack] = useState<IconPack>("basic")
    const [type, setType] = useState<IconType>("regular")
    const [weight, setWeight] = useState<IconWeight>("normal")
    const [size, setSize] = useState<IconSize>("md")
    const [search, setSearch] = useState<string>("")

    const packLabel = packOptions.find(o => o.value === pack)?.label || pack;
    const typeLabel = typeOptions.find(o => o.value === type)?.label || type;
    const weightLabel = weightOptions.find(o => o.value === weight)?.label || weight;
    const sizeLabel = sizeOptions.find(o => o.value === size)?.label || size;

    const icons = Object.keys(icon_dictionary)
        .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
        .filter((name) => icon_dictionary[name as IconName].packs.includes(pack.split('-')[0]))
        .map((name) => {
            return (<div key={name} className="bg-panel rounded-lg p-2 flex flex-col items-center justify-center">
                <Icon pack={pack as IconPack} type={type as IconType} weight={weight as IconWeight} size={size as IconSize} name={name as IconName} />
                <span className="text-caption">{name}</span>
            </div>)
        })


    return (<AppSection id="icon-dictionary" className="p-0">
        <div className="flex flex-row gap-2 my-4">
            <Listbox value={pack} onChange={setPack} className="w-39">
                <ListboxButton>
                    <span className="block truncate">{packLabel}</span>
                    <Icon name="chevron-down" pack="basic" size="xs" className="text-caption" aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions>
                    {packOptions.map((option) => (
                        <ListboxOption key={option.value} value={option.value}>
                            {option.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <Listbox value={type} onChange={setType} className="w-32">
                <ListboxButton>
                    <span className="block truncate">{typeLabel}</span>
                    <Icon name="chevron-down" pack="basic" size="xs" className="text-caption" aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions>
                    {typeOptions.map((option) => (
                        <ListboxOption key={option.value} value={option.value}>
                            {option.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <Listbox value={weight} onChange={setWeight} className="w-32">
                <ListboxButton>
                    <span className="block truncate">{weightLabel}</span>
                    <Icon name="chevron-down" pack="basic" size="xs" className="text-caption" aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions>
                    {weightOptions.map((option) => (
                        <ListboxOption key={option.value} value={option.value}>
                            {option.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <Listbox value={size} onChange={setSize} className="w-24">
                <ListboxButton>
                    <span className="block truncate">{sizeLabel}</span>
                    <Icon name="chevron-down" pack="basic" size="xs" className="text-caption" aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions>
                    {sizeOptions.map((option) => (
                        <ListboxOption key={option.value} value={option.value}>
                            {option.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="w-48" placeholder="Search icons" />
        </div>
        <div className="flex flex-wrap gap-2">{icons}</div>
    </AppSection>)
}