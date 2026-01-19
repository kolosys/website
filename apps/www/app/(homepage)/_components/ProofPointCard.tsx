"use client";

import { Icon } from "@kolosys-sites/theme";

type ProofType = "benchmark" | "security" | "dx";

type Props = {
  icon: string;
  title: string;
  description: string;
  proofType: ProofType;
};

export function ProofPointCard({ icon, title, description, proofType }: Props) {
  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary-base to-primary-subtle rounded-lg">
          <Icon emoji={icon} size="lg" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-caption mb-6">{description}</p>

      {/* Visual Proof */}
      {proofType === "benchmark" && <BenchmarkVisualization />}
      {proofType === "security" && <SecurityVisualization />}
      {proofType === "dx" && <DXVisualization />}
    </div>
  );
}

function BenchmarkVisualization() {
  const benchmarks = [
    { name: "stdlib", value: 500, color: "bg-neutral-300 dark:bg-neutral-600" },
    { name: "competitors", value: 300, color: "bg-neutral-400 dark:bg-neutral-500" },
    { name: "Kolosys", value: 180, color: "bg-gradient-to-r from-primary-base to-primary-emphasis" },
  ];

  return (
    <div className="space-y-3">
      {benchmarks.map((bench) => (
        <div key={bench.name} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-caption capitalize">{bench.name}</span>
            <span className="font-mono font-medium text-foreground">{bench.value}ns</span>
          </div>
          <div className="h-6 bg-elevated rounded-md overflow-hidden">
            <div
              className={`h-full ${bench.color}`}
              style={{ width: `${(bench.value / 500) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-success-600 font-medium mt-4">
        64% faster than standard library
      </p>
    </div>
  );
}

function SecurityVisualization() {
  const metrics = [
    { label: "Dependencies", value: "0-3", status: "success" },
    { label: "Critical CVEs", value: "0", status: "success" },
    { label: "Test Coverage", value: ">90%", status: "success" },
  ];

  return (
    <div className="space-y-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex items-center justify-between p-3 bg-elevated rounded-md border border-outline"
        >
          <span className="text-sm text-caption">{metric.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">{metric.value}</span>
            <Icon name="check" pack="basic" size="xs" className="text-success-600" />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 mt-4 p-2 bg-success-100 dark:bg-success-900/20 rounded-md">
        <Icon name="shield" pack="basic" size="sm" className="text-success-600" />
        <span className="text-xs text-success-800 dark:text-success-600 font-medium">
          Production-ready security posture
        </span>
      </div>
    </div>
  );
}

function DXVisualization() {
  return (
    <div className="space-y-3">
      {/* Before */}
      <div className="bg-elevated rounded-md p-3 border border-outline">
        <div className="text-xs text-caption mb-2">Without Context</div>
        <pre className="text-xs font-mono text-foreground">
{`pool := NewPool()
res := pool.Get()
defer res.Close() // Manual
// Risk: Leaks if panic`}
        </pre>
      </div>

      {/* After */}
      <div className="bg-primary-base/10 dark:bg-primary-base/20 rounded-md p-3 border border-primary-subtle">
        <div className="text-xs text-primary-emphasis font-medium mb-2">With Context</div>
        <pre className="text-xs font-mono text-foreground">
{`pool := ion.New(...)
res := pool.Get(ctx)
// Auto cleanup on cancel
// Zero resource leaks`}
        </pre>
      </div>

      <div className="flex items-center gap-2 text-xs text-primary-emphasis font-medium">
        <Icon name="check" pack="basic" size="xs" />
        <span>Automatic resource management</span>
      </div>
    </div>
  );
}
