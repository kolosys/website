import { AppHeader, AppNav } from "@kolosys-sites/theme";
import { primaryNavigation } from "@/config/navigation";

export default function DefaultHeader() {
    return (
        <AppHeader
            siteName="Documentation"
            breadcrumbConfig={{
                customLabels: {
                    'docs': 'Docs',
                    'latest': 'Latest',
                    'next': 'Next'
                }
            }}
        >
            <AppNav items={primaryNavigation} />
        </AppHeader>
    );
}