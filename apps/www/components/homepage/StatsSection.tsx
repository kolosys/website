import { getOrganizationStats } from "@/actions/stats";
import { StatCard } from "./StatCard";

export async function StatsSection() {
  const stats = await getOrganizationStats();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-subtle">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            value={stats.totalLibraries}
            label="Production Libraries"
            icon="package"
          />
          <StatCard
            value={stats.totalStars}
            label="GitHub Stars"
            icon="star"
          />
          <StatCard
            value={stats.publishedLibraries}
            label="Published Packages"
            icon="check-circle"
          />
          <StatCard
            value={0}
            label="Critical CVEs"
            icon="shield-alt"
          />
        </div>
      </div>
    </section>
  );
}
