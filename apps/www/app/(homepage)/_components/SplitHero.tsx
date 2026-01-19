import { AppSection } from "@kolosys-sites/theme";
import { getOrganizationStats } from "@/actions/stats";
import { Badge } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { PerformanceComparison } from "./PerformanceComparison";

export async function SplitHero() {
  const stats = await getOrganizationStats();

  return (
    <AppSection className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: 60% (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-base text-primary-text rounded-full text-sm font-medium">
              <Icon emoji="🚀" size="sm" />
              <span>Production-Ready Go Libraries</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Ship Production Apps{" "}
              <span className="text-primary-emphasis">10x Faster</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl">
              Zero-allocation resource pools. Context-aware event buses.
              Sub-200ns timers. Built for the real world.
            </p>

            {/* Inline Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 py-4">
              <div className="flex items-center gap-2 text-base sm:text-lg">
                <span className="font-bold text-foreground">{stats.totalLibraries}</span>
                <span className="text-caption">Libraries</span>
              </div>
              <div className="flex items-center gap-2 text-base sm:text-lg">
                <span className="font-bold text-foreground">~{Math.round(stats.totalStars / 1000)}K</span>
                <span className="text-caption">Stars</span>
              </div>
              <div className="flex items-center gap-2 text-base sm:text-lg">
                <span className="font-bold text-foreground">0</span>
                <span className="text-caption">CVEs</span>
              </div>
              <div className="flex items-center gap-2 text-base sm:text-lg">
                <span className="font-bold text-foreground">90%+</span>
                <span className="text-caption">Coverage</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#libraries"
              >
                Browse Libraries
                <Icon name="arrow-right" pack="basic" size="sm" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="https://github.com/kolosys"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="code-alt" pack="basic" size="sm" />
                View Benchmarks
              </Button>
            </div>
          </div>

          {/* Right: 40% (2 cols) */}
          <div className="lg:col-span-2">
            <PerformanceComparison />
          </div>
        </div>
      </div>
    </AppSection>
  );
}
