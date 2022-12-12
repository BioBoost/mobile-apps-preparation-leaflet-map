import Leaflet from 'leaflet';

export class DataMarker extends Leaflet.Marker {
  data: any;

  constructor(latLng: Leaflet.LatLngExpression, data: any, options?: Leaflet.MarkerOptions) {
    super(latLng, options);
    this.data = data;
  }
}