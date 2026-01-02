import { redirect } from 'next/navigation';

function isVersionSegment(segment: string): boolean {
  return segment === 'latest' || segment === 'next' || /^v?\d+/.test(segment);
}

export default async function LegacyDocPage({
  params,
}: {
  params: Promise<{ repo: string; slug: string[] }>;
}) {
  const { repo, slug } = await params;

  // Check if first segment looks like a version - if so, it's already versioned
  if (slug.length > 0 && isVersionSegment(slug[0])) {
    // This shouldn't happen as [version] route should match, but handle gracefully
    const version = slug[0];
    const restSlug = slug.slice(1);
    if (restSlug.length > 0) {
      redirect(`/${repo}/${version}/${restSlug.join('/')}`);
    } else {
      redirect(`/${repo}/${version}`);
    }
  }

  // Redirect unversioned URLs to latest version
  redirect(`/${repo}/latest/${slug.join('/')}`);
}
