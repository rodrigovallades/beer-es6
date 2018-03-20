import GoogleMaps from './modules/GoogleMaps';
import Loader from './modules/Loader';
import { createApolloFetch } from 'apollo-fetch';

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
    } else if (e.key === 'Escape') {
      this.clear(input)
    }
  }

  getPOC(location) {
    loader.block();
    const fetch = createApolloFetch({
      uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql',
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
      },
    }).then(res => {
      loader.unblock();
      console.log(`GraphQL POC:`);
      console.log(res.data);
    });
  }

  clear(input) {
    input.value = ''
    gMap.clearMarkers()
    gMap.initBrazil()
  }

  renderAddress(address) {
    const addressResults = document.querySelector('.address__results')
    addressResults.innerHTML = `
      <ul class='address__list'>
        <li class='address__list-item'>${address}</li>
      </ul>
    `
  }
}

window.BeerLocator = new BeerLocator()
document.addEventListener('DOMContentLoaded', window.BeerLocator.onLoad)
