import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { 
  Sparkles, ArrowRight, Loader2, ShieldCheck, 
  Scale, ScrollText, BookOpen, Gavel, User, CheckCircle, ArrowLeft, Lock, X, LogIn, Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Interface for the Card Format
interface LegalScenario {
  act: string;
  section: string;
  summary: string;
  detail: string;
  action: string;
}

type ViewState = "landing" | "app" | "how-it-works";

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState<LegalScenario[] | null>(null);
  
  // VIEW STATE
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  
  // LOGIN STATE
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { toast } = useToast();

  const handleLogoClick = () => {
    setCurrentView(isLoggedIn ? "app" : "landing");
    setScenarios(null);
  };

  const handleLogin = () => {
    if (email === "demo@lexai.com" && password === "demo123") {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      setCurrentView("app"); 
      toast({
        title: "Welcome back!",
        description: "You are now logged in as Demo User.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please use the demo account.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setCurrentView("landing"); 
    setScenarios(null);
    setInput("");
    toast({ description: "Signed out successfully." });
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your legal situation first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useCase: input }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      
      if (data.scenarios) {
        setScenarios(data.scenarios);
        toast({ title: "Success", description: "Legal analysis complete." });
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Could not analyze the case. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScenarios(null);
    setInput("");
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      
      {/* BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                    <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
                <p className="text-slate-400 text-sm">Sign in to access the Legal Analysis Engine.</p>
              </div>

              <div className="bg-slate-950 border border-dashed border-slate-700 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center justify-center gap-2">
                  Demo Credentials
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="text-center p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="block text-xs text-slate-500">Email</span>
                    demo@lexai.com
                  </div>
                  <div className="text-center p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="block text-xs text-slate-500">Password</span>
                    demo123
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email Address</label>
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="bg-slate-950 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <Input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="bg-slate-950 border-slate-700"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-lg">
                  Access Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button 
              onClick={() => setCurrentView("how-it-works")} 
              className={`transition-colors ${currentView === 'how-it-works' ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              How it works
            </button>
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 gap-2"
                onClick={handleSignOut}
              >
                <User className="w-4 h-4" /> Demo User (Sign Out)
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-slate-700 hover:bg-slate-800 gap-2"
                onClick={() => setIsLoginOpen(true)}
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1 container max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: HOW IT WORKS */}
          {currentView === "how-it-works" ? (
             <motion.div
               key="how-it-works"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="w-full max-w-4xl"
             >
               <Button 
                 variant="ghost" 
                 onClick={() => setCurrentView(isLoggedIn ? "app" : "landing")}
                 className="mb-8 hover:text-blue-400 pl-0 hover:bg-transparent"
               >
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back
               </Button>
               {/* How it works content */}
               <h1 className="text-4xl font-bold mb-6">How Legal Navigator Works</h1>
               <div className="grid grid-cols-1 gap-8">
                 <div className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 items-start">
                   <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 text-blue-400"><ScrollText className="w-6 h-6" /></div>
                   <div><h3 className="text-xl font-bold text-white mb-2">1. Input Analysis</h3><p className="text-slate-400">We parse your text to understand intent and jurisdiction.</p></div>
                 </div>
                 <div className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 items-start">
                   <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0 text-purple-400"><Sparkles className="w-6 h-6" /></div>
                   <div><h3 className="text-xl font-bold text-white mb-2">2. AI Retrieval</h3><p className="text-slate-400">Gemini cross-references your case against legal statutes.</p></div>
                 </div>
                 <div className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 items-start">
                   <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0 text-green-400"><CheckCircle className="w-6 h-6" /></div>
                   <div><h3 className="text-xl font-bold text-white mb-2">3. Structured Output</h3><p className="text-slate-400">Actionable cards with specific sections, not generic advice.</p></div>
                 </div>
               </div>
             </motion.div>
          ) : 
          
          /* VIEW 2: LANDING PAGE */
          !isLoggedIn ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl text-center space-y-12 mt-10"
            >
               <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Sparkles className="w-4 h-4" />
                   Powered by Gemini 2.5
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                   Your Personal <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                     Legal Intelligence
                   </span>
                 </h1>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                   Identify applicable laws, compliance steps, and risk factors in seconds.
                 </p>
               </div>

               <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                 <Button 
                   onClick={() => setIsLoginOpen(true)}
                   size="lg" 
                   className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 rounded-xl"
                 >
                   Sign In to Get Started <ArrowRight className="ml-2 w-5 h-5" />
                 </Button>
                 <Button 
                   onClick={() => setCurrentView("how-it-works")}
                   variant="outline" 
                   size="lg" 
                   className="h-14 px-8 text-lg border-slate-700 hover:bg-slate-800 rounded-xl"
                 >
                   Learn How It Works
                 </Button>
               </div>
            </motion.div>
          ) : (
            
          /* VIEW 3: APP (Logged In) */
          !scenarios ? (
            <motion.div
              key="app-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl text-center space-y-8"
            >
              <div className="flex flex-col items-center space-y-6">
                {/* LOGO */}
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/20">
                   <Scale className="w-10 h-10 text-blue-400" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Welcome, Demo User
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Ready to analyze your legal case? Describe the situation below.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:p-3 mt-10 shadow-2xl">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., I want to purchase an aeroplane from US..."
                  className="bg-transparent border-none focus-visible:ring-0 text-lg min-h-[150px] md:min-h-[200px] placeholder:text-slate-600 text-slate-200 resize-none"
                  disabled={isLoading}
                />
                <div className="flex justify-between items-center px-2 py-2 border-t border-white/5 mt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    Encrypted & Private
                  </div>
                  <Button 
                    onClick={handleSubmit} 
                    size="lg" 
                    className="gap-2 bg-blue-600 hover:bg-blue-500 text-white"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                    ) : (
                      <>Analyze Case <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Sub-View: Results */
            <motion.div
              key="app-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  Legal Analysis
                </h2>
                <Button variant="outline" onClick={handleReset} className="border-slate-700 hover:bg-slate-800">
                  New Search
                </Button>
              </div>

              {/* ----- NEW: USER QUERY DISPLAY ----- */}
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                 {/* Decorative background icon */}
                 <div className="absolute -right-4 -top-4 text-white/5 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Search className="w-24 h-24" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                       <User className="w-3 h-3" />
                       Your Query
                    </div>
                    <p className="text-lg md:text-xl text-slate-200 italic font-light leading-relaxed">
                       "{input}"
                    </p>
                 </div>
              </div>
              {/* ----------------------------------- */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenarios.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Gavel className="w-24 h-24" />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20">
                        {card.section || "Applicable Law"}
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 leading-tight min-h-[3rem]">{card.act}</h3>
                      <div className="h-px w-full bg-slate-700/50" />
                      <div className="space-y-2">
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider flex items-center gap-2"><BookOpen className="w-3 h-3" /> Summary</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{card.detail}</p>
                      </div>
                      <div className="pt-4 mt-auto">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                          <p className="text-green-400 text-xs font-bold uppercase mb-1 flex items-center gap-2"><Scale className="w-3 h-3" /> Action Required</p>
                          <p className="text-slate-300 text-sm font-medium">{card.action}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}