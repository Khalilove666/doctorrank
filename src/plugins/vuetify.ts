// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// const lightTheme: ThemeDefinition = {
//     dark: false,
//     colors: {
//         'primary': "#673AB7",
//         'dark-primary': "#512DA8",
//         'light-primary': "#D1C4E9",
//         'accent': "#E040FB",
//         'primary-text': "#212121",
//         'text': "#FFFFFF",
//         'secondary-text': "#757575",
//         'divider': "#BDBDBD",
//     }
// }
// const darkTheme: ThemeDefinition = {
//     dark: true,
//     colors: {
//         background: '#FFFFFF',
//         surface: '#FFFFFF',
//         primary: '#6200EE',
//         'primary-darken-1': '#3700B3',
//         secondary: '#03DAC6',
//         'secondary-darken-1': '#018786',
//         error: '#B00020',
//         info: '#2196F3',
//         success: '#4CAF50',
//         warning: '#FB8C00',
//     }
// }

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "light",
        themes: {
            lightTheme: {
                dark: false,
                colors: {
                    primary: "#673AB7",
                    "dark-primary": "#512DA8",
                    "light-primary": "#D1C4E9",
                    accent: "#E040FB",
                    "primary-text": "#212121",
                    "white-text": "#FFFFFF",
                    text: "#000000",
                    "secondary-text": "#757575",
                    divider: "#BDBDBD",
                    error: "#B00020",
                },
            },
            darkTheme: {
                dark: true,
                colors: {
                    primary: "#191a18",
                    "dark-primary": "#000000",
                    "light-primary": "#2a3028",
                    accent: "#E040FB",
                    "primary-text": "#212121",
                    "white-text": "#FFFFFF",
                    text: "#FFFFFF",
                    "secondary-text": "#757575",
                    divider: "#BDBDBD",
                    error: "#B00020",

                    // background: '#FFFFFF',
                    // surface: '#FFFFFF',
                    // primary: '#6200EE',
                    // 'primary-darken-1': '#3700B3',
                    // secondary: '#03DAC6',
                    // 'secondary-darken-1': '#018786',
                    // error: '#B00020',
                    // info: '#2196F3',
                    // success: '#4CAF50',
                    // warning: '#FB8C00',
                },
            },
        },
    },
});
