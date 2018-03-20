import Loader from './Loader';
import GoogleMaps from './GoogleMaps';
import Queries from './Queries';

const gMap = new GoogleMaps();
const loader = new Loader();
const query = new Queries();

class BeerLocator {

  constructor() {
    this.address = {};
    this.pocSearch = {};
    this.addressResults = document.querySelector('.address__results');
    this.productsList = document.querySelector('.products');
  }

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

          loader.block();
          // fetch GraphQL POC api
          query.getPOC(location)
            .then(res => {
              loader.unblock();

              console.log(`GraphQL pocSearchMethod:`);
              console.log(res.data);

              if (res.data.pocSearch.length) {
                this.renderAddress(this.address.formatted_address);
                this.pocSearch = res.data.pocSearch[0];
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
        <li class='address__list-item'>${address}<span class="address__get-beers">Get beers</span></li>
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

export default BeerLocator
