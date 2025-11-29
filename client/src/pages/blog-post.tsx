import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, ArrowLeft, Heart, MessageCircle, Send, User } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { BlogPost, BlogComment } from "@shared/schema";

function getVisitorId(): string {
  const key = 'portfolio_visitor_id';
  let visitorId = localStorage.getItem(key);
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, visitorId);
  }
  return visitorId;
}

function LikeButton({ postId }: { postId: string }) {
  const { toast } = useToast();
  const visitorId = getVisitorId();

  const { data: likeCount = 0 } = useQuery<number>({
    queryKey: ["/api/blog-posts", postId, "likes"],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${postId}/likes`);
      const data = await res.json();
      return data.count;
    },
  });

  const { data: hasLiked = false } = useQuery<boolean>({
    queryKey: ["/api/blog-posts", postId, "likes", "check", visitorId],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${postId}/likes/check/${visitorId}`);
      const data = await res.json();
      return data.hasLiked;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (hasLiked) {
        return await apiRequest("DELETE", `/api/blog-posts/${postId}/likes`, { visitorId });
      }
      return await apiRequest("POST", `/api/blog-posts/${postId}/likes`, { visitorId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts", postId, "likes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts", postId, "likes", "check", visitorId] });
    },
    onError: () => {
      toast({ title: "Failed to update like", variant: "destructive" });
    },
  });

  return (
    <Button
      variant={hasLiked ? "default" : "outline"}
      size="sm"
      onClick={() => likeMutation.mutate()}
      disabled={likeMutation.isPending}
      data-testid="button-like-post"
      className="gap-2"
    >
      <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
      {likeCount} {likeCount === 1 ? "Like" : "Likes"}
    </Button>
  );
}

function CommentsSection({ postId }: { postId: string }) {
  const { toast } = useToast();
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");

  const { data: comments = [], isLoading } = useQuery<BlogComment[]>({
    queryKey: ["/api/blog-posts", postId, "comments"],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${postId}/comments?approved=true`);
      return res.json();
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/blog-posts/${postId}/comments`, {
        name: authorName,
        email: authorEmail || "",
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts", postId, "comments"] });
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
      toast({ title: "Comment submitted! It will appear after approval." });
    },
    onError: () => {
      toast({ title: "Failed to submit comment", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      toast({ title: "Please fill in your name and comment", variant: "destructive" });
      return;
    }
    submitMutation.mutate();
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        Comments ({comments.length})
      </h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="authorName">Name *</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name"
                  data-testid="input-comment-author"
                />
              </div>
              <div>
                <Label htmlFor="authorEmail">Email (optional)</Label>
                <Input
                  id="authorEmail"
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="input-comment-email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                rows={4}
                data-testid="input-comment-content"
              />
            </div>
            <Button type="submit" disabled={submitMutation.isPending} data-testid="button-submit-comment">
              {submitMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit Comment
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : comments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No comments yet. Be the first to comment!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} data-testid={`comment-${comment.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{comment.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <Card>
          {blogPost.coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={blogPost.coverImage}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time>
                  {blogPost.publishedAt
                    ? new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Draft'}
                </time>
              </div>
              <LikeButton postId={blogPost.id} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-blog-title">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                {blogPost.excerpt}
              </p>
              <div className="whitespace-pre-wrap">{blogPost.content}</div>
            </div>
          </CardContent>
        </Card>

        <CommentsSection postId={blogPost.id} />
      </div>
    </div>
  );
}
