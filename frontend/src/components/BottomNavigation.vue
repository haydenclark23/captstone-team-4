<script setup>
const navItems = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Events', icon: 'mdi-calendar', to: '/events' },
  { title: 'Meetings', icon: 'mdi-account-group', to: '/meetings' },
  { title: 'Resources', icon: 'mdi-hand-heart', to: '/resources' },
  { title: 'More', icon: 'mdi-menu', to: '/more' }
]
</script>

<template>
  <v-bottom-navigation app grow class="bottom-nav">
    <v-btn
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      :aria-label="item.title"
      class="nav-item"
    >
      <v-icon size="20">{{ item.icon }}</v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.bottom-nav {
  height: 80px !important;
  padding: 10px 8px 18px !important;
  background: #1a1b1d !important;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.bottom-nav :deep(.nav-item) {
  flex: 1 1 0;
  min-width: 0;
  max-width: 124px;
  padding: 8px 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  letter-spacing: normal;
  text-transform: none;
}

.bottom-nav :deep(.nav-item .v-btn__content) {
  gap: 6px;
  font-size: 0.7rem;
}

.bottom-nav :deep(.nav-item.v-btn--active) {
  color: #f5f5f5;
}
</style>