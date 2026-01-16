import { primaryNavigation } from "@/config/navigation";
import { AppFrame, AppContent, AppSidebar, AppHeader, AppNav, PageContainer } from "@kolosys-sites/theme";
import { PropsWithChildren, ReactNode } from "react";

export default function DocumentationLayout({
    children
}: PropsWithChildren) {
    return (
        <AppFrame>
            <AppHeader
                siteName="Documentation"
                breadcrumbConfig={{
                    excludeSegments: ['docs'],
                    customLabels: {
                        'docs': 'Docs',
                        'latest': 'Latest',
                        'next': 'Next'
                    }
                }}
            >
                <AppNav items={primaryNavigation} />
            </AppHeader>
            <PageContainer>
                <AppSidebar>
                    <div className="p-4">
                        <p className="text-sm text-gray-500">Sidebar navigation placeholder</p>
                    </div>
                </AppSidebar>
                <AppContent>
                    {children}
                </AppContent>
            </PageContainer>
        </AppFrame>
    );
}
