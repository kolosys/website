"use client";

import { Tabs, type TabItem } from "@kolosys-sites/theme";
import { CodeExample } from "./CodeExample";

const quickStartExamples: TabItem[] = [
  {
    label: "ion - Resource Pool",
    content: (
      <CodeExample
        title="ion"
        installation="go get github.com/kolosys/ion"
        usage={`package main

import (
    "context"
    "github.com/kolosys/ion"
)

func main() {
    ctx := context.Background()

    pool := ion.NewPool(
        ctx,
        ion.WithFactory(factory),
        ion.WithSize(100),
    )
    defer pool.Close()

    conn, err := pool.Acquire(ctx)
    if err != nil {
        panic(err)
    }
    defer conn.Release()

    // Use the connection
}`}
      />
    ),
  },
  {
    label: "photon - Event Bus",
    content: (
      <CodeExample
        title="photon"
        installation="go get github.com/kolosys/photon"
        usage={`package main

import (
    "github.com/kolosys/photon"
)

func main() {
    bus := photon.NewBus()
    defer bus.Close()

    bus.Subscribe("user.created", func(e photon.Event) {
        user := e.Data.(User)
        sendWelcomeEmail(user)
    })

    bus.Publish("user.created", User{
        ID: "123",
        Email: "user@example.com",
    })
}`}
      />
    ),
  },
  {
    label: "neuron - Time Utilities",
    content: (
      <CodeExample
        title="neuron"
        installation="go get github.com/kolosys/neuron"
        usage={`package main

import (
    "context"
    "time"
    "github.com/kolosys/neuron"
)

func main() {
    ctx := context.Background()

    timer := neuron.NewTimer(5 * time.Second)
    defer timer.Stop()

    select {
    case <-timer.C:
        // Timer fired
    case <-ctx.Done():
        // Context cancelled
    }
}`}
      />
    ),
  },
];

export function QuickStartSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-subtle">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Quick Start
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            Get started in seconds with zero configuration. Just import and go.
          </p>
        </div>

        <Tabs tabs={quickStartExamples} variant="pills" />
      </div>
    </section>
  );
}
