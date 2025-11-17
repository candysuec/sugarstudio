// This file defines common database types and interfaces.
// These types are generic and can be extended or implemented by specific ORMs (e.g., Prisma, Supabase).

export interface BaseDBModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDBModel extends BaseDBModel {
  email: string;
  name?: string;
  // Add other common user fields
}

export interface ProjectDBModel extends BaseDBModel {
  name: string;
  ownerId: string; // Foreign key to UserDBModel
  // Add other common project fields
}

// Generic type for database query results
export type DBQueryResult<T> = {
  data: T | T[] | null;
  error: string | null;
  count?: number;
};
