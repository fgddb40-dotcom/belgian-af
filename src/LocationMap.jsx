import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const belgiumCenter = [50.82, 4.05];
const lukeCenter = [33.535, -112.383];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

export default function LocationMap({ bases, selectedId }) {
  const elementRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(null);
  const [tilesUnavailable, setTilesUnavailable] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return undefined;

    const map = L.map(elementRef.current, { scrollWheelZoom: false }).setView(belgiumCenter, 7);
    const markers = L.featureGroup().addTo(map);
    const tileLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Sources: Esri, HERE, Garmin, FAO, NOAA, USGS, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    tileLayer.on("tileerror", () => setTilesUnavailable(true));
    mapRef.current = map;
    markersRef.current = markers;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markers = markersRef.current;
    if (!map || !markers) return;

    markers.clearLayers();
    for (const base of bases) {
      if (!Number.isFinite(base.latitude) || !Number.isFinite(base.longitude)) continue;
      const isSelected = base.id === selectedId;
      const marker = L.marker([base.latitude, base.longitude], {
        title: base.name,
        alt: base.name,
        keyboard: true,
        icon: L.divIcon({
          className: "location-marker-icon",
          html: `<span class="location-marker${isSelected ? " location-marker-selected" : ""}"></span>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        })
      });
      marker.bindPopup(`<strong>${escapeHtml(base.name)}</strong><br>${escapeHtml(base.role)}<br><a href="#bases/${encodeURIComponent(base.id)}">View location details</a>`);
      markers.addLayer(marker);
    }

    const selectedBase = bases.find((base) => base.id === selectedId);
    const focus = selectedBase && Number.isFinite(selectedBase.latitude) && Number.isFinite(selectedBase.longitude)
      ? [selectedBase.latitude, selectedBase.longitude]
      : belgiumCenter;
    map.flyTo(focus, selectedBase ? (selectedBase.mapRegion === "overseas" ? 8 : 9) : 7, { duration: 0.6 });
  }, [bases, selectedId]);

  return <div className="interactive-map-shell">
    <div className="interactive-map" ref={elementRef} role="application" aria-label="Interactive map of Belgian Air Force locations" />
    {tilesUnavailable && <p className="map-error" role="status">Map tiles could not be loaded. Location markers remain available.</p>}
  </div>;
}
