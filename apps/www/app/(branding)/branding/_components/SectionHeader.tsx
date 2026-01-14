interface SectionHeaderProps {
    title: string;
    description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
            {description && (
                <p className="text-body">{description}</p>
            )}
        </div>
    );
}
