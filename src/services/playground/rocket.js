import { randomNumber } from "@/utils/random";
import { setTranslate3d } from "@/utils/style";

export const ROCKET_TRAIL_HEIGHT = 300;

export const COLORS = {
    1: {
        trail: '#EA8851',
        text: '#FF8745',
        fill: 'rgba(255, 135, 69, 0.2)'
    },
    2: {
        trail: '#B5FF8A',
        text: '#A2FF6B',
        fill: 'rgba(181, 255, 138, 0.2)'
    },
    3: {
        trail: '#4DBFFF',
        text: '#35B5FF',
        fill: 'rgba(69, 173, 248, 0.2)'
    },
    4: {
        trail: '#FF95F4',
        text: '#FF77F1',
        fill: 'rgba(255, 119, 241, 0.2)'
    }
};

// TODO: refactoring
export function rocketAnimation() {
    let animationFrame;

    return {
        flyTo,
        hideRocketTrail,
        destroy
    };

    async function flyTo(rocketEl, y, duration) {
        let start;
        let resolve;

        const promise = new Promise(
            r => resolve = r
        );

        const step = (timestamp) => {
            if (!start)
                start = timestamp;

            const progress = timestamp - start;
            const relativeProgress = progress / duration;

            const translateY = Math.max(y * relativeProgress, 1);

            setTranslate3d(rocketEl, { x: 0, y: -translateY });

            if (progress < duration) {
                animationFrame = requestAnimationFrame(step);
            } else {
                animationFrame = start = undefined;

                resolve();
            }
        };

        animationFrame = requestAnimationFrame(step);

        return promise;
    }

    function hideRocketTrail(
        rocketTrailEl,
        initialHeight,
        duration = 80
    ) {
        let start;
        let resolve;

        const promise = new Promise(
            r => resolve = r
        );

        const gradientNode = rocketTrailEl.querySelector('linearGradient');

        const step = (timestamp) => {
            if (!start)
                start = timestamp;

            const progress = timestamp - start;
            const relativeProgress = progress / duration;
    
            const newHeight = Math.max(initialHeight - initialHeight * relativeProgress, 0);

            gradientNode.setAttribute('y1', newHeight);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(step);
            } else {
                animationFrame = start = undefined;

                resolve();
            }
        };

        animationFrame = requestAnimationFrame(step);

        return promise;
    }

    function destroy() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    }
}

export function getFlyDuration(looser) {
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
        return looser
            ? randomNumber(4500, 6000)
            : randomNumber(6000, 8000);
    } else {
        return looser
            ? randomNumber(5500, 7000)
            : randomNumber(7000, 9000);
    }
}