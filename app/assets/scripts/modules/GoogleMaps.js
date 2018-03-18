class GoogleMaps {

  constructor() {
    this.map = null;
    this.markers = [];
    this.bounds = null;
  }

  init() {
    if (document.querySelectorAll('#map').length > 0) {
      let js_file = document.createElement('script');
      js_file.type = 'text/javascript';
      js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&callback=initMap'
      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8
    });
  }

  plotMarkers(m) {
    this.markers = [];
    this.bound = new google.maps.LatLngBounds();

    m.forEach(function (marker) {
      var position = new google.maps.LatLng(marker.lat, marker.lng);

      this.markers.push(
        new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP
        })
      );

      this.bound.extend(position);
    });

    map.fitBounds(this.bound);
  }

  getAddressLocation() {
    let address = document.getElementById('search_address').value;
    if (address) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&address=${address}`)
        .then(res => { console.log(res) });
    } else {
      console.log('no address');
    }
  }

}

export default GoogleMaps
