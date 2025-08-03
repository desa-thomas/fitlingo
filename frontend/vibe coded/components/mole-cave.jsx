"use client"

import { useState, useEffect } from "react"

/**
 * MoleCave Component
 * An epic bright crystal cave where the mole lives, moves around, and trains with a punching bag
 * Features Minecraft grass block background and interactive punching bag
 */
export function MoleCave({ blink, armMove, isWaving, isJumping, onClick }) {
  const [molePosition, setMolePosition] = useState({ x: 50, direction: 1 }) // x percentage, direction (1 or -1)
  const [isPunching, setIsPunching] = useState(false)
  const [punchingBagSwing, setPunchingBagSwing] = useState(0)
  const [isWalkingToBag, setIsWalkingToBag] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  // Mole movement animation with pauses
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isWalkingToBag) {
        // Random chance to start or stop moving (30% chance to change state)
        if (Math.random() < 0.3) {
          setIsMoving((prev) => !prev)
        }

        // Only move if the mole is in moving state
        if (isMoving) {
          setMolePosition((prev) => {
            let newX = prev.x + prev.direction * 1
            let newDirection = prev.direction

            // Bounce off walls (keep mole within 20% to 80% of cave width)
            if (newX >= 80) {
              newX = 80
              newDirection = -1
            } else if (newX <= 20) {
              newX = 20
              newDirection = 1
            }

            // Random chance to change direction while moving
            if (Math.random() < 0.05) {
              newDirection *= -1
            }

            return { x: newX, direction: newDirection }
          })
        }
      }
    }, 200) // Slower movement interval

    return () => clearInterval(moveInterval)
  }, [isWalkingToBag, isMoving])

  // Separate interval for longer pauses between movement sessions
  useEffect(() => {
    const pauseInterval = setInterval(
      () => {
        if (!isWalkingToBag) {
          // Longer pauses - 40% chance to start moving, 60% chance to stay still
          if (Math.random() < 0.4) {
            setIsMoving(true)
            // Move for a random duration between 2-5 seconds
            setTimeout(
              () => {
                setIsMoving(false)
              },
              2000 + Math.random() * 3000,
            )
          }
        }
      },
      3000 + Math.random() * 4000,
    ) // Random pause between 3-7 seconds

    return () => clearInterval(pauseInterval)
  }, [isWalkingToBag])

  // Handle punching bag click
  const handlePunchingBagClick = () => {
    if (!isWalkingToBag && !isPunching) {
      setIsWalkingToBag(true)
      setIsMoving(false) // Stop random movement

      // Calculate direction to punching bag (at ~75% position)
      const bagPosition = 75
      const currentPosition = molePosition.x
      const direction = bagPosition > currentPosition ? 1 : -1

      setMolePosition((prev) => ({ ...prev, direction }))

      // Move mole towards bag
      const walkToBag = setInterval(() => {
        setMolePosition((prev) => {
          const distance = Math.abs(bagPosition - prev.x)
          if (distance < 3) {
            // Close enough to punch
            clearInterval(walkToBag)
            setIsWalkingToBag(false)

            // Start punching sequence
            setTimeout(() => {
              setIsPunching(true)
              setPunchingBagSwing(20)

              // Reset after punch
              setTimeout(() => {
                setIsPunching(false)
                setPunchingBagSwing(0)
              }, 400)
            }, 100)

            return prev
          }

          // Move towards bag
          return {
            ...prev,
            x: prev.x + direction * 2,
          }
        })
      }, 100)
    }
  }

  return (
    // Large cave container with clean, modern styling
    <div className="w-full h-48 relative overflow-hidden shadow-xl mb-6 rounded-2xl border-2 border-amber-600/30 bg-gradient-to-b from-green-500 via-amber-600 to-gray-700">
      {/* Minecraft grass block background */}
      <div className="absolute inset-0">
        {/* Grass top layer */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-green-400 via-green-500 to-green-600"></div>
        {/* Dirt middle layer */}
        <div className="absolute top-12 left-0 w-full h-20 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800"></div>
        {/* Stone bottom layer */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"></div>

        {/* Subtle Minecraft block texture overlay */}
        <div className="absolute inset-0 opacity-10">
          {/* Create subtle pixelated texture pattern */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="absolute bg-black opacity-5"
                style={{
                  left: `${col * 6.25}%`,
                  top: `${row * 12.5}%`,
                  width: "6.25%",
                  height: "12.5%",
                  border: "0.5px solid rgba(0,0,0,0.05)",
                }}
              ></div>
            )),
          )}
        </div>
      </div>

      {/* Smooth cave entrance overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700/40 to-gray-800/60 rounded-2xl"></div>

      {/* Cave interior - clean and bright */}
      <div className="absolute inset-3 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-xl border border-gray-500/50 overflow-hidden shadow-inner">
        {/* Subtle cave atmosphere overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/15 via-blue-600/15 to-gray-800/20 rounded-xl"></div>

        {/* Crystal formations - clean and bright */}
        <div className="absolute top-2 left-8">
          <div
            className="w-3 h-6 bg-gradient-to-t from-purple-500 to-purple-200 opacity-85 animate-pulse shadow-sm"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
          <div className="absolute top-0 left-1 w-1 h-1 bg-purple-100 rounded-full animate-ping opacity-80"></div>
        </div>

        <div className="absolute top-4 right-12">
          <div
            className="w-4 h-8 bg-gradient-to-t from-blue-500 to-blue-200 opacity-85 animate-pulse delay-500 shadow-sm"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
          <div className="absolute top-0 left-1.5 w-1 h-1 bg-blue-100 rounded-full animate-ping delay-300 opacity-80"></div>
        </div>

        <div className="absolute top-6 left-20">
          <div
            className="w-2 h-4 bg-gradient-to-t from-emerald-500 to-emerald-200 opacity-85 animate-pulse delay-1000 shadow-sm"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
          <div className="absolute top-0 left-0.5 w-0.5 h-0.5 bg-emerald-100 rounded-full animate-ping delay-700 opacity-80"></div>
        </div>

        <div className="absolute top-3 right-24">
          <div
            className="w-3 h-5 bg-gradient-to-t from-pink-500 to-pink-200 opacity-85 animate-pulse delay-1500 shadow-sm"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
          <div className="absolute top-0 left-1 w-0.5 h-0.5 bg-pink-100 rounded-full animate-ping delay-1200 opacity-80"></div>
        </div>

        {/* Floor crystals - clean */}
        <div className="absolute bottom-2 left-12">
          <div
            className="w-2 h-3 bg-gradient-to-b from-cyan-200 to-cyan-500 opacity-85 animate-pulse delay-800 shadow-sm"
            style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)" }}
          ></div>
        </div>

        <div className="absolute bottom-3 right-16">
          <div
            className="w-3 h-4 bg-gradient-to-b from-yellow-200 to-yellow-500 opacity-85 animate-pulse delay-1200 shadow-sm"
            style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)" }}
          ></div>
        </div>

        {/* Subtle cave walls texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-600"></div>
          {/* Minimal rock texture dots */}
          <div className="absolute top-4 left-6 w-1 h-1 bg-gray-300 rounded-full opacity-60"></div>
          <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-gray-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-6 left-10 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-60"></div>
        </div>

        {/* Interactive punching bag - cleaner styling */}
        <div className="absolute top-4 right-8 cursor-pointer" onClick={handlePunchingBagClick}>
          {/* Hanging chain */}
          <div className="w-0.5 h-8 bg-gray-400 mx-auto shadow-sm"></div>
          {/* Punching bag */}
          <div
            className={`w-6 h-12 bg-gradient-to-b from-red-600 to-red-700 rounded-lg border border-red-500/50 transition-transform duration-300 origin-top hover:scale-105 shadow-md`}
            style={{ transform: `rotate(${punchingBagSwing}deg)` }}
          >
            {/* Bag texture lines */}
            <div className="absolute top-2 left-0 w-full h-0.5 bg-red-500 opacity-50"></div>
            <div className="absolute top-4 left-0 w-full h-0.5 bg-red-500 opacity-50"></div>
            <div className="absolute top-6 left-0 w-full h-0.5 bg-red-500 opacity-50"></div>
            <div className="absolute top-8 left-0 w-full h-0.5 bg-red-500 opacity-50"></div>
            {/* Impact effect when punched */}
            {isPunching && (
              <div className="absolute -top-1 -left-1 w-8 h-14 border-2 border-yellow-400 rounded-lg animate-ping opacity-80"></div>
            )}
          </div>
          {/* Click indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 opacity-70 animate-pulse">
            👆
          </div>
        </div>

        {/* Moving mole character - no flipping */}
        <div
          className={`absolute bottom-8 transition-all cursor-pointer hover:scale-105 ${
            isJumping ? "-translate-y-6 scale-110" : ""
          } ${isPunching ? "scale-110" : ""} ${
            isWalkingToBag
              ? "transition-all duration-100"
              : isMoving
                ? "transition-all duration-200"
                : "transition-all duration-500"
          }`}
          style={{
            left: `${molePosition.x}%`,
            transform: `translateX(-50%)`, // Removed the flipping transform
          }}
          onClick={onClick}
        >
          {/* Mole body - larger size for the cave */}
          <div className="relative">
            {/* Main body - dark brown/black for realistic mole coloring */}
            <div
              className="w-20 h-16 bg-gray-800 relative shadow-md"
              style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)" }}
            >
              {/* Face area - slightly lighter for contrast */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-14 h-12 bg-gray-700 rounded-lg">
                {/* Eyes - small beady mole eyes */}
                <div className="flex justify-between px-4 pt-3">
                  {/* Left eye */}
                  <div className="relative">
                    {blink ? (
                      <div className="w-2 h-0.5 bg-black"></div>
                    ) : (
                      <div className="w-2 h-2 bg-black relative rounded-full">
                        <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Right eye */}
                  <div className="relative">
                    {blink ? (
                      <div className="w-2 h-0.5 bg-black"></div>
                    ) : (
                      <div className="w-2 h-2 bg-black relative rounded-full">
                        <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Large prominent mole snout */}
                <div className="absolute left-1/2 top-5 transform -translate-x-1/2">
                  <div className="w-5 h-4 bg-pink-400 rounded-full relative">
                    <div className="absolute top-1 left-1 w-0.5 h-1 bg-black rounded-full"></div>
                    <div className="absolute top-1 right-1 w-0.5 h-1 bg-black rounded-full"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-200 rounded-full"></div>
                  </div>
                </div>

                {/* Mouth */}
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2">
                  <div className="w-4 h-1 bg-gray-900 rounded-full"></div>
                </div>

                {/* Whiskers */}
                <div className="absolute left-0 top-5">
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                  <div className="w-2 h-0.5 bg-gray-600 mt-0.5"></div>
                </div>
                <div className="absolute right-0 top-5">
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                  <div className="w-2 h-0.5 bg-gray-600 mt-0.5"></div>
                </div>
              </div>

              {/* Small rounded ears */}
              <div className="absolute top-0 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="absolute top-0 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>

            {/* Arms/Paws - large digging paws with punching animation */}
            <div className="absolute top-8 w-full">
              {/* Left arm/paw */}
              <div
                className={`w-7 h-5 bg-gray-800 absolute -left-5 transition-all duration-300 ${
                  isWaving
                    ? "rotate-45 -translate-y-2"
                    : isPunching
                      ? "rotate-45 -translate-x-2"
                      : armMove
                        ? "rotate-12"
                        : "-rotate-12"
                }`}
                style={{ clipPath: "polygon(0% 20%, 70% 0%, 100% 30%, 100% 100%, 20% 80%)" }}
              >
                <div className="absolute top-0 right-0 w-1 h-2 bg-gray-900"></div>
                <div className="absolute top-0 right-1 w-1 h-1 bg-gray-900"></div>
                <div className="absolute top-0 right-2 w-1 h-1 bg-gray-900"></div>
                <div className="absolute bottom-1 left-1 w-2 h-1 bg-pink-300 rounded-full"></div>
              </div>

              {/* Right arm/paw */}
              <div
                className={`w-7 h-5 bg-gray-800 absolute -right-5 transition-all duration-300 ${
                  isWaving
                    ? "-rotate-45 -translate-y-2"
                    : isPunching
                      ? "-rotate-45 translate-x-2"
                      : armMove
                        ? "-rotate-12"
                        : "rotate-12"
                }`}
                style={{ clipPath: "polygon(30% 0%, 100% 20%, 80% 80%, 0% 100%, 0% 30%)" }}
              >
                <div className="absolute top-0 left-0 w-1 h-2 bg-gray-900"></div>
                <div className="absolute top-0 left-1 w-1 h-1 bg-gray-900"></div>
                <div className="absolute top-0 left-2 w-1 h-1 bg-gray-900"></div>
                <div className="absolute bottom-1 right-1 w-2 h-1 bg-pink-300 rounded-full"></div>
              </div>
            </div>

            {/* Body texture - mole fur pattern */}
            <div className="absolute top-3 left-3 w-1 h-1 bg-gray-600 opacity-60"></div>
            <div className="absolute top-5 left-4 w-1 h-1 bg-gray-600 opacity-60"></div>
            <div className="absolute top-4 right-3 w-1 h-1 bg-gray-600 opacity-60"></div>
            <div className="absolute top-6 right-4 w-1 h-1 bg-gray-600 opacity-60"></div>

            {/* Body shading */}
            <div className="absolute top-2 left-1 w-1 h-10 bg-black opacity-20"></div>
            <div className="absolute top-2 right-1 w-1 h-10 bg-gray-600 opacity-30"></div>
          </div>

          {/* Mole movement dust trail - only when moving */}
          {(isWalkingToBag || isMoving) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50 animate-bounce delay-100"></div>
              <div className="absolute -left-2 top-0 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-40 animate-bounce delay-200"></div>
              <div className="absolute -right-2 top-0 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-40 animate-bounce delay-300"></div>
            </div>
          )}
        </div>

        {/* Clean cave lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Crystal glow effects - subtle and clean */}
          <div className="absolute top-4 left-10 w-6 h-6 bg-purple-400 opacity-15 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-6 right-14 w-5 h-5 bg-blue-400 opacity-15 rounded-full blur-md animate-pulse delay-500"></div>
          <div className="absolute bottom-4 left-14 w-4 h-4 bg-emerald-400 opacity-15 rounded-full blur-md animate-pulse delay-1000"></div>

          {/* Subtle ambient cave lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-600/10 via-transparent to-transparent rounded-xl"></div>
        </div>
      </div>

      {/* Clean outer glow effect */}
      <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>
    </div>
  )
}
