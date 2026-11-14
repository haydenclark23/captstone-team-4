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

    console.log('Hayden')

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    message.value = data.message
  } catch (err) {
    error.value = 'Unable to connect to the server.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-app class="app-shell">
    <v-app-bar app class="crisis-bar" flat height="60">
      <div class="bar-content">
        <span class="bar-title">VETERANS CRISIS HELP</span>
        <span class="bar-divider">|</span>
        <span class="bar-action">Get Help</span>
        <v-icon class="bar-arrow">mdi-arrow-right</v-icon>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="content-shell" fluid>
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
      </v-container>

      <v-footer app class="bottom-nav" color="transparent" elevation="0">
        <v-row no-gutters class="nav-row">
          <v-col class="nav-item active">
            <v-icon size="20">mdi-home</v-icon>
            <span>Home</span>
          </v-col>
          <v-col class="nav-item">
            <v-icon size="20">mdi-calendar-text</v-icon>
            <span>Events</span>
          </v-col>
          <v-col class="nav-item">
            <v-icon size="20">mdi-account-group</v-icon>
            <span>Meetings</span>
          </v-col>
          <v-col class="nav-item">
            <v-icon size="20">mdi-hand-heart</v-icon>
            <span>Resources</span>
          </v-col>
          <v-col class="nav-item">
            <v-icon size="20">mdi-menu</v-icon>
            <span>More</span>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-shell {
  background: #1a1b1d;
  color: #f3f4f6;
}

:deep(.v-application__wrap) {
  background: #1a1b1d;
}

.crisis-bar {
  background: #e7a6af !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.bar-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0 12px;
  white-space: nowrap;
}

.bar-title {
  font-size: 1rem;
  flex: 0 0 auto;
}

.bar-divider,
.bar-action,
.bar-arrow {
  flex-shrink: 0;
}

.bar-action {
  font-size: 1rem;
}

.bar-divider {
  opacity: 0.8;
}

.bar-arrow {
  font-size: 1.2rem !important;
}

@media (max-width: 420px) {
  .bar-content {
    gap: 6px;
    padding: 0 8px;
  }

  .bar-title,
  .bar-action {
    font-size: clamp(0.68rem, 3.8vw, 0.9rem);
  }
}

.content-shell {
  max-width: 620px;
  margin: 0 auto;
  padding: 16px 14px 0 !important;
}

.content-panel {
  padding: 6px 0 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  margin-bottom: 14px;
}

.page-title {
  font-size: clamp(2.1rem, 5vw, 3rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.06em;
  margin: 0;
  color: #f7f7f8;
}

.menu-icon {
  margin-left: auto;
  color: #f7f7f8;
}

.info-card {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.02);
  box-shadow: none;
  border-radius: 14px !important;
  overflow: hidden;
}

:deep(.v-card-title) {
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em;
  padding: 18px 18px 10px !important;
  color: #f5f5f5;
}

:deep(.v-card-text) {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.98rem !important;
  line-height: 1.45;
  padding: 0 18px 16px !important;
}

.card-copy {
  color: rgba(255, 255, 255, 0.82);
}

.card-copy p {
  margin: 0;
}

.card-link {
  padding: 0 18px 16px !important;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.leadership-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 18px !important;
}

.leadership-text {
  display: inline-block;
}

.leadership-arrow {
  font-size: 2rem !important;
  color: rgba(255, 255, 255, 0.92);
  flex-shrink: 0;
  margin-top: 1px;
}

.api-card {
  padding-bottom: 10px;
}

.primary-action {
  border-radius: 10px !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em;
  min-height: 52px !important;
  text-transform: none !important;
  background: #1a7ae0 !important;
  box-shadow: none !important;
}

.bottom-nav {
  padding: 10px 8px 18px !important;
  background: #1a1b1d !important;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.nav-row {
  max-width: 620px;
  margin: 0 auto;
  width: 100%;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  padding: 8px 4px;
}

.nav-item.active {
  color: #f5f5f5;
}

@media (max-width: 420px) {
  .bar-content {
    justify-content: space-between;
    gap: 4px;
  }

  .bar-title,
  .bar-action {
    font-size: 0.82rem;
    line-height: 1.05;
  }

  .bar-title {
    max-width: 180px;
  }
}
</style>
