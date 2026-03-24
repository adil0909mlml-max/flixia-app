"use strict";

const tvId = window.localStorage.getItem("tvId");
const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(", ");
};

const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director" || job === "Executive Producer");
  const directorList = [];
  for (const { name } of directors) directorList.push(name);
  return directorList.join(", ");
};

fetchDataFromServer(
  `https://api.themoviedb.org/3/tv/${tvId}?api_key=${api_key}&append_to_response=credits,videos,images,recommendations&language=${getLang()}`,
  function (tv) {
    const {
      backdrop_path,
      poster_path,
      name,
      first_air_date,
      episode_run_time,
      vote_average,
      genres,
      overview,
      credits = { cast: [], crew: [] },
      seasons = [],
      number_of_seasons = 0
    } = tv;

    const cast = credits.cast || [];
    const crew = credits.crew || [];

    document.title = `${name} - Flixia`;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    const runtime = episode_run_time && episode_run_time.length > 0 ? episode_run_time[0] : 45;

    movieDetail.innerHTML = `
      <div
        class="backdrop-image"
        style="background-image: url('${imageBaseURL}${"w1280" || "original"}${
      backdrop_path || poster_path
    }')"
      ></div>

      <figure class="poster-box movie-poster">
        <img
          src="${imageBaseURL}w342${poster_path}"
          alt="${name}"
          class="img-cover"
        />
      </figure>

      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${name}</h1>

          <div class="meta-list">
            <div class="meta-item">
              <img src="assets/images/star.png" width="20" height="20" alt="تقييم" />
              <span class="span">${vote_average ? vote_average.toFixed(1) : "—"}</span>
            </div>
            <div class="meta-item">${runtime} ${getLang() === 'ar' ? 'دقيقة' : 'm'}</div>
            <div class="meta-item">${first_air_date ? first_air_date.split("-")[0] : "—"}</div>
            <div class="meta-item card-badge" style="background:var(--primary);color:black;">${number_of_seasons} ${getTxt("seasonsAndEpisodes").split("&")[0]}</div>
          </div>

          <p class="genre">${getGenres(genres)}</p>

          <p class="overview">${overview || getTxt("noDescription")}</p>

          <ul class="detail-list">
            <div class="list-item">
              <p class="list-name">${getTxt("cast")}</p>
              <p>${getCasts(cast)}</p>
            </div>
            <div class="list-item">
              <p class="list-name">${getTxt("director")}</p>
              <p>${getDirectors(crew) || "—"}</p>
            </div>
          </ul>
        </div>

        <div class="title-wrapper" style="margin-top: 40px; margin-bottom: 20px;">
          <h3 class="title-large">${getTxt("seasonsAndEpisodes")}</h3>
        </div>

        <div class="season-selector" style="margin-bottom: 20px;">
          <select id="seasonSelect" class="btn" style="width: 100%; max-width: 300px; padding: 12px; background: var(--surface); color: var(--on-surface); border: 1px solid var(--primary); outline: none; border-radius: var(--radius-8);">
            ${seasons.filter(s => s.season_number > 0).map(s => `<option value="${s.season_number}">${s.name}</option>`).join('')}
          </select>
        </div>

        <div id="episodesList" class="grid-list" style="margin-bottom: 40px; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <!-- Episodes will load here -->
        </div>

        <div class="ad-slot detail-ad"></div>
      </div>
    `;

    pageContent.appendChild(movieDetail);

    // Initial load for episodes
    const seasonSelect = document.getElementById("seasonSelect");
    if (seasonSelect && seasonSelect.value) {
        loadEpisodes(seasonSelect.value, name);
        seasonSelect.addEventListener("change", (e) => {
          loadEpisodes(e.target.value, name);
        });
    }
  }
);

function loadEpisodes(seasonNumber, tvName) {
  const episodesList = document.getElementById("episodesList");
  episodesList.innerHTML = `<p style='color:var(--primary); font-size:1.6rem;'>${getTxt("loading")}</p>`;
  
  fetchDataFromServer(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${api_key}&language=${getLang()}`,
    function (seasonData) {
      episodesList.innerHTML = "";
      if (!seasonData.episodes || seasonData.episodes.length === 0) {
        episodesList.innerHTML = "<p>N/A</p>";
        return;
      }

      seasonData.episodes.forEach(ep => {
        const epCard = document.createElement("div");
        epCard.classList.add("episode-item");
        epCard.style.cssText = "background: #111; padding: 10px; border-radius: var(--radius-12); border: 1px solid #333; position: relative; display: flex; flex-direction: column;";
        
        const epImage = ep.still_path ? 
          `https://image.tmdb.org/t/p/w300${ep.still_path}` : 
          "assets/images/poster-bg-icon.png";

        epCard.innerHTML = `
          <figure class="poster-box card-banner" style="width: 100%; aspect-ratio: 16/9; margin-bottom: 12px; border-radius: var(--radius-8);">
            <img src="${epImage}" alt="${ep.name}" class="img-cover" loading="lazy">
          </figure>
          
          <h4 class="ep-title" style="font-size: 1.4rem; margin-bottom: 8px; color: #fff;">Ep ${ep.episode_number}: ${ep.name || '...'}</h4>
          
          <div class="meta-list" style="margin-bottom: 15px; font-size: 1.2rem; display: flex; gap: 10px;">
            <div class="meta-item" style="display:flex; align-items:center; gap:4px;"><img src="assets/images/star.png" width="14" height="14"> ${ep.vote_average ? ep.vote_average.toFixed(1) : '-'}</div>
            <div class="meta-item">${ep.runtime || 45} m</div>
          </div>
          
          <button class="watch-btn" style="width: 100%; margin-block: 10px;" onclick="openServerModal('${tvName.replace(/'/g, "\\'")} - S${seasonNumber} E${ep.episode_number}', ${seasonNumber}, ${ep.episode_number})">
            <span class="span">${getTxt("watchEpisode")}</span>
          </button>
        `;
        episodesList.appendChild(epCard);
      });
    }
  );
}

search();
