"use strict";

var api_key = "c45a857c193f6302f2b5061c3b85e743";
var imageBaseURL = "https://image.tmdb.org/t/p/";

var getLang = () => window.localStorage.getItem("lang") || "ar";

var fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam))
    .catch((err) => console.error("خطأ في جلب البيانات:", err));
};
