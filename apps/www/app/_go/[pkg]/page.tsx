import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

type Params = {
  params: Promise<{ pkg: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const GITHUB_ORG_URL = 'https://github.com/kolosys';

export default async function GoVanityImport({ params, searchParams }: Params) {
  const { pkg } = await params;
  const search = await searchParams;

  const isGoGet = search['go-get'] === '1';

  if (!isGoGet) {
    // Redirect to home page
    redirect('/');
  }

  // Get the host from the request headers
  const headersList = await headers();
  const host = headersList.get('host') || 'kolosys.com';

  // Normalize host (remove port if present, handle both www and non-www)
  const domain = host.split(':')[0];

  // For go-get=1 requests, return HTML with meta tags
  const importPath = `${domain}/${pkg}`;
  const githubRepoUrl = `${GITHUB_ORG_URL}/${pkg}`;

  return (
    <html>
      <head>
        <meta
          name="go-import"
          content={`${importPath} git ${githubRepoUrl}`}
        />
        <meta
          name="go-source"
          content={`${importPath} ${githubRepoUrl} ${githubRepoUrl}/tree/main{/dir} ${githubRepoUrl}/blob/main{/dir}/{file}#L{line}`}
        />
      </head>
      <body>
        <div>
          go get {importPath}
        </div>
      </body>
    </html>
  );
}

