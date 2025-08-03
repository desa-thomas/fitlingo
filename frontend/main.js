let user_data = null; 
const url = "http://fitlingo.duckdns.org:5000" 
console.log("bruh"); 

window.onload = function() {
    const username = 'test_user'; // Replace dynamically as needed
    console.log("bruh again"); 
    loadUserData(username);
}

function showPage(pageId) {
    const pages = ['main-menu', 'roadmap', 'settings'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        // Apply correct display style
        if (id === pageId) {
            if (id === 'main-menu') {
                el.style.display = 'flex'; // <- use flex here!
            } else {
                el.style.display = 'block';
            }
        } else {
            el.style.display = 'none';
        }
    });

    // Update nav button highlight
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (pageId === 'main-menu') document.querySelector('.nav-btn:nth-child(1)').classList.add('active');
    if (pageId === 'roadmap') document.querySelector('.nav-btn:nth-child(2)').classList.add('active');
    if (pageId === 'socials') document.querySelector('.nav-btn:nth-child(3)').classList.add('active');
}



async function loadUserData(username) {
  try {
    console.log("waiting..."); 
    const response = await fetch(`http://fitlingo.duckdns.org:5000/getuser?username=${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    console.log("gotit");

    // Now populate the menu with this data
    populateMainMenu(data);
    user_data = data; 
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

function populateMainMenu(user) {
  // Example: show first name in mole square
  document.querySelector('.username').textContent = `${user["first-name"]}!`;

  // Show age in calorie square for demo
  const fullIntake = user.plan.days[0]["suggested-calorie-intake"];
  const shortIntake = fullIntake.slice(0, 14);
  document.querySelector('.calorie').textContent = shortIntake;

}
