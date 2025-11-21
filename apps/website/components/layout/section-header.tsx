interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && (
        <p className="text-gray-600 mt-2 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}