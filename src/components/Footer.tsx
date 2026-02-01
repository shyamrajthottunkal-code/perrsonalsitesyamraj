import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="mailto:shyamrajthottunkal@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/shyam-raj-1997sep/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://github.com/shyamrajthottunkal-code"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Github className="h-5 w-5" />
            </motion.a>
          </div>

          {/* Email */}
          <a 
            href="mailto:shyamrajthottunkal@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            shyamrajthottunkal@gmail.com
          </a>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
            <p>© {currentYear} Shyam Raj. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>Built with React, Tailwind CSS & AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
};