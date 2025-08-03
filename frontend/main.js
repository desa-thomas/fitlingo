let user_data = null; 


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
    const response = await fetch(`http://fitlingo.duckdns.org:5000/getuser?username=${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    // Now populate the menu with this data
    populateMainMenu(data);
    user_data = data; 
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function populateMainMenu(user) {
  const greeting = getTimeGreeting();
  const firstName = capitalizeFirstLetter(user["first-name"] || "User");

  document.querySelector('.greeting').textContent = `${greeting}, ${firstName}!`; //set gretting message

  // You can still show the name elsewhere if needed
  document.querySelector('.username').textContent = `${firstName}!`;

  // Show calorie intake
  const fullIntake = user.plan.days[0]["suggested-calorie-intake"];
  const shortIntake = fullIntake.slice(0, 14);
  document.querySelector('.calorie').textContent = shortIntake;
}

document.addEventListener('DOMContentLoaded', () => {
  const username = 'test_user'; // Replace dynamically if needed
  loadUserData(username);
});
