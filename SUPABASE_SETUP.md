# PCE Website Supabase Database Setup Guide

## Overview

This guide provides complete instructions for setting up the PCE (Precision Contracting Est.) website database on Supabase, including schema creation, data migration, and client-side integration.

## Prerequisites

1. Supabase account and project
2. PostgreSQL client or Supabase SQL editor access
3. Node.js environment for data migration scripts

## Step 1: Database Schema Setup

### 1.1 Run the Schema Script

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the sidebar
3. Copy and paste the contents of `supabase_schema.sql`
4. Click **Run** to execute the schema creation

### 1.2 Verify Schema Creation

Run this query to verify all tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- `projects`
- `project_statistics`
- `project_sections`
- `blog_posts`
- `news_items`
- `job_listings`
- `sectors_services`
- `service_sections`
- `core_services`
- `core_service_items`
- `newsletter_subscriptions`
- `contact_submissions`
- `company_values`
- `section_titles`

## Step 2: Data Migration from Static Files

### 2.1 Install Required Dependencies

```bash
npm install @supabase/supabase-js dotenv
```

### 2.2 Create Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2.3 Create Migration Script

Create `scripts/migrate-to-supabase.js`:

```javascript
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Import static data
const { projectsData } = require('../app/data/projects');
const { blogPosts } = require('../app/data/blog');
const { newsItems } = require('../app/data/news');
const { jobsData } = require('../app/data/jobs');
const { sectorsData } = require('../app/data/sectors');
const { coreSectorsData } = require('../app/data/coreSectors');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateProjects() {
  console.log('Migrating projects...');
  
  for (const project of projectsData) {
    // Insert project
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert({
        slug: project.slug,
        title: project.title,
        description: project.description,
        category: project.category,
        location: project.location,
        year: project.year,
        hero_image: project.heroImage,
        gallery: JSON.stringify(project.gallery || []),
        sectors: JSON.stringify(project.sectors || [])
      })
      .select()
      .single();

    if (projectError) {
      console.error('Error inserting project:', projectError);
      continue;
    }

    // Insert statistics
    if (project.stats) {
      for (const [index, stat] of project.stats.entries()) {
        await supabase.from('project_statistics').insert({
          project_id: projectData.id,
          label: stat.label,
          value: stat.value,
          display_order: index
        });
      }
    }

    // Insert sections
    if (project.sections) {
      for (const [index, section] of project.sections.entries()) {
        await supabase.from('project_sections').insert({
          project_id: projectData.id,
          title: section.title,
          content: section.content,
          items: JSON.stringify(section.items || []),
          display_order: index
        });
      }
    }
  }
  
  console.log('Projects migration completed');
}

async function migrateBlogPosts() {
  console.log('Migrating blog posts...');
  
  for (const post of blogPosts) {
    await supabase.from('blog_posts').insert({
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      image_src: post.imageSrc,
      date: post.date,
      tag: post.tag,
      excerpt: post.excerpt,
      content: JSON.stringify(post.content)
    });
  }
  
  console.log('Blog posts migration completed');
}

async function migrateNewsItems() {
  console.log('Migrating news items...');
  
  for (const item of newsItems) {
    await supabase.from('news_items').insert({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle,
      image_src: item.imageSrc,
      date: item.date,
      tag: item.tag,
      excerpt: item.excerpt,
      content: JSON.stringify(item.content)
    });
  }
  
  console.log('News items migration completed');
}

async function migrateJobListings() {
  console.log('Migrating job listings...');
  
  for (const job of jobsData) {
    await supabase.from('job_listings').insert({
      slug: job.slug,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: JSON.stringify(job.requirements || [])
    });
  }
  
  console.log('Job listings migration completed');
}

async function migrateSectorsServices() {
  console.log('Migrating sectors/services...');
  
  for (const sector of sectorsData) {
    const { data: sectorData, error: sectorError } = await supabase
      .from('sectors_services')
      .insert({
        slug: sector.slug,
        title: sector.title,
        subtitle: sector.subtitle,
        hero_image: sector.heroImage,
        description: sector.description,
        stats: JSON.stringify(sector.stats || []),
        highlights: JSON.stringify(sector.highlights || []),
        call_to_action_primary_text: sector.cta?.primaryText,
        call_to_action_primary_href: sector.cta?.primaryHref,
        call_to_action_secondary_text: sector.cta?.secondaryText,
        call_to_action_secondary_href: sector.cta?.secondaryHref
      })
      .select()
      .single();

    if (sectorError) {
      console.error('Error inserting sector:', sectorError);
      continue;
    }

    // Insert service sections
    if (sector.sections) {
      for (const [index, section] of sector.sections.entries()) {
        await supabase.from('service_sections').insert({
          service_id: sectorData.id,
          title: section.title,
          items: JSON.stringify(section.items || []),
          content: section.content,
          display_order: index
        });
      }
    }
  }
  
  console.log('Sectors/services migration completed');
}

async function migrateCoreServices() {
  console.log('Migrating core services...');
  
  for (const [index, service] of coreSectorsData.services.entries()) {
    const { data: coreServiceData, error: coreServiceError } = await supabase
      .from('core_services')
      .insert({
        title: service.title,
        icon: service.icon,
        image: service.image,
        call_to_action: service.callToAction,
        display_order: index
      })
      .select()
      .single();

    if (coreServiceError) {
      console.error('Error inserting core service:', coreServiceError);
      continue;
    }

    // Insert core service items
    if (service.items) {
      for (const [itemIndex, item] of service.items.entries()) {
        await supabase.from('core_service_items').insert({
          core_service_id: coreServiceData.id,
          title: item.title,
          description: item.description,
          display_order: itemIndex
        });
      }
    }
  }
  
  console.log('Core services migration completed');
}

async function runMigration() {
  try {
    await migrateProjects();
    await migrateBlogPosts();
    await migrateNewsItems();
    await migrateJobListings();
    await migrateSectorsServices();
    await migrateCoreServices();
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();
```

