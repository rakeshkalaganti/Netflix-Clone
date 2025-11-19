document.addEventListener("DOMContentLoaded", () => {

  // Row scroll
  document.querySelectorAll("[data-row]").forEach(row => {
    const inner = row.querySelector(".row__inner");
    const leftBtn = row.querySelector(".left");
    const rightBtn = row.querySelector(".right");

    leftBtn.onclick = () => inner.scrollBy({ left: -400, behavior: "smooth" });
    rightBtn.onclick = () => inner.scrollBy({ left: 400, behavior: "smooth" });
  });

  // Modal open
  function openModal(title) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modal").setAttribute("aria-hidden", "false");
  }

  // Modal close
  document.getElementById("modalClose").onclick = () => {
    document.getElementById("modal").setAttribute("aria-hidden", "true");
  };

  // Tile hover info buttons
  document.querySelectorAll(".tile").forEach(tile => {
    const title = tile.dataset.title;

    tile.querySelector(".ovInfo").onclick = (e) => {
      e.stopPropagation();
      openModal(title);
    };

    tile.querySelector(".ovPlay").onclick = (e) => {
      e.stopPropagation();
      alert("Playing " + title);
    };
  });

  // Hero buttons
  document.getElementById("moreInfo").onclick = () => openModal("Featured Movie");
  document.getElementById("playHero").onclick = () => alert("Playing Featured Movie");

  // Login modal
  const loginModal = document.getElementById("loginModal");
  const profileBtn = document.getElementById("profileBtn");

  profileBtn.onclick = () => {
    const user = localStorage.getItem("nc_user");

    if (user) {
      if (confirm(`Signed in as ${user}. Logout?`)) {
        localStorage.removeItem("nc_user");
        updateProfile();
      }
    } else {
      loginModal.setAttribute("aria-hidden", "false");
    }
  };

  document.getElementById("loginClose").onclick = () =>
    loginModal.setAttribute("aria-hidden", "true");

  document.getElementById("loginForm").onsubmit = (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    if (!user) return;

    localStorage.setItem("nc_user", user);
    loginModal.setAttribute("aria-hidden", "true");
    updateProfile();
  };

  function updateProfile() {
    const user = localStorage.getItem("nc_user");

    if (user) {
      profileBtn.textContent = user.charAt(0).toUpperCase();
    } else {
      profileBtn.textContent = "Login";
    }
  }

  updateProfile();
});
