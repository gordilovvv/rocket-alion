import { h } from "vue";
import VButton from '@/components/common/button/VButton.vue';
import config from "@/config";
import styles from './PlayButton.module.scss';

function PlayButton() {
    return h(
        VButton,
        {
            href: config.appUrl,
            class: styles.button
        },
        () => ['play']
    );
}

export default PlayButton;