<script setup>
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  resources: {
    type: Array,
    required: true
  },
  userLocation: {
    type: Object,
    default: null
  }
})

const mapElement = ref(null)

let map = null
let markersLayer = null

function createNumberedIcon(number) {
  return L.divIcon({
    className: 'custom-numbered-marker',
    html: `<div class="marker-circle">${number}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  })
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }

    return replacements[character]
  })
}

function createPopup(resource, number) {
  const name = escapeHtml(resource.name)
  const address = escapeHtml(resource.address)
  const phone = escapeHtml(resource.phone)

  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(resource.address)

  const telephone = String(resource.phone).replace(/[^\d+]/g, '')

  const distance =
    resource.calculatedDistance !== undefined
      ? `${resource.calculatedDistance.toFixed(1)} miles`
      : 'Distance unavailable'

  return `
    <div class="facility-popup">
      <h3>${number}. ${name}</h3>
      <p><strong>Distance:</strong> ${distance}</p>
      <p><strong>Address:</strong><br>${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>TTY:</strong> 711</p>

      <div class="popup-buttons">
        <a
          href="${directionsUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="popup-directions"
        >
          Directions
        </a>

        <a href="tel:${telephone}" class="popup-call">
          Call
        </a>
      </div>
    </div>
  `
}

function updateMap() {
  if (!map || !markersLayer) return

  markersLayer.clearLayers()

  const bounds = []
  const locationCounts = new Map()

  props.resources.forEach((resource, index) => {
    if (
      !Number.isFinite(resource.latitude) ||
      !Number.isFinite(resource.longitude)
    ) {
      return
    }

    const locationKey =
      `${resource.latitude},${resource.longitude}`

    const duplicateIndex = locationCounts.get(locationKey) || 0
    locationCounts.set(locationKey, duplicateIndex + 1)

    // Separate duplicate markers visually
    const markerLatitude = resource.latitude
    const markerLongitude =
      resource.longitude + duplicateIndex * 0.00015

    L.marker([markerLatitude, markerLongitude], {
      icon: createNumberedIcon(index + 1)
    })
      .addTo(markersLayer)
      .bindPopup(createPopup(resource, index + 1), {
        maxWidth: 300
      })

    bounds.push([markerLatitude, markerLongitude])
  })

  if (props.userLocation) {
    const { latitude, longitude } = props.userLocation

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      L.circleMarker([latitude, longitude], {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#1976d2',
        fillOpacity: 1
      })
        .addTo(markersLayer)
        .bindPopup('Your approximate location')

      bounds.push([latitude, longitude])
    }
  }

  if (bounds.length > 0) {
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 14
    })
  }
}

onMounted(() => {
  map = L.map(mapElement.value).setView(
    [35.2781, -93.1337],
    13
  )

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }
  ).addTo(map)

  markersLayer = L.layerGroup().addTo(map)

  updateMap()

  setTimeout(() => {
    if (map) map.invalidateSize()
  }, 100)
})

watch(
  () => [props.resources, props.userLocation],
  updateMap,
  { deep: true }
)

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapElement" class="resource-map"></div>
</template>

<style scoped>
.resource-map {
  height: 500px;
  width: 100%;
  border-radius: 8px;
  z-index: 0;
}
</style>

<style>
.custom-numbered-marker {
  background: transparent;
  border: none;
}

.marker-circle {
  width: 36px;
  height: 36px;
  background-color: #c62828;
  border: 3px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}

.facility-popup {
  min-width: 220px;
  font-family: Arial, sans-serif;
  color: #222;
}

.facility-popup h3 {
  font-size: 15px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.facility-popup p {
  font-size: 13px;
  margin-bottom: 9px;
  line-height: 1.5;
}

.popup-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.popup-buttons a {
  flex: 1;
  padding: 9px 12px;
  text-align: center;
  text-decoration: none;
  color: white !important;
  border-radius: 5px;
  font-weight: bold;
  font-size: 13px;
}

.popup-directions {
  background-color: #1976d2;
}

.popup-call {
  background-color: #2e7d32;
}

.popup-buttons a:hover {
  opacity: 0.85;
}
</style>