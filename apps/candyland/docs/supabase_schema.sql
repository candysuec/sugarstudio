-- SQL for creating the 'experiments' table in Supabase
CREATE TABLE IF NOT EXISTS experiments (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    prompt TEXT NOT NULL,
    ai_used VARCHAR(50) NOT NULL, -- e.g., 'Gemini-1.5-Pro', 'GPT-4-Turbo'
    output JSONB, -- Storing structured output as JSON is flexible
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5), -- A 1-5 star rating
    tags TEXT[], -- Array of text tags for categorization
    status VARCHAR(50) DEFAULT 'new' -- e.g., 'new', 'reviewed', 'promoted'
);

-- Optional: Add a comment to describe the table's purpose
COMMENT ON TABLE experiments IS 'Log of all creative AI experiments run in the Candyland sandbox.';
