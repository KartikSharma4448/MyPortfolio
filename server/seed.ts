import { db } from './db';
import {
  projects,
  certificates,
  skills,
  services,
  socialLinks,
  blogPosts,
  aboutContent,
} from '@shared/schema';

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingProjects = await db.select().from(projects).limit(1);
    if (existingProjects.length > 0) {
      return; // Already seeded
    }

    // Insert about content
    await db.insert(aboutContent).values({
      id: crypto.randomUUID(),
      title: 'Kartik Sharma',
      subtitle: 'Full Stack Developer & UI/UX Designer',
      description:
        'I am a passionate developer with 5+ years of experience building scalable web applications. I specialize in modern JavaScript frameworks, cloud technologies, and creating intuitive user interfaces.',
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      stats: ['5+ Years Experience', 'Web Development', 'UI/UX Design', '30+ Projects Completed'],
      professionalSummary:
        'Results-driven Full Stack Developer with a passion for creating elegant solutions to complex problems.',
      updatedAt: new Date(),
    });

    // Insert projects
    const projectsData = [
      {
        id: crypto.randomUUID(),
        title: 'HOPE-PAWS',
        description:
          'Developed an AI-powered platform focused on the safety of stray animals and road safety in Jaipur.',
        technologies: ['AI', 'Web Design', 'Emergency Response', 'Community Platform'],
        liveUrl: null,
        githubUrl: null,
        imageUrl: null,
        featured: 'true',
        order: '0',
        createdAt: new Date(),
      },
    ];

    for (const proj of projectsData) {
      await db.insert(projects).values(proj);
    }

    // Insert skills
    const skillsData = [
      { id: crypto.randomUUID(), name: 'Software Development', category: 'technical', level: 'advanced', createdAt: new Date() },
      { id: crypto.randomUUID(), name: 'Web Development', category: 'technical', level: 'advanced', createdAt: new Date() },
      { id: crypto.randomUUID(), name: 'Python', category: 'technical', level: 'intermediate', createdAt: new Date() },
      { id: crypto.randomUUID(), name: 'Java', category: 'technical', level: 'intermediate', createdAt: new Date() },
      { id: crypto.randomUUID(), name: 'React', category: 'technical', level: 'advanced', createdAt: new Date() },
    ];

    for (const skill of skillsData) {
      await db.insert(skills).values(skill);
    }

    // Insert services
    const servicesData = [
      { id: crypto.randomUUID(), title: 'Web Design', description: 'Create beautiful, responsive websites', icon: 'Globe', createdAt: new Date() },
      { id: crypto.randomUUID(), title: 'Logo Design', description: 'Design unique and memorable logos', icon: 'Palette', createdAt: new Date() },
      { id: crypto.randomUUID(), title: 'Web Development', description: 'Build robust, scalable web applications', icon: 'Code', createdAt: new Date() },
    ];

    for (const service of servicesData) {
      await db.insert(services).values(service);
    }

    // Insert social links
    const socialLinksData = [
      {
        id: crypto.randomUUID(),
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/kartik-sharma06',
        icon: 'Linkedin',
        handle: '@kartik-sharma06',
        order: '0',
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        platform: 'GitHub',
        url: 'https://github.com/kartiksharma4448',
        icon: 'Github',
        handle: '@kartiksharma4448',
        order: '1',
        createdAt: new Date(),
      },
    ];

    for (const link of socialLinksData) {
      await db.insert(socialLinks).values(link);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
