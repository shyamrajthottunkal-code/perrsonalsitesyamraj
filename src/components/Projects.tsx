import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKEDIN_URL = "https://www.linkedin.com/in/shyam-raj-1997sep/";

const projects = [
  {
    title: "AI Content Studio",
    description: "A full-stack content generation platform powered by LLMs. Features real-time streaming, markdown editing, and smart templates for marketing copy.",
    tags: ["React", "TypeScript", "Gemini API", "Tailwind"],
    featured: true,
    gradient: "from-primary/10 to-muted/20",
  },
  {
    title: "Smart Dashboard",
    description: "An analytics dashboard with AI-powered insights. Natural language queries transform into interactive data visualizations.",
    tags: ["Next.js", "PostgreSQL", "ChatGPT", "Recharts"],
    featured: false,
    gradient: "from-muted/20 to-primary/10",
  },
  {
    title: "Code Review Assistant",
    description: "Browser extension that provides AI-powered code suggestions and reviews directly in GitHub PRs.",
    tags: ["TypeScript", "Chrome API", "Gemini", "Webpack"],
    featured: false,
    gradient: "from-primary/10 to-muted/10",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A selection of projects that showcase my expertise in building 
              AI-enhanced applications with modern web technologies.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-foreground/30 transition-all duration-500 cursor-pointer ${
                  project.featured ? "md:col-span-2" : ""
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 md:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-medium">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};