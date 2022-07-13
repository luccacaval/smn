const url = 'https://ws.smn.gob.ar/map_items/weather';
let weatherStation = 'Las Rosas';

function getWeatherStation() {
  weatherStation = document.getElementsByName('city').value
  init()
}


function init() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let filteredData = data.filter(item => item.name == weatherStation)[0];
      console.log(filteredData);
      let stationName = filteredData.name
      let container = document.getElementById('container')
      let title = document.createElement('h2')
      container.append(title)
      delete filteredData.weather.id;
      delete filteredData.weather.st;
      delete filteredData.weather.tempDesc;
      delete filteredData.weather.visibility;
      delete filteredData.weather.pressure;
      delete filteredData.weather.id;
      for (let key in filteredData.weather) {
      let div = document.createElement('div');
      div.textContent = `${key}: ${filteredData.weather[key]}`
      container.append(div);
      }
    })
    .catch(err => console.log(err))
}
