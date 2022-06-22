import { createRouter, createWebHistory } from 'vue-router'
import RoomsView from '@/views/rooms/RoomsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'rooms',
            component: RoomsView
        },
        {
            path: '/check',
            name: 'check-game',
            component: () => import('../views/check/CheckView.vue')
        }
    ]
})

export default router
