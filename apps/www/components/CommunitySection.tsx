import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUsers, faShield, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const communityStats = [
  { icon: faGithub, value: '5', label: 'GitHub Stars' },
  { icon: faUsers, value: '>95%', label: 'Contributors' },
  { icon: faCodeBranch, value: '0-alloc', label: 'Allocations' },
  { icon: faShield, value: '0', label: 'GitHub CVEs' },
];

const contributionTypes = [
  {
    icon: '💻',
    title: 'Code Contributions',
    description: 'Help us build and improve open-source libraries with bug fixes, new features, and optimizations.',
    tags: ['Development', 'Bug Fixes', 'Features'],
  },
  {
    icon: '📖',
    title: 'Documentation',
    description: 'Improve our docs, write tutorials, and help other developers understand our tools.',
    tags: ['Writing', 'Tutorials', 'Examples'],
  },
  {
    icon: '🤝',
    title: 'Community Support',
    description: 'Answer questions, help newcomers, and share your experience with our libraries.',
    tags: ['Discord', 'Help Me', 'Discussions'],
  },
];

export const CommunitySection = () => {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h2>Join Our Community</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Help us build enterprise-grade Go libraries that solve real-world concurrency and
            performance challenges.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 hidden">
          {communityStats.map((stat, index) => {
            return (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <FontAwesomeIcon icon={stat.icon} className="w-8 h-8 mx-auto mb-3 text-gray-700" />
                <div className="text-2xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Ways to Contribute */}
        <div className="mb-12">
          <h3 className="text-center mb-8">Ways to Contribute</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributionTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4>{type.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Built with Love */}
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200 bg-gray-50">
          <div className="text-5xl mb-4">❤️</div>
          <h3>Built with Love</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every line of code, every documentation snippet, and every feature request helps build
            our community-centered tech. Starting with a set of open source. Join us in building
            something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              Start Contributing
            </Link>
            <Link
              href="https://github.com/orgs/kolosys/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Join Discussions
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-500 hidden">
            <Link href="#" className="hover:text-black transition-colors">Certificate Guide</Link>
            <span>•</span>
            <Link href="#" className="hover:text-black transition-colors">Code of Conduct</Link>
            <span>•</span>
            <Link href="#" className="hover:text-black transition-colors">Developer Form</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

