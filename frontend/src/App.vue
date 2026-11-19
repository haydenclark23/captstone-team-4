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
        <RouterView />
      </v-container>
    </v-main>

    <BottomNavigation />
  </v-app>
</template>

<script setup>
import BottomNavigation from './components/BottomNavigation.vue'
</script>
