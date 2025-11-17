// Browser-side specific configurations
export const browserConfig = {
  appTitle: 'SugarStudio',
  // Add other browser-only configurations here
  publicApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
};
