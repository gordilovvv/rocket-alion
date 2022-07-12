import { reactive, watch } from "vue";

const alert = reactive({
    id: 0,
    text: '',
    view: '',
    isVisible: false,
    autoClose: false
});

const AVAILABLE_VIEWS = [
    'success',
    'danger'
];

const VISIBLE_DURATION = 3000;

watch(alert, ({ id, autoClose }) => {
    if (id && autoClose) {
        setTimeout(() => {
            if (alert.id === id) {
                alert.id = 0;
                alert.isVisible = false;
            }
        }, VISIBLE_DURATION);
    }
});

export function useAlert() {
    const showAlert = ({ view, text = '', autoClose = true }) => {
        if (AVAILABLE_VIEWS.includes(view)) {
            alert.id = Date.now();
            alert.view = view;
            alert.text = text;
            alert.isVisible = true;
            alert.autoClose = autoClose;
        }
    };

    const hideAlert = () => {
        alert.id = 0;
        alert.isVisible = false;
    };

    return {
        alert,
        showAlert,
        hideAlert
    };
}