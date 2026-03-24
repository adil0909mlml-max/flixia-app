"use strict";

function search() {
  const searchFields = document.querySelectorAll("[search-field], .desktop-search input");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);

  let searchTimeout;

  searchFields.forEach((searchField) => {
    const searchWrapper = searchField.parentElement;

    // Update placeholder based on language
    searchField.placeholder = getTxt("search");

    searchField.addEventListener("input", function () {
      if (!searchField.value.trim()) {
        searchResultModal.classList.remove("active");
        searchWrapper.classList.remove("searching");
        clearTimeout(searchTimeout);
        return;
      }

      searchWrapper.classList.add("searching");
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(function () {
        fetchDataFromServer(
          `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false&language=${getLang()}`,
          function ({ results: movieList }) {
            searchWrapper.classList.remove("searching");
            searchResultModal.classList.add("active");
            searchResultModal.innerHTML = ""; // clear previous results

            searchResultModal.innerHTML = `
              <p class="label">${getTxt("searchResultLabel")}</p>
              <h1 class="heading">${searchField.value}</h1>
              <div class="grid-list"></div>
            `;

            // Handle empty results
            if (movieList.length === 0) {
              searchResultModal.querySelector(".grid-list").innerHTML = `<p style="padding: 20px; color: var(--on-surface-variant);">${getTxt("noResult")}</p>`;
              return;
            }

            for (const movie of movieList) {
              const movieCard = createMovieCard(movie);
              searchResultModal.querySelector(".grid-list").appendChild(movieCard);
            }
          }
        );
      }, 500);
    });
  });
}
