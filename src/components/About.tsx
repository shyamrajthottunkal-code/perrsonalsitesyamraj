import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Zap, Palette } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description: "React, TypeScript, Next.js, and modern CSS with a focus on performance and accessibility.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Building practical LLM solutions using APIs like Gemini, GPT, and Claude for real-world applications.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing web vitals, lazy loading, and efficient state management for lightning-fast experiences.",
  },
  {
    icon: Palette,
    title: "Design Systems",
    description: "Creating scalable, consistent UI component libraries and design tokens for teams.",
  },
];

const techStack = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js",
  "Python", "PostgreSQL", "Supabase", "Gemini API", "OpenAI",
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a frontend engineer passionate about creating seamless user experiences 
              that leverage the power of AI. With expertise in modern JavaScript frameworks 
              and a deep understanding of LLM capabilities, I build applications that are 
              not just functional, but intelligently intuitive.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-primary"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-heading text-lg font-semibold text-muted-foreground mb-4">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground hover:border-primary/50 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
