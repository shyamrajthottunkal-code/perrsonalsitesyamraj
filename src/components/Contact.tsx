import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Sparkles, Loader2, Copy, Check, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [draftMessage, setDraftMessage] = useState("");
  const [refinedMessage, setRefinedMessage] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRefineMessage = async () => {
    if (!draftMessage.trim()) {
      toast.error("Please enter a message to refine");
      return;
    }

    setIsRefining(true);
    setRefinedMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/refine-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ message: draftMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refine message");
      }

      const data = await response.json();
      setRefinedMessage(data.refinedMessage);
      toast.success("Message refined successfully!");
    } catch (error) {
      console.error("Error refining message:", error);
      toast.error("Unable to refine message. Please try again.");
      // Fallback demo response when API is not available
      setRefinedMessage(
        `Dear Shyam,\n\nI hope this message finds you well. ${draftMessage}\n\nI would greatly appreciate the opportunity to discuss this further at your earliest convenience.\n\nBest regards`
      );
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(refinedMessage);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-1/2 h-96 bg-glow-secondary/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Use the AI Message Refiner below to craft 
              a professional message, or reach out directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* AI Message Refiner Card */}
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-glow-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Wand2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">AI Message Refiner</h3>
                    <p className="text-sm text-muted-foreground">Powered by Gemini</p>
                  </div>
                </div>

                {/* Draft Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Draft Message
                  </label>
                  <textarea
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    placeholder="Type a quick message... e.g., 'Hey, I saw your portfolio. Want to talk about a project.'"
                    className="w-full h-32 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Refine Button */}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mb-6"
                  onClick={handleRefineMessage}
                  disabled={isRefining || !draftMessage.trim()}
                >
                  {isRefining ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Refine with AI
                    </>
                  )}
                </Button>

                {/* Refined Output */}
                {refinedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Refined Message
                    </label>
                    <div className="relative">
                      <div className="p-4 rounded-xl bg-secondary/50 border border-primary/20 min-h-[128px]">
                        <p className="text-foreground whitespace-pre-wrap">{refinedMessage}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Direct Contact Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 text-center"
            >
              <p className="text-muted-foreground mb-4">Or reach out directly:</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="mailto:shyamrajthottunkal@gmail.com">
                    <Send className="h-4 w-4 mr-2" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/shyam-raj-thottunkal" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
