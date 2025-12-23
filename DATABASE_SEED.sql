-- Kartik Sharma Portfolio Database Seed Script
-- Run these commands to populate your database with sample data

-- 1. INSERT ABOUT CONTENT
INSERT INTO about_content (id, title, subtitle, description, profile_image, stats, professional_summary, education_json, experience_json, updated_at) 
VALUES (
  gen_random_uuid(),
  'Kartik Sharma',
  'Full Stack Developer & UI/UX Designer',
  'I am a passionate developer with 5+ years of experience building scalable web applications. I specialize in modern JavaScript frameworks, cloud technologies, and creating intuitive user interfaces.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  ARRAY['5+ Years Experience', 'Web Development', 'UI/UX Design', '30+ Projects Completed'],
  'Results-driven Full Stack Developer with a passion for creating elegant solutions to complex problems. Expertise in React, Node.js, TypeScript, and PostgreSQL. Proven track record of delivering high-quality applications that enhance user experience and drive business growth.',
  '[{"institution":"Delhi Institute of Technology","degree":"B.Tech Computer Science","year":"2019","details":"CGPA: 8.2/10"}]',
  '[{"company":"Tech Innovations Ltd","position":"Senior Developer","duration":"2021-Present","description":"Leading frontend development and mentoring junior developers"},{"company":"Digital Solutions Inc","position":"Full Stack Developer","duration":"2019-2021","description":"Developed and maintained multiple client projects"}]',
  NOW()
);

-- 2. INSERT PROJECTS
INSERT INTO projects (id, title, description, technologies, live_url, github_url, image_url, featured, order, created_at) VALUES
(gen_random_uuid(), 'E-Commerce Platform', 'A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'], 'https://example.com/ecommerce', 'https://github.com/kartik/ecommerce', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop', 'true', '1', NOW()),
(gen_random_uuid(), 'Real-Time Chat Application', 'WebSocket-based chat app with message history, user presence, and file sharing capabilities.', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], 'https://example.com/chat', 'https://github.com/kartik/chat-app', 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop', 'true', '2', NOW()),
(gen_random_uuid(), 'Task Management System', 'Collaborative task management tool with real-time updates, team collaboration, and progress tracking.', ARRAY['React', 'Firebase', 'Tailwind CSS', 'TypeScript'], 'https://example.com/tasks', 'https://github.com/kartik/tasks', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop', 'true', '3', NOW()),
(gen_random_uuid(), 'AI Content Generator', 'SaaS platform for generating marketing content using OpenAI API with subscription billing.', ARRAY['Next.js', 'OpenAI API', 'Stripe', 'Prisma', 'PostgreSQL'], 'https://example.com/ai-gen', 'https://github.com/kartik/ai-content', 'https://images.unsplash.com/photo-1677442d019cecf8978f62efeee0a99d6f47a1ad?w=500&h=300&fit=crop', 'false', '4', NOW()),
(gen_random_uuid(), 'Analytics Dashboard', 'Real-time analytics dashboard with data visualization and custom report generation.', ARRAY['React', 'D3.js', 'Node.js', 'PostgreSQL'], 'https://example.com/analytics', 'https://github.com/kartik/analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop', 'false', '5', NOW());

-- 3. INSERT SKILLS
INSERT INTO skills (id, name, category, level, created_at) VALUES
(gen_random_uuid(), 'React', 'Frontend', 'Expert', NOW()),
(gen_random_uuid(), 'TypeScript', 'Frontend', 'Expert', NOW()),
(gen_random_uuid(), 'Node.js', 'Backend', 'Expert', NOW()),
(gen_random_uuid(), 'PostgreSQL', 'Database', 'Advanced', NOW()),
(gen_random_uuid(), 'Tailwind CSS', 'Frontend', 'Advanced', NOW()),
(gen_random_uuid(), 'GraphQL', 'Backend', 'Advanced', NOW()),
(gen_random_uuid(), 'Docker', 'DevOps', 'Intermediate', NOW()),
(gen_random_uuid(), 'AWS', 'Cloud', 'Intermediate', NOW()),
(gen_random_uuid(), 'Next.js', 'Frontend', 'Expert', NOW()),
(gen_random_uuid(), 'MongoDB', 'Database', 'Advanced', NOW()),
(gen_random_uuid(), 'REST APIs', 'Backend', 'Expert', NOW()),
(gen_random_uuid(), 'UI/UX Design', 'Design', 'Advanced', NOW());

-- 4. INSERT SERVICES
INSERT INTO services (id, title, description, icon, created_at) VALUES
(gen_random_uuid(), 'Web Development', 'Build responsive, scalable web applications using modern technologies and best practices.', 'Code', NOW()),
(gen_random_uuid(), 'UI/UX Design', 'Create beautiful and intuitive user interfaces that enhance user experience.', 'Palette', NOW()),
(gen_random_uuid(), 'API Development', 'Design and develop robust REST and GraphQL APIs for your applications.', 'Zap', NOW()),
(gen_random_uuid(), 'Database Design', 'Design and optimize databases for performance and scalability.', 'Database', NOW()),
(gen_random_uuid(), 'Cloud Solutions', 'Deploy and manage applications on AWS, Google Cloud, or Azure.', 'Cloud', NOW()),
(gen_random_uuid(), 'Consulting', 'Technical consulting for architecture, technology stack, and best practices.', 'MessageSquare', NOW());

-- 5. INSERT CERTIFICATES
INSERT INTO certificates (id, title, issuer, issue_date, credential_id, credential_url, skills, created_at) VALUES
(gen_random_uuid(), 'AWS Certified Solutions Architect', 'Amazon Web Services', '2023-06-15', 'AWS-2023-001', 'https://aws.amazon.com/verify/abc123', ARRAY['AWS', 'Cloud Architecture', 'DevOps'], NOW()),
(gen_random_uuid(), 'Google Cloud Professional Cloud Architect', 'Google Cloud', '2023-03-20', 'GCP-2023-001', 'https://cloud.google.com/verify/xyz789', ARRAY['Google Cloud', 'Cloud Architecture', 'Infrastructure'], NOW()),
(gen_random_uuid(), 'Docker Certified Associate', 'Docker Inc', '2022-11-10', 'DOCKER-2022-001', 'https://docker.com/verify/def456', ARRAY['Docker', 'Containerization', 'DevOps'], NOW()),
(gen_random_uuid(), 'JavaScript Specialist', 'Udacity', '2021-08-25', 'UDACITY-2021-001', 'https://udacity.com/verify/ghi789', ARRAY['JavaScript', 'Web Development', 'React'], NOW());

-- 6. INSERT SOCIAL LINKS
INSERT INTO social_links (id, platform, url, icon, handle, order, created_at) VALUES
(gen_random_uuid(), 'GitHub', 'https://github.com/kartik-sharma', 'Github', '@kartik-sharma', '1', NOW()),
(gen_random_uuid(), 'LinkedIn', 'https://linkedin.com/in/kartik-sharma', 'Linkedin', 'kartik-sharma', '2', NOW()),
(gen_random_uuid(), 'Twitter', 'https://twitter.com/kartik_dev', 'Twitter', '@kartik_dev', '3', NOW()),
(gen_random_uuid(), 'Portfolio', 'https://kartik.dev', 'Globe', 'kartik.dev', '4', NOW()),
(gen_random_uuid(), 'Email', 'mailto:kartik@example.com', 'Mail', 'kartik@example.com', '5', NOW());

-- 7. INSERT BLOG POSTS
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, tags, published, published_at, created_at, updated_at) VALUES
(gen_random_uuid(), 'Getting Started with React Hooks', 'getting-started-react-hooks', 
  'Learn the fundamentals of React Hooks and how they can simplify your functional components.',
  'React Hooks revolutionized the way we write React components. In this comprehensive guide, we''ll explore useState, useEffect, useContext, and custom hooks. Hooks allow you to use state and other React features without writing class components. This makes your code more modular and easier to understand. We''ll cover best practices and common patterns you''ll encounter in real-world applications.',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop',
  ARRAY['React', 'JavaScript', 'Hooks', 'Tutorial'],
  'true', NOW(), NOW(), NOW()),
  
