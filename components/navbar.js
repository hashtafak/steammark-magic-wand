class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .nav-title {
                    font-weight: 700;
                    font-size: 1.5rem;
                    background: linear-gradient(to right, #ffffff, #e0e7ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .theme-toggle {
                    transition: all 0.3s ease;
                }
                
                .theme-toggle:hover {
                    transform: rotate(30deg);
                }
                
                .github-icon:hover {
                    transform: scale(1.1);
                }
                
                @media (max-width: 640px) {
                    .nav-title {
                        font-size: 1.25rem;
                    }
                }
            </style>
            <nav class="text-white py-4">
                <div class="nav-container flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <i data-feather="wand" class="text-white"></i>
                        <a href="/" class="nav-title">SteamMark Magic Wand</a>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button id="theme-toggle" class="theme-toggle p-2 rounded-full hover:bg-black/10">
                            <i data-feather="moon" class="text-white"></i>
                        </button>
                        <a href="https://github.com/hashtafak/steammark-magic-wand" target="_blank" rel="noopener noreferrer" class="github-icon p-2 rounded-full hover:bg-black/10 transition-transform">
                            <i data-feather="github" class="text-white"></i>
                        </a>
                    </div>
                </div>
            </nav>
        `;

    // Add theme toggle functionality
    const themeToggle = this.shadowRoot.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
      const html = document.documentElement;
      const isDark = html.classList.contains("dark");

      if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i data-feather="moon"></i>';
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i data-feather="sun"></i>';
      }
      feather.replace();
    });

    // Initialize theme
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      themeToggle.innerHTML = '<i data-feather="sun"></i>';
    } else {
      document.documentElement.classList.remove("dark");
      themeToggle.innerHTML = '<i data-feather="moon"></i>';
    }
  }
}

customElements.define("custom-navbar", CustomNavbar);
