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
        <h2 className="text-2xl font-bold text-amber-100 mb-2">Welcome back, {userData["first-name"]}</h2>
        <div className="text-amber-200 text-sm">
           {userData.days} day, {userData.intensity} Intensity plan
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Days completed */}
        <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-3 text-white text-center border border-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-900 to-amber-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{completedDays}</div>
            <div className="text-xs opacity-90">Days Completed</div>
            
          </div>
        </div>

        {/* Workout completion */}
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-xl p-3 text-white text-center border border-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-emerald-900 to-emerald-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{completedWorkouts}</div>
            <div className="text-xs opacity-90">Workouts Finished</div>
            
          </div>
        </div>

        {/* User goals */}
        {/* <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-3 text-white text-center border border-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900 to-blue-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{userData["weight-goal"][1]}</div>
            <div className="text-xs opacity-90">kg to {userData["weight-goal"][0]}</div>
            <div className="text-xs opacity-75 mt-1">🎯 Current: {userData.weight}kg</div>
          </div>
        </div> */}

        {/* Frequency */}
        {/* <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-3 text-white text-center border border-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900 to-purple-950"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">{userData.frequency}</div>
            <div className="text-xs opacity-90">Days/Week</div>
            <div className="text-xs opacity-75 mt-1">📅 {userData.intensity} intensity</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
