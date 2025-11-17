export function Footer() {
  return (
    <footer className="bg-matte-dark text-silver-accent py-8 mt-12 border-t border-silver-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} KniBrand Ecosystem. All rights reserved.</p>
          <p className="text-sm">Built with passion and AI.</p>
        </div>
        <nav className="flex space-x-4">
          <a href="/privacy" className="hover:text-silver-light">Privacy Policy</a>
          <a href="/terms" className="hover:text-silver-light">Terms of Service</a>
          <a href="/contact" className="hover:text-silver-light">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}
