import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";


export const useCustomTheme = defineStore('theme', () => {
    //STATE
    const theme = ref(localTheme());

    // GETTERS
    const currentTheme = computed((state) => {
        return theme.value;
    })

    //ACTIONS
    function toggleTheme() {
        if (theme.value == "lightTheme") theme.value = "darkTheme";
        else theme.value = "lightTheme";
    }

    //WATCHERS
    watch(theme, (value) => {
        localStorage.setItem('theme', JSON.stringify(theme.value))
    })

    return {theme, currentTheme, toggleTheme};
})

function localTheme() {
    const ls = localStorage.getItem('theme');
    if (ls) return JSON.parse(ls);
    else return 'lightTheme'
}