"use strict";

function sidebar() {
  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=${getLang()}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-inner">
      <div class="sidebar-list">
        <p class="title">${getTxt("genres")}</p>
      </div>
      
      <div class="sidebar-list">
        <p class="title">${getTxt("languages")}</p>
        <button class="sidebar-link" onclick="changeLanguage('ar')">${getTxt("langNames").ar}</button>
        <button class="sidebar-link" onclick="changeLanguage('en')">${getTxt("langNames").en}</button>
        <button class="sidebar-link" onclick="changeLanguage('fr')">${getTxt("langNames").fr}</button>
        <button class="sidebar-link" onclick="changeLanguage('es')">${getTxt("langNames").es}</button>
      </div>

      <div class="sidebar-footer">
        <p class="copyright">${getTxt("copyright")}</p>
        <p style="font-size:1.2rem;color:var(--on-surface-variant);">${getTxt("poweredBy")}</p>
      </div>
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list");
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.innerHTML = "";
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}

function changeLanguage(langCode) {
  window.localStorage.setItem("lang", langCode);
  window.location.reload();
}
