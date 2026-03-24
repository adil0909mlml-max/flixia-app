"use strict";

const pageContent = document.querySelector("[page-content]");

sidebar();

const homePageSections = [
  {
    title: getTxt("upcoming"),
    path: "/movie/upcoming",
  },
  {
    title: getTxt("trending"),
    path: "/trending/movie/week",
  },
  {
    title: getTxt("topRated"),
    path: "/movie/top_rated",
  },
  {
    title: getTxt("popularTv"),
    path: "/tv/popular",
  },
];

const genreList = {
  asString(genreIdList) {
    let newGenreList = [];
    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]);
    }
    return newGenreList.join(" • ");
  },
};

fetchDataFromServer(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=${getLang()}`,
  function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${getLang()}&page=1`,
      heroBanner
    );
  }
);

function heroBanner({ results: movieList }) {
  const banner = document.createElement("section");
  banner.classList.add("banner");

  banner.innerHTML = `
    <div class="banner-slider"></div>
  `;


  for (const [index, movie] of movieList.entries()) {
    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id,
    } = movie;

    if (!backdrop_path) continue;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

    const year = release_date ? release_date.split("-")[0] : "—";
    const rating = vote_average ? vote_average.toFixed(1) : "—";

    sliderItem.innerHTML = `
      <img
        src="${imageBaseURL}w1280${backdrop_path}"
        alt="${title}"
        class="img-cover"
        loading="${index === 0 ? "eager" : "lazy"}"
      />
      <div class="banner-content">
        <h2 class="heading">${title}</h2>

        <div class="meta-list">
          <div class="meta-item">⭐ ${rating}</div>
          <div class="meta-item card-badge">${year}</div>
        </div>
        <p class="genre">${genreList.asString(genre_ids)}</p>
        <p class="banner-text">${overview || ''}</p>

        <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
          ${getTxt("watchNow")}
        </a>
      </div>
    `;

    banner.querySelector(".banner-slider").appendChild(sliderItem);
  }

  if (banner.querySelector(".banner-slider").children.length > 0) {
    pageContent.appendChild(banner);
    addHeroSlide();
  }




  // Create containers for each section to guarantee order
  for (const { title, path } of homePageSections) {
    const sectionContainer = document.createElement("section");
    sectionContainer.classList.add("movie-list-container");
    sectionContainer.dataset.path = path;
    pageContent.appendChild(sectionContainer);

    fetchDataFromServer(
      `https://api.themoviedb.org/3${path}?api_key=${api_key}&language=${getLang()}&page=1`,
      function (data, sectionTitle) {
        createMovieList(data, sectionTitle, sectionContainer);
      },
      title
    );
  }
};

function addHeroSlide() {
  const sliderItems = document.querySelectorAll("[slider-item]");
  if (!sliderItems.length) return;

  let lastSliderItem = sliderItems[0];
  let currentSliderIndex = 0;

  lastSliderItem.classList.add("active");

  const slideNext = function () {
    lastSliderItem.classList.remove("active");
    currentSliderIndex = (currentSliderIndex + 1) % sliderItems.length;
    sliderItems[currentSliderIndex].classList.add("active");
    lastSliderItem = sliderItems[currentSliderIndex];
  };

  setInterval(slideNext, 7000); // Auto slide every 7 seconds
};

function createMovieList({ results: movieList }, title, container) {
  if (!movieList || movieList.length === 0) return;

  const movieListElem = document.createElement("div");
  movieListElem.classList.add("movie-list");

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${title}</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  container.appendChild(movieListElem);
};

search();
