import { FeatureShowcase } from "./FeatureShowcase";

export function WhyKolosysSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Kolosys?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            Built for developers who demand performance, reliability, and excellent developer experience.
          </p>
        </div>

        <div className="space-y-20">
          <FeatureShowcase
            icon="tachometer"
            title="Zero-Allocation Hot Paths"
            description="Achieve sub-200ns operations with zero garbage collection pressure in critical code paths."
            details={[
              "Pool-based resource management reduces GC overhead",
              "Optimized data structures for high-throughput scenarios",
              "Benchmarked and profiled for production workloads",
            ]}
          />

          <FeatureShowcase
            icon="shield-alt"
            title="Context-Aware Primitives"
            description="Graceful shutdowns and cancellation without the complexity. Every operation respects context."
            details={[
              "Built-in support for graceful shutdown patterns",
              "Automatic cleanup and resource deallocation",
              "No goroutine leaks or zombie processes",
            ]}
            reverse
          />

          <FeatureShowcase
            icon="cube"
            title="Minimal Dependencies"
            description="Smaller binaries, fewer vulnerabilities, and easier maintenance with 0-3 dependencies per library."
            details={[
              "Prefer stdlib over external packages",
              "Zero critical CVEs across all libraries",
              "Reduced supply chain attack surface",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
