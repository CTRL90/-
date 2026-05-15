// ============================================================
// MAIN APP — Navigation, routing, interactivity
// ============================================================

(function () {
  "use strict";

  const mainContent = document.getElementById("mainContent");
  const navList = document.getElementById("navList");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const scrollTopBtn = document.getElementById("scrollTop");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  const visitedPages = new Set();
  const TOTAL_LECTURES = 12;

  // ---------- ROUTING ----------
  function loadPage(pageId) {
    const html = PAGES[pageId];
    if (!html) {
      mainContent.innerHTML = `
        <div class="page">
          <div class="page-header">
            <h1 class="page-title">Page not found</h1>
            <p class="page-subtitle">The page "${pageId}" doesn't exist.</p>
          </div>
        </div>`;
      return;
    }

    mainContent.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "instant" });

    // Track progress (only lectures)
    const lectureIds = [
      "errors","bisection","newton","secant","fixedpoint",
      "jacobi","gaussseidel","lagrange","divided",
      "differentiation","integration","ode"
    ];
    if (lectureIds.includes(pageId)) {
      visitedPages.add(pageId);
      updateProgress();
    }

    // Update active nav state
    document.querySelectorAll(".nav-item").forEach(a => {
      a.classList.toggle("active", a.dataset.page === pageId);
    });

    // Wire interactive elements
    wireSolutionToggles();
    wireMCQs();
    wireLectureCards();

    // Re-render math
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(mainContent, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn("KaTeX render error:", e);
      }
    }

    // On mobile, close sidebar after nav
    if (window.innerWidth <= 980) {
      sidebar.classList.remove("open");
    }
  }

  function updateProgress() {
    const pct = (visitedPages.size / TOTAL_LECTURES) * 100;
    progressFill.style.width = pct + "%";
    progressText.textContent = `${visitedPages.size} / ${TOTAL_LECTURES} lectures viewed`;
  }

  // ---------- SOLUTION TOGGLES ----------
  function wireSolutionToggles() {
    mainContent.querySelectorAll(".solution-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const body = btn.nextElementSibling;
        if (!body) return;
        const isOpen = body.classList.toggle("show");
        btn.classList.toggle("open", isOpen);
        btn.textContent = isOpen ? "Hide Solution" : "Show Solution";
        // Re-render math inside revealed solution
        if (isOpen && window.renderMathInElement) {
          try {
            window.renderMathInElement(body, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\[", right: "\\]", display: true },
                { left: "\\(", right: "\\)", display: false }
              ],
              throwOnError: false
            });
          } catch (e) {}
        }
      });
    });
  }

  // ---------- MCQ INTERACTIVITY ----------
  function wireMCQs() {
    mainContent.querySelectorAll(".mcq-item").forEach(item => {
      const options = item.querySelectorAll(".quiz-option");
      const answer = item.querySelector(".quiz-answer");
      options.forEach(opt => {
        opt.addEventListener("click", () => {
          if (item.dataset.locked === "1") return;
          item.dataset.locked = "1";
          options.forEach(o => {
            if (o.dataset.correct === "true") o.classList.add("correct");
            else if (o === opt) o.classList.add("wrong");
          });
          if (answer) answer.classList.add("show");
        });
      });
    });
  }

  // ---------- LECTURE CARDS (home) ----------
  function wireLectureCards() {
    mainContent.querySelectorAll(".lecture-card[data-go]").forEach(card => {
      card.addEventListener("click", () => loadPage(card.dataset.go));
    });
  }

  // ---------- SIDEBAR NAV ----------
  navList.addEventListener("click", e => {
    const a = e.target.closest("[data-page]");
    if (!a) return;
    e.preventDefault();
    loadPage(a.dataset.page);
  });

  document.querySelectorAll(".sidebar nav a[data-page]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      loadPage(a.dataset.page);
    });
  });

  // ---------- MOBILE MENU ----------
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", e => {
    if (window.innerWidth > 980) return;
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });

  // ---------- SCROLL-TO-TOP ----------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- INITIAL LOAD ----------
  loadPage("home");
})();
