let selectBtn = document.querySelector(".select-btn");
selectBtn.setAttribute("id", "city");

const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "b717afe39aff255425da57730b5e8cfb",
};

const cities = {
  2673730: "Stockholm",
  6942553: "Paris",
  4321929: "Delhi",
  4879018: "Tripoli",
  6547294: "Casablanca",
  7291968: "Wellington",
  8014387: "Salvador",
  3143244: "Oslo",
  6692263: "Reykjavik",
  6058560: "London",
};

function createSelect() {
  let selectList = document.createElement("ul");
  for (let key in cities) {
    let selectItem = document.createElement("li");
    selectItem.classList.add("select-item");
    selectItem.setAttribute("data", key);
    selectItem.textContent = cities[key];
    selectList.appendChild(selectItem);
  }
  document.querySelector(".select").append(selectList);
  selectList.classList.add("select-list", "visually-hidden");
}
createSelect();

let selectList = document.querySelector(".select-list");

selectBtn.addEventListener("click", function () {
  selectList.classList.toggle("visually-hidden");
  this.classList.add("select-btn-active"); 
});

let selectItem = document.querySelectorAll(".select-item");

selectItem.forEach(function (elem) {
  elem.addEventListener("click", function (event) {
    event.stopPropagation();
    selectBtn.focus();
    let attr = elem.getAttribute("data");
    selectBtn.setAttribute("data", attr);
    selectBtn.innerHTML = this.innerHTML;
    selectList.classList.add("visually-hidden");
    getWeather();
  });
});

document.addEventListener("click", function (event) {
  if (event.target !== selectBtn) {
    selectList.classList.add("visually-hidden");
  }
});

function getWeather() {
  let cityId = document.querySelector("#city").getAttribute("data");
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  document.querySelector(
    ".current-date"
  ).textContent = new Date().toLocaleString("en-GB");
  document.querySelector(".city-name").textContent =
    data.name + ", " + data.sys.country;
  document.querySelector(".temp-value").innerHTML =
    Math.floor(data.main.temp) + "&#x2103;";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "<sup>&#x25;</sup>";
  document.querySelector(".pressure").innerHTML =
    Math.floor(data.main.pressure / 1.333) + " <sub>mmHg</sub>";
  document.querySelector(".wind").innerHTML =
    Math.floor(data.wind.speed / 2.237) + " <sub>m/s</sub>";
  document.querySelector(".sunset-time").textContent = new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString();
  document.querySelector(".sunrise-time").textContent = new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString();
  document.querySelector(".temp-description").textContent =
    data.weather[0]["description"];
  document.querySelector(
    ".temp-icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png" width="100" height="100" alt="weather icon">`;
}
getWeather();