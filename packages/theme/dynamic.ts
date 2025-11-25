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
