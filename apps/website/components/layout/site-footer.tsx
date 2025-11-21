export default function SiteFooter() {
  return (
    <footer className="w-full py-6 border-t border-gray-200 text-center">
      <p className="text-sm text-gray-500">© {new Date().getFullYear()} SugarStudio</p>
    </footer>
  );
}