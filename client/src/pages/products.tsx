import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Globe, Smartphone, Layout, ExternalLink, Star, Zap, CheckCircle, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

const categoryConfig = {
  portfolio: {
    label: "Portfolio Website",
    icon: Globe,
    color: "from-violet-500 to-purple-600",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  },
  app: {
    label: "Application",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  "app-ui": {
    label: "App UI Kit",
    icon: Layout,
    color: "from-rose-500 to-pink-600",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
};

const FILTER_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "portfolio", label: "Portfolio Sites" },
  { value: "app", label: "Applications" },
  { value: "app-ui", label: "App UI Kits" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const config = categoryConfig[product.category as keyof typeof categoryConfig] ?? categoryConfig.portfolio;
  const Icon = config.icon;
  const isFeatured = product.featured === "true";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      data-testid={`card-product-${product.id}`}
      className={`group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 ${
        isFeatured ? "border-primary/40 shadow-md shadow-primary/10" : "border-border"
      }`}
    >
      {isFeatured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          <Star className="h-3 w-3 fill-current" /> Featured
        </div>
      )}

      {/* Image / gradient header */}
      <div className={`relative h-44 bg-gradient-to-br ${config.color} flex items-center justify-center overflow-hidden`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/80">
            <Icon className="h-14 w-14 drop-shadow" />
            <span className="text-sm font-medium">{config.label}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg leading-tight" data-testid={`text-product-title-${product.id}`}>
            {product.title}
          </h3>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full border ${config.badge}`}
            data-testid={`text-product-category-${product.id}`}
          >
            {config.label}
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {product.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {product.technologies && product.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-extrabold text-primary" data-testid={`text-product-price-${product.id}`}>
              {product.price}
            </span>
          </div>
          <div className="flex gap-2">
            {product.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`button-demo-${product.id}`}
              >
                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            <Button
              size="sm"
              asChild
              data-testid={`button-buy-${product.id}`}
            >
              <a href="/contact">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Buy Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filtered = activeFilter === "all"
    ? products
    : products.filter((p) => p.category === activeFilter);

  const featured = products.filter((p) => p.featured === "true");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <ShoppingBag className="h-4 w-4" />
              Premium Digital Products
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Ready-Made{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Digital Products
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Professional portfolio websites, full-stack applications, and stunning app UI kits — 
              built with modern tech, ready to launch. Get your digital presence live in days, not months.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {[
                { icon: Zap, text: "Fast Delivery" },
                { icon: CheckCircle, text: "Production Ready" },
                { icon: Star, text: "Premium Quality" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-4 sticky top-16 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`filter-${opt.value}`}
                onClick={() => setActiveFilter(opt.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === opt.value
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt.label}
                {opt.value !== "all" && (
                  <span className="ml-2 text-xs opacity-70">
                    ({products.filter((p) => p.category === opt.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground">
                Check back soon — products are being added.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Something{" "}
              <span className="text-primary">Custom?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Don't see what you need? I build fully custom portfolio sites, applications,
              and UI kits tailored to your exact requirements.
            </p>
            <Button size="lg" asChild data-testid="button-custom-request">
              <a href="/contact">
                <MessageCircle className="h-5 w-5 mr-2" />
                Request Custom Build
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
