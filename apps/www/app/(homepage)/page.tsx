import { AppContent } from '@kolosys-sites/theme';
import { SplitHero } from './_components/SplitHero';
import { LibrariesGrid } from './_components/LibrariesGrid';
import { ProofPointsSection } from './_components/ProofPointsSection';
import { CommunitySection } from './_components/CommunitySection';

export default async function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kolosys',
    url: 'https://www.kolosys.com',
    logo: 'https://www.kolosys.com/icon.png',
    description: 'Enterprise-grade Go libraries for high-performance applications',
    sameAs: [
      'https://github.com/kolosys',
      'https://discord.gg/ZcvJJjtNfx',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Community Support',
      url: 'https://discord.gg/ZcvJJjtNfx',
    },
  };

  return (
    <AppContent>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SplitHero />
      <LibrariesGrid />
      <ProofPointsSection />
      <CommunitySection />
    </AppContent>
  );
}

