import { AppHeader, AppNav } from "@kolosys-sites/theme";
import { primaryNavigation } from "@/config/navigation";

export default function DefaultHeader() {
    return (
        <AppHeader autoBreadcrumbs={false}>
            <AppNav items={primaryNavigation} />
        </AppHeader>
    );
}