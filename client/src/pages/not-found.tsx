import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl relative z-10">
        <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-2 font-display">404</h1>
          <h2 className="text-xl font-semibold text-muted-foreground mb-6">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8 max-w-xs">
            The legal document you are looking for has been moved, deleted, or never existed.
          </p>

          <Link href="/">
            <Button size="lg" className="w-full neon-border">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
