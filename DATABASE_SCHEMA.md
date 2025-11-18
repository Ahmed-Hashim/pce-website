# PCE Website Database Schema Documentation

## Overview

This document outlines the database tables needed for the PCE (Precision Contracting Est.) website based on the codebase analysis. The website is a Next.js 16 application using TypeScript with static data files that represent the data structures that would typically be stored in a database.

## Database Tables

### 1. Projects Table

**Purpose**: Stores information about engineering and construction projects

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `slug` (VARCHAR, UNIQUE, INDEXED) - URL-friendly identifier
- `title` (VARCHAR) - Project name
- `description` (TEXT) - Project description
- `category` (VARCHAR) - Project category (Commercial, Industrial, Residential, Infrastructure)
- `location` (VARCHAR) - Project location
- `year` (VARCHAR) - Completion year
- `hero_image` (VARCHAR) - Path to main project image
- `gallery` (JSON) - Array of image paths for project gallery
- `sectors` (JSON) - Array of sectors the project belongs to
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

**Indexes**: 
- Primary key on `id`
- Unique index on `slug`
- Index on `category`
- Index on `location`

---

### 2. Project Statistics Table

**Purpose**: Stores key metrics and statistics for projects

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `project_id` (Foreign Key) - References Projects.id
- `label` (VARCHAR) - Statistic label (e.g., "Built-up Area", "Floors")
- `value` (VARCHAR) - Statistic value (e.g., "45,000 m²", "28")
- `display_order` (INTEGER) - Order for displaying statistics

**Indexes**:
- Primary key on `id`
- Foreign key index on `project_id`
- Composite index on (`project_id`, `display_order`)

---

### 3. Project Sections Table

**Purpose**: Stores detailed content sections for project pages

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `project_id` (Foreign Key) - References Projects.id
- `title` (VARCHAR) - Section title (e.g., "Overview", "Scope")
- `content` (TEXT, NULLABLE) - Section content text
- `items` (JSON, NULLABLE) - Array of bullet points or list items
- `display_order` (INTEGER) - Order for displaying sections

**Indexes**:
- Primary key on `id`
- Foreign key index on `project_id`
- Composite index on (`project_id`, `display_order`)

---

### 4. Blog Posts Table

**Purpose**: Stores blog post content and metadata

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `slug` (VARCHAR, UNIQUE, INDEXED) - URL-friendly identifier
- `title` (VARCHAR) - Blog post title
- `subtitle` (VARCHAR, NULLABLE) - Optional subtitle
- `image_src` (VARCHAR) - Path to featured image
- `date` (VARCHAR) - Publication date (e.g., "Nov 2025")
- `tag` (VARCHAR, NULLABLE) - Featured tag (e.g., "Featured", "Top")
- `excerpt` (TEXT, NULLABLE) - Short description/summary
- `content` (JSON) - Array of content paragraphs
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

**Indexes**:
- Primary key on `id`
- Unique index on `slug`
- Index on `date`
- Index on `tag`

---

### 5. News Items Table

**Purpose**: Stores news and announcement content

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `slug` (VARCHAR, UNIQUE, INDEXED) - URL-friendly identifier
- `title` (VARCHAR) - News title
- `subtitle` (VARCHAR, NULLABLE) - Optional subtitle
- `image_src` (VARCHAR) - Path to news image
- `date` (VARCHAR) - Publication date
- `tag` (VARCHAR, NULLABLE) - News tag (e.g., "Top")
- `excerpt` (TEXT, NULLABLE) - Short description
- `content` (JSON) - Array of content paragraphs
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

**Indexes**:
- Primary key on `id`
- Unique index on `slug`
- Index on `date`
- Index on `tag`

---

### 6. Job Listings Table

