let props = {
  humidity: 'Humedad',
  wind_speed: 'Velocidad del viento',
  description: 'Descripcion',
  temp: 'Temperatura',
  'wing_deg': 'Direccion del viento'
}

let status = {
  Despejado : '☀️',
  Nublado : '⛅'
}

const url = 'https://ws.smn.gob.ar/map_items/weather';
let weatherStation = 'Las Rosas';

document.body.children[1].value = '';
document.addEventListener('DOMContentLoaded', init())

function init() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      weatherStation = document.body.children[1].value || weatherStation
      let filteredData = data.filter(item => item.name == weatherStation)[0];
      console.log(filteredData);
      let stationName = filteredData.name
      let container = document.getElementById('container')
      container.innerHTML = ''
      let title = document.createElement('h2')
      container.append(title)
      title.textContent = weatherStation
      delete filteredData.weather.id;
      delete filteredData.weather.st;
      delete filteredData.weather.tempDesc;
      delete filteredData.weather.visibility;
      delete filteredData.weather.pressure;
      delete filteredData.weather.id;
      let dataDiv = document.createElement('div')
      let itemsDiv = document.createElement('div')
      dataDiv.classList.add('data');
      itemsDiv.classList.add('items');
      container.append(dataDiv)
      container.append(itemsDiv)
      for (let key in filteredData.weather) {
        if (key == 'description') {
          let emoji = document.createElement('div')
          emoji.textContent = status[filteredData.weather[key]]
          dataDiv.append(emoji)
        }
      let div = document.createElement('div');
      div.textContent = `${props[key]}: ${filteredData.weather[key]}`
      itemsDiv.append(div);
      }
    })
    .catch(err => console.log(err))
}
