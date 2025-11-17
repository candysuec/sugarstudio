import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CTA } from '../../components/CTA';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-matte-dark text-silver-accent py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-silver-light mb-8 text-center">About KniBrand Ecosystem</h1>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-silver-light mb-4">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              At KniBrand, we envision a world where every brand, regardless of size, can achieve its full potential through intelligent automation and strategic clarity. Our ecosystem is designed to empower businesses to build, manage, and evolve their brand identity with unprecedented efficiency and insight.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-silver-light mb-4">The Integrated Ecosystem</h2>
            <p className="text-lg leading-relaxed mb-6">
              The KniBrand Ecosystem is a suite of interconnected applications, each playing a crucial role in your brand's success. Together, they form a powerful platform for comprehensive brand management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EcosystemCard
                title="KniSoci (Brand Intelligence App)"
                description="Dive deep into your brand's performance with AI-driven analytics. KniSoci provides insights into market perception, audience engagement, and brand consistency, helping you make data-informed decisions."
              />
              <EcosystemCard
                title="Candyland (Admin & Backend Tools)"
                description="The operational backbone of your brand. Candyland offers robust tools for managing content, automating workflows, and overseeing all backend business processes with ease and precision."
              />
              <EcosystemCard
                title="Orchestrator (Automation Engine)"
                description="The silent force behind your brand's efficiency. Orchestrator handles background jobs, generates Standard Operating Procedures (SOPs), and automates routine tasks, ensuring smooth and self-healing operations."
              />
              <EcosystemCard
                title="Brand OS (Unified Platform)"
                description="More than just a collection of tools, Brand OS is the overarching philosophy and framework that unifies KniSoci, Candyland, and Orchestrator into a single, intelligent brand management operating system."
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-silver-light mb-4">Our Philosophy: Matte, Minimal, Luxury-Tech</h2>
            <p className="text-lg leading-relaxed">
              Our design philosophy reflects our core values: sophisticated, efficient, and forward-thinking. We embrace a matte-dark aesthetic with subtle silver accents to convey a sense of luxury, precision, and cutting-edge technology. This visual tone is consistent across all our platforms, ensuring a cohesive and premium user experience.
            </p>
          </section>
        </div>
        <CTA
          title="Ready to Explore the Ecosystem?"
          description="Discover how each part of KniBrand works together to elevate your brand."
          primaryLink="/login"
          primaryText="Get Started"
          secondaryLink="/contact"
          secondaryText="Talk to an Expert"
        />
      </main>
      <Footer />
    </>
  );
}

interface EcosystemCardProps {
  title: string;
  description: string;
}

function EcosystemCard({ title, description }: EcosystemCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-silver-dark hover:border-silver-light transition-all duration-300">
      <h3 className="text-xl font-semibold mb-3 text-silver-light">{title}</h3>
      <p className="text-silver-accent">{description}</p>
    </div>
  );
}
