import GoogleMaps from './modules/GoogleMaps';
import Loader from './modules/Loader';
import Queries from './modules/Queries';
import BeerLocator from './modules/BeerLocator'

const gMap = new GoogleMaps();
const loader = new Loader();
const query = new Queries();

window.BeerLocator = new BeerLocator();

function onLoad() {
  // global - accessible to gmaps api
  window.initOptions = gMap.initOptions;
  window.initMap = gMap.initMap;
  gMap.init();
};

window.BeerLocator.addressResults.addEventListener('click', function(e) {
    if (e.target.classList.contains('address__get-beers')) {
      loader.block();
      // fetch GraphQL products api
      query.getBeers(window.BeerLocator.pocSearch.id)
        .then(res => {
          loader.unblock();
          if (res.data.poc.products.length) {
            window.BeerLocator.renderProducts(res.data.poc.products);
          }
          console.log(`GraphQL pocCategorySearch:`);
          console.log(res.data);
        });
    }
});

document.addEventListener('DOMContentLoaded', onLoad);
