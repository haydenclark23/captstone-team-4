<template>
  <div class="content-panel">
    <div class="title-row">
      <h1 class="page-title">Post 20</h1>
      <v-icon size="32" class="menu-icon">mdi-menu</v-icon>
    </div>

    <v-card class="info-card mb-3" rounded="lg" flat>
      <v-card-title class="card-title">American Legion Mobile App</v-card-title>
      <v-card-text class="card-copy">Supporting Veterans &amp; Serving Our Community</v-card-text>
    </v-card>

    <v-card class="info-card mb-3" rounded="lg" flat>
      <v-card-title class="card-title">Next Upcoming Event</v-card-title>
      <v-card-text class="card-copy">
        <p>Veterans Day Parade - November 11, 2026 - 6 PM.</p>
        <p>Meet at the Post</p>
      </v-card-text>
      <v-card-actions class="card-link">View All Events...</v-card-actions>
    </v-card>

    <v-card class="info-card mb-3" rounded="lg" flat>
      <v-card-title class="card-title">Next Upcoming Meeting</v-card-title>
      <v-card-text class="card-copy">BiWeekly Meeting @ Post 20 - 11/17/26</v-card-text>
      <v-card-actions class="card-link">View All Meetings...</v-card-actions>
    </v-card>

    <v-card class="info-card mb-3" rounded="lg" flat>
      <v-card-title class="card-title leadership-row">
        <span class="leadership-text">Contact Leadership</span>
        <v-icon class="leadership-arrow">mdi-arrow-right</v-icon>
      </v-card-title>
    </v-card>

    <v-card class="info-card api-card" rounded="lg" flat>
      <v-card-title class="card-title">API Connection Test</v-card-title>
      <v-card-text class="card-copy">Press the button to contact FastAPI.</v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          class="primary-action"
          color="primary"
          variant="flat"
          block
          size="large"
          :loading="loading"
          @click="callApi"
        >
          Call FastAPI
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const loading = ref(false)
const error = ref('')

async function callApi() {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const response = await fetch('/api/hello')
    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    message.value = data.message
  } catch {
    error.value = 'Unable to connect to the server.'
  } finally {
    loading.value = false
  }
}
</script>