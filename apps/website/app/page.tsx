import { Hero } from '../components/Hero';
import { CTA } from '../components/CTA';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />

        <section className="py-16 bg-matte-dark text-silver-accent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-silver-light">
              The KniBrand Ecosystem: Your All-in-One Solution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="KniSoci: Brand Intelligence"
                description="AI-powered insights to define, monitor, and evolve your brand's identity and market position."
              />
              <FeatureCard
                title="Candyland: Admin & Operations"
                description="Streamline your backend with powerful tools for content management, workflows, and business operations."
              />
              <FeatureCard
                title="Orchestrator: Automation Engine"
                description="Automate tasks, generate SOPs, and manage background jobs for seamless, self-healing operations."
              />
              <FeatureCard
                title="Brand OS: Unified Platform"
                description="A cohesive operating system that integrates all tools for a holistic brand management experience."
              />
              <FeatureCard
                title="CandyHub: Creative & Strategy"
                description="Your hub for generating creative assets, developing brand strategies, and ensuring consistency."
              />
              <FeatureCard
                title="Website: Public Gateway"
                description="The public face of your brand, designed to attract, inform, and convert visitors into loyal customers."
              />
            </div>
          </div>
        </section>

        <CTA
          title="Ready to Transform Your Brand?"
          description="Join the KniBrand ecosystem and experience the future of brand management."
          primaryLink="/login"
          primaryText="Get Started Now"
          secondaryLink="/contact"
          secondaryText="Contact Sales"
        />
      </main>
      <Footer />
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-silver-dark hover:border-silver-light transition-all duration-300">
      <h3 className="text-xl font-semibold mb-3 text-silver-light">{title}</h3>
      <p className="text-silver-accent">{description}</p>
    </div>
  );
}