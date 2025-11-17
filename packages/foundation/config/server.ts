// Server-side specific configurations
export const serverConfig = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3010',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@host:port/database',
  // Add other server-only configurations here
  secretKey: process.env.SERVER_SECRET_KEY || 'super-secret-server-key',
};
