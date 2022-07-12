import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import GameLayout from '@/layouts/game/GameLayout.vue';
import EmptyLayout from '@/layouts/empty/EmptyLayout.vue';

export const DEFAULT_LAYOUT = 'DefaultLayout';

export const GAME_LAYOUT = 'GameLayout';

export const EMPTY_LAYOUT = 'EmptyLayout';

export const LAYOUTS = {
    [DEFAULT_LAYOUT]: DefaultLayout,
    [GAME_LAYOUT]: GameLayout,
    [EMPTY_LAYOUT]: EmptyLayout
};