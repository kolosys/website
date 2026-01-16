import { MDXRemote } from 'next-mdx-remote-client/rsc'

type PageProps = {
    params: Promise<{
        repo: string;
        version: string;
        slug: string[];
    }>;
}

export default async function DocsSlugPage({ params }: PageProps) {
    const { repo, version, slug } = await params;

    // 1. Fetch the page from the API
    // 2. Render the page using the MDXRemote component


    return (
        <div>
            <h1>Docs Slug Page</h1>
            <p>Repo: {repo}</p>
            <p>Version: {version}</p>
            <p>Slug: {slug.join('/')}</p>
        </div>
    );
}
