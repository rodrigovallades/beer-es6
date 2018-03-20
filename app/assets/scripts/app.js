import GoogleMaps from './modules/GoogleMaps'
import Loader from './modules/Loader'

const gMap = new GoogleMaps()
const loader = new Loader()

class BeerLocator {

  constructor() {
    this.address = {};
  }

  onLoad() {
    window.initMap = gMap.initMap;
    gMap.init()
  };

  searchHandler(e, input) {
    let address = document.getElementById('search_address').value;
    if (address && (e.keyCode === 13 || e.key === `Enter`)) {
      loader.block();
      gMap.getAddressLocation(address)
        .then(res => res.json())
        .then(data => {
          loader.unblock();
          const location = data.results[0].geometry.location;
          console.log(data.results);
          gMap.addMarkers([{lat: location.lat, lng: location.lng}])

          this.address = data.results[0];
          this.renderAddress();
        })
        .catch()
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
