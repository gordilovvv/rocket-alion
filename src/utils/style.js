const vendorPrefix = (function() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        // Server environment
        return '';
    }
  
    // fix for: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    // window.getComputedStyle() returns null inside an iframe with display: none
    // in this case return an array with a fake mozilla style in it.
    const styles = window.getComputedStyle(document.documentElement, '') || [
        '-moz-hidden-iframe',
    ];
    
    const pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) ||
      (styles.OLink === '' && ['', 'o']))[1];
  
    switch (pre) {
    case 'ms':
        return 'ms';
    default:
        return pre && pre.length
            ? pre[0].toUpperCase() + pre.substr(1)
            : '';
    }
})();
  
export const setTranslate3d = (node, translate) => {
    node.style[`${vendorPrefix}Transform`] = translate == null
        ? ''
        : `translate3d(${ translate.x }px,${ translate.y }px,0)`;
};