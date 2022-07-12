import { h } from "vue";

function RocketTrail({ color, height }, { attrs }) {
    const gradientId = `paint_liner_${ Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 }`;

    return h(
        'svg',
        {
            width: 2,
            height: 369,
            viewBox: '0 0 2 369',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            innerHTML: `<path fill-rule="evenodd" clip-rule="evenodd" d="M0 369 L0 0 L2 0 L2 369 Z" fill="url(#${ gradientId })"/>
                <defs>
                <linearGradient id="${ gradientId }" x1="0" y1="${ height }" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white" stop-opacity="0"/>
                    <stop offset="1" stop-color="${ color }"/>
                    <stop offset="1" stop-opacity="0"/>
                </linearGradient>
            </defs>`,
            ...attrs
        }
    );

}

RocketTrail.props = {
    color: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
};

export default RocketTrail;