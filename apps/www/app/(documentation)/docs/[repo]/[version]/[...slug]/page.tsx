interface PageProps {
    params: Promise<{
        repo: string;
        version: string;
        slug: string[];
    }>;
}

export default async function DocsSlugPage({ params }: PageProps) {
    const { repo, version, slug } = await params;

    return (
        <div>
            <h1>Docs Slug Page</h1>
            <p>Repo: {repo}</p>
            <p>Version: {version}</p>
            <p>Slug: {slug.join('/')}</p>
        </div>
    );
}
