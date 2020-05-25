let mainTowns = {
    "Москва": 524894,
    "Прага": 3067696,
    "Реутов": 502016,
    "Сочи": 491422,
    "Киев": 703448,
    "Голивуд": 4158928,
    "Брюссель": 2800866,
    "Багдад": 98182
}

let daysW = {
    "Сегодня": 0,
    "Завтра": 9,
    "Послезавтра": 17,
}

document.querySelector('.goroda').onchange = citiesWeather;

function citiesWeather() {

    document.querySelector('.dni').onchange = weatherDays;
    function weatherDays() {
        let dates = document.querySelector('.dni').value;
        let dateOut = '';
        for (keys in daysW) {
            if (keys == dates) {
                dateOut = daysW[keys];
            }
        }
        let towns = document.querySelector('.goroda').value;
        let out = '';
        for (key in mainTowns) {
            if (key == towns) {
                out = mainTowns[key];
            }
        }
        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${out}&appid=a43f6832c54174f85eb6f3c7c02b227b`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                document.querySelector('.package-name').textContent = data.city.country;
                document.querySelector('.price').innerHTML = Math.round(data.list[dateOut]['main']['temp'] - 273) + '&deg;';;
                document.querySelector('.disclaimer').textContent = data.list[dateOut]['weather'][0]['description'];
                document.querySelector('.w-icons').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[dateOut]['weather'][0]['icon']}@2x.png">`;
                document.querySelector('.humidity').textContent = data.list[dateOut]['main']['humidity'] + '%';
                document.querySelector('.pressure').textContent = data.list[dateOut]['main']['pressure'] + ' Pa';
                document.querySelector('.windspeed').textContent = data.list[dateOut]['wind']['speed'] + ' m/s';
            })
            .catch(function () {

            })
    }
    weatherDays();
}
citiesWeather()

