"use client"

import { useState, useEffect } from "react"

/**
 * WorkoutModal Component
 * Displays detailed workout information when a roadmap node is clicked
 * Now includes checkboxes to mark individual exercises as completed
 */
export function WorkoutModal({ dayData, isOpen, onClose, onWorkoutUpdate }) {
  const [localDayData, setLocalDayData] = useState(null)

  // Update local state when dayData changes
  useEffect(() => {
    if (dayData) {
      setLocalDayData({ ...dayData })
    }
  }, [dayData])

  if (!isOpen || !localDayData) return null

  const completedWorkouts = localDayData.workouts.filter((workout) => workout.completed === true).length
  const totalWorkouts = localDayData.workouts.length

  // Handle checkbox change for individual exercises
  const handleExerciseToggle = (exerciseIndex) => {
    const updatedDayData = { ...localDayData }
    const currentStatus = updatedDayData.workouts[exerciseIndex].completed

    // Toggle the completion status
    updatedDayData.workouts[exerciseIndex].completed = currentStatus ? null : true

    // Check if all exercises are now completed
    const allCompleted = updatedDayData.workouts.every((workout) => workout.completed === true)

    // If all exercises are completed, mark the day as completed
    if (allCompleted && !updatedDayData["date-completed"] || dayData["day-name"] == "Rest") {
      updatedDayData["date-completed"] = new Date().toISOString()
    }
    // If not all exercises are completed, remove day completion
    else if (!allCompleted && updatedDayData["date-completed"]) {
      updatedDayData["date-completed"] = null
    }

    setLocalDayData(updatedDayData)

    // Call the parent update function to sync with global state
    if (onWorkoutUpdate) {
      onWorkoutUpdate(updatedDayData)
    }
  }

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal content */}
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl border-4 border-amber-400 max-w-sm w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 p-4 text-white relative">
          {/* Cave texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-900 to-amber-800"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div style={{"width": "100%"}}>
              <h2 className="text-xl font-bold mb-1">{localDayData["day-name"]}</h2>
              <div className="text-amber-200 text-sm" style={{"display": "flex", "justifyContent": "space-between", "width": "100%"}}>
                Day {localDayData["day-number"]} <span>⏱️ {localDayData["estimated-workout-time"]}</span></div>
              
            </div>
            {/* <button onClick={onClose} className="text-amber-200 hover:text-white text-2xl font-bold leading-none">
              ×
            </button> */}
          </div>
        </div>

        {/* Modal body */}
        <div className="p-4 overflow-y-auto max-h-96" style={{"paddingTop": "0px"}}>
          {/* Day info */}
          <div className="mb-4 ">
            {/* <div className="flex items-center text-sm text-amber-800">
              <span className="mr-2">⏱️</span>
              <span>{localDayData["estimated-workout-time"]}</span>
            </div> */}
            {/* <div className="flex items-center text-sm text-amber-800">
              <span className="mr-2">🍽️</span>
              <span>{localDayData["suggested-calorie-intake"]}</span>
            </div> */}
            {/* <div className="flex items-center text-sm text-amber-800">
              
              <span className="mr-2">💪</span>
              <span>
                {completedWorkouts}/{totalWorkouts} exercises completed
              </span>
            </div> */}
            
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-amber-700 mb-1">
              <span>Progress</span>
              <span>{Math.round((completedWorkouts / totalWorkouts) * 100)}%</span>
            </div>
            <div className="h-2 bg-amber-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                style={{ width: `${(completedWorkouts / totalWorkouts) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Workouts list with checkboxes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-amber-900 mb-2">🏋️ Exercises:</h3>
            {localDayData.workouts.map((workout, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 relative overflow-hidden transition-all duration-300 ${
                  workout.completed ? "bg-green-100 border-green-300" : "bg-amber-50 border-amber-300"
                }`}
              >
                {/* Exercise header with checkbox */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Custom checkbox */}
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={workout.completed === true}
                        onChange={() => handleExerciseToggle(index)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                          workout.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-white border-amber-400 hover:border-amber-500"
                        }`}
                      >
                        {workout.completed && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </label>

                    <div className="flex-1">
                      <h4 className={`font-semibold ${workout.completed ? "text-green-800" : "text-gray-800"}`}>
                        {workout.name}
                      </h4>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {/* <div className={`text-xl ${workout.completed ? "text-green-600" : "text-amber-600"}`}>
                    {workout.completed ? "✅" : "⏳"}
                  </div> */}
                </div>

                {/* Exercise details */}
                <div className="text-sm text-gray-700 mb-2 ml-9">
                  <div className="flex gap-4 mb-1">
                    <span className="font-medium">Sets: {workout.sets}</span>
                    <span className="font-medium">Reps: {workout.reps}</span>
                  </div>
                </div>

                {/* Exercise instructions */}
                <div className="text-xs text-gray-600 bg-white bg-opacity-50 p-2 rounded border ml-9">
                  <strong>Instructions:</strong> {workout.instructions}
                </div>

                {/* Cave decoration for completed exercises */}
                {workout.completed && (
                  <>
                    <div className="absolute top-1 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-10 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-ping delay-300"></div>
                  </>
                )}

                {/* Completion celebration effect */}
                {workout.completed && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 text-green-500 opacity-20 text-xs">💎</div>
                    <div className="absolute bottom-2 right-2 text-emerald-500 opacity-20 text-xs">✨</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Day completion celebration */}
          {localDayData["date-completed"] && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg text-center">
              <div className="text-2xl mb-1">🎉</div>
              <div className="text-green-800 font-semibold">Day Complete!</div>
              <div className="text-green-700 text-sm">All exercises finished - great work!</div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="p-4 bg-amber-50 border-t border-amber-300">
          <div className="flex gap-2">
            {/* Progress indicator in footer */}
            <div className="flex-1 text-center text-sm text-amber-700">
              {completedWorkouts}/{totalWorkouts} exercises completed
            </div>
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
