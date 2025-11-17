import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from 'ui'; // Assuming 'ui' package is correctly configured

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-matte-dark text-silver-accent py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-silver-light mb-8 text-center">Contact Us</h1>

          <p className="text-lg leading-relaxed mb-8 text-center">
            Have questions about KniBrand, our ecosystem, or how we can help your brand thrive?
            Reach out to us using the form below or through our direct contact information.
          </p>

          <form className="bg-gray-800 p-8 rounded-lg shadow-lg border border-silver-dark">
            <div className="mb-6">
              <label htmlFor="name" className="block text-silver-light text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-silver-light"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-silver-light text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-silver-light"
                placeholder="your@example.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-silver-light text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-silver-light"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <Button>Send Message</Button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-silver-light mb-4">Other Ways to Connect</h2>
            <p className="text-lg mb-2">Email: <a href="mailto:info@knibrand.com" className="text-silver-light hover:underline">info@knibrand.com</a></p>
            <p className="text-lg">Phone: <a href="tel:+1-555-123-4567" className="text-silver-light hover:underline">+1 (555) 123-4567</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
