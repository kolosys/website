import { notFound, redirect } from 'next/navigation';

type Params = {
  params: Promise<{ pkg: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const GITHUB_ORG_URL = 'https://github.com/kolosys';

// Define your Go packages here
const GO_PACKAGES: Record<string, { repo: string; docs?: string }> = {
  // Add more packages as needed
  // example: {
  //   repo: 'https://github.com/kolosys/example',
  //   docs: '/docs/example',
  // },
};

export async function generateStaticParams() {
  return Object.keys(GO_PACKAGES).map((pkg) => ({
    pkg,
  }));
}

export default async function GoVanityImport({ params, searchParams }: Params) {
  const { pkg } = await params;
  const search = await searchParams;

  // const packageInfo = GO_PACKAGES[pkg];

  // if (!packageInfo) {
  //   notFound();
  // }

  const isGoGet = search['go-get'] === '1';

  if (!isGoGet) {
    // Redirect to home page
    redirect('/');
  }

  // For go-get=1 requests, return HTML with meta tags
  const domain = 'www.kolosys.com';
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

