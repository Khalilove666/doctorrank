import { createI18n } from "vue-i18n";
export const i18n = createI18n({
    locale: "az",
    allowComposition: true,
    messages: {
        gb: {
            hello: "Hello!",
            doctors: "Doctors",
            about: "About",
            login: "Login",
            register: "Register",
            btn_login: "LOG IN",
            btn_register: "REGISTER",
            forgot_password: "forgot password",
            login_options: "Other login options",
            register_options: "Other registration options",
            first_name: "First name",
            last_name: "Last Name",
            email: "Email",
            username_or_email: "Username or email",
            select_username: "Select username",
            password: "Password",
            confirm_password: "Confirm password",
        },
        az: {
            hello: "Salam!",
            doctors: "Həkimlər",
            about: "Haqqında",
            login: "Daxil ol",
            register: "Qeydiyyat",
            btn_login: "DAXİL OL",
            btn_register: "QEYDİYYAT",
            forgot_password: "şifrəmi unutdum",
            login_options: "Digər daxil olma seçimləri",
            register_options: "Digər qeydiyyat seçimləri",
            first_name: "Ad",
            last_name: "Soyad",
            email: "Email",
            username_or_email: "İstifadəçi adı yaxud email",
            select_username: "İstifadəçi adı seçin",
            password: "Şifrə",
            confirm_password: "Şifrə təkrar",
        },
        ru: {
            hello: "Здравствуйте!",
            doctors: "Врачи",
            about: "О",
            login: "Логин",
            register: "Регистрация",
            btn_login: "ЛОГИН",
            btn_register: "РЕГИСТР",
            forgot_password: "забыли пароль",
            login_options: "Другие варианты входа",
            register_options: "Другие варианты регистрации",
            first_name: "Имя",
            last_name: "Фамилия",
            email: "Эл. адрес",
            username_or_email: "Имя пользователя или  эл. адрес",
            select_username: "Выберите имя пользователя",
            password: "Пароль",
            confirm_password: "пароль повторить",
        },
    },
});
