export function useScreen() {

    function onScrolledBottom(doIt: Function) {
        window.onscroll = async () => {
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
            if (bottomOfWindow) {
                doIt();
            }
        };
    }

    return {onScrolledBottom};
}