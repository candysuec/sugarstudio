import Link from 'next/link';
import { Button } from ' @sugarstudio/ui'; // Assuming 'ui' package is correctly configured

interface CTAProps {
  title: string;
  description: string;
  primaryLink: string;
  primaryText: string;
  secondaryLink?: string;
  secondaryText?: string;
}

export function CTA({ title, description, primaryLink, primaryText, secondaryLink, secondaryText }: CTAProps) {
  return (
    <section className="bg-matte-dark text-silver-accent py-16 text-center border-t border-silver-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-silver-light">{title}</h2>
        <p className="text-lg mb-8">{description}</p>
        <div className="flex justify-center space-x-4">
          <Link href={primaryLink}>
            <Button>{primaryText}</Button>
          </Link>
          {secondaryLink && secondaryText && (
            <Link href={secondaryLink}>
              <Button>{secondaryText}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
