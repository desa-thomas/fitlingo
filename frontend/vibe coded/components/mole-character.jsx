"use client"

/**
 * MoleCharacter Component
 * Renders a 32-bit pixel art style animated mole character living in a home window
 * Props:
 * - blink: boolean - controls eye blinking animation
 * - armMove: boolean - controls arm movement animation
 * - isWaving: boolean - controls waving animation when clicked
 * - isJumping: boolean - controls jumping animation when "Continue Learning" is clicked
 * - onClick: function - callback when mole is clicked
 */
export function MoleCharacter({ blink, armMove, isWaving, isJumping, onClick }) {
  return (
    // Home window container with amber gradient and border frame
    <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl border-4 border-amber-300 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      {/* Inner window frame border */}
      <div className="absolute inset-1 border border-amber-400 rounded-xl"></div>

      {/* 32-bit style mole character positioned at bottom center */}
      <div
        className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isJumping ? "-translate-y-4 scale-110" : ""
        }`}
        onClick={onClick}
      >
        {/* Mole body - more mole-like with darker colors */}
        <div className="relative">
          {/* Main body - dark brown/black for realistic mole coloring */}
          <div
            className="w-16 h-14 bg-gray-800 relative"
            style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)" }}
          >
            {/* Face area - slightly lighter for contrast */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-gray-700 rounded-lg">
              {/* Eyes - small beady mole eyes */}
              <div className="flex justify-between px-3 pt-2">
                {/* Left eye - tiny mole eye */}
                <div className="relative">
                  {blink ? (
                    // Blinking - horizontal line
                    <div className="w-2 h-0.5 bg-black"></div>
                  ) : (
                    // Open eye - very small and beady like a real mole
                    <div className="w-2 h-2 bg-black relative rounded-full">
                      {/* Eye highlight - tiny white pixel */}
                      <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Right eye - tiny mole eye */}
                <div className="relative">
                  {blink ? (
                    // Blinking - horizontal line
                    <div className="w-2 h-0.5 bg-black"></div>
                  ) : (
                    // Open eye - very small and beady like a real mole
                    <div className="w-2 h-2 bg-black relative rounded-full">
                      {/* Eye highlight - tiny white pixel */}
                      <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Large prominent mole snout - pink and distinctive */}
              <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
                <div className="w-4 h-3 bg-pink-400 rounded-full relative">
                  {/* Nostrils - two small dark dots */}
                  <div className="absolute top-1 left-1 w-0.5 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-1 right-1 w-0.5 h-1 bg-black rounded-full"></div>
                  {/* Snout highlight */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-200 rounded-full"></div>
                </div>
              </div>

              {/* Mouth - small mole mouth */}
              <div className="absolute left-1/2 top-6 transform -translate-x-1/2">
                <div className="w-3 h-1 bg-gray-900 rounded-full"></div>
              </div>

              {/* Whiskers - mole characteristic */}
              <div className="absolute left-0 top-4">
                <div className="w-2 h-0.5 bg-gray-600"></div>
                <div className="w-1 h-0.5 bg-gray-600 mt-0.5"></div>
              </div>
              <div className="absolute right-0 top-4">
                <div className="w-2 h-0.5 bg-gray-600"></div>
                <div className="w-1 h-0.5 bg-gray-600 mt-0.5"></div>
              </div>
            </div>

            {/* Small rounded ears - barely visible like real moles */}
            <div className="absolute top-0 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="absolute top-0 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>

          {/* Arms/Paws - large digging paws characteristic of moles */}
          <div className="absolute top-6 w-full">
            {/* Left arm/paw */}
            <div
              className={`w-6 h-4 bg-gray-800 absolute -left-4 transition-all duration-500 ${
                isWaving ? "rotate-45 -translate-y-2" : armMove ? "rotate-12" : "-rotate-12"
              }`}
              style={{ clipPath: "polygon(0% 20%, 70% 0%, 100% 30%, 100% 100%, 20% 80%)" }}
            >
              {/* Large digging claws */}
              <div className="absolute top-0 right-0 w-1 h-2 bg-gray-900"></div>
              <div className="absolute top-0 right-1 w-1 h-1 bg-gray-900"></div>
              <div className="absolute top-0 right-2 w-1 h-1 bg-gray-900"></div>
              {/* Paw pad */}
              <div className="absolute bottom-1 left-1 w-2 h-1 bg-pink-300 rounded-full"></div>
            </div>

            {/* Right arm/paw */}
            <div
              className={`w-6 h-4 bg-gray-800 absolute -right-4 transition-all duration-500 ${
                isWaving ? "-rotate-45 -translate-y-2" : armMove ? "-rotate-12" : "rotate-12"
              }`}
              style={{ clipPath: "polygon(30% 0%, 100% 20%, 80% 80%, 0% 100%, 0% 30%)" }}
            >
              {/* Large digging claws */}
              <div className="absolute top-0 left-0 w-1 h-2 bg-gray-900"></div>
              <div className="absolute top-0 left-1 w-1 h-1 bg-gray-900"></div>
              <div className="absolute top-0 left-2 w-1 h-1 bg-gray-900"></div>
              {/* Paw pad */}
              <div className="absolute bottom-1 right-1 w-2 h-1 bg-pink-300 rounded-full"></div>
            </div>
          </div>

          {/* Body texture - mole fur pattern */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-gray-600 opacity-60"></div>
          <div className="absolute top-4 left-3 w-1 h-1 bg-gray-600 opacity-60"></div>
          <div className="absolute top-3 right-2 w-1 h-1 bg-gray-600 opacity-60"></div>
          <div className="absolute top-5 right-3 w-1 h-1 bg-gray-600 opacity-60"></div>

          {/* Body shading */}
          <div className="absolute top-2 left-1 w-1 h-8 bg-black opacity-20"></div>
          <div className="absolute top-2 right-1 w-1 h-8 bg-gray-600 opacity-30"></div>
        </div>
      </div>

      {/* Decorative elements in the home window - underground theme */}
      {/* Dirt pile */}
      <div className="absolute bottom-1 left-2">
        <div className="w-3 h-2 bg-amber-700 rounded-t-full"></div>
        <div className="absolute top-0 left-1 w-1 h-1 bg-amber-800"></div>
      </div>

      {/* Small rocks */}
      <div className="absolute bottom-2 right-3 w-1 h-1 bg-gray-500 rounded-full"></div>
      <div className="absolute bottom-1 right-2 w-1 h-1 bg-gray-600 rounded-full"></div>

      {/* Root or worm */}
      <div className="absolute top-3 right-2">
        <div className="w-1 h-3 bg-amber-600 rounded-full transform rotate-12"></div>
      </div>

      {/* Underground tunnel entrance */}
      <div className="absolute top-2 left-2">
        <div className="w-3 h-2 bg-gray-900 rounded-full opacity-60"></div>
      </div>
    </div>
  )
}
