function preloadImage(src) {
    return new Promise(r => {
        const image = new Image();

        image.onload = r;
        image.onerror = r;
        image.src = src;
    });
}

export async function preloadImages(images) {
    return Promise.all(
        images.map(x => preloadImage(x.src))
    );
}