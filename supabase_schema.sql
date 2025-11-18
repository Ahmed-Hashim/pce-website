-- PCE Website Database Schema for Supabase
-- Precision Contracting Est. Website Database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE project_category AS ENUM ('Commercial', 'Industrial', 'Residential', 'Infrastructure');
CREATE TYPE employment_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category project_category NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    sectors JSONB DEFAULT '[]'::jsonb,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Statistics Table
CREATE TABLE project_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Sections Table
CREATE TABLE project_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_src TEXT NOT NULL,
    date TEXT NOT NULL,
    tag TEXT,
    excerpt TEXT,
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Items Table
CREATE TABLE news_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_src TEXT NOT NULL,
    date TEXT NOT NULL,
    tag TEXT,
    excerpt TEXT,
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Listings Table
CREATE TABLE job_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type employment_type NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sectors/Services Table
CREATE TABLE sectors_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    hero_image TEXT NOT NULL,
    description TEXT,
    stats JSONB DEFAULT '[]'::jsonb,
    highlights JSONB DEFAULT '[]'::jsonb,
    call_to_action_primary_text TEXT,
    call_to_action_primary_href TEXT,
    call_to_action_secondary_text TEXT,
    call_to_action_secondary_href TEXT,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Sections Table
CREATE TABLE service_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES sectors_services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    content TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Core Services Table
CREATE TABLE core_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    image TEXT NOT NULL,
    call_to_action TEXT DEFAULT 'Learn More',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Core Service Items Table
CREATE TABLE core_service_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    core_service_id UUID NOT NULL REFERENCES core_services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    ip_address TEXT,
    user_agent TEXT
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT false,
    is_responded BOOLEAN DEFAULT false
);

-- Company Values Table
CREATE TABLE company_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section Titles Configuration Table
CREATE TABLE section_titles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    eyebrow TEXT,
    title TEXT,
    background TEXT,
    outline_color TEXT,
    title_color TEXT,
    background_text_color TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

CREATE INDEX idx_project_statistics_project_id ON project_statistics(project_id);
CREATE INDEX idx_project_statistics_display_order ON project_statistics(display_order);

CREATE INDEX idx_project_sections_project_id ON project_sections(project_id);
CREATE INDEX idx_project_sections_display_order ON project_sections(display_order);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);

CREATE INDEX idx_news_items_slug ON news_items(slug);
CREATE INDEX idx_news_items_status ON news_items(status);
CREATE INDEX idx_news_items_created_at ON news_items(created_at DESC);
CREATE INDEX idx_news_items_date ON news_items(date);

CREATE INDEX idx_job_listings_slug ON job_listings(slug);
CREATE INDEX idx_job_listings_department ON job_listings(department);
CREATE INDEX idx_job_listings_location ON job_listings(location);
CREATE INDEX idx_job_listings_type ON job_listings(type);
CREATE INDEX idx_job_listings_is_active ON job_listings(is_active);
CREATE INDEX idx_job_listings_created_at ON job_listings(created_at DESC);

CREATE INDEX idx_sectors_services_slug ON sectors_services(slug);
CREATE INDEX idx_sectors_services_status ON sectors_services(status);
CREATE INDEX idx_sectors_services_created_at ON sectors_services(created_at DESC);

CREATE INDEX idx_service_sections_service_id ON service_sections(service_id);
CREATE INDEX idx_service_sections_display_order ON service_sections(display_order);

CREATE INDEX idx_core_services_display_order ON core_services(display_order);
CREATE INDEX idx_core_services_is_active ON core_services(is_active);

CREATE INDEX idx_core_service_items_core_service_id ON core_service_items(core_service_id);
CREATE INDEX idx_core_service_items_display_order ON core_service_items(display_order);

CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscriptions_is_active ON newsletter_subscriptions(is_active);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_is_responded ON contact_submissions(is_responded);

CREATE INDEX idx_company_values_display_order ON company_values(display_order);
CREATE INDEX idx_company_values_is_active ON company_values(is_active);