**Purpose**: Stores job posting information

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `slug` (VARCHAR, UNIQUE, INDEXED) - URL-friendly identifier
- `title` (VARCHAR) - Job title
- `department` (VARCHAR) - Department name
- `location` (VARCHAR) - Job location
- `type` (VARCHAR) - Employment type (Full-time, Part-time, Contract)
- `description` (TEXT) - Job description
- `requirements` (JSON) - Array of job requirements
- `is_active` (BOOLEAN) - Whether job is currently open
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

**Indexes**:
- Primary key on `id`
- Unique index on `slug`
- Index on `department`
- Index on `location`
- Index on `type`
- Index on `is_active`

---

### 7. Sectors/Services Table

**Purpose**: Stores information about company services and sectors

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `slug` (VARCHAR, UNIQUE, INDEXED) - URL-friendly identifier
- `title` (VARCHAR) - Service/sector name
- `subtitle` (VARCHAR, NULLABLE) - Optional subtitle
- `hero_image` (VARCHAR) - Path to hero image
- `description` (TEXT, NULLABLE) - Service description
- `stats` (JSON, NULLABLE) - Array of statistics objects
- `highlights` (JSON, NULLABLE) - Array of key highlights
- `call_to_action_primary_text` (VARCHAR, NULLABLE) - Primary CTA button text
- `call_to_action_primary_href` (VARCHAR, NULLABLE) - Primary CTA link
- `call_to_action_secondary_text` (VARCHAR, NULLABLE) - Secondary CTA button text
- `call_to_action_secondary_href` (VARCHAR, NULLABLE) - Secondary CTA link
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

**Indexes**:
- Primary key on `id`
- Unique index on `slug`

---

### 8. Service Sections Table

**Purpose**: Stores detailed sections for service/sector pages

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `service_id` (Foreign Key) - References Sectors/Services.id
- `title` (VARCHAR) - Section title
- `items` (JSON, NULLABLE) - Array of list items
- `content` (TEXT, NULLABLE) - Section content text
- `display_order` (INTEGER) - Order for displaying sections

**Indexes**:
- Primary key on `id`
- Foreign key index on `service_id`
- Composite index on (`service_id`, `display_order`)

---

### 9. Core Services Table

**Purpose**: Stores core service categories with detailed items

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `title` (VARCHAR) - Core service title
- `icon` (VARCHAR) - Icon component name (e.g., "FaDraftingCompass")
- `image` (VARCHAR) - Background image path
- `call_to_action` (VARCHAR) - CTA text (e.g., "Learn More")
- `created_at` (TIMESTAMP) - Record creation date
- `updated_at` (TIMESTAMP) - Last update date

---

### 10. Core Service Items Table

**Purpose**: Stores individual items within core services

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `core_service_id` (Foreign Key) - References Core Services.id
- `title` (VARCHAR) - Item title
- `description` (TEXT) - Item description
- `display_order` (INTEGER) - Order for displaying items

**Indexes**:
- Primary key on `id`
- Foreign key index on `core_service_id`
- Composite index on (`core_service_id`, `display_order`)

---

### 11. Newsletter Subscriptions Table

**Purpose**: Stores newsletter subscription information

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `email` (VARCHAR, UNIQUE) - Subscriber email address
- `is_active` (BOOLEAN) - Subscription status
- `subscribed_at` (TIMESTAMP) - Subscription date
- `unsubscribed_at` (TIMESTAMP, NULLABLE) - Unsubscription date
- `ip_address` (VARCHAR, NULLABLE) - Subscriber IP address

**Indexes**:
- Primary key on `id`
- Unique index on `email`
- Index on `is_active`

---

### 12. Contact Submissions Table

**Purpose**: Stores contact form submissions

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `name` (VARCHAR) - Contact name
- `email` (VARCHAR) - Contact email
- `phone` (VARCHAR, NULLABLE) - Contact phone
- `company` (VARCHAR, NULLABLE) - Company name
- `subject` (VARCHAR) - Message subject
- `message` (TEXT) - Message content
- `ip_address` (VARCHAR, NULLABLE) - Submitter IP address
- `user_agent` (TEXT, NULLABLE) - Browser user agent
- `submitted_at` (TIMESTAMP) - Submission date
- `is_read` (BOOLEAN) - Whether message has been read
- `is_responded` (BOOLEAN) - Whether message has been responded to

