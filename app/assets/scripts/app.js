import GoogleMaps from './modules/GoogleMaps'

const gMap = new GoogleMaps()

class BeerLocator {

  constructor() {
    this.address = {};
  }

  onLoad() {
    window.initMap = gMap.initMap;
    gMap.getAddressLocation()
    gMap.init()
  };

  searchHandler(e, input) {
    if (e.keyCode === 13 || e.key === `Enter`) {
      gMap.getAddressLocation()
      .then(res => res.json())
      .then(data => {
        const location = data.results[0].geometry.location;
        console.log(data.results);
        gMap.addMarkers([{lat: location.lat, lng: location.lng}])

        this.address = data.results[0];
        this.renderAddress();
      })
    } else if (e.key === 'Escape') {
      this.clear(input)
    }
  }

  clear(input) {
    input.value = ''
    gMap.clearMarkers()
    gMap.initBrazil()
  }

  renderAddress() {
    const addressResults = document.querySelector('.address__results')
    addressResults.innerHTML = `
      <ul class='address__list'>
        <li class='address__list-item'>${this.address.formatted_address}</li>
      </ul>
    `
  }
}

window.BeerLocator = new BeerLocator()
document.addEventListener('DOMContentLoaded', window.BeerLocator.onLoad)
