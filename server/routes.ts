import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, ensureAuthenticated } from "./auth";
import { sendTelegramNotification } from "./telegram";
import {
  insertProjectSchema,
  insertCertificateSchema,
  insertSkillSchema,
  insertServiceSchema,
  insertSocialLinkSchema,
  insertContactMessageSchema,
  insertBlogPostSchema,
  insertAboutContentSchema,
  insertEducationSchema,
  insertExperienceSchema,
  insertProfessionalSummarySchema,
  insertBlogLikeSchema,
  insertBlogCommentSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);
  
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/projects", ensureAuthenticated, async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const project = await storage.createProject(result.data);
    res.json(project);
  });

  app.patch("/api/projects/:id", ensureAuthenticated, async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const project = await storage.updateProject(req.params.id, result.data);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.delete("/api/projects/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/certificates", async (_req, res) => {
    const certificates = await storage.getCertificates();
    res.json(certificates);
  });

  app.get("/api/certificates/:id", async (req, res) => {
    const certificate = await storage.getCertificate(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json(certificate);
  });

  app.post("/api/certificates", ensureAuthenticated, async (req, res) => {
    const result = insertCertificateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const certificate = await storage.createCertificate(result.data);
    res.json(certificate);
  });

  app.patch("/api/certificates/:id", ensureAuthenticated, async (req, res) => {
    const result = insertCertificateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const certificate = await storage.updateCertificate(req.params.id, result.data);
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json(certificate);
  });

  app.delete("/api/certificates/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteCertificate(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get("/api/skills/:id", async (req, res) => {
    const skill = await storage.getSkill(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  });

  app.post("/api/skills", ensureAuthenticated, async (req, res) => {
    const result = insertSkillSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const skill = await storage.createSkill(result.data);
    res.json(skill);
  });

  app.patch("/api/skills/:id", ensureAuthenticated, async (req, res) => {
    const result = insertSkillSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const skill = await storage.updateSkill(req.params.id, result.data);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  });

  app.delete("/api/skills/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteSkill(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  });

  app.post("/api/services", ensureAuthenticated, async (req, res) => {
    const result = insertServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const service = await storage.createService(result.data);
    res.json(service);
  });

  app.patch("/api/services/:id", ensureAuthenticated, async (req, res) => {
    const result = insertServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const service = await storage.updateService(req.params.id, result.data);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  });

  app.delete("/api/services/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteService(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/social-links", async (_req, res) => {
    const socialLinks = await storage.getSocialLinks();
    res.json(socialLinks);
  });

  app.get("/api/social-links/:id", async (req, res) => {
    const socialLink = await storage.getSocialLink(req.params.id);
    if (!socialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(socialLink);
  });

  app.post("/api/social-links", ensureAuthenticated, async (req, res) => {
    const result = insertSocialLinkSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const socialLink = await storage.createSocialLink(result.data);
    res.json(socialLink);
  });

  app.patch("/api/social-links/:id", ensureAuthenticated, async (req, res) => {
    const result = insertSocialLinkSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const socialLink = await storage.updateSocialLink(req.params.id, result.data);
    if (!socialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(socialLink);
  });

  app.delete("/api/social-links/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteSocialLink(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json({ success: true });
  });

app.post("/api/contact", async (req, res) => {
    const result = insertContactMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    
    try {
      // 1. Save message to database (primary storage)
      const message = await storage.createContactMessage(result.data);
      console.log('✅ Contact message saved to database:', message.id);
      
      // 2. Send instant Telegram notification (non-blocking, but tracked)
      sendTelegramNotification(result.data)
        .then(success => {
          if (success) {
            console.log('✅ Telegram notification sent');
          } else {
            console.warn('⚠️ Telegram notification failed (check credentials)');
          }
        })
        .catch(error => {
          console.error('❌ Telegram notification error:', error);
        });
      
      res.json(message);
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ error: "Failed to process contact message" });
    }
  });

  app.get("/api/contact-messages", ensureAuthenticated, async (_req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  app.get("/api/blog-posts", async (req, res) => {
    const publishedOnly = req.query.published === 'true';
    const blogPosts = await storage.getBlogPosts(publishedOnly);
    res.json(blogPosts);
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    const blogPost = await storage.getBlogPostBySlug(req.params.slug);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const blogPost = await storage.getBlogPost(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.post("/api/blog-posts", ensureAuthenticated, async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const blogPost = await storage.createBlogPost(result.data);
    res.json(blogPost);
  });

  app.patch("/api/blog-posts/:id", ensureAuthenticated, async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const blogPost = await storage.updateBlogPost(req.params.id, result.data);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  });

  app.delete("/api/blog-posts/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteBlogPost(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/about-content", async (_req, res) => {
    const content = await storage.getAboutContent();
    res.json(content);
  });

  app.post("/api/about-content", ensureAuthenticated, async (req, res) => {
    const result = insertAboutContentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const content = await storage.createOrUpdateAboutContent(result.data);
    res.json(content);
  });

  // Education routes
  app.get("/api/education", async (_req, res) => {
    const educationList = await storage.getEducation();
    res.json(educationList);
  });

  app.get("/api/education/:id", async (req, res) => {
    const item = await storage.getEducationItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(item);
  });

  app.post("/api/education", ensureAuthenticated, async (req, res) => {
    const result = insertEducationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.createEducation(result.data);
    res.json(item);
  });

  app.patch("/api/education/:id", ensureAuthenticated, async (req, res) => {
    const result = insertEducationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.updateEducation(req.params.id, result.data);
    if (!item) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(item);
  });

  app.delete("/api/education/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteEducation(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json({ success: true });
  });

  // Experience routes
  app.get("/api/experience", async (_req, res) => {
    const experienceList = await storage.getExperience();
    res.json(experienceList);
  });

  app.get("/api/experience/:id", async (req, res) => {
    const item = await storage.getExperienceItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(item);
  });

  app.post("/api/experience", ensureAuthenticated, async (req, res) => {
    const result = insertExperienceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.createExperience(result.data);
    res.json(item);
  });

  app.patch("/api/experience/:id", ensureAuthenticated, async (req, res) => {
    const result = insertExperienceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.updateExperience(req.params.id, result.data);
    if (!item) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(item);
  });

  app.delete("/api/experience/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteExperience(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ success: true });
  });

  // Professional Summary routes
  app.get("/api/professional-summary", async (_req, res) => {
    const summaryList = await storage.getProfessionalSummary();
    res.json(summaryList);
  });

  app.get("/api/professional-summary/:id", async (req, res) => {
    const item = await storage.getProfessionalSummaryItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Professional summary not found" });
    }
    res.json(item);
  });

  app.post("/api/professional-summary", ensureAuthenticated, async (req, res) => {
    const result = insertProfessionalSummarySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.createProfessionalSummary(result.data);
    res.json(item);
  });

  app.patch("/api/professional-summary/:id", ensureAuthenticated, async (req, res) => {
    const result = insertProfessionalSummarySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const item = await storage.updateProfessionalSummary(req.params.id, result.data);
    if (!item) {
      return res.status(404).json({ error: "Professional summary not found" });
    }
    res.json(item);
  });

  app.delete("/api/professional-summary/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteProfessionalSummary(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Professional summary not found" });
    }
    res.json({ success: true });
  });

  // Blog Likes routes
  app.get("/api/blog-posts/:postId/likes", async (req, res) => {
    const count = await storage.getBlogLikeCount(req.params.postId);
    res.json({ count });
  });

  app.get("/api/blog-posts/:postId/likes/check/:visitorId", async (req, res) => {
    const hasLiked = await storage.hasUserLiked(req.params.postId, req.params.visitorId);
    res.json({ hasLiked });
  });

  app.post("/api/blog-posts/:postId/likes", async (req, res) => {
    const { visitorId } = req.body;
    if (!visitorId) {
      return res.status(400).json({ error: "Visitor ID is required" });
    }
    
    const hasLiked = await storage.hasUserLiked(req.params.postId, visitorId);
    if (hasLiked) {
      return res.status(400).json({ error: "Already liked" });
    }
    
    const like = await storage.addBlogLike({
      postId: req.params.postId,
      visitorId,
    });
    res.json(like);
  });

  app.delete("/api/blog-posts/:postId/likes", async (req, res) => {
    const { visitorId } = req.body;
    if (!visitorId) {
      return res.status(400).json({ error: "Visitor ID is required" });
    }
    
    const success = await storage.removeBlogLike(req.params.postId, visitorId);
    res.json({ success });
  });

  // Blog Comments routes
  app.get("/api/blog-posts/:postId/comments", async (req, res) => {
    const approvedOnly = req.query.approved === 'true';
    const comments = await storage.getBlogComments(req.params.postId, approvedOnly);
    res.json(comments);
  });

  app.post("/api/blog-posts/:postId/comments", async (req, res) => {
    const result = insertBlogCommentSchema.safeParse({
      ...req.body,
      postId: req.params.postId,
    });
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    const comment = await storage.createBlogComment(result.data);
    res.json(comment);
  });

  app.patch("/api/blog-comments/:id/approve", ensureAuthenticated, async (req, res) => {
    const comment = await storage.approveBlogComment(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  });

  app.delete("/api/blog-comments/:id", ensureAuthenticated, async (req, res) => {
    const success = await storage.deleteBlogComment(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ success: true });
  });

  // CV Generation endpoint
  app.get("/api/generate-cv", async (_req, res) => {
    try {
      const [
        aboutContent,
        education,
        experience,
        skills,
        projects,
        certificates,
        socialLinks,
        professionalSummary,
      ] = await Promise.all([
        storage.getAboutContent(),
        storage.getEducation(),
        storage.getExperience(),
        storage.getSkills(),
        storage.getProjects(),
        storage.getCertificates(),
        storage.getSocialLinks(),
        storage.getProfessionalSummary(),
      ]);

      const cvData = {
        about: aboutContent,
        education,
        experience,
        skills,
        projects,
        certificates,
        socialLinks,
        professionalSummary,
      };

      res.json(cvData);
    } catch (error) {
      console.error('Error generating CV data:', error);
      res.status(500).json({ error: 'Failed to generate CV data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
