import icon_dictionary from "../icons/dictionary.json";
import { cn } from "../tools";
import { HTMLAttributes } from "react";

type IconDictionary = typeof icon_dictionary;
export type IconName = keyof IconDictionary;
export type IconPack = "basic" | "basic-rounded" | "basic-sharp" | "duo" | "duo-rounded" | "duo-sharp" | "duosolid" | "duosolid-rounded" | "duosolid-sharp" | "brands";
export type IconType = "regular" | "solid"
export type IconWeight = "thin" | "normal" | "bold";
export type IconSize = "xs" | "sm" | "md" | "lg" | "inherit";
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
    const sizeClazz = size !== "inherit" ? `bx-${size}` : ""
    const weightClazz = weightMap[weight]

    return (
        <i
            className={cn(packPrefix, `${iconNamePrefix}-${name}`, sizeClazz, weightClazz, className)}
            {...props}
        />
    )
}
