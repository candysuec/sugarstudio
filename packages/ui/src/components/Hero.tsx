import Link from 'next/link';
import { Button } from ' @sugarstudio/ui'; // Assuming 'ui' package is correctly configured

export function Hero() {
  return (
    <section className="relative bg-matte-dark text-silver-accent py-20 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Placeholder for a subtle background pattern or gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-matte-dark via-gray-900 to-black opacity-75"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-silver-light">
          Unleash Your Brand's Full Potential with KniBrand
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          The AI-powered ecosystem for brand intelligence, automation, and operational excellence.
          From creative generation to self-healing DevOps, KniBrand has you covered.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/login">
            <Button>Get Started - Enter KniSoci</Button>
          </Link>
          <Link href="/about">
            <Button>Learn More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
