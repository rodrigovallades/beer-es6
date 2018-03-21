class GoogleMaps {

  constructor() {
    this.map = null;
    this.markers = [];
    this.bounds = null;
    this.initOptions = { center: {lat: -14.235004, lng: -51.92528}, zoom: 5 }; // brasil
  }

  init() {
    if (document.querySelectorAll('googlemaps').length > 0) {
      let js_file = document.createElement('script');
      js_file.type = 'text/javascript';
      js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o&callback=initMap';
      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  }

  initMap(options) {
    this.map = new google.maps.Map(document.querySelector('googlemaps'), this.initOptions);
  }

  initBrazil() {
    map.setOptions(this.initOptions);
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
}

export default GoogleMaps
