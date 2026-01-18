import { Icon } from "@kolosys-sites/theme";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-surface to-primary-subtle">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-base mb-6">
            <Icon name="envelope" pack="basic-sharp" size="lg" className="text-primary-text" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Get notified about new library releases, performance improvements, and best practices straight to your inbox.
          </p>

          <NewsletterForm />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-center gap-2">
              <Icon name="bell" pack="basic-sharp" size="md" className="text-primary-emphasis" />
              <span className="text-neutral-600">Release notifications</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="book" pack="basic-sharp" size="md" className="text-primary-emphasis" />
              <span className="text-neutral-600">Best practices & tips</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="trending-up" pack="basic-sharp" size="md" className="text-primary-emphasis" />
              <span className="text-neutral-600">Performance insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
