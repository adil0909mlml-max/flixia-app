"use strict";

function createMovieCard(media) {
  const { poster_path, title, name, vote_average, release_date, first_air_date, id, media_type } = media;

  const cardTitle = title || name || "—";
  const date = release_date || first_air_date;
  const year = date ? date.split("-")[0] : "—";
  const rating = vote_average ? vote_average.toFixed(1) : "—";
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "assets/images/poster-bg-icon.png";

  const isTv = media_type === "tv" || (name && !title);
  const link = isTv ? "./tv-detail.html" : "./detail.html";
  const onClickAction = isTv
    ? `getTvDetail('${id}');`
    : `getMovieDetail('${id}');`;

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img
        src="${posterUrl}"
        alt="${cardTitle}"
        class="img-cover"
        loading="lazy"
      />
      <div class="card-meta">${year} ${isTv ? ' | TV' : ''}</div>
      <h3 class="title">${cardTitle}</h3>
      <div class="rating-badge">${rating} ★</div>
    </figure>

    <a href="${link}" class="card-btn" title="${cardTitle}" onclick="${onClickAction}"></a>
  `;

  return card;
}
