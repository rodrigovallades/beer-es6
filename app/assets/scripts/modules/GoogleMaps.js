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
      center: {lat: -14.235004, lng: -51.92528}, // brasil
      zoom: 5
    });
  }

  initBrazil() {
    map.setOptions({
      center: {lat: -14.235004, lng: -51.92528}, // brasil
      zoom: 5
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null) );
  }

  addMarkers(m) {
    this.clearMarkers()
    this.bounds = new google.maps.LatLngBounds();

    const self = this;
    m.forEach(marker => {
      let position = new google.maps.LatLng(marker.lat, marker.lng);

      self.markers.push(
        new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.xo
        })
      );

      self.bounds.extend(position);
    });

    map.fitBounds(this.bounds);
    map.setOptions({
      zoom: 18
    });
  }

  getAddressLocation(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&address=${address}`)
  }
}

export default GoogleMaps
