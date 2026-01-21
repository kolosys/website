import { getLibraries, getLibraryNavigation } from '@/actions/libraries';
import { notFound, redirect } from 'next/navigation';
import { transformNavigationToNavItems } from '@/lib/nav-utils';

type PageProps = {
    params: Promise<{
        repo: string;
        version: string;
    }>;
}

export default async function DocsVersionPage({ params }: PageProps) {
    const { repo, version } = await params;

    const libraries = await getLibraries();
    const library = libraries.find(lib =>
        lib.id === repo ||
        lib.name.toLowerCase() === repo.toLowerCase()
    );

    if (!library) {
        notFound();
    }

    const navData = await getLibraryNavigation(library.id, version);

    if (!navData || navData.length === 0) {
        notFound();
    }

    const navigation = transformNavigationToNavItems(navData, `/docs/${repo}/${version}`);

    // Redirect to the first page in navigation
    if (navigation.length > 0) {
        const firstItem = navigation[0];

        // If the first item has children and no index, go to first child
        if (firstItem.children && firstItem.children.length > 0 && !firstItem.hasIndex) {
            redirect(firstItem.children[0].path);
        } else {
            redirect(firstItem.path);
        }
    }

    // If no navigation, go to overview
    redirect(`/docs/${repo}/${version}/overview`);
}