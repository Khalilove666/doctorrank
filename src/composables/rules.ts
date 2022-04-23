import {computed} from "vue";


export function useRules() {

    const ruleEmpty = computed((value) => !!value || "rule_empty");
    const ruleNumber = computed((value) => /^[0-9]*[.]{0,1}[0-9]*$/g.test(value) || "rule_number");

    return {ruleEmpty, ruleNumber};
}