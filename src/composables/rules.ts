export function useRules() {
    function empty(value: string) {
        return !!value || "rule_empty";
    }

    function number(value: string) {
        return /^[0-9]*[.]{0,1}[0-9]*$/g.test(value) || "rule_number";
    }

    function email(value: string) {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "rule_email";
    }

    function password(value: string) {
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/.]).{8,}$/;
        return pattern.test(value) || "rule_password";
    }

    return { empty, number, email, password };
}
