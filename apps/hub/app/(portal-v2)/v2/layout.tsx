import { PropsWithChildren } from "react";
import { ModalContainer, ModalProvider, } from "@kolosys-sites/theme/modal";
import { AppContent, AppFrame, AppHeader, AppNav, AppSection, AppSidebar, AutoBreadcrumbs, PageContainer } from "@kolosys-sites/theme";
import navigation from "@/config/navigation";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    return (
        <AppFrame>
            <ModalProvider>
                <AppHeader breadcrumbConfig={{ excludeSegments: ['v2'] }} persistent>
                    <AppNav />
                </AppHeader>
                <PageContainer>
                    {/* <AppSidebar >
                        <div className="flex flex-col h-full gap-2 p-2">
                            <AppNav items={navigation.primary} vertical />
                        </div>
                    </AppSidebar> */}
                    <AppContent>
                        <AppSection className="pt-3 pb-0 sm:hidden">
                            <AutoBreadcrumbs config={{ excludeSegments: ['v2'] }} />
                        </AppSection>
                        {children}
                    </AppContent>
                </PageContainer>
                <ModalContainer />
            </ModalProvider>
        </AppFrame >
    );
}
