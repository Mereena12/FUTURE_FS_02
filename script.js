// Simple login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if(user === "admin" && pass === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
  return false;
}

// Add lead
function addLead() {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const newLead = {
    id: Date.now(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    status: "new",
    notes: []
  };
  leads.push(newLead);
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
  return false;
}

// Render leads
function renderLeads() {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const tbody = document.querySelector("#leadTable tbody");
  tbody.innerHTML = "";
  leads.forEach(lead => {
    tbody.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
        <td>${lead.notes.join("<br>")}</td>
        <td>
          <button onclick="updateStatus(${lead.id}, 'contacted')">Contacted</button>
          <button onclick="updateStatus(${lead.id}, 'converted')">Converted</button>
          <button onclick="addNote(${lead.id})">Add Note</button>
        </td>
      </tr>`;
  });
}

// Update status
function updateStatus(id, status) {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const lead = leads.find(l => l.id === id);
  lead.status = status;
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
}

// Add note
function addNote(id) {
  const note = prompt("Enter follow-up note:");
  if(note) {
    const leads = JSON.parse(localStorage.getItem("leads")) || [];
    const lead = leads.find(l => l.id === id);
    lead.notes.push(note);
    localStorage.setItem("leads", JSON.stringify(leads));
    renderLeads();
  }
}

// Auto-load leads on dashboard
if(document.querySelector("#leadTable")) renderLeads();
