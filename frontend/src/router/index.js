import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import MeetingsView from '../views/MeetingsView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import MoreView from '../views/MoreView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/meetings', name: 'meetings', component: MeetingsView },
  { path: '/resources', name: 'resources', component: ResourcesView },
  { path: '/more', name: 'more', component: MoreView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
