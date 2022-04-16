import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";

export const useThemeAndLang = defineStore('theme', () => {
        //STATE
        const theme = ref(localTheme());
        const lang = ref(localLang())
        const {locale} = useI18n({useScope: "global"})
        locale.value = lang.value;
        // GETTERS
        const currentTheme = computed((state) => {
            return theme.value;
        });
        const currentLang = computed((state) => {
            return lang.value;
        });

        //ACTIONS
        function toggleTheme() {
            if (theme.value == "lightTheme") theme.value = "darkTheme";
            else theme.value = "lightTheme";
        }

        function changeLang(locale: string) {
            lang.value = locale;
        }

        //WATCHERS
        watch(theme, (value) => {
            localStorage.setItem('theme', JSON.stringify(theme.value))
        })
        watch(lang, (value) => {
            locale.value = lang.value
            localStorage.setItem('language', JSON.stringify(lang.value))
        })

        return {theme, currentTheme, toggleTheme, lang, currentLang, changeLang};
    }
)

function localTheme(): string {
    const ls = localStorage.getItem('theme');
    if (ls) return JSON.parse(ls);
    else return 'lightTheme'
}

function localLang(): string {
    const l = localStorage.getItem('language');
    if (l) return JSON.parse(l);
    else return 'az';
}