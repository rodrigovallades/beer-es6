import GoogleMaps from './modules/GoogleMaps';
import Queries from './modules/Queries';
import Loader from './modules/Loader';

class BeerLocator {

  constructor() {
    this.address = {};
    this.addressResults = document.querySelector('.address__results');
    this.productsList = document.querySelector('.products');
  }

  onLoad() {
    // global - accessible to gmaps api
    window.initOptions = gMap.initOptions;
    window.initMap = gMap.initMap;
    gMap.init();
  };

  searchHandler(e, input) {
    let address = document.getElementById('search_address').value;
    if (address && (e.keyCode === 13 || e.key === `Enter`)) {
      loader.block();
      this.clearSearchResults();
      query.getAddressLocation(address)
        .then(res => res.json())
        .then(data => {
          loader.unblock();

          if (!data.results.length) { return }

          this.address = data.results[0];

          // add marker to gMap
          const location = this.address.geometry.location;
          gMap.addMarkers([{lat: location.lat, lng: location.lng}])

          this.renderAddress(this.address.formatted_address);

          loader.block();
          // fetch GraphQL POC api
          query.getPOC(location)
            .then(res => {
              loader.unblock();

              console.log(`GraphQL pocSearchMethod:`);
              console.log(res.data);

              if (res.data.pocSearch.length) {
                loader.block();
                // fetch GraphQL products api
                query.getBeers(res.data.pocSearch[0].id)
                  .then(res => {
                    loader.unblock();
                    if (res.data.poc.products.length) {
                      this.renderProducts(res.data.poc.products);
                    }
                    console.log(`GraphQL pocCategorySearch:`);
                    console.log(res.data);
                  });
              }
            });

          console.log(`Google maps API:`);
          console.log(data.results);
        })
        .catch()
    } else if (e.key === 'Escape' && !loader.loading) {
      this.clearInput(input);
      this.clearSearchResults();
    }
  }

  clearInput(input) {
    input.value = '';
    gMap.clearMarkers();
    gMap.initBrazil();
  }

  clearSearchResults() {
    this.clearAddress();
    this.clearProducts();
  }

  clearAddress() {
    console.log(`[Address cleared]`);
    this.addressResults.innerHTML = ``;
  }

  clearProducts() {
    console.log(`[Products cleared]`);
    this.productsList.innerHTML = ``;
  }

  renderAddress(address) {
    this.addressResults.innerHTML = `
      <ul class='address__list'>
        <li class='address__list-item'>${address}</li>
      </ul>
    `;
  }

  renderProducts(products) {
    let productsHtml = '';

    products.map(product => {
      let p = product.productVariants[0];
      productsHtml += `
        <div class='products__item'>${p.title}</div>
      `;
    });

    this.productsList.innerHTML = productsHtml;
  }
}

const gMap = new GoogleMaps();
const loader = new Loader();
const query = new Queries();
window.BeerLocator = new BeerLocator();

document.addEventListener('DOMContentLoaded', window.BeerLocator.onLoad);