(gen_random_uuid(), 'Node.js Best Practices 2024', 'nodejs-best-practices-2024',
  'Essential best practices for building scalable and secure Node.js applications.',
  'As Node.js continues to evolve, staying updated with best practices is crucial. In 2024, we''ve seen significant improvements in async/await patterns, error handling, and security measures. This article covers middleware patterns, proper error handling, security best practices, and performance optimization techniques. Learn how to structure your Node.js applications for long-term maintainability.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
  ARRAY['Node.js', 'Backend', 'Best Practices'],
  'true', NOW(), NOW(), NOW()),
  
(gen_random_uuid(), 'Building Scalable APIs with TypeScript', 'scalable-apis-typescript',
  'A deep dive into creating production-ready APIs using TypeScript and modern tooling.',
  'TypeScript brings type safety to your API development, reducing bugs and improving developer experience. Learn how to structure your API projects, implement proper error handling, validation, and authentication. We''ll explore testing strategies and deployment patterns. With TypeScript, you can catch errors at compile-time and provide better IDE support for your team.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
  ARRAY['TypeScript', 'API', 'Backend', 'Architecture'],
  'true', NOW(), NOW(), NOW()),
  
(gen_random_uuid(), 'CSS Grid Mastery: Advanced Layouts', 'css-grid-mastery',
  'Master CSS Grid and create complex, responsive layouts without frameworks.',
  'CSS Grid is a powerful layout tool that allows you to create sophisticated, responsive designs. This guide covers grid structure, naming conventions, responsive design patterns, and real-world examples. We''ll build projects that range from simple two-column layouts to complex dashboard interfaces. CSS Grid gives you complete control over your layout, making it easier to create responsive designs that work across all devices.',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop',
  ARRAY['CSS', 'Grid', 'Frontend', 'Design'],
  'true', NOW(), NOW(), NOW());

-- Summary
-- Total records added:
-- - About Content: 1
-- - Projects: 5
-- - Skills: 12
-- - Services: 6
-- - Certificates: 4
-- - Social Links: 5
-- - Blog Posts: 4
-- Total: 37 records
