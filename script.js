const scriptURL = "https://script.google.com/macros/s/AKfycbx3LYxmRfKwyCCnK5ol5vKZFbI0GVWjA9vfKBaA_ba7C3XNTg_FCg3Tg0od3uhHJUIPtg/exec";
let allData = [];
let currentFront = null; // track selected front

// Fetch data on load
document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  renderFronts();
});

// Fetch Google Sheet Data
async function fetchData() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();

    // Convert rows to objects
    allData = data.map(row => ({
      slNo: row[0],
      front: row[1],
      details: row[2],
      drawingNo: row[3],
      rev0: row[4],
      rev1: row[5],
      rev2: row[6],
      rev3: row[7],
      rev4: row[8],
      rev5: row[9]
    }));
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Render unique fronts as buttons
function renderFronts() {
  const fronts = [...new Set(allData.map(item => item.front))];
  const frontContainer = document.getElementById("frontContainer");
  const cardContainer = document.getElementById("cardContainer");
  frontContainer.innerHTML = "";
  cardContainer.innerHTML = "";

  fronts.forEach(front => {
    const btn = document.createElement("button");
    btn.textContent = front;
    btn.className = "front-btn";
    btn.addEventListener("click", () => {
      currentFront = front;
      showCardsByFront(front);
    });
    frontContainer.appendChild(btn);
  });
}

// Show cards for selected front
function showCardsByFront(front) {
  const frontContainer = document.getElementById("frontContainer");
  const cardContainer = document.getElementById("cardContainer");

  frontContainer.innerHTML = ""; // remove other fronts
  cardContainer.innerHTML = "";

  // Add Back button
  const backBtn = document.createElement("button");
  backBtn.textContent = "⬅ Back to Fronts";
  backBtn.className = "front-btn";
  backBtn.style.background = "#888";
  backBtn.addEventListener("click", () => {
    currentFront = null;
    renderFronts();
  });
  frontContainer.appendChild(backBtn);

  renderCards(allData.filter(d => d.front === front));
}

// Render cards helper
function renderCards(drawings) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  drawings.forEach(drawing => {
    const card = document.createElement("div");
    card.className = "drawing-card";

    const header = document.createElement("div");
    header.className = "card-header";
    header.innerHTML = `<strong>${drawing.drawingNo}</strong><br>${drawing.details}`;

    const revisions = document.createElement("div");
    revisions.className = "revision-icons";

    [drawing.rev0, drawing.rev1, drawing.rev2, drawing.rev3, drawing.rev4, drawing.rev5]
      .forEach((url, index) => {
        if (url && url.trim() !== "") {
          const icon = document.createElement("button");
          icon.className = "rev-icon";
          icon.title = `Revision ${index}`;
          icon.textContent = `R${index}`;
          icon.addEventListener("click", () => window.open(url, "_blank"));
          revisions.appendChild(icon);
        }
      });

    card.appendChild(header);
    card.appendChild(revisions);
    cardContainer.appendChild(card);
  });
}

// Search functionality (global + inside front)
document.getElementById("searchInput").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();

  let results;
  if (currentFront) {
    // search inside selected front
    results = allData.filter(
      d =>
        d.front === currentFront &&
        (d.drawingNo.toLowerCase().includes(query) ||
         d.details.toLowerCase().includes(query))
    );
  } else {
    // global search
    results = allData.filter(
      d =>
        d.drawingNo.toLowerCase().includes(query) ||
        d.details.toLowerCase().includes(query)
    );
  }

  renderCards(results);
});
