<script setup>
import { ref } from 'vue';
import AppContainer from '@/components/general/container/AppContainer.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import WalletButton from '@/components/general/wallet/WalletButton.vue';
import MobileMenu from './mobile/MobileMenu.vue';

const MENU_LINKS = [
    { text: 'Rooms', url: '/' },
    { text: 'History', url: '/history' },
    { text: 'How to play ?', url: '/guide' },
    { text: 'F.A.Q.', url: '/faq' }
]

const isMenuOpened = ref(false);

const openMenu = () => {
    isMenuOpened.value = true;
}
</script>

<template>
    <header :class="styles.header">
        <AppContainer
            full-width
            :class="styles.wrap"
        >

            <div :class="styles.left">
                <RouterLink
                    to="/"
                    :class="styles.logo"
                >
                    <img
                        src="/images/logo.png"
                        alt=""
                        :class="styles.logoImage"
                    />

                    <span :class="styles.logoText">
                        Rocket Alion
                    </span>
                </RouterLink>

                <div :class="styles.menu">
                    <RouterLink
                        v-for="({ text, url }) in MENU_LINKS"
                        :key="url"
                        :to="url"
                        :class="styles.menuLink"
                        :active-class="styles.active"
                    >
                        {{ text }}
                    </RouterLink>
                </div>
            </div>

            <div :class="styles.right">
                <WalletButton />

                <button
                    :class="styles.menuButton"
                    @click="openMenu"
                >
                    <VIcon name="menu" />
                </button>
            </div>

            <MobileMenu v-model:visible="isMenuOpened">
                <template #menu="{ linkClass, activeClass }">
                    <RouterLink
                        v-for="({ text, url }) in MENU_LINKS"
                        :key="url"
                        :to="url"
                        :class="linkClass"
                        :active-class="activeClass"
                    >
                        {{ text }}
                    </RouterLink>
                </template>

                <template #wallet>
                    <WalletButton />
                </template>
            </MobileMenu>

        </AppContainer>
    </header>
</template>

<style lang="scss" module="styles">
@import './TheHeader.module.scss';
</style>