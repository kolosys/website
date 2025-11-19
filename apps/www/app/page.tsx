import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { LibrariesSection } from '@/components/LibrariesSection';
import { CommunitySection } from '@/components/CommunitySection';
import { Footer } from '@/components/Footer';
import { getAllLibraries } from '@/actions/libraries';

export default async function Home() {
  const libraries = await getAllLibraries();
  console.log(libraries);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kolosys',
    url: 'https://www.kolosys.com',
    logo: 'https://www.kolosys.com/icon.png',
    description: 'Building enterprise-grade Go libraries for high-performance applications',
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
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <StatsBar />
          <LibrariesSection />
          <CommunitySection />
        </main>
        <Footer />
      </div>
    </>
  );
}

