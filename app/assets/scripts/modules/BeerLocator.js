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
    this.addressResultsDom = '';
    this.productsListDom = '';
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

          if (!data.results.length) {
            this.renderAddress('Address not found.');
            gMap.clearMarkers();
            gMap.initBrazil();
            return
          }

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
                this.renderAddress(this.address.formatted_address, true);
                this.pocSearch = res.data.pocSearch[0];
              } else {
                this.renderAddress('No POCs found near this location.');
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
  }

  clearAddress() {
    console.log(`[Address cleared]`);
    this.addressResultsDom.innerHTML = ``;
  }

  clearProducts() {
    console.log(`[Products cleared]`);
    this.productsListDom.innerHTML = ``;
  }

  renderAddress(message, showBuy) {
    let template = ``;
    if (showBuy) {
      template = `
        <ul class='address__list'>
          <li class='address__list-item'>${message}<span class="btn btn--dark address__get-beers">Get beers</span></li>
        </ul>
      `;
    } else {
      template = `
        <ul class='address__list'>
          <li class='address__list-item address__list-item--error'>${message}</li>
        </ul>
      `;
    }
    this.addressResultsDom.innerHTML = template;
  }

  renderProducts(products) {
    let productsHtml = '';
    products.map((product, index) => {
      let p = product.productVariants[0];
      productsHtml += `
        <div class='products__item' data-id='${index}'>
          <div class='product__title'>${p.title}</div>
          <div class='product__image'><img src='${p.imageUrl}' /></div>
          <div class='product__price'>R$ ${p.price}</div>
          <div class='product__controls'>
            <div class='btn btn--light product__remove' data-id='${index}'>-</div>
            <div class='product__quantity products__quantity--id${index}'>0</div>
            <div class='btn btn--light product__add' data-id='${index}'>+</div>
          </div>
        </div>
      `;
    });

    this.productsListDom.innerHTML = productsHtml;
  }

}

export default BeerLocator
