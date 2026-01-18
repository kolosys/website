import { HeroSection } from '@/components/homepage/HeroSection';
import { StatsSection } from '@/components/homepage/StatsSection';
import { WhyKolosysSection } from '@/components/homepage/WhyKolosysSection';
import { LibrariesSection } from '@/components/LibrariesSection';
import { SocialProofSection } from '@/components/homepage/SocialProofSection';
import { CommunitySection } from '@/components/CommunitySection';

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <WhyKolosysSection />
      <LibrariesSection />
      <SocialProofSection />
      <CommunitySection />
    </>
  );
}

