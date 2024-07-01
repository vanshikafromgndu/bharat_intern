document.addEventListener('DOMContentLoaded', function() {
    var inputvalue = document.querySelector('#cityinput');
    var btn = document.querySelector('#add');
    var city = document.querySelector('#cityoutput');
    var descip = document.querySelector('#description');
    var temp = document.querySelector('#temp');
    var wind = document.querySelector('#wind');
    var apik = "44eb4640f1ab2163aee09cba05f1355b";

    function convert(val) {
        return (val - 273.15).toFixed(2);
    }

    btn.addEventListener('click', function() {
        var cityname = inputvalue.value;  // Get the city name from the input field
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=' + apik)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then(data => {
            var nameval = data.name;
            var descrip = data.weather[0].description;
            var temprature = data.main.temp;
            var wndspeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${convert(temprature)}°C</span>`;
            descip.innerHTML = `Sky condition: <span>${descrip}</span>`;
            wind.innerHTML = `Wind speed: <span>${wndspeed} km/h</span>`;
        })
        .catch(err => alert('Error: ' + err.message));
    });
});
