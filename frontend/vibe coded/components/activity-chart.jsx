/**
 * ActivityChart Component
 * Displays a cave-themed activity chart showing underground exploration progress
 * Uses earthy colors and cave aesthetic
 */
export function ActivityChart() {
  // Data points for the activity line graph [x, y coordinates]
  // Represents digging/exploration activity over time
  const points = [
    [10, 60], // Day 1 - moderate digging
    [30, 45], // Day 2 - deeper exploration
    [50, 50], // Day 3 - steady progress
    [70, 30], // Day 4 - major breakthrough
    [90, 35], // Day 5 - continued exploration
    [110, 20], // Day 6 - deep tunneling
    [130, 25], // Day 7 - excellent progress
    [150, 15], // Recent - very deep
    [170, 20], // Recent - consistent
    [190, 10], // Most recent - deepest level
  ]

  return (
    // Chart container with cave styling
    <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-4 shadow-md border-2 border-amber-300 relative overflow-hidden">
      {/* Cave texture background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-900"></div>
      </div>

      {/* Chart title with cave theme */}
      <h3 className="text-sm font-semibold text-amber-900 mb-3 relative z-10 flex items-center">⛏️ Digging Progress</h3>

      {/* SVG chart container */}
      <div className="h-20 relative z-10">
        <svg className="w-full h-full" viewBox="0 0 200 80">
          {/* Cave grid pattern */}
          <defs>
            <pattern id="caveGrid" width="20" height="16" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 16" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#caveGrid)" />

          {/* Underground tunnel line */}
          <polyline fill="none" stroke="#059669" strokeWidth="3" points={points.map((p) => p.join(",")).join(" ")} />

          {/* Gem deposits at data points */}
          {points.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#10b981" />
              <circle cx={x} cy={y} r="1" fill="#6ee7b7" />
            </g>
          ))}
        </svg>
      </div>

      {/* Chart caption with cave theme */}
      <div className="text-xs text-amber-700 mt-1 relative z-10">Last 7 excavations</div>

      {/* Small cave decorations */}
      <div className="absolute bottom-2 right-2 w-2 h-1 bg-amber-600 rounded-full opacity-40"></div>
      <div className="absolute top-2 right-3 w-1 h-1 bg-amber-700 rounded-full opacity-30"></div>
    </div>
  )
}
