import { Icon, type IconName } from "@kolosys-sites/theme";

type FeatureShowcaseProps = {
  icon: IconName;
  title: string;
  description: string;
  details: string[];
  reverse?: boolean;
};

export function FeatureShowcase({
  icon,
  title,
  description,
  details,
  reverse = false,
}: FeatureShowcaseProps) {
  return (
    <div
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
    >
      <div className="flex-1">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary-surface border border-primary-base mb-4">
          <Icon
            name={icon}
            pack="basic-sharp"
            size="lg"
            className="text-primary-emphasis"
          />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h3>
        <p className="text-lg text-neutral-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2">
              <Icon
                name="check"
                pack="basic-sharp"
                size="sm"
                className="text-primary-emphasis mt-1 flex-shrink-0"
              />
              <span className="text-neutral-600">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-lg">
          <div className="space-y-3">
            <div className="h-2 bg-primary-base rounded w-3/4" />
            <div className="h-2 bg-neutral-200 rounded w-full" />
            <div className="h-2 bg-neutral-200 rounded w-5/6" />
            <div className="h-2 bg-primary-subtle rounded w-2/3" />
            <div className="h-2 bg-neutral-200 rounded w-full" />
            <div className="h-2 bg-neutral-200 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
