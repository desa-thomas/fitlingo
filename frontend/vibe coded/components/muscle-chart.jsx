/**
 * MuscleChart Component
 * Displays a cave-themed muscle group chart showing different tunnel excavation areas
 * Each bar represents digging frequency in different underground areas
 */
export function MuscleChart() {
  // Underground excavation data with cave-themed colors
  const excavationAreas = [
    { height: "80%", color: "bg-amber-600", icon: "🦵", label: "Deep Shafts" }, // Legs - deep digging
    { height: "60%", color: "bg-red-700", icon: "💪", label: "Main Tunnels" }, // Chest - main excavation
    { height: "90%", color: "bg-emerald-700", icon: "🏋️", label: "Side Chambers" }, // Back - chamber work
    { height: "45%", color: "bg-amber-800", icon: "🤲", label: "Surface Work" }, // Shoulders - lighter work
    { height: "70%", color: "bg-stone-600", icon: "💪", label: "Rock Breaking" }, // Arms - breaking rocks
  ]

  return (
    // Chart container with cave styling
    <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-4 shadow-md border-2 border-amber-300 relative overflow-hidden">
      {/* Cave texture background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-900"></div>
      </div>

      {/* Chart title with cave theme */}
      <h3 className="text-sm font-semibold text-amber-900 mb-3 relative z-10 flex items-center">🕳️ Excavation Areas</h3>

      {/* Bar chart container with bottom alignment */}
      <div className="flex items-end justify-between h-20 gap-1 relative z-10">
        {/* Generate bars for each excavation area */}
        {excavationAreas.map((area, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            {/* Individual bar with cave-themed colors and texture */}
            <div className={`w-full ${area.color} rounded-t relative overflow-hidden`} style={{ height: area.height }}>
              {/* Rock texture overlay */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black to-transparent"></div>
              {/* Small gem sparkle */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-yellow-300 rounded-full"></div>
            </div>
            {/* Area icon label */}
            <span className="text-xs text-amber-800 mt-1">{area.icon}</span>
          </div>
        ))}
      </div>

      {/* Chart caption with cave theme */}
      <div className="text-xs text-amber-700 mt-1 relative z-10">This excavation</div>

      {/* Cave decorations */}
      <div className="absolute bottom-2 left-2 w-1 h-2 bg-amber-700 rounded-full opacity-30"></div>
      <div className="absolute top-3 left-2 w-1 h-1 bg-amber-600 rounded-full opacity-40"></div>
    </div>
  )
}
