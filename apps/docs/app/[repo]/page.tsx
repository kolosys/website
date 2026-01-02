import { redirect } from 'next/navigation';

export default async function RepoPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  redirect(`/${repo}/latest`);
}

