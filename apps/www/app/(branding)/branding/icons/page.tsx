import { AppContent, AppSection, IconDictionary, PageHeader } from "@kolosys-sites/theme";

export default function IconsPage() {
    return (
        <AppContent>
            <AppSection id="icons">
                <PageHeader
                    title="Icons"
                    description="Icon system with 1000+ icons from Boxicons. All icons are available in regular, rounded, sharp, and duotone variants."
                />
                <IconDictionary />
            </AppSection >
        </AppContent>
    );
}
