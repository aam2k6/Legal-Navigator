import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/Logo";
import { useAnalyzeCase } from "@/hooks/use-inquiry";
import ReactMarkdown from "react-markdown";
import { Sparkles, ArrowRight, Loader2, ShieldCheck, Scale, ScrollText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [input, setInput] = useState("");
  const { mutate, isPending, data, error, reset } = useAnalyzeCase();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your legal situation first.",
        variant: "destructive",
      });
      return;
    }
    mutate({ useCase: input });
  };

  const handleReset = () => {
    reset();
    setInput("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">How it works</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Legal Disclaimers</a>
            <Button variant="outline" size="sm" className="ml-2">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!data ? (
            <motion.div
              key="input-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl text-center space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered Legal Assistant
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Legal Clarity in <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    Plain English
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Describe your situation and let our advanced AI analyze relevant laws, 
                  regulations, and required steps instantly.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-2 md:p-3 mt-10 transition-all duration-300 focus-within:ring-2 ring-primary/50">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., I'm buying a used car from a private seller in California. What legal steps do I need to take to ensure the transfer is valid?"
                  className="bg-transparent border-none focus-visible:ring-0 text-lg min-h-[150px] md:min-h-[200px] placeholder:text-muted-foreground/50"
                  disabled={isPending}
                />
                <div className="flex justify-between items-center px-2 py-2 border-t border-white/5 mt-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Encrypted & Private
                  </div>
                  <Button 
                    onClick={handleSubmit} 
                    size="lg" 
                    className="gap-2 shadow-xl shadow-primary/20"
                    disabled={isPending || !input.trim()}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing Law...
                      </>
                    ) : (
                      <>
                        Analyze Case
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <Scale className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Precise Analysis</h3>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of relevant statutes and regulations for your specific jurisdiction.</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                    <ScrollText className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Actionable Steps</h3>
                  <p className="text-sm text-muted-foreground">Clear, step-by-step instructions on what documents to file and procedures to follow.</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">Identify potential pitfalls and compliance risks before they become legal problems.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  Analysis Complete
                </h2>
                <Button variant="outline" onClick={handleReset}>
                  Analyze Another Case
                </Button>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden border border-primary/20">
                <div className="bg-primary/5 px-6 py-4 border-b border-primary/10">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Your Query</h3>
                  <p className="mt-1 text-muted-foreground line-clamp-2">{input}</p>
                </div>
                <div className="p-8 md:p-10 prose prose-invert prose-lg max-w-none">
                  <ReactMarkdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 border-b border-white/10 pb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-blue-200 mb-3 mt-6" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-medium text-purple-200 mb-2 mt-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="space-y-2 my-4 list-disc pl-6 text-gray-300" {...props} />,
                      li: ({node, ...props}) => <li className="pl-2" {...props} />,
                      p: ({node, ...props}) => <p className="leading-relaxed text-gray-300 mb-4" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                    }}
                  >
                    {data.result}
                  </ReactMarkdown>
                </div>
                <div className="bg-black/20 px-6 py-4 border-t border-white/5 text-xs text-muted-foreground flex justify-between">
                  <span>Generated by LexAI Analysis Engine</span>
                  <span>Disclaimer: Not a substitute for professional legal advice.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5 mt-auto bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 LexAI Technologies. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
