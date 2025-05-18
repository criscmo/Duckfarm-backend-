const BASE_URL = 'https://duckfarm-backend-v5ch.onrender.com'; // Link halisi ya Render

function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.content-section');
  tabs.forEach(tab => tab.classList.remove('active'));
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function showLogoutModal() {
  document.getElementById('logoutModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('logoutModal').style.display = 'none';
}

function performLogout() {
  closeModal();
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      window.location.href = "admin_login.html";
    }, 300);
  }, 2000);
}

async function loadData(endpoint, containerId) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    const data = await res.json();
    document.getElementById(containerId).innerHTML = data.html;
  } catch (err) {
    document.getElementById(containerId).innerHTML = "<p>Failed to load data</p>";
  }
}

async function handleAction(button, status) {
  const row = button.closest('tr');
  const user = row.cells[0].innerText;
  const amount = row.cells[1].innerText;
  
  await fetch(`${BASE_URL}/api/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, amount, status })
  });
  
  row.cells[2].textContent = status;
  row.cells[3].innerHTML = `<em>${status}</em>`;
}

window.onload = () => {
  loadData('/api/users', 'users');
  loadData('/api/recharge', 'recharge');
  loadData('/api/withdraw', 'withdraw');
  loadData('/api/records', 'records');
};