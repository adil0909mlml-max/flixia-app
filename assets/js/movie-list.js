"use strict";

const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const type = window.localStorage.getItem("type") || "movie";
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;

fetchDataFromServer(
  `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=${getLang()}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
  function ({ results: movieList, total_pages }) {
    totalPages = total_pages;
    document.title = `${genreName} - Flixia`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName}`;

    movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">${genreName}</h1>
      </div>

      <div class="grid-list"></div>

      <button class="btn load-more" load-more>${getTxt("upcoming").split(" ")[0]}...</button>
    `;

    for (const movie of movieList) {
      const movieCard = createMovieCard(movie);
      movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);

    /**
     * LOAD MORE FUNCTIONALITY
     */
    const loadMoreBtn = document.querySelector("[load-more]");
    loadMoreBtn.addEventListener("click", function () {
      if (currentPage >= totalPages) {
        this.style.display = "none";
        return;
      }

      currentPage++;
      this.classList.add("loading");

      fetchDataFromServer(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=${getLang()}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
        ({ results: movieList }) => {
          this.classList.remove("loading");
          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
          }
        }
      );
    });
  }
);

search();