### 2.4 Run the Migration

```bash
node scripts/migrate-to-supabase.js
```

## Step 3: Supabase Client Setup

### 3.1 Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3.2 Create Supabase Client Utility

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for your tables
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: string
  location: string
  year: string
  hero_image: string
  gallery: string[]
  sectors: string[]
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle?: string
  image_src: string
  date: string
  tag?: string
  excerpt?: string
  content: string[]
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

// Add more interfaces as needed...
```

### 3.3 Create Data Fetching Functions

Create `lib/api.ts`:

```typescript
import { supabase } from './supabase'
import type { Project, BlogPost } from './supabase'

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_statistics(*),
      project_sections(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) throw error
  return data
}

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) throw error
  return data as BlogPost
}

// Add more API functions as needed...
```

## Step 4: Update Next.js Components

### 4.1 Update Project Components

Update `app/projects/page.tsx`:

```typescript
import { getProjects } from '@/lib/api'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {/* Render project data */}
        </div>
      ))}
    </div>
  )
}
```

### 4.2 Update Dynamic Routes

Update `app/projects/[slug]/page.tsx`:

```typescript
import { getProjectBySlug, getProjects } from '@/lib/api'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug
  }))
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProjectBySlug(params.slug)
  
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {/* Render project details */}
    </div>
  )
}
```

## Step 5: Advanced Features

### 5.1 Full-Text Search

Create search function:

```typescript
export async function searchProjects(query: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .textSearch('title', query)
    .eq('status', 'published')
  
  if (error) throw error
  return data
}
```

### 5.2 Pagination

```typescript
export async function getProjectsPaginated(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  const { data, error, count } = await supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(from, to)
  
  if (error) throw error
  
  return {
    data: data as Project[],
    count,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page
  }
}
```

### 5.3 Newsletter Subscription

```typescript
export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert({ email })
  
  if (error) {
    if (error.code === '23505') {
      throw new Error('Email already subscribed')
    }
    throw error
  }
  
  return data
}
```

## Step 6: Testing and Validation

### 6.1 Test Database Connection

Create `test-supabase.js`:

```javascript
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testConnection() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('Connection test failed:', error)
  } else {
    console.log('Connection successful! Sample data:', data)
  }
}

testConnection()
```

### 6.2 Run Tests

```bash
node test-supabase.js
```

## Step 7: Deployment Considerations

### 7.1 Environment Variables

Add to your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

### 7.2 Database Backups

Set up regular backups in Supabase dashboard:
1. Go to **Settings** → **Database**
2. Configure **Backup settings**
3. Set up **Point in Time Recovery**

### 7.3 Monitoring

Enable monitoring in Supabase:
1. Go to **Settings** → **Usage**
2. Set up **Email notifications**
3. Configure **Rate limiting**

## Troubleshooting

### Common Issues

1. **Connection refused**: Check your Supabase URL and anon key
2. **Permission denied**: Ensure RLS policies are properly configured
3. **Data not appearing**: Check that status fields are set to 'published'
4. **Slug conflicts**: Use the `generate_unique_slug` function

### Performance Optimization

1. **Add indexes** for frequently queried columns
2. **Use views** for complex queries
3. **Implement caching** for static content
4. **Optimize images** and use CDN

## Next Steps

1. **Set up authentication** for admin users
2. **Implement file storage** for images
3. **Add analytics** tracking
4. **Create admin dashboard** for content management
5. **Implement search functionality**
6. **Add multi-language support**

## Support

For Supabase-specific issues:
- Check [Supabase documentation](https://supabase.com/docs)
- Join [Supabase Discord](https://discord.supabase.com)
- Post on [Supabase GitHub discussions](https://github.com/supabase/supabase/discussions)