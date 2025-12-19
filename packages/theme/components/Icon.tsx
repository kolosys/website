"use client";
import icon_dictionary from "../icons/dictionary.json";
import { cn } from "../tools";
import { HTMLAttributes, useState } from "react";

type IconDictionary = typeof icon_dictionary;
type IconName = keyof IconDictionary;
type IconPack = "basic" | "basic-rounded" | "basic-sharp" | "duo" | "duo-rounded" | "duo-sharp" | "duosolid" | "duosolid-rounded" | "duosolid-sharp" | "brands";
type IconType = "regular" | "solid"
type IconWeight = "thin" | "normal" | "bold";
type IconSize = "xs" | "sm" | "md" | "lg";
type IconAnimation =
    | "spin"
    | "tada"
    | "flashing"
    | "burst"
    | "fade-left"
    | "fade-right"
    | "fade-up"
    | "fade-down"
    | "breathe"
    | "beat"
    | "wiggle"
    | "bounce"
type IconPull = "left" | "right";


type IconProps = HTMLAttributes<HTMLElement> & {
    name?: IconName;
    emoji?: string;
    type?: IconType;
    pack?: IconPack;
    weight?: IconWeight;
    size?: IconSize;
}

const prefixMap: Record<IconPack, string> = {
    "basic": "bx",
    "basic-rounded": "bxr",
    "basic-sharp": "bxs",
    "duo": "bxd",
    "duo-rounded": "bxrd",
    "duo-sharp": "bxsd",
    "duosolid": "bxds",
    "duosolid-rounded": "bxrds",
    "duosolid-sharp": "bxsds",
    "brands": "bxl",
}

const familyMap: Record<IconPack, string> = {
    "basic": "boxicons",
    "basic-rounded": "boxicons-rounded",
    "basic-sharp": "boxicons-sharp",
    "duo": "boxicons-duotone",
    "duo-rounded": "boxicons-rounded-duotone",
    "duo-sharp": "boxicons-sharp-duotone",
    "duosolid": "boxicons-duotone-solid",
    "duosolid-rounded": "boxicons-rounded-duotone-solid",
    "duosolid-sharp": "boxicons-sharp-duotone-solid",
    "brands": "boxicons-brands",
}

const weightMap: Record<string, string> = {
    "thin": "font-extralight!",
    "normal": "font-normal!",
    "bold": "font-semibold!",
}

export function Icon({ name = "box", emoji = null, type = "regular", pack = "basic-rounded", weight = "normal", size = "md", className, ...props }: IconProps) {
    const icon = icon_dictionary[name]
    if (!icon) {
        return null;
    }

    if (emoji) {
        return <span className={cn(`text-${size}`, className)}>{emoji}</span>
    }

    const packPrefix = prefixMap[pack]
    const iconNamePrefix = type === "solid" ? "bxs" : "bx"
    const sizeClazz = `bx-${size}`
    const weightClazz = weightMap[weight]

    return (
        <i
            className={cn(packPrefix, `${iconNamePrefix}-${name}`, sizeClazz, weightClazz, className)}
            {...props}
        />
    )
}

export function IconDictionary() {
    const [pack, setPack] = useState("basic")
    const [type, setType] = useState("regular")
    const [weight, setWeight] = useState("normal")
    const [size, setSize] = useState("md")
    return (<div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
            <select value={pack} onChange={(e) => setPack(e.target.value as IconPack)}>
                <option value="basic">Basic</option>
                <option value="basic-rounded">Basic Rounded</option>
                <option value="basic-sharp">Basic Sharp</option>
                <option value="duo">Duo</option>
                <option value="duo-rounded">Duo Rounded</option>
                <option value="duo-sharp">Duo Sharp</option>
                <option value="duosolid">Duosolid</option>
                <option value="duosolid-rounded">Duosolid Rounded</option>
                <option value="duosolid-sharp">Duosolid Sharp</option>
                <option value="brands">Brands</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value as IconType)}>
                <option value="regular">Regular</option>
                <option value="solid">Solid</option>
            </select>
            <select value={weight} onChange={(e) => setWeight(e.target.value as IconWeight)}>
                <option value="thin">Thin</option>
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
            </select>
            <select value={size} onChange={(e) => setSize(e.target.value as IconSize)}>
                <option value="xs">XS</option>
                <option value="sm">SM</option>
                <option value="md">MD</option>
                <option value="lg">LG</option>
            </select>
        </div>
        <div className="flex flex-wrap gap-2">{Object.keys(icon_dictionary).filter((name) => icon_dictionary[name as IconName].packs.includes(pack.split('-')[0])).map((name) => {
            return <Icon key={name} pack={pack as IconPack} type={type as IconType} weight={weight as IconWeight} size={size as IconSize} name={name as IconName} />
        })}</div>
    </div>)
}