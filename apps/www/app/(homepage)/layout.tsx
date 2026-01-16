import { primaryNavigation } from "@/config/navigation";
import { AppFrame, AppContent, AppHeader, AppNav, PageContainer } from "@kolosys-sites/theme";
import { PropsWithChildren } from "react";

export default function HomeLayout({
    children
}: PropsWithChildren) {
    return (
        <AppFrame>
            <AppHeader autoBreadcrumbs={false}>
                <AppNav items={primaryNavigation} />
            </AppHeader>
            <PageContainer>
                <AppContent>
                    {children}
                </AppContent>
            </PageContainer>
        </AppFrame>
    );
}