**Indexes**:
- Primary key on `id`
- Index on `email`
- Index on `submitted_at`
- Index on `is_read`
- Index on `is_responded`

---

### 13. Company Values Table

**Purpose**: Stores company core values

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `value` (VARCHAR) - Core value name (e.g., "Passion", "Integrity")
- `display_order` (INTEGER) - Order for displaying values
- `is_active` (BOOLEAN) - Whether value is currently active

**Indexes**:
- Primary key on `id`
- Index on `display_order`
- Index on `is_active`

---

### 14. Section Titles Configuration Table

**Purpose**: Stores configurable section titles and styling

**Fields**:
- `id` (Primary Key) - UUID or auto-incrementing integer
- `section_key` (VARCHAR, UNIQUE) - Section identifier (e.g., "hero", "statistics")
- `eyebrow` (VARCHAR, NULLABLE) - Small heading text
- `title` (VARCHAR, NULLABLE) - Main heading text
- `background` (VARCHAR, NULLABLE) - Background text
- `outline_color` (VARCHAR, NULLABLE) - CSS color variable
- `title_color` (VARCHAR, NULLABLE) - CSS color variable
- `background_text_color` (VARCHAR, NULLABLE) - CSS color variable
- `is_active` (BOOLEAN) - Whether configuration is active

**Indexes**:
- Primary key on `id`
- Unique index on `section_key`
- Index on `is_active`

---

## Database Relationships

### Primary Relationships:

1. **Projects** → **Project Statistics** (One-to-Many)
   - One project can have multiple statistics
   - Foreign key: `project_statistics.project_id` → `projects.id`

2. **Projects** → **Project Sections** (One-to-Many)
   - One project can have multiple content sections
   - Foreign key: `project_sections.project_id` → `projects.id`

3. **Sectors/Services** → **Service Sections** (One-to-Many)
   - One service can have multiple content sections
   - Foreign key: `service_sections.service_id` → `sectors_services.id`

4. **Core Services** → **Core Service Items** (One-to-Many)
   - One core service can have multiple items
   - Foreign key: `core_service_items.core_service_id` → `core_services.id`

### Data Types Used:

- **JSON Fields**: Used for arrays and complex objects (gallery, stats, content, requirements, highlights, sectors)
- **VARCHAR**: Used for text fields with reasonable length limits
- **TEXT**: Used for longer content fields
- **BOOLEAN**: Used for status flags
- **TIMESTAMP**: Used for date/time tracking
- **INTEGER**: Used for ordering and IDs

## Implementation Notes

1. **Static Data Migration**: The current codebase uses static TypeScript files in `/app/data/` directory. These would need to be migrated to the database.

2. **Image Storage**: Image paths are stored as strings referencing the `/public/` directory. Consider using a proper file storage system for production.

3. **Slug Generation**: Slugs should be automatically generated from titles and made URL-friendly.

4. **SEO Considerations**: All content tables should support meta descriptions, keywords, and other SEO fields.

5. **Internationalization**: Consider adding language support fields for multi-language content.

6. **Caching**: Implement caching strategies for frequently accessed data like projects and services.

7. **Search Functionality**: Add full-text search capabilities for projects, blog posts, and news items.

8. **Analytics**: Consider adding analytics tables to track page views, user interactions, and content performance.

## Next Steps

1. Choose a database system (PostgreSQL, MySQL, or SQLite)
2. Set up database migrations
3. Implement data access layer (ORM or query builder)
4. Create API endpoints for CRUD operations
5. Implement admin interface for content management
6. Add data validation and sanitization
7. Implement backup and recovery procedures