<script setup>
import { ref, computed } from 'vue'
import ResourceMap from './ResourceMap.vue'

const zipCode = ref('')
const selectedFacility = ref('Urgent Care')
const userLocation = ref(null)
const locationError = ref('')
const loadingLocation = ref(false)

const facilityTypes = ['Urgent Care']

// Prototype facility data
// Coordinates are approximate and need verification.
const resources = [
  {
    id: 1,
    name: 'URGENT TEAM OF ARKANSAS PHYSICIANS LLC',
    address: '511 W MAIN ST, RUSSELLVILLE, AR 72801-3601',
    phone: '479-223-5130',
    zip: '72801',
    latitude: 35.2787,
    longitude: -93.1365
  },
  {
    id: 2,
    name: 'URGENT TEAM OF ARKANSAS PHYSICIANS LLC',
    address: '511 W MAIN ST, RUSSELLVILLE, AR 72801-3601',
    phone: '479-223-5130',
    zip: '72801',
    latitude: 35.2787,
    longitude: -93.1365
  },
  {
    id: 3,
    name: 'FAST PACE MISSISSIPPI',
    address: '812 N ARKANSAS AVE, RUSSELLVILLE, AR 72801-3867',
    phone: '479-449-1085',
    zip: '72801',
    latitude: 35.2855,
    longitude: -93.1335
  }
]

// Calculate straight-line distance in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 3958.8
  const toRadians = degrees => degrees * (Math.PI / 180)

  const latitudeDifference = toRadians(lat2 - lat1)
  const longitudeDifference = toRadians(lon2 - lon1)

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(longitudeDifference / 2) ** 2

  return earthRadius * 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  )
}

// Filter by ZIP code and sort by distance
const filteredResources = computed(() => {
  const search = (zipCode.value || '').trim()

  let results = resources.filter(resource =>
    !search || resource.zip.startsWith(search)
  )

  if (userLocation.value) {
    results = results.map(resource => ({
      ...resource,
      calculatedDistance: calculateDistance(
        userLocation.value.latitude,
        userLocation.value.longitude,
        resource.latitude,
        resource.longitude
      )
    }))

    results.sort(
      (a, b) => a.calculatedDistance - b.calculatedDistance
    )
  }

  return results
})

// Get the veteran's current location
function getLocation() {
  if (!navigator.geolocation) {
    locationError.value =
      'Your browser does not support location services.'
    return
  }

  loadingLocation.value = true
  locationError.value = ''

  navigator.geolocation.getCurrentPosition(
    position => {
      userLocation.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      loadingLocation.value = false
    },
    error => {
      loadingLocation.value = false

      locationError.value = error.code === 1
        ? 'Location permission was denied. Please enter a ZIP code instead.'
        : 'Unable to determine your location. Please enter a ZIP code instead.'
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000
    }
  )
}

// ZIP filtering updates automatically
function searchResources() {
  // Results update reactively as the ZIP code changes.
}

// Open Google Maps directions
function getDirections(resource) {
  const destination = encodeURIComponent(resource.address)

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    '_blank',
    'noopener,noreferrer'
  )
}

// Open phone dialer
function callFacility(phone) {
  window.location.href = `tel:${phone}`
}
</script>

<template>
  <section class="veteran-resource-locator">

    <!-- SEARCH PANEL AND MAP -->
    <v-row>

      <!-- SEARCH PANEL -->
      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="2">

          <h2 class="text-h6 mb-5">
            Search Healthcare Facilities
          </h2>

          <v-text-field
            v-model="zipCode"
            label="Enter ZIP Code"
            placeholder="72801"
            variant="outlined"
            clearable
          />

          <v-btn
            color="primary"
            variant="outlined"
            prepend-icon="mdi-crosshairs-gps"
            :loading="loadingLocation"
            class="mb-5"
            @click="getLocation"
          >
            Use My Location
          </v-btn>

          <v-alert
            v-if="locationError"
            type="warning"
            variant="tonal"
            class="mb-4"
          >
            {{ locationError }}
          </v-alert>

          <v-select
            v-model="selectedFacility"
            :items="facilityTypes"
            label="Select Facility Type"
            variant="outlined"
          />

          <v-btn
            color="primary"
            block
            size="large"
            @click="searchResources"
          >
            Search
          </v-btn>

        </v-card>
      </v-col>

      <!-- INTERACTIVE MAP -->
      <v-col cols="12" md="8">
        <v-card elevation="2">
          <ResourceMap
            :resources="filteredResources"
            :user-location="userLocation"
          />
        </v-card>
      </v-col>

    </v-row>

    <!-- SEARCH RESULTS -->
    <h2 class="text-h5 mt-8 mb-4">
      Search Results ({{ filteredResources.length }})
    </h2>

    <v-row>

      <v-col
        v-for="resource in filteredResources"
        :key="resource.id"
        cols="12"
        md="4"
      >
        <v-card class="pa-5 h-100" elevation="2">

          <!-- FACILITY NAME -->
          <h3 class="text-h6 font-weight-bold mb-3">
            {{ resource.name }}
          </h3>

          <!-- DISTANCE -->
          <p class="font-weight-bold mb-3">
            {{
              resource.calculatedDistance !== undefined
                ? resource.calculatedDistance.toFixed(1) + ' miles'
                : 'Distance unavailable'
            }}
          </p>

          <!-- FACILITY ADDRESS -->
          <p class="mb-4">
            {{ resource.address }}
          </p>

          <!-- DIRECTIONS BUTTON -->
          <v-btn
            color="primary"
            prepend-icon="mdi-directions"
            class="mr-2 mb-2"
            @click="getDirections(resource)"
          >
            Directions
          </v-btn>

          <!-- CALL BUTTON -->
          <v-btn
            color="success"
            prepend-icon="mdi-phone"
            class="mb-2"
            @click="callFacility(resource.phone)"
          >
            Call
          </v-btn>

          <!-- CONTACT INFORMATION -->
          <p class="mt-3">
            {{ resource.phone }} | TTY: 711
          </p>

          <p class="text-caption mt-2">
            Call to confirm services and hours.
          </p>

        </v-card>
      </v-col>

    </v-row>

    <!-- NO RESULTS -->
    <v-alert
      v-if="filteredResources.length === 0"
      type="warning"
      class="mt-4"
    >
      No facilities found for that ZIP code.
    </v-alert>

  </section>
</template>

<style scoped>
.veteran-resource-locator {
  width: 100%;
  padding: 16px 0 100px;
}
</style>