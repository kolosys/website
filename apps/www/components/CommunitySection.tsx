import Link from 'next/link';
import { Button } from '@kolosys-sites/theme';
import { Icon } from '@kolosys-sites/theme';

const communityStats = [
  { icon: 'github', pack: 'brands', value: '5', label: 'GitHub Stars' },
  { icon: 'group', pack: 'basic', value: '>95%', label: 'Contributors' },
  { icon: 'git-branch', pack: 'basic', value: '0-alloc', label: 'Allocations' },
  { icon: 'shield', pack: 'basic', value: '0', label: 'GitHub CVEs' },
] as const;

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
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Help us build enterprise-grade Go libraries that solve real-world concurrency and
            performance challenges.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 hidden">
          {communityStats.map((stat, index) => {
            return (
              <div key={index} className="bg-panel rounded-lg p-6 text-center">
                <Icon name={stat.icon} pack={stat.pack} size="lg" className="mx-auto mb-3 text-neutral-700" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Ways to Contribute */}
        <div className="mb-12">
          <h3 className="text-center mb-8">Ways to Contribute</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributionTypes.map((type, index) => (
              <div key={index} className="bg-panel rounded-lg p-6">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4>{type.title}</h4>
                <p className="text-sm text-neutral-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Built with Love */}
        <div className="bg-panel rounded-lg p-12 text-center border border-neutral-200 bg-neutral-50">
          <div className="text-5xl mb-4">❤️</div>
          <h3>Built with Love</h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Every line of code, every documentation snippet, and every feature request helps build
            our community-centered tech. Starting with a set of open source. Join us in building
            something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" pack="brands" size="sm" />
              Start Contributing
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="https://github.com/orgs/kolosys/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discussions
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-neutral-500 hidden">
            <Link href="#" className="hover:text-foreground transition-colors">Certificate Guide</Link>
            <span>•</span>
            <Link href="#" className="hover:text-foreground transition-colors">Code of Conduct</Link>
            <span>•</span>
            <Link href="#" className="hover:text-foreground transition-colors">Developer Form</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

