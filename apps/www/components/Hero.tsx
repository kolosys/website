import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 uppercase">
          Kolosys
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-4 font-medium">
          Building enterprise-grade Go libraries for high-performance applications
        </p>
        <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
          Production-ready Go libraries that solve complex challenges in concurrency,
          event processing, time-based operations, and Discord development. We focus on
          developer experience, performance, and reliability.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Explore Libraries
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-5 h-5 fill-white" />
          </Link>
          <Link
            href="https://github.com/kolosys"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

