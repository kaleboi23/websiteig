const toggleButton = document.querySelector("#theme-toggle");
const root = document.documentElement; // the <html> element

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggleButton.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

toggleButton.addEventListener("click", function () {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// On page load: use the saved choice, or fall back to the system setting
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll("#menu article");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selected = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    menuItems.forEach(function (item) {
      const matches = selected === "all" || item.dataset.category === selected;
      item.classList.toggle("hidden", !matches);
    });
  });
});

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after tapping a link
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.textContent = "☰";
  });
});