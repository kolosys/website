import { Button, Icon } from "@kolosys-sites/theme";
import { getOrganizationStats } from "@/actions/stats";

export async function HeroSection() {
  const stats = await getOrganizationStats();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 uppercase">
            Kolosys
          </h1>
          <p className="text-2xl sm:text-3xl text-neutral-600 mb-4 font-medium max-w-4xl mx-auto">
            Enterprise-Grade Go Libraries for High-Performance Applications
          </p>
          <p className="text-base sm:text-lg mb-8 max-w-3xl mx-auto">
            Production-ready primitives built for zero-allocation performance,
            context-aware concurrency, and excellent developer experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              variant="primary"
              size="xl"
              href="/docs"
            >
              Explore Libraries
              <Icon name="arrow-right" pack="basic" size="sm" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" pack="brands" size="sm" />
              View on GitHub
            </Button>
          </div>

          {stats.totalStars > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
              <Icon name="star" pack="basic-sharp" size="sm" className="text-yellow-500" />
              <span className="font-medium">{stats.totalStars.toLocaleString()}</span>
              <span>stars across {stats.totalLibraries} libraries</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
