import dynamic from "next/dynamic";

export type * from "./components";

export const Button = dynamic(
  () => import("./components/Button").then((mod) => mod.Button),
  {
    ssr: false,
  }
);

export const Card = dynamic(
  () => import("./components/Card").then((mod) => mod.Card),
  {
    ssr: false,
  }
);

export const StatusBadge = dynamic(
  () => import("./components/StatusBadge").then((mod) => mod.StatusBadge),
  {
    ssr: false,
  }
);

export const VersionBadge = dynamic(
  () => import("./components/VersionBadge").then((mod) => mod.VersionBadge),
  {
    ssr: false,
  }
);

export const Fieldset = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Fieldset),
  {
    ssr: false,
  }
);

export const Field = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Field),
  {
    ssr: false,
  }
);

export const Input = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Input),
  {
    ssr: false,
  }
);

export const Label = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Label),
  {
    ssr: false,
  }
);

export const Legend = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Legend),
  {
    ssr: false,
  }
);

export const Description = dynamic(
  () => import("./components/Fieldset").then((mod) => mod.Description),
  {
    ssr: false,
  }
);

export const Switch = dynamic(
  () => import("./components/Switch").then((mod) => mod.Switch),
  {
    ssr: false,
  }
);

export const Icon = dynamic(
  () => import("./components/Icon").then((mod) => mod.Icon),
  {
    ssr: false,
  }
);

export const IconDictionary = dynamic(
  () => import("./components/IconDictionary").then((mod) => mod.IconDictionary),
  {
    ssr: false,
  }
);

export const CodeBlock = dynamic(
  () => import("./components/CodeBlock").then((mod) => mod.CodeBlock),
  {
    ssr: false,
  }
);

export const EmptyState = dynamic(
  () => import("./components/EmptyState").then((mod) => mod.EmptyState),
  {
    ssr: false,
  }
);

export const PageHeader = dynamic(
  () => import("./components/PageHeader").then((mod) => mod.PageHeader),
  {
    ssr: false,
  }
);

export const Tabs = dynamic(
  () => import("./components/Tabs").then((mod) => mod.Tabs),
  {
    ssr: false,
  }
);
