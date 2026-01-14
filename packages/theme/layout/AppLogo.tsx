import Link from "next/link";
import { cn } from "../tools";

type Props = {
    href?: string;
    className?: string;
    siteName?: string;
}

export function AppLogo({ href = "/", className = "", siteName }: Props) {
    return (
        <Link href={href} className={cn("flex items-center gap-2", className)}>
            <div className="w-9 h-9 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-page font-bold text-xl">K</span>
            </div>
            <div className="-mt-0.5">
                <div className="font-bold text-foreground text-lg">Kolosys</div>
                {siteName && <div className="text-xs text-caption -mt-1.5">{siteName}</div>}
            </div>
        </Link>
    )
}