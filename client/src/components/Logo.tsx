import { Scale } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/30">
        <Scale className="w-5 h-5 text-white" />
        <div className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-white font-display">
        Lex<span className="text-primary">AI</span>
      </span>
    </div>
  );
}
