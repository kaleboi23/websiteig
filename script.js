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