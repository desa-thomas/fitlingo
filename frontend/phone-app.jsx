"use client"

// Import React hooks for state management and side effects
import { useState, useEffect } from "react"
import { MoleCave } from "./components/mole-cave"
import { useUserData } from "./hooks/use-user-data"
import { UserStats } from "./components/user-stats"
import { DynamicRoadmap } from "./components/dynamic-roadmap"

/**
 * PhoneApp Component
 * Main application component that renders a phone mockup with dashboard and roadmap views
 * Includes animated mole character, charts, and navigation
 */
export default function PhoneApp() {
  // Fetch user data from API
  const { userData: initialUserData, loading, error } = useUserData("test_user")

  // Local state to manage user data updates
  const [userData, setUserData] = useState(null)

  // Update local userData when API data changes
  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData)
    }
  }, [initialUserData])

  // State for tracking current view (dashboard or roadmap)
  const [currentView, setCurrentView] = useState("dashboard")

  // State for displaying current time in status bar
  const [currentTime, setCurrentTime] = useState("")

  // State for controlling mole character animations
  const [moleAnimation, setMoleAnimation] = useState({
    blink: false,
    armMove: false,
    isWaving: false,
    isJumping: false,
  })

  // Effect hook for setting up timers and animations
  useEffect(() => {
    // Function to update the current time display
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }))
    }

    // Initialize time and set up interval to update every second
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Set up random blinking animation for mole
    const blinkInterval = setInterval(
      () => {
        // Trigger blink animation
        setMoleAnimation((prev) => ({ ...prev, blink: true }))
        // Reset blink after 150ms
        setTimeout(() => setMoleAnimation((prev) => ({ ...prev, blink: false })), 150)
      },
      3000 + Math.random() * 2000, // Random interval between 3-5 seconds
    )

    // Set up random arm movement animation for mole
    const armInterval = setInterval(
      () => {
        // Trigger arm movement
        setMoleAnimation((prev) => ({ ...prev, armMove: true }))
        // Reset arm position after 500ms
        setTimeout(() => setMoleAnimation((prev) => ({ ...prev, armMove: false })), 500)
      },
      4000 + Math.random() * 3000, // Random interval between 4-7 seconds
    )

    // Cleanup function to clear all intervals when component unmounts
    return () => {
      clearInterval(timeInterval)
      clearInterval(blinkInterval)
      clearInterval(armInterval)
    }
  }, [])

  // Handle mole click - wave animation
  const handleMoleClick = () => {
    setMoleAnimation((prev) => ({ ...prev, isWaving: true }))
    // Reset wave after 1 second
    setTimeout(() => {
      setMoleAnimation((prev) => ({ ...prev, isWaving: false }))
    }, 1000)
  }

  // Handle continue learning click - jump animation
  const handleContinueLearning = () => {
    // Trigger mole jump animation
    setMoleAnimation((prev) => ({ ...prev, isJumping: true }))
    // Reset jump after 600ms
    setTimeout(() => {
      setMoleAnimation((prev) => ({ ...prev, isJumping: false }))
    }, 600)
    // Switch to roadmap view after animation
    setTimeout(() => {
      setCurrentView("roadmap")
    }, 300)
  }

  // Handle user data updates from workout completions
  const handleUserDataUpdate = (updatedUserData) => {
    setUserData(updatedUserData)
    // Here you could also sync back to the API
    console.log("User data updated:", updatedUserData)
  }

  // Reusable navigation button component
  const NavButton = ({ view, icon, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
        currentView === view ? "text-amber-600" : "text-gray-500" // Active state styling with cave theme
      }`}
    >
      {/* Icon with scale animation when active */}
      <div className={`text-2xl transition-transform duration-200 ${currentView === view ? "scale-110" : "scale-100"}`}>
        {icon}
      </div>
      {/* Button label */}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )

  // Show loading state
  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5">
        <div className="w-[375px] h-[812px] bg-gray-900 rounded-[40px] p-2 shadow-2xl relative">
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">⛏️</div>
            <div className="text-xl font-semibold text-amber-800">Generating fitness plan...</div>
            <div className="text-sm text-amber-600 mt-2">Connecting to server...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    // Main container with gradient background
    <div
      className="min-h-screen flex items-center justify-center p-5"
      style={{
        background: "#126b00",
        background: "linear-gradient(180deg,rgba(18, 107, 0, 1) 0%, rgba(97, 62, 17, 1) 23%, rgba(64, 30, 0, 1) 100%)",
      }}
    >
      {/* Phone frame container */}
      <div className="w-[375px] h-[812px] bg-gray-900 rounded-[40px] p-2 shadow-2xl relative">
        {/* iPhone-style notch at top */}
        {/* <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-36 h-1.5 bg-gray-800 rounded-full z-10"></div> */}

        {/* Phone screen container */}
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
          {/* Status Bar - shows time and system indicators */}
          <div className="h-11 flex justify-between items-center px-5 bg-gray-50 text-sm font-semibold">
            <span>{currentTime}</span>
            <div className="flex gap-2">
              <span>●●●</span> {/* Signal strength indicator */}
              <span>100%</span> {/* Battery percentage */}
            </div>
          </div>

          {/* Main app content area with view transitions */}
          <div className="flex-1 relative overflow-hidden">
            {/* Underground Dashboard View - slides in from right when active */}
            <div
              className={`absolute inset-0 p-5 transition-all duration-300 ${
                currentView === "dashboard" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              }`}
              style={{
                background: "linear-gradient(180deg, #92400e 0%, #78350f 30%, #451a03 60%, #292524 100%)",
              }}
            >
              {/* Underground atmosphere overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-br from-amber-900 to-amber-800"></div>
                {/* Floating dirt particles */}
                <div className="absolute top-10 left-8 w-1 h-1 bg-amber-600 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-20 right-12 w-0.5 h-0.5 bg-amber-500 rounded-full animate-bounce delay-2000"></div>
                <div className="absolute top-32 left-16 w-0.5 h-0.5 bg-amber-700 rounded-full animate-bounce delay-3000"></div>
              </div>

              {/* User stats with real API data */}
              <div className="relative z-10 overflow-y-auto h-full pb-6">
                <UserStats userData={userData} />

                {/* Epic crystal cave with moving mole and punching bag */}
                <MoleCave
                  blink={moleAnimation.blink}
                  armMove={moleAnimation.armMove}
                  isWaving={moleAnimation.isWaving}
                  isJumping={moleAnimation.isJumping}
                  onClick={handleMoleClick}
                />

                {/* Single action button - removed "Start Training" */}
           
              </div>

              {/* Underground decorative elements */}
              <div className="absolute bottom-20 left-4 w-3 h-2 bg-amber-800 rounded-t-full opacity-30"></div>
              <div className="absolute bottom-24 right-6 w-2 h-1 bg-amber-700 rounded-full opacity-40"></div>
              <div className="absolute top-32 right-4 w-1 h-1 bg-emerald-500 rounded-full opacity-60 animate-ping"></div>
            </div>

            {/* Underground Tunnel Roadmap View - slides in from left when active */}
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                currentView === "roadmap" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
              }`}
              style={{
                background: "linear-gradient(180deg, #8B4513 0%, #654321 30%, #4A2C17 60%, #2D1810 100%)",
              }}
            >
              {/* Underground tunnel header */}
              <div className="text-center py-6 px-5 relative" style={{"borderBottom": "#956638 1px solid"}}>
                {/* Dirt/soil texture overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-b from-amber-900 to-amber-800"></div>
                  {/* Scattered dirt particles */}
                  <div className="absolute top-2 left-4 w-1 h-1 bg-amber-700 rounded-full"></div>
                  <div className="absolute top-4 right-6 w-1 h-1 bg-amber-700 rounded-full"></div>
                  <div className="absolute top-6 left-8 w-1 h-1 bg-amber-700 rounded-full"></div>
                </div>

                <h1 className="text-2xl font-bold text-amber-100 mb-3 relative z-10">
                  {userData.days} Day Fitness Roadmap
                </h1>
               
              </div>

              {/* Dynamic roadmap based on user data */}
              <DynamicRoadmap userData={userData} onUserDataUpdate={handleUserDataUpdate} />
            </div>
          </div>

          {/* Bottom Navigation Bar with cave theme */}
          <div className="h-20 bg-gradient-to-r from-amber-50 to-amber-100 border-t-2 border-amber-200 flex shadow-lg">
            {/* Dashboard navigation button */}
            <NavButton view="dashboard" icon="🏠" label="Home" />
            {/* Roadmap navigation button */}
            <NavButton view="roadmap" icon="🗺️" label="Roadmap" />
          </div>
        </div>
      </div>
    </div>
  )
}
