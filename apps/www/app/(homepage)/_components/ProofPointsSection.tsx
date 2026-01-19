import { AppSection } from "@kolosys-sites/theme";
import { ProofPointCard } from "./ProofPointCard";

export function ProofPointsSection() {
  return (
    <AppSection className="py-16">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
          Why Developers Choose Kolosys
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Performance */}
          <ProofPointCard
            icon="⚡"
            title="Sub-200ns Operations"
            description="Benchmark-proven performance that outpaces standard library and competitors"
            proofType="benchmark"
          />

          {/* Reliability */}
          <ProofPointCard
            icon="🛡️"
            title="Zero Critical CVEs"
            description="Minimal dependencies and rigorous security practices keep your apps safe"
            proofType="security"
          />

          {/* Developer Experience */}
          <ProofPointCard
            icon="💙"
            title="Context-Aware APIs"
            description="First-class context support means automatic cleanup and no resource leaks"
            proofType="dx"
          />
        </div>
      </div>
    </AppSection>
  );
}
