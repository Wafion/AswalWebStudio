-- AswalWebStudio PostgreSQL / Supabase Schema

-- Table for project inquiries (leads)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    website_type VARCHAR(100) NOT NULL,
    page_count VARCHAR(50),
    design_style VARCHAR(100),
    budget_range VARCHAR(100),
    deadline VARCHAR(100),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    files JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'In Discussion', 'In Progress', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for searching and filtering inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Table for Admin Users (used for NextAuth dashboard access)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user seed script
-- (Password should be hashed using bcrypt in production, default: admin123)
-- INSERT INTO users (email, password_hash, name, role) 
-- VALUES ('admin@aswalwebstudio.com', '$2b$12$L7R2Qo56f/E8n/sNnZ7hOuhM0v5P27m0/t2Yc/2b7G3cWn56dG39S', 'AswalWebStudio Admin', 'admin')
-- ON CONFLICT (email) DO NOTHING;
