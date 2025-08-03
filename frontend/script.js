class PhoneApp {
  constructor() {
    this.currentView = "dashboard"
    this.init()
  }

  init() {
    this.bindEvents()
    this.animateMole()
    this.updateTime()
    setInterval(() => this.updateTime(), 1000)
  }

  bindEvents() {
    // Navigation buttons
    const navButtons = document.querySelectorAll(".nav-btn")
    navButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetView = btn.getAttribute("data-view")
        this.switchView(targetView)
      })
    })

    // Roadmap nodes
    const roadmapNodes = document.querySelectorAll(".lesson-node")
    roadmapNodes.forEach((node) => {
      node.addEventListener("click", () => {
        if (!node.classList.contains("locked")) {
          this.handleNodeClick(node)
        }
      })
    })

    // Action buttons
    const actionButtons = document.querySelectorAll(".action-btn")
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.handleActionClick(btn)
      })
    })

    // Add touch feedback
    this.addTouchFeedback()
  }

  switchView(viewName) {
    if (viewName === this.currentView) return

    // Update navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-view="${viewName}"]`).classList.add("active")

    // Switch views with animation
    const currentViewEl = document.getElementById(this.currentView)
    const targetViewEl = document.getElementById(viewName)

    // Animate out current view
    currentViewEl.style.transform = "translateX(-100%)"
    currentViewEl.style.opacity = "0"

    // Animate in target view
    setTimeout(() => {
      currentViewEl.classList.remove("active")
      targetViewEl.classList.add("active")
      targetViewEl.style.transform = "translateX(0)"
      targetViewEl.style.opacity = "1"
    }, 150)

    this.currentView = viewName

    // Add haptic feedback simulation
    this.simulateHaptic()
  }

  handleNodeClick(node) {
    if (node.classList.contains("current")) {
      // Animate the current node
      node.style.transform = "scale(0.95)"
      setTimeout(() => {
        node.style.transform = "scale(1)"
      }, 150)

      // Show lesson start animation
      this.showLessonStart()
    } else if (node.classList.contains("completed")) {
      // Show completed lesson info
      this.showCompletedInfo(node)
    }
  }

  handleActionClick(btn) {
    // Add click animation
    btn.style.transform = "scale(0.95)"
    setTimeout(() => {
      btn.style.transform = "scale(1)"
    }, 150)

    // Simulate action
    if (btn.textContent.includes("Continue")) {
      this.switchView("roadmap")
    } else if (btn.textContent.includes("Practice")) {
      this.showPracticeMode()
    }
  }

  animateMole() {
    const moleEyes = document.querySelectorAll(".eye")
    const moleArms = document.querySelectorAll(".arm")

    // Blinking animation
    setInterval(
      () => {
        moleEyes.forEach((eye) => {
          eye.style.transform = "scaleY(0.1)"
          setTimeout(() => {
            eye.style.transform = "scaleY(1)"
          }, 150)
        })
      },
      3000 + Math.random() * 2000,
    )

    // Arm movement
    setInterval(
      () => {
        moleArms.forEach((arm) => {
          const randomRotation = Math.random() * 20 - 10
          const baseRotation = arm.classList.contains("left") ? -30 : 30
          arm.style.transform = `rotate(${baseRotation + randomRotation}deg)`

          setTimeout(() => {
            arm.style.transform = `rotate(${baseRotation}deg)`
          }, 500)
        })
      },
      4000 + Math.random() * 3000,
    )
  }

  updateTime() {
    const now = new Date()
    const timeString = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
    document.querySelector(".time").textContent = timeString
  }

  showLessonStart() {
    // Create a temporary overlay
    const overlay = document.createElement("div")
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(33, 150, 243, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `

    const message = document.createElement("div")
    message.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `
    message.textContent = "Starting Lesson..."

    overlay.appendChild(message)
    document.body.appendChild(overlay)

    // Animate in
    setTimeout(() => {
      overlay.style.opacity = "1"
      message.style.transform = "scale(1)"
    }, 10)

    // Remove after delay
    setTimeout(() => {
      overlay.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(overlay)
      }, 300)
    }, 2000)
  }

  showCompletedInfo(node) {
    const label = node.querySelector(".node-label").textContent
    console.log(`Viewing completed lesson: ${label}`)

    // Add a subtle animation to show it was clicked
    const circle = node.querySelector(".node-circle")
    circle.style.transform = "scale(1.1)"
    setTimeout(() => {
      circle.style.transform = "scale(1)"
    }, 200)
  }

  showPracticeMode() {
    console.log("Starting practice mode...")
    // Could implement a practice mode here
  }

  simulateHaptic() {
    // Simulate haptic feedback with a subtle screen shake
    const screen = document.querySelector(".phone-screen")
    screen.style.transform = "translateX(1px)"
    setTimeout(() => {
      screen.style.transform = "translateX(-1px)"
      setTimeout(() => {
        screen.style.transform = "translateX(0)"
      }, 25)
    }, 25)
  }

  addTouchFeedback() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll("button, .lesson-node, .stat-card")

    interactiveElements.forEach((element) => {
      element.addEventListener("touchstart", () => {
        element.style.opacity = "0.7"
      })

      element.addEventListener("touchend", () => {
        element.style.opacity = "1"
      })

      element.addEventListener("touchcancel", () => {
        element.style.opacity = "1"
      })
    })
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PhoneApp()
})

// Add some easter eggs
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault()
    const mole = document.querySelector(".mole-character")
    mole.style.transform = "scale(1.1) rotate(5deg)"
    setTimeout(() => {
      mole.style.transform = "scale(1) rotate(0deg)"
    }, 200)
  }
})
