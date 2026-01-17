import navigation from "@/config/navigation";
import { AppFrame, AppHeader, AppNav, PageContainer } from "@kolosys-sites/theme";
import { PropsWithChildren } from "react";

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
                <AppNav {...navigation.props} />
            </AppHeader>
            <PageContainer>
                {children}
            </PageContainer>
        </AppFrame>
    );
}
