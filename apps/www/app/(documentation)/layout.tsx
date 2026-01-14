import { AppFrame, AppContent } from "@kolosys-sites/theme";
import { PropsWithChildren, ReactNode } from "react";

interface DocumentationLayoutProps {
    header: ReactNode;
    sidebar: ReactNode;
}

export default function DocumentationLayout({
    children,
    header,
    sidebar
}: PropsWithChildren<DocumentationLayoutProps>) {
    return (
        <AppFrame>
            {header}
            <div className="flex flex-1">
                {sidebar}
                <AppContent>
                    {children}
                </AppContent>
            </div>
        </AppFrame>
    );
}
