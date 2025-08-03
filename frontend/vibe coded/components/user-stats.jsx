/**
 * UserStats Component
 * Displays personalized user statistics in cave theme
 */
export function UserStats({ userData }) {
  if (!userData) return null

  // Calculate workout completion stats
  const totalWorkouts = userData.plan?.days?.reduce((total, day) => total + day.workouts.length, 0) || 0
  const completedWorkouts =
    userData.plan?.days?.reduce(
      (total, day) => total + day.workouts.filter((workout) => workout.completed === true).length,
      0,
    ) || 0

  const completedDays = userData.plan?.days?.filter((day) => day["date-completed"]).length || 0
  const totalDays = userData.plan?.days?.length || 0

  // Calculate current level based on completed workouts
  const currentLevel = Math.floor(completedWorkouts / 3) + 1
  const currentExp = (completedWorkouts % 3) * 333 + 250 // Base EXP + progress
  const maxExp = 1000

  return (
    <div className="space-y-4 mb-6">
      {" "}
      {/* Added mb-6 for gap before cave */}
      {/* Welcome message with user's name */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-amber-100 mb-2">Welcome back, {userData["first-name"]}! 🏔️</h2>
        <div className="text-amber-200 text-sm">
          {userData.skill.charAt(0).toUpperCase() + userData.skill.slice(1)} Miner • {userData.intensity} Intensity
        </div>
      </div>
      {/* Updated EXP bar with real data */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 p-3 rounded-lg border-2 border-amber-700 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-900"></div>
          <div className="absolute top-1 left-2 w-1 h-1 bg-amber-600 rounded-full"></div>
          <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-amber-600 rounded-full"></div>
          <div className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-amber-600 rounded-full"></div>
        </div>

        <div className="flex justify-between items-center mb-2 relative z-10">
          <span className="text-amber-200 text-xs font-mono font-bold flex items-center">💎 EXP</span>
          <span className="text-amber-100 text-xs font-mono">
            {currentExp} / {maxExp}
          </span>
        </div>

        <div className="h-4 bg-amber-950 border border-amber-800 relative overflow-hidden rounded">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 relative"
            style={{ width: `${(currentExp / maxExp) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-30 animate-pulse"></div>
            <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-emerald-100 rounded-full animate-ping delay-500"></div>
          </div>
        </div>

        <div className="text-center mt-2 relative z-10">
          <span className="text-amber-300 text-xs font-mono font-bold">⛏️ TUNNEL LEVEL {currentLevel}</span>
        </div>
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Days completed */}
        <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-3 text-white text-center border border-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-900 to-amber-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{completedDays}</div>
            <div className="text-xs opacity-90">Days Excavated</div>
            <div className="text-xs opacity-75 mt-1">🔥 {userData.days} day streak!</div>
          </div>
        </div>

        {/* Workout completion */}
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-xl p-3 text-white text-center border border-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-emerald-900 to-emerald-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{completedWorkouts}</div>
            <div className="text-xs opacity-90">Workouts Done</div>
            <div className="text-xs opacity-75 mt-1">
              💪 {Math.round((completedWorkouts / totalWorkouts) * 100)}% complete
            </div>
          </div>
        </div>

        {/* User goals */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-3 text-white text-center border border-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900 to-blue-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{userData["weight-goal"][1]}</div>
            <div className="text-xs opacity-90">kg to {userData["weight-goal"][0]}</div>
            <div className="text-xs opacity-75 mt-1">🎯 Current: {userData.weight}kg</div>
          </div>
        </div>

        {/* Frequency */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-3 text-white text-center border border-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900 to-purple-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{userData.frequency}</div>
            <div className="text-xs opacity-90">Days/Week</div>
            <div className="text-xs opacity-75 mt-1">📅 {userData.intensity} intensity</div>
          </div>
        </div>
      </div>
    </div>
  )
}
