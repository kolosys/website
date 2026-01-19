import { Button } from '@kolosys-sites/theme';
import { Icon } from '@kolosys-sites/theme';
import { AppSection } from '@kolosys-sites/theme';

export const CommunitySection = () => {
  return (
    <AppSection elevated className="py-12">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Built by developers, for developers
        </h2>

        <p className="text-lg text-caption mb-8">
          Join our community and contribute to building the future of Go libraries
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant="primary"
            size="lg"
            href="https://github.com/kolosys"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" pack="brands" size="sm" />
            Star on GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="https://github.com/orgs/kolosys/discussions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message-dots" pack="basic" size="sm" />
            Join Discussions
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-caption">
          <div className="flex items-center gap-2">
            <Icon name="group" pack="basic" size="xs" />
            <span>Active community</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="git-branch" pack="basic" size="xs" />
            <span>Regular updates</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="shield" pack="basic" size="xs" />
            <span>Production-tested</span>
          </div>
        </div>
      </div>
    </AppSection>
  );
};

