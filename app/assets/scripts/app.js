import GoogleMaps from './modules/GoogleMaps';
import Loader from './modules/Loader';
import { createApolloFetch } from 'apollo-fetch';

const gMap = new GoogleMaps()
const loader = new Loader()

class BeerLocator {

  constructor() {
    this.address = {};
    this.graphql_api = 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql'
    this.addressResults = document.querySelector('.address__results');
    this.productsList = document.querySelector('.products');
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

          if (!data.results.length) { return }

          this.address = data.results[0];

          // add marker to gMap
          const location = this.address.geometry.location;
          gMap.addMarkers([{lat: location.lat, lng: location.lng}])

          this.renderAddress(this.address.formatted_address);

          // fetch GraphQL api
          this.getPOC(location);

          console.log(`Google maps API:`);
          console.log(data.results);
        })
        .catch()
    } else if (e.key === 'Escape' && !loader.loading) {
      this.clearInput(input)
      this.clearAddress();
      this.clearProducts();
    }
  }

  getPOC(location) {
    loader.block();
    const fetch = createApolloFetch({
      uri: this.graphql_api,
    });

    const date = new Date();
    date.toISOString();

    fetch({
      query: `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
        pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
          __typename
          id
          status
          tradingName
          officialName
          deliveryTypes {
            __typename
            pocDeliveryTypeId
            deliveryTypeId
            price
            title
            subtitle
            active
          }
          paymentMethods {
            __typename
            pocPaymentMethodId
            paymentMethodId
            active
            title
            subtitle
          }
          pocWorkDay {
            __typename
            weekDay
            active
            workingInterval {
              __typename
              openingTime
              closingTime
            }
          }
          address {
            __typename
            address1
            address2
            number
            city
            province
            zip
            coordinates
          }
          phone {
            __typename
            phoneNumber
          }
        }
      }`,
      variables: {
        "algorithm": "NEAREST",
        "lat": location.lat,
        "long": location.lng,
        "now": date
      }
    }).then(res => {
      loader.unblock();

      console.log(`GraphQL pocSearchMethod:`);
      console.log(res.data);

      if (res.data.pocSearch.length) {
        this.getBeers(res.data.pocSearch[0].id)
      }
    });
  }

  getBeers(pocId) {
    loader.block();
    const fetch = createApolloFetch({
      uri: this.graphql_api,
    });
    fetch({
      query: `query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
        poc(id: $id) {
          products(categoryId: $categoryId, search: $search) {
            productVariants{
              title
              description
              imageUrl
              price
            }
          }
        }
      }`,
      variables: {
        "id": pocId,
        "search": "",
        "categoryId": 0
      }
    }).then(res => {
      loader.unblock();
      if (res.data.poc.products.length) {
        this.renderProducts(res.data.poc.products)
      }
      console.log(`GraphQL pocCategorySearch:`);
      console.log(res.data);
    });
  }

  clearInput(input) {
    input.value = ''
    gMap.clearMarkers()
    gMap.initBrazil()
  }

  clearAddress() {
    console.log(`[Address cleared]`)
    this.addressResults.innerHTML = ``;
  }

  clearProducts() {
    console.log(`[Products cleared]`)
    this.productsList.innerHTML = ``;
  }

  renderAddress(address) {
    this.addressResults.innerHTML = `
      <ul class='address__list'>
        <li class='address__list-item'>${address}</li>
      </ul>
    `
  }

  renderProducts(products) {
    let productsHtml = '';

    products.map(product => {
      let p = product.productVariants[0];
      productsHtml += `
        <div class='products__item'>${p.title}</div>
      `
    })

    this.productsList.innerHTML = productsHtml
  }
}

window.BeerLocator = new BeerLocator()
document.addEventListener('DOMContentLoaded', window.BeerLocator.onLoad)
