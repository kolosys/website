import { PropsWithChildren, Suspense } from "react";
import { getLibraries, getLibraryNavigation } from "@/actions/libraries";
import { DocsNavigation } from "../../../_components/DocsNavigation";
import { transformNavigationToNavItems } from "@/lib/nav-utils";
import { notFound } from "next/navigation";
import type { NavItem } from "@/lib/nav";
import { AppSidebar, AppContent, SkeletonBar, SkeletonGroup } from "@kolosys-sites/theme";

type LayoutProps = PropsWithChildren<{
    params: Promise<{
        repo: string;
        version: string;
    }>;
}>;

async function DocsLayoutContent({ params, children }: LayoutProps) {
    const { repo, version } = await params;
    const libraries = await getLibraries();

    const library = libraries.find(lib =>
        lib.baseSlug === repo ||
        lib.id === repo ||
        lib.name.toLowerCase() === repo.toLowerCase()
    );

    if (!library) {
        notFound();
    }

    const navData = await getLibraryNavigation(library.id, version);
    let navigation: NavItem[] = [];

    if (navData) {
        const baseUrl = `/docs/${repo}/${version}`;
        navigation = transformNavigationToNavItems(navData, baseUrl);
    }

    return (
        <>
            <AppSidebar sticky>
                <DocsNavigation
                    libraries={libraries}
                    currentRepo={repo}
                    currentVersion={version}
                    navigation={navigation}
                />
            </AppSidebar>
            <AppContent>
                {children}
            </AppContent>
        </>
    );
}

export default async function DocsVersionLayout(props: LayoutProps) {
    return (
        <Suspense fallback={
            <>
                <AppSidebar sticky>
                    <div className="p-4 space-y-4">
                        <SkeletonGroup>
                            <SkeletonBar className="w-20 h-4" />
                            <SkeletonBar className="w-full h-10" />
                        </SkeletonGroup>
                        <SkeletonGroup>
                            <SkeletonBar className="w-20 h-4" />
                            <SkeletonBar className="w-full h-10" />
                        </SkeletonGroup>
                        <div className="pt-4 border-t border-neutral-200">
                            <SkeletonGroup>
                                <SkeletonBar className="w-3/4" />
                                <SkeletonBar className="w-full" />
                                <SkeletonBar className="w-5/6" />
                                <SkeletonBar className="w-4/5" />
                            </SkeletonGroup>
                        </div>
                    </div>
                </AppSidebar>
                <AppContent>
                    <SkeletonGroup>
                        <SkeletonBar className="w-2/3 h-10" />
                        <SkeletonBar className="w-full" />
                        <SkeletonBar className="w-5/6" />
                        <SkeletonBar className="w-4/5" />
                    </SkeletonGroup>
                </AppContent>
            </>
        }>
            <DocsLayoutContent {...props} />
        </Suspense>
    );
}
