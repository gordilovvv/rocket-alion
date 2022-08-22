import { createRouter, createWebHistory } from 'vue-router';
import RoomsView from '@/views/rooms/RoomsView.vue';
import { EMPTY_LAYOUT, GAME_LAYOUT } from '@/layouts/layouts';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { useRoomsStore } from '@/stores/rooms';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'rooms',
            component: RoomsView
        },
        {
            path: '/game',
            name: 'game',
            meta: {
                layout: GAME_LAYOUT
            },
            component: () => import('../views/game/GameView.vue')
        },
        {
            path: '/guide',
            name: 'guide',
            meta: {
                layout: EMPTY_LAYOUT
            },
            component: () => import('../views/guide/GuideView.vue')
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('../views/history/HistoryView.vue')
        },
        {
            path: '/faq',
            name: 'faq',
            component: () => import('../views/faq/FaqView.vue')
        },
    ]
});

const SECURE_PAGES = [
    '/game',
    '/history'
];

router.beforeEach(async to => {
    const { isConnected } = useWallet();
    const connectRequired = SECURE_PAGES.includes(to.path);

    const roomsStore = useRoomsStore();

    if (!roomsStore.rooms || to.path === '/') {
        await roomsStore.loadRooms();
    }

    if (connectRequired && !isConnected.value) {
        return '/';
    }
});

export default router;
