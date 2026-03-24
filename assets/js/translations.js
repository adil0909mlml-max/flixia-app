"use strict";

const translations = {
  ar: {
    home: "الرئيسية",
    movies: "أفلام",
    tvShows: "مسلسلات",
    search: "البحث عن أفلام ومسلسلات...",
    upcoming: "الأفلام القادمة",
    trending: "أفلام رائجة هذا الأسبوع",
    topRated: "أفلام الأعلى تقييماً",
    popularTv: "أشهر المسلسلات",
    genres: "التصنيفات",
    languages: "اللغة",
    watchNow: "▶ مشاهدة الآن",
    watchAndDownload: "▶ المشاهدة والتحميل",
    watchEpisode: "شاهد الحلقة",
    seasonsAndEpisodes: "المواسم والحلقات",
    cast: "بطولة",
    director: "إخراج",
    trailer: "المقطع الدعائي",
    recommendations: "قد يعجبك أيضاً",
    ratingLabel: "ما رأيك؟",
    selectServer: "اختر السيرفر",
    subtitleNote: "ملاحظة: لتشغيل الترجمة العربية، اضغط على زر (CC) داخل مشغل الفيديو واختر Arabic.",
    copyright: "جميع الحقوق محفوظة © 2026",
    poweredBy: "مدعوم من TMDB",
    noDescription: "لا يوجد وصف متاح باللغة العربية.",
    searchResultLabel: "نتائج البحث عن",
    noResult: "لا توجد نتائج مطابقة لبحثك.",
    loading: "جاري التحميل...",
    ratingLevels: ["سيئ", "متوسطة", "جيدة", "رائعة", "أسطورية"],
    langNames: {
      ar: "العربية",
      en: "الإنجليزية",
      fr: "الفرنسية",
      hi: "الهندية",
      tr: "التركية",
      ko: "الكورية",
      ja: "اليابانية",
      es: "الإسبانية"
    }
  },
  en: {
    home: "Home",
    movies: "Movies",
    tvShows: "TV Shows",
    search: "Search movies & series...",
    upcoming: "Upcoming Movies",
    trending: "Trending This Week",
    topRated: "Top Rated Movies",
    popularTv: "Popular TV Shows",
    genres: "Genres",
    languages: "Language",
    watchNow: "▶ Watch Now",
    watchAndDownload: "▶ Watch & Download",
    watchEpisode: "Watch Episode",
    seasonsAndEpisodes: "Seasons & Episodes",
    cast: "Cast",
    director: "Director",
    trailer: "Trailer",
    recommendations: "You May Also Like",
    ratingLabel: "What do you think?",
    selectServer: "Select Server",
    subtitleNote: "Note: To enable subtitles, click the (CC) button inside the player and select your language.",
    copyright: "All Rights Reserved © 2026",
    poweredBy: "Powered by TMDB",
    noDescription: "No description available.",
    searchResultLabel: "Search results for",
    noResult: "No results matched your search.",
    loading: "Loading...",
    ratingLevels: ["Poor", "Average", "Good", "Great", "Legendary"],
    langNames: {
      ar: "Arabic",
      en: "English",
      fr: "French",
      hi: "Hindi",
      tr: "Turkish",
      ko: "Korean",
      ja: "Japanese",
      es: "Spanish"
    }
  },
  fr: {
    home: "Accueil",
    movies: "Films",
    tvShows: "Séries TV",
    search: "Rechercher des films et séries...",
    upcoming: "Films à venir",
    trending: "Tendances de la semaine",
    topRated: "Films les mieux notés",
    popularTv: "Séries TV populaires",
    genres: "Genres",
    languages: "Langue",
    watchNow: "▶ Regarder",
    watchAndDownload: "▶ Regarder & Télécharger",
    watchEpisode: "Regarder l'épisode",
    seasonsAndEpisodes: "Saisons & Épisodes",
    cast: "Casting",
    director: "Réalisateur",
    trailer: "Bande-annonce",
    recommendations: "Vous aimerez aussi",
    ratingLabel: "Qu'en pensez-vous ?",
    selectServer: "Choisir le serveur",
    subtitleNote: "Note : Pour activer les sous-titres, cliquez sur (CC) dans le lecteur et choisissez votre langue.",
    copyright: "Tous droits réservés © 2026",
    poweredBy: "Propulsé par TMDB",
    noDescription: "Pas de description disponible.",
    searchResultLabel: "Résultats de recherche pour",
    noResult: "Aucun résultat ne correspond à votre recherche.",
    loading: "Chargement...",
    ratingLevels: ["Médiocre", "Moyen", "Bon", "Génial", "Légendaire"],
    langNames: {
      ar: "Arabe",
      en: "Anglais",
      fr: "Français",
      hi: "Hindi",
      tr: "Turc",
      ko: "Coréen",
      ja: "Japonais",
      es: "Espagnol"
    }
  },
  es: {
    home: "Inicio",
    movies: "Películas",
    tvShows: "Series TV",
    search: "Buscar películas y series...",
    upcoming: "Próximas películas",
    trending: "Tendencias de la semana",
    topRated: "Películas mejor valoradas",
    popularTv: "Series TV populares",
    genres: "Géneros",
    languages: "Idioma",
    watchNow: "▶ Ver ahora",
    watchAndDownload: "▶ Ver y Descargar",
    watchEpisode: "Ver episodio",
    seasonsAndEpisodes: "Temporadas y Episodios",
    cast: "Reparto",
    director: "Director",
    trailer: "Tráiler",
    recommendations: "También te puede interesar",
    ratingLabel: "¿Qué te parece?",
    selectServer: "Seleccionar servidor",
    subtitleNote: "Nota: Para activar subtítulos, haz clic en (CC) dentro del reproductor y elige tu idioma.",
    copyright: "Todos los derechos reservados © 2026",
    poweredBy: "Impulsado por TMDB",
    noDescription: "No hay descripción disponible.",
    searchResultLabel: "Resultados de búsqueda para",
    noResult: "No se encontraron resultados para su búsqueda.",
    loading: "Cargando...",
    ratingLevels: ["Malo", "Normal", "Bueno", "Genial", "Legendario"],
    langNames: {
      ar: "Árabe",
      en: "Inglés",
      fr: "Francés",
      hi: "Hindi",
      tr: "Turco",
      ko: "Coreano",
      ja: "Japonés",
      es: "Español"
    }
  }
};

function getTxt(key) {
  const lang = window.localStorage.getItem("lang") || "ar";
  return translations[lang][key] || translations["en"][key] || key;
}

function updateLayoutDirection() {
  const lang = window.localStorage.getItem("lang") || "ar";
  const isRtl = lang === "ar";
  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
}

// Initial update
updateLayoutDirection();
