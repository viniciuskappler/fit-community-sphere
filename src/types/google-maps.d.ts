
declare global {
  interface Window {
    google: typeof google;
  }
  
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: MapOptions);
        addListener(eventName: string, handler: Function): void;
        getCenter(): LatLng;
        getZoom(): number;
        easeTo(options: { center: LatLng; duration: number; easing: (n: number) => number }): void;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        addListener(eventName: string, handler: Function): void;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map: Map, anchor?: Marker): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      interface MapOptions {
        center?: { lat: number; lng: number };
        zoom?: number;
        styles?: any[];
      }

      interface MarkerOptions {
        position?: { lat: number; lng: number };
        map?: Map;
        title?: string;
        icon?: {
          url: string;
          scaledSize: Size;
        };
      }

      interface InfoWindowOptions {
        content?: string;
      }
    }
  }
}

export {};
