class GoogleMaps {

  constructor() {
    this.map = null;
    this.markers = [];
    this.bounds = null;
    this.initOptions = { center: {lat: -14.235004, lng: -51.92528}, zoom: 5 }; // brasil
  }

  init() {
    let js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGFzc9BcMwW9UT2N5mYj9PeT4bXs8a6o';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }

  initMap(options) {
    window.gMap.map = new google.maps.Map(document.querySelector('googlemaps'), this.initOptions);
  }

  initBrazil() {
    window.gMap.map.setOptions(this.initOptions);
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null) );
  }

  addMarkers(m) {
    this.clearMarkers()
    this.bounds = new google.maps.LatLngBounds();

    m.forEach(marker => {
      let position = new google.maps.LatLng(marker.lat, marker.lng);

      this.markers.push(
        new google.maps.Marker({
          position: position,
          map: window.gMap.map,
          animation: google.maps.Animation.xo
        })
      );

      this.bounds.extend(position);
    });

    window.gMap.map.fitBounds(this.bounds);
    window.gMap.map.setOptions({
      zoom: 18
    });
  }
}

export default GoogleMaps
