"use client"

/**
 * RoadmapNode Component
 * Represents a single lesson node in the learning roadmap
 * Props:
 * - type: string - "completed", "current", or "locked"
 * - label: string - display name for the lesson
 * - icon: string - icon to show inside the node circle
 * - onClick: function - callback when node is clicked
 */
export function RoadmapNode({ type, label, icon, onClick }) {
  // Style configurations for different node states
  const styles = {
    completed: "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg cursor-pointer", // Green for completed lessons
    current: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg animate-pulse cursor-pointer", // Blue with pulse for current lesson
    locked: "bg-gray-200 border-2 border-gray-300 text-gray-400 cursor-not-allowed", // Gray for locked lessons
  }

  return (
    // Node container with centered alignment
    <div className="flex flex-col items-center relative z-10">
      {/* Circular node with dynamic styling based on type */}
      <div
        className={`w-15 h-15 rounded-full flex items-center justify-center text-xl font-bold hover:scale-105 transition-transform ${styles[type]} ${
          type !== "locked" ? "hover:shadow-xl" : ""
        }`}
        onClick={type !== "locked" ? onClick : undefined}
      >
        {/* Node icon (checkmark, number, or lock) */}
        {icon}
      </div>

      {/* Node label with conditional text color */}
      <div
        className={`mt-2 text-sm font-semibold text-center ${type === "locked" ? "text-gray-400" : "text-gray-800"}`}
      >
        {label}
      </div>
    </div>
  )
}
