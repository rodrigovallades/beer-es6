import { createApolloFetch } from 'apollo-fetch';

class Queries {

  constructor() {
    this.graphql_api = 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql';
  }

  getAddressLocation(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&address=${address}`);
  }

  getPOC(location) {
    const fetch = createApolloFetch({
      uri: this.graphql_api,
    });

    const date = new Date();
    date.toISOString();

    return fetch({
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
    });
  }

  getBeers(pocId) {
    const fetch = createApolloFetch({
      uri: this.graphql_api,
    });

    return fetch({
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
    });
  }

}

export default Queries