CREATE INDEX idx_section_titles_section_key ON section_titles(section_key);
CREATE INDEX idx_section_titles_is_active ON section_titles(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_items_updated_at BEFORE UPDATE ON news_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_listings_updated_at BEFORE UPDATE ON job_listings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_services_updated_at BEFORE UPDATE ON sectors_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_core_services_updated_at BEFORE UPDATE ON core_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_titles_updated_at BEFORE UPDATE ON section_titles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create slug generation function
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                TRIM(input_text),
                '[^a-zA-Z0-9\\s-]',
                '',
                'g'
            ),
            '[\\s-]+',
            '-',
            'g'
        )
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create function to check if slug exists
CREATE OR REPLACE FUNCTION slug_exists(slug_text TEXT, table_name TEXT, exclude_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
    exists_count INTEGER;
BEGIN
    IF table_name = 'projects' THEN
        SELECT COUNT(*) INTO exists_count FROM projects WHERE slug = slug_text AND (exclude_id IS NULL OR id != exclude_id);
    ELSIF table_name = 'blog_posts' THEN
        SELECT COUNT(*) INTO exists_count FROM blog_posts WHERE slug = slug_text AND (exclude_id IS NULL OR id != exclude_id);
    ELSIF table_name = 'news_items' THEN
        SELECT COUNT(*) INTO exists_count FROM news_items WHERE slug = slug_text AND (exclude_id IS NULL OR id != exclude_id);
    ELSIF table_name = 'job_listings' THEN
        SELECT COUNT(*) INTO exists_count FROM job_listings WHERE slug = slug_text AND (exclude_id IS NULL OR id != exclude_id);
    ELSIF table_name = 'sectors_services' THEN
        SELECT COUNT(*) INTO exists_count FROM sectors_services WHERE slug = slug_text AND (exclude_id IS NULL OR id != exclude_id);
    ELSE
        RETURN false;
    END IF;
    
    RETURN exists_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(base_text TEXT, table_name TEXT, exclude_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    counter INTEGER := 1;
    final_slug TEXT;
BEGIN
    base_slug := generate_slug(base_text);
    final_slug := base_slug;
    
    WHILE slug_exists(final_slug, table_name, exclude_id) LOOP
        final_slug := base_slug || '-' || counter;
        counter := counter + 1;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_titles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access on projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access on project statistics" ON project_statistics FOR SELECT USING (true);
CREATE POLICY "Public read access on project sections" ON project_sections FOR SELECT USING (true);
CREATE POLICY "Public read access on blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access on news items" ON news_items FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access on job listings" ON job_listings FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on sectors_services" ON sectors_services FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access on service_sections" ON service_sections FOR SELECT USING (true);
CREATE POLICY "Public read access on core_services" ON core_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on core_service_items" ON core_service_items FOR SELECT USING (true);
CREATE POLICY "Public read access on company_values" ON company_values FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on section_titles" ON section_titles FOR SELECT USING (is_active = true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on project_statistics" ON project_statistics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on project_sections" ON project_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on news_items" ON news_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on job_listings" ON job_listings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on sectors_services" ON sectors_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on service_sections" ON service_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on core_services" ON core_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on core_service_items" ON core_service_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on company_values" ON company_values FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on section_titles" ON section_titles FOR ALL USING (auth.role() = 'authenticated');

-- Newsletter subscription policies
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can unsubscribe from newsletter" ON newsletter_subscriptions FOR UPDATE USING (true);
CREATE POLICY "Admin can manage newsletter subscriptions" ON newsletter_subscriptions FOR ALL USING (auth.role() = 'authenticated');

-- Contact submission policies
CREATE POLICY "Public can submit contact forms" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can manage contact submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for company values
INSERT INTO company_values (value, display_order, is_active) VALUES
    ('Passion', 1, true),
    ('Integrity', 2, true),
    ('Innovation', 3, true),
    ('Accountability', 4, true),
    ('Responsibility', 5, true);

-- Insert sample data for section titles
INSERT INTO section_titles (section_key, eyebrow, title, background, outline_color, title_color, background_text_color, is_active) VALUES
    ('hero', 'Precision Contracting Est.', 'Building Excellence', 'EXCELLENCE', 'var(--color-primary-medium)', 'var(--color-primary-dark)', null, true),
    ('statistics', 'By the Numbers', 'Key Statistics', 'STATISTICS', 'var(--color-primary-dark)', 'var(--color-primary-dark)', 'var(--color-primary-dark)', true),
    ('whoWeAre', 'Who We Are', 'Our Story', 'STORY', 'var(--color-primary-dark)', 'var(--color-primary-dark)', null, true),
    ('coreServices', 'What We Do', 'What We Do', 'What We Do', 'var(--color-primary-dark)', 'var(--color-primary-dark)', null, true),
    ('featuredProjects', 'Featured Work', 'Signature Projects', 'PROJECTS', 'var(--color-primary-dark)', 'var(--color-primary-dark)', null, true),
    ('clients', 'Trusted By', 'Our Clients', 'CLIENTS', 'var(--color-primary-dark)', 'var(--color-primary-dark)', null, true),
    ('ourBranches', 'Where We Work', 'Our Branches', 'BRANCHES', 'var(--color-primary-dark)', 'var(--color-primary-dark)', null, true),
    ('cta', 'Let''s Build Together', 'Ready to Start Your Next Project?', 'TOGETHER', 'var(--color-primary-medium)', 'var(--color-primary-dark)', null, true),
    ('ceos', 'Executive Leadership', 'Visionary Leadership', 'LEADERS', 'var(--color-primary-medium)', 'var(--color-primary-dark)', null, true),
    ('holdingGroup', null, 'Our Group', 'HOLDING', 'var(--color-neutral-light)', 'var(--color-primary-medium)', null, true);

-- Create views for common queries
CREATE VIEW active_projects AS
SELECT * FROM projects WHERE status = 'published' ORDER BY created_at DESC;

CREATE VIEW active_blog_posts AS
SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC;

CREATE VIEW active_job_listings AS
SELECT * FROM job_listings WHERE is_active = true ORDER BY created_at DESC;

CREATE VIEW project_details AS
SELECT 
    p.*,
    COALESCE(
        json_agg(
            json_build_object(
                'label', ps.label,
                'value', ps.value
            ) ORDER BY ps.display_order
        ) FILTER (WHERE ps.id IS NOT NULL),
        '[]'::json
    ) as statistics,
    COALESCE(
        json_agg(
            json_build_object(
                'title', ps2.title,
                'content', ps2.content,
                'items', ps2.items
            ) ORDER BY ps2.display_order
        ) FILTER (WHERE ps2.id IS NOT NULL),
        '[]'::json
    ) as sections
FROM projects p
LEFT JOIN project_statistics ps ON p.id = ps.project_id
LEFT JOIN project_sections ps2 ON p.id = ps2.project_id
GROUP BY p.id;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;