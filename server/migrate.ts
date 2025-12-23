import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { log } from './vite';
import * as schema from '@shared/schema';
import { eq } from 'drizzle-orm';

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    log('Skipping migrations: No DATABASE_URL found');
    return;
  }

  try {
    log('Running database migrations...');
    
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema });
    
    // Check if tables exist by trying to query
    try {
      await sql`SELECT 1 FROM projects LIMIT 1`;
      log('Database tables already exist');
    } catch (error) {
      // Tables don't exist, create them
      log('Creating database tables...');
      
      // Create all tables manually
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          technologies TEXT[] NOT NULL,
          live_url TEXT,
          github_url TEXT,
          image_url TEXT,
          featured TEXT NOT NULL DEFAULT 'false',
          "order" TEXT NOT NULL DEFAULT '0',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS certificates (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          issuer TEXT NOT NULL,
          issue_date TEXT NOT NULL,
          credential_id TEXT,
          credential_url TEXT,
          skills TEXT[] NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS skills (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          level TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS services (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS social_links (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          platform TEXT NOT NULL,
          url TEXT NOT NULL,
          icon TEXT NOT NULL,
          handle TEXT,
          "order" TEXT NOT NULL DEFAULT '0',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          tags TEXT[] NOT NULL,
          cover_image TEXT,
          published TEXT NOT NULL DEFAULT 'false',
          published_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS about_content (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          description TEXT NOT NULL,
          profile_image TEXT,
          stats TEXT[] NOT NULL,
          professional_summary TEXT,
          education_json TEXT,
          experience_json TEXT,
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      log('✅ Database tables created successfully');
    }
    
    log('✅ Migrations completed');
  } catch (error) {
    log('❌ Migration error:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - let app start even if migrations fail
  }
}

export async function seedDatabase() {
  if (!process.env.DATABASE_URL) {
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema });
    
    // Check if about_content exists, if not create default
    const existing = await db.query.aboutContent.findFirst();
    if (!existing) {
      log('Seeding database with default About content...');
      
      const education = [
        {
          institution: "Vivekananda Global University",
          degree: "Bachelor in Computer Applications (BCA)",
          specialization: "Full Stack and Cloud Computing",
          duration: "Sep 2024 - Jul 2027",
          grade: "9.43 CGPA",
        },
        {
          institution: "A.S. Public Senior Secondary School",
          degree: "12th Grade",
          specialization: "Science (Mathematics)",
          duration: "Completed",
          grade: "96%",
        },
      ];

      const experience = [
        {
          role: "Computer Teacher",
          company: "Anukriti Prakashan",
          type: "Part-time",
          duration: "Mar 2025 - Present",
          location: "Jaipur, Rajasthan, India",
          description: "Teaching computer fundamentals and modern technologies to students, developing curriculum materials, and fostering digital literacy.",
        },
        {
          role: "Computer Teacher",
          company: "InfoSphere",
          type: "Part-time",
          duration: "Sep 2024 - Aug 2025",
          location: "Jaipur, Rajasthan, India",
          description: "Taught the RS-CIT course, focusing on computer fundamentals and digital literacy. Designed engaging lessons and provided hands-on training.",
        },
        {
          role: "Back End Developer",
          company: "Zenz Aawara",
          type: "Internship",
          duration: "May 2025 - Jul 2025",
          location: "Jaipur, Rajasthan, India (Hybrid)",
          description: "Contributed to backend development by designing and optimizing server-side code while building RESTful APIs for effective data management.",
        },
      ];

      await db.insert(schema.aboutContent).values({
        title: "Hi, I'm Kartik Sharma",
        subtitle: "Kartik Sharma Jaipur | Software Developer | Freelancer",
        description: "Software Developer & Freelancer in Jaipur, turning complex problems into elegant digital solutions. Explore my work and let's build something amazing together.",
        stats: ["10+ Projects", "5+ Years Learning", "20+ Hours Teaching"],
        professionalSummary: "My academic curriculum has provided me with exposure to programming languages such as C, Python, and Java, as well as practical knowledge in web development, database management, and cloud computing.\n\nI am passionate about applying my theoretical knowledge to real-world projects. I have gained hands-on experience through internships and teaching roles, where I've developed both technical expertise and communication skills.\n\nI'm actively seeking opportunities to contribute to innovative projects, expand my skill set, and grow as a professional in the tech industry.",
        educationJson: JSON.stringify(education),
        experienceJson: JSON.stringify(experience),
      });

      log('✅ Database seeded with default content');
    }
  } catch (error) {
    log('⚠️ Seeding skipped:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - let app start even if seeding fails
  }
}
