function getWeather() {
  console.log("run test");

  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) {
    Swal.fire({
      title: "شهری وارد نشد !",
      text: "لطفا نام شهر مورد نظر را وارد کنید",
      icon: "warning",
      confirmButtonText: "باشه",
      confirmButtonColor: "#3085d6",
    });
    return;
  }
  
  const apiKey = "235785bc369ab18214c37221df285463";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const weatherDiv = document.getElementById("weather");
      console.log(data);
      cityInput.value = "";

      weatherDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp.toFixed(1)}°C</p>
          <p>Description: ${data.weather[0].description}</p>
        `;
    })
    .catch((error) => {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = "";

      Swal.fire({
        title: "شهر یافت نشد!",
        text: "لطفا نام شهر را مجددا بررسی کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    });

  setTimeout(() => {
    console.log("end test");
  }, 2000);
}
