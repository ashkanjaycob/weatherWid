function getWeather() {

  const cityInput = document.getElementById("cityInput");
  let city = cityInput.value.trim();
  const weatherDiv = document.getElementById("weatherDetails");

  let isLoading = true;

  if (!city) {

    city = localStorage.getItem("lastCity"); 

    if (!city) {
      Swal.fire({
        title: "هنوز شهری وارد نشده است !",
        text: "لطفا نام شهر مورد نظر را وارد کنید",
        icon: "warning",
        confirmButtonText: "باشه",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
  }

  const apiKey = "235785bc369ab18214c37221df285463";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`;

  if (isLoading) {
    weatherDiv.innerHTML = `
    <div class="flex items-center justify-center h-32 w-full">
      <div class="border-4 border-white border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
    </div>
  `;
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      cityInput.value = "";
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      localStorage.setItem("lastCity", data.name);
      isLoading = false;

      weatherDiv.innerHTML = `
          <div class="w-3/4 p-4"> 
          <h2 class="text-3xl my-4">${data.name}</h2>
          <p>دمای هوا : ${data.main.temp.toFixed(1)} درجه °C</p>
          <hr class="my-2" />
          <p class="my-2">حس واقعی دما : ${data.main.feels_like.toFixed(
            1
          )} درجه °C</p>
          <p>وضعیت جوی : ${data.weather[0].description}</p>
          </div>
          <div class="w-1/4"> 
          <img class="w-full" src="${iconUrl}"
          alt="${data.weather[0].description}">
          </div>
        `;
    })
    .catch((error) => {
      Swal.fire({
        title: "شهر یافت نشد!",
        text: "لطفا نام شهر را مجددا بررسی کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
      
      cityInput.value = "";
      isLoading = false;
      weatherDiv.innerHTML = "";
      localStorage.removeItem("lastCity"); 
    });
}

// For Fisrt Preview 
window.onload = () => {
  getWeather();
};