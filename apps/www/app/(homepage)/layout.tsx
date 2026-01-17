import navigation from "@/config/navigation";
import { AppFrame, AppContent, AppHeader, AppNav, PageContainer } from "@kolosys-sites/theme";
import { PropsWithChildren } from "react";

export default function HomeLayout({
    children
}: PropsWithChildren) {
    return (
        <AppFrame>
            <AppHeader autoBreadcrumbs={false}>
                <AppNav {...navigation.props} />
            </AppHeader>
            <PageContainer>
                <AppContent>
                    {children}
                </AppContent>
            </PageContainer>
        </AppFrame>
    );
}
