(function () {
  // Runs immediately (script is not deferred) so theme is set before first paint.
  var STORAGE_KEY = "skoczylas-theme";
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
  // If nothing saved, no attribute is set and CSS falls back to prefers-color-scheme.

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    function currentTheme() {
      var attr = document.documentElement.getAttribute("data-theme");
      if (attr) return attr;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }

    toggle.setAttribute("aria-pressed", currentTheme() === "dark" ? "true" : "false");

    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  });
})();
