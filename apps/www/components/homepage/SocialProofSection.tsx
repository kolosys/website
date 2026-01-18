import { getOrganizationStats } from "@/actions/stats";
import { Button, Icon } from "@kolosys-sites/theme";

export async function SocialProofSection() {
  const stats = await getOrganizationStats();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-surface border border-primary-base mb-6">
            <Icon name="github" pack="brands" size="sm" className="text-primary-emphasis" />
            <span className="text-sm font-medium text-primary-emphasis">
              Open Source
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by Developers
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Join the growing community of developers building high-performance Go applications with Kolosys.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {stats.totalStars.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-500 font-medium flex items-center gap-1">
                <Icon name="star" pack="basic-sharp" size="sm" className="text-yellow-500" />
                GitHub Stars
              </div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-border" />

            <div className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {stats.totalLibraries}
              </div>
              <div className="text-sm text-neutral-500 font-medium flex items-center gap-1">
                <Icon name="package" pack="basic-sharp" size="sm" className="text-primary-emphasis" />
                Production Libraries
              </div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-border" />

            <div className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                0
              </div>
              <div className="text-sm text-neutral-500 font-medium flex items-center gap-1">
                <Icon name="shield-alt" pack="basic-sharp" size="sm" className="text-green-500" />
                Critical CVEs
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" pack="brands" size="sm" />
              Star on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="https://discord.gg/ZcvJJjtNfx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message-bubble-dots" pack="basic" size="sm" />
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
