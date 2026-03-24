"use strict";

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(" • ");
};

const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join("، ");
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");
  const directorList = [];
  for (const { name } of directors) directorList.push(name);
  return directorList.join("، ");
};

const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Teaser") && site === "YouTube"
  );
};

fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=${getLang()}&append_to_response=casts,videos,images,releases`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;

    document.title = `${title} - Flixia`;

    const year = release_date ? release_date.split("-")[0] : "—";
    const hours = Math.floor((runtime || 0) / 60);
    const mins = (runtime || 0) % 60;
    const durationText = runtime ? `${hours}h ${mins}m` : "—";

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
      <div
        class="backdrop-image"
        style="background-image: url('${imageBaseURL}w1280${backdrop_path || poster_path}')">
      </div>

      <figure class="poster-box movie-poster">
        <img
          src="${imageBaseURL}w342${poster_path}"
          alt="${title}"
          class="img-cover"
        />
      </figure>

      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${title}</h1>

          <div class="meta-list">
            <div class="meta-item">⭐ ${vote_average ? vote_average.toFixed(1) : "—"}</div>
            <div class="separator"></div>
            <div class="meta-item">🕐 ${durationText}</div>
            <div class="separator"></div>
            <div class="meta-item card-badge">${year}</div>
          </div>

          <p class="genre">${getGenres(genres)}</p>

          <p class="overview">${overview || getTxt("noDescription")}</p>

          <ul class="detail-list">
            ${cast.length > 0 ? `
            <div class="list-item">
              <p class="list-name">${getTxt("cast")}</p>
              <p>${getCasts(cast)}</p>
            </div>` : ''}

            ${getDirectors(crew) ? `
            <div class="list-item">
              <p class="list-name">${getTxt("director")}</p>
              <p>${getDirectors(crew)}</p>
            </div>` : ''}
          </ul>
        </div>

        <button class="watch-btn" onclick="openServerModal('${title.replace(/'/g, "\\'")}')">
          ${getTxt("watchAndDownload")}
        </button>

        <div class="ad-slot detail-ad"></div>
      </div>
    `;

    pageContent.appendChild(movieDetail);

    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&language=${getLang()}&page=1`,
      addSuggestedMovies
    );
  }
);

const addSuggestedMovies = function ({ results: movieList }) {
  if (!movieList || movieList.length === 0) return;

  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${getTxt("recommendations")}</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);
};

search();
