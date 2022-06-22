const mobileRE =/(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

export function isMobile(userAgentProp = null) {
    const userAgent = userAgentProp || navigator.userAgent;

    let result = mobileRE.test(userAgent);

    if (result)
        return result;

    if (navigator?.maxTouchPoints > 1 && userAgent.includes('Macintosh') && userAgent.includes('Safari')) {
        result = true;
    }

    return result;
}
