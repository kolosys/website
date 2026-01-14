import { Button } from '@kolosys-sites/theme';
import { Icon } from '@kolosys-sites/theme';

export const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 uppercase">
          Kolosys
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-600 mb-4 font-medium">
          Building enterprise-grade Go libraries for high-performance applications
        </p>
        <p className="text-base sm:text-lg text-neutral-500 mb-8 max-w-3xl mx-auto">
          Production-ready Go libraries that solve complex challenges in concurrency,
          event processing, time-based operations, and Discord development. We focus on
          developer experience, performance, and reliability.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="xl"
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Libraries
            <Icon name="arrow-right" pack="basic" size="sm" />
          </Button>
          <Button
            variant="outline"
            size="xl"
            href="https://github.com/kolosys"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" pack="brands" size="sm" />
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

