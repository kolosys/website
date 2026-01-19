"use client";

import { useState, useEffect } from "react";
import { Icon } from "@kolosys-sites/theme";

type Example = {
  name: string;
  traditional: {
    time: number;
    allocations: number;
    code: string;
  };
  kolosys: {
    time: number;
    allocations: number;
    code: string;
  };
};

const examples: Record<string, Example> = {
  ion: {
    name: "Resource Pool",
    traditional: {
      time: 500,
      allocations: 3,
      code: `pool := &sync.Pool{}
obj := pool.Get()
// Manual cleanup`,
    },
    kolosys: {
      time: 180,
      allocations: 0,
      code: `pool := ion.New(...)
res := pool.Get(ctx)
// Auto cleanup`,
    },
  },
  photon: {
    name: "Event Bus",
    traditional: {
      time: 450,
      allocations: 5,
      code: `ch := make(chan Event)
go func() {
  // Manual routing
}()`,
    },
    kolosys: {
      time: 150,
      allocations: 0,
      code: `bus := photon.New()
bus.Subscribe(ctx, fn)
// Zero-alloc`,
    },
  },
  neuron: {
    name: "Message Passing",
    traditional: {
      time: 600,
      allocations: 4,
      code: `msgs := make(chan Msg)
select {
  case m := <-msgs:
}`,
    },
    kolosys: {
      time: 190,
      allocations: 0,
      code: `actor := neuron.New()
actor.Send(ctx, msg)
// Context-aware`,
    },
  },
};

export function PerformanceComparison() {
  const [selectedExample, setSelectedExample] = useState<string>("ion");
  const [animate, setAnimate] = useState(false);

  const example = examples[selectedExample];

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [selectedExample]);

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-lg">
      {/* Toggle Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3">
        {Object.keys(examples).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedExample(key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedExample === key
                ? "bg-primary-base text-primary-text"
                : "text-caption hover:bg-hover hover:text-foreground"
            }`}
          >
            {examples[key].name}
          </button>
        ))}
      </div>

      {/* Performance Comparison */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-caption">Traditional Approach</span>
            <span className="font-mono text-foreground">{example.traditional.time}ns</span>
          </div>
          <div className="h-8 bg-elevated rounded-md overflow-hidden">
            <div
              className={`h-full bg-neutral-300 dark:bg-neutral-600 transition-all duration-500 ease-out ${
                animate ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: animate ? `${(example.traditional.time / 600) * 100}%` : "0%",
              }}
            />
          </div>
          <p className="text-xs text-caption">
            {example.traditional.allocations} allocations
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-primary-emphasis font-medium">Kolosys Approach</span>
            <span className="font-mono text-primary-emphasis font-bold">
              {example.kolosys.time}ns
            </span>
          </div>
          <div className="h-8 bg-elevated rounded-md overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-primary-base to-primary-emphasis transition-all duration-500 ease-out ${
                animate ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: animate ? `${(example.kolosys.time / 600) * 100}%` : "0%",
              }}
            />
          </div>
          <p className="text-xs text-success-600 font-medium">
            0 allocations • {Math.round(((example.traditional.time - example.kolosys.time) / example.traditional.time) * 100)}% faster
          </p>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-elevated rounded-md p-3 border border-outline">
          <div className="text-xs text-caption mb-2">Before</div>
          <pre className="text-xs font-mono text-foreground overflow-x-auto">
            {example.traditional.code}
          </pre>
        </div>

        <div className="bg-primary-base/10 dark:bg-primary-base/20 rounded-md p-3 border border-primary-subtle">
          <div className="text-xs text-primary-emphasis font-medium mb-2">After</div>
          <pre className="text-xs font-mono text-foreground overflow-x-auto">
            {example.kolosys.code}
          </pre>
        </div>
      </div>

      {/* Performance Badge */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-caption">
          <Icon emoji="⚡" size="xs" />
          <span>All benchmarks run with Go 1.23+ on AMD64</span>
        </div>
      </div>
    </div>
  );
}
