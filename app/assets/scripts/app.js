import GoogleMaps from './modules/GoogleMaps'

const gMap = new GoogleMaps()

class BeerLocator {

  constructor() {}

  onLoad() {
    window.initMap = gMap.initMap;
    gMap.getAddressLocation()
    gMap.init()
  };

  searchHandler(e, el) {
    if (e.keyCode === 13 || e.key === `Enter`) {
      gMap.getAddressLocation()
    } else if (e.key === 'Escape') {
      this.clear(el)
    }
  }

  clear(el) {
    el.value = ''
  }
}

window.BeerLocator = new BeerLocator()
document.addEventListener('DOMContentLoaded', BeerLocator.onLoad)
