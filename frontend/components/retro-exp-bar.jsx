/**
 * RetroExpBar Component
 * Displays an underground-themed experience bar with cave styling
 * Features dirt texture and gem-like progress indicator
 */
export function RetroExpBar() {
  return (
    // Main container with underground cave styling
    <div className="bg-gradient-to-r from-amber-900 to-amber-800 p-3 rounded-lg border-2 border-amber-700 mb-4 relative overflow-hidden">
      {/* Cave texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-900"></div>
        {/* Scattered dirt particles */}
        <div className="absolute top-1 left-2 w-1 h-1 bg-amber-600 rounded-full"></div>
        <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-amber-600 rounded-full"></div>
        <div className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-amber-600 rounded-full"></div>
      </div>

      {/* Header row showing EXP label and current/max values */}
      <div className="flex justify-between items-center mb-2 relative z-10">
        <span className="text-amber-200 text-xs font-mono font-bold flex items-center">💎 EXP</span>
        <span className="text-amber-100 text-xs font-mono">1,250 / 2,000</span>
      </div>

      {/* Progress bar container with cave styling */}
      <div className="h-4 bg-amber-950 border border-amber-800 relative overflow-hidden rounded">
        {/* Filled progress bar with gem-like gradient */}
        <div className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 relative w-[62.5%]">
          {/* Gem shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-30 animate-pulse"></div>
          {/* Small gem sparkles */}
          <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping"></div>
          <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-emerald-100 rounded-full animate-ping delay-500"></div>
        </div>
      </div>

      {/* Level display with cave theme */}
      <div className="text-center mt-2 relative z-10">
        <span className="text-amber-300 text-xs font-mono font-bold">⛏️ TUNNEL LEVEL 12</span>
      </div>
    </div>
  )
}
