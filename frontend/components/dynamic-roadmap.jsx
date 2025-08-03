"use client"

import { useState } from "react"
import { RoadmapNode } from "./roadmap-node"
import { WorkoutModal } from "./workout-modal"

/**
 * DynamicRoadmap Component
 * Generates roadmap nodes based on user's workout plan data
 */
export function DynamicRoadmap({ userData, onUserDataUpdate }) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!userData?.plan?.days) {
    return (
      <div className="text-center text-amber-200 py-8">
        <div className="text-4xl mb-4">⛏️</div>
        <div>Loading excavation plan...</div>
      </div>
    )
  }

  // Generate roadmap nodes from user's plan
  const roadmapNodes = userData.plan.days.map((day, index) => {
    let type = "locked"
    let icon = "🔒"

    // Determine node state based on completion
    if (day["date-completed"]) {
      type = "completed"
      icon = "✓"
    } else if (index === 0 || (index > 0 && userData.plan.days[index - 1]["date-completed"])) {
      // Current day is unlocked if it's the first day or previous day is completed
      type = "current"
      icon = day["day-number"].toString()
    }

    // Special icon for final day
    if (index === userData.plan.days.length - 1) {
      icon = type === "locked" ? "👑" : icon
    }

    return {
      type,
      label: day["day-name"],
      icon,
      dayData: day,
      dayNumber: day["day-number"],
    }
  })

  // Handle node click
  const handleNodeClick = (node) => {
    if (node.type !== "locked") {
      setSelectedDay(node.dayData)
      setIsModalOpen(true)
    }
  }

  // Handle workout update from modal
  const handleWorkoutUpdate = (updatedDayData) => {
    // Find the day index in the user data
    const dayIndex = userData.plan.days.findIndex((day) => day["day-number"] === updatedDayData["day-number"])

    if (dayIndex !== -1) {
      // Create updated user data
      const updatedUserData = {
        ...userData,
        plan: {
          ...userData.plan,
          days: userData.plan.days.map((day, index) => (index === dayIndex ? updatedDayData : day)),
        },
      }

      // Update the selected day for the modal
      setSelectedDay(updatedDayData)

      // Call parent update function if provided
      if (onUserDataUpdate) {
        onUserDataUpdate(updatedUserData)
      }
    }
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDay(null)
  }

  return (
    <>
      <div className="relative px-5 h-[600px] overflow-y-auto">
        {/* Cave/tunnel walls using SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 600" style={{ zIndex: 1 }}>
          <defs>
            {/* Gradient for tunnel walls */}
            <radialGradient id="tunnelGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#654321" />
              <stop offset="70%" stopColor="#4A2C17" />
              <stop offset="100%" stopColor="#2D1810" />
            </radialGradient>

            {/* Gradient for the tunnel path */}
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="40%" stopColor="#8B4513" />
              <stop offset="60%" stopColor="#654321" />
              <stop offset="100%" stopColor="#4A2C17" />
            </linearGradient>
          </defs>

          {/* Generate tunnel chambers for each day */}
          {roadmapNodes.map((_, index) => {
            const yPos = 60 + index * 120
            return (
              <ellipse
                key={index}
                cx="150"
                cy={yPos}
                rx={45 + index * 2}
                ry={25 + index * 1}
                fill="url(#tunnelGradient)"
                opacity={0.8 - index * 0.05}
              />
            )
          })}

          {/* Dynamic tunnel path */}
          <path
            d={`M 150 60 ${roadmapNodes
              .map((_, index) => {
                const yPos = 60 + index * 120
                const xOffset = index % 2 === 0 ? 0 : index % 4 === 1 ? -70 : 70
                return `Q ${150 + xOffset} ${yPos - 30}, 150 ${yPos}`
              })
              .join(" ")}`}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Underground gems/crystals scattered throughout */}
          {roadmapNodes.map((_, index) => (
            <g key={`gems-${index}`}>
              <polygon
                points={`${80 + index * 20},${100 + index * 120} ${85 + index * 20},${90 + index * 120} ${90 + index * 20},${100 + index * 120} ${85 + index * 20},${110 + index * 120}`}
                fill="#9333EA"
                opacity="0.8"
              />
              <polygon
                points={`${220 - index * 15},${120 + index * 120} ${225 - index * 15},${110 + index * 120} ${230 - index * 15},${120 + index * 120} ${225 - index * 15},${130 + index * 120}`}
                fill="#3B82F6"
                opacity="0.8"
              />
            </g>
          ))}
        </svg>

        {/* Dynamic lesson nodes */}
        <div className="relative w-full h-full" style={{ zIndex: 2 }}>
          {roadmapNodes.map((node, index) => {
            const yPos = 30 + index * 120

            return (
              <div
                key={index}
                className="absolute"
                style={{ left: "50%", top: `${yPos}px`, transform: "translateX(-50%)" }}
              >
                <div className="relative">
                  {/* Chamber glow effect based on completion status */}
                  <div
                    className={`absolute inset-0 rounded-full blur-lg opacity-20 scale-150 ${
                      node.type === "completed"
                        ? "bg-amber-400"
                        : node.type === "current"
                          ? "bg-blue-400 animate-pulse"
                          : "bg-gray-500 opacity-10"
                    }`}
                  ></div>

                  <RoadmapNode
                    type={node.type}
                    label={node.label}
                    icon={node.icon}
                    onClick={() => handleNodeClick(node)}
                  />

                  {/* Quick info tooltip - shows on hover */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-amber-900 bg-opacity-90 text-amber-100 text-xs p-2 rounded-lg border border-amber-700 min-w-48 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="font-semibold mb-1">{node.dayData["day-name"]}</div>
                    <div className="text-amber-200">⏱️ {node.dayData["estimated-workout-time"]}</div>
                    <div className="text-amber-200">🍽️ {node.dayData["suggested-calorie-intake"]}</div>
                    <div className="text-amber-200">💪 {node.dayData.workouts.length} exercises</div>
                    {node.dayData["date-completed"] && <div className="text-green-400 mt-1">✅ Completed</div>}
                    {node.type !== "locked" && (
                      <div className="text-blue-400 mt-1 font-semibold">👆 Click to view details</div>
                    )}
                  </div>

                  {/* Cave-in rocks for locked nodes */}
                  {node.type === "locked" && (
                    <>
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gray-600 rounded transform rotate-12"></div>
                      <div className="absolute -bottom-1 -right-2 w-1 h-1 bg-gray-700 rounded"></div>
                    </>
                  )}

                  {/* Treasure sparkles for final node */}
                  {index === roadmapNodes.length - 1 && node.type !== "locked" && (
                    <>
                      <div className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute -top-1 right-1 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping delay-300"></div>
                      <div className="absolute bottom-0 -right-2 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping delay-700"></div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Underground atmosphere effects */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          {/* Floating dust particles */}
          <div className="absolute top-20 left-10 w-1 h-1 bg-amber-600 rounded-full opacity-40 animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-12 w-0.5 h-0.5 bg-amber-500 rounded-full opacity-60 animate-bounce delay-2000"></div>
          <div className="absolute top-60 left-16 w-0.5 h-0.5 bg-amber-700 rounded-full opacity-50 animate-bounce delay-3000"></div>
        </div>
      </div>

      {/* Workout Modal */}
      <WorkoutModal
        dayData={selectedDay}
        isOpen={isModalOpen}
        onClose={closeModal}
        onWorkoutUpdate={handleWorkoutUpdate}
      />
    </>
  )
}
