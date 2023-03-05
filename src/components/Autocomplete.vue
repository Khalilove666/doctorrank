<template>
    <div class="autocomplete d-flex flex-column flex-grow-1">
        <div class="field">
            <div v-if="selectedIndex !== null" class="field__selected-chip">
                <!-- <img v-if="items[selectedIndex].img" class="field__selected-chip__img" src="src/assets/img/avatar.png" alt="" /> -->
                <span class="field__selected-chip__text">{{ items[selectedIndex].name }}</span>
            </div>
            <input
                ref="input"
                v-model="term"
                class="field__input"
                type="text"
                @click="handleClick()"
                @keydown.delete="handleDelete()"
                @keydown.up="handleArrowsPressed(-1, $event)"
                @keydown.down="handleArrowsPressed(1, $event)"
                @keydown.enter="handleEnterPressed()"
                @input="handleInput()"
            />
            <svg
                viewBox="0 0 24 24"
                class="field__chevron"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
                @click="handleChevronClicked()"
            >
                <path d="M7,10L12,15L17,10H7Z"></path>
            </svg>
        </div>
        <div v-if="openDropdown" class="dropdown d-flex flex-column flex-grow-1 material-card">
            <template v-if="displayItems.length > 0">
                <div
                    v-for="(item, index) in displayItems"
                    :key="index"
                    v-ripple
                    class="dropdown__item"
                    :class="{
                        dropdown__item__selected: item.index === selectedIndex,
                        dropdown__item__pointed: item.index === pointedIndex,
                    }"
                    @click="handleItemClicked(item.index)"
                >
                    <!-- <img v-if="item.data.img" class="dropdown__item__img" src="src/assets/img/avatar.png" alt="" /> -->
                    <span>{{ item.data.name }}</span>
                </div>
            </template>
            <div v-else class="dropdown__item" @click="openDropdown = false">No data available</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

interface Props {
    items: Array<Record<string, any>>;
    modelValue: Record<string, any> | null;
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();
const term = ref("");
const openDropdown = ref(false);
const input = ref<HTMLElement | null>(null);

const pointedIndex = ref<number | null>(null);
const selectedIndex = ref<number | null>(null);

const displayItems = computed(() => {
    return props.items
        .map((item, index) => ({ index, data: item }))
        .filter((item) => item.data.name.match(RegExp(term.value, "i")));
});

onMounted(() => {
    if (props.modelValue) selectedIndex.value = props.items.findIndex((item) => item._id == props.modelValue?._id);
    const element = document.querySelector(".autocomplete");
    document.addEventListener("click", (e: Event) => {
        if (!element?.contains(e.target as Node)) {
            openDropdown.value = false;
            pointedIndex.value = null;
            term.value = "";
        }
    });
});

watch(selectedIndex, (value) => {
    if (value != null) emit("update:modelValue", props.items[value]);
    const input: HTMLElement | null = document.querySelector(".field__input");
    if (value === null && input) {
        input.style.paddingLeft = "16px";
        return;
    }
    setTimeout(() => {
        const chip: HTMLElement | null = document.querySelector(".field__selected-chip");
        if (input && chip) {
            console.log((15 + chip.offsetWidth).toString());
            input.style.paddingLeft = (15 + chip.offsetWidth).toString() + "px";
        }
    }, 10);
});

function handleChevronClicked() {
    if (!openDropdown.value) {
        input.value?.focus();
        openDropdown.value = true;
    } else {
        openDropdown.value = false;
        pointedIndex.value = null;
    }
}

function handleClick() {
    openDropdown.value = true;
}

function handleInput() {
    openDropdown.value = true;
    pointedIndex.value = displayItems.value.length > 0 ? displayItems.value[0].index : null;
}

function handleDelete() {
    if (term.value === "") {
        selectedIndex.value = null;
    }
}

function handleItemClicked(index: number) {
    if (index == selectedIndex.value) {
        selectedIndex.value = null;
    } else {
        selectedIndex.value = index;
    }
    openDropdown.value = false;
}

function handleEnterPressed() {
    if (!openDropdown.value) {
        openDropdown.value = true;
    } else {
        if (displayItems.value.length > 0 && pointedIndex.value !== null) {
            handleItemClicked(pointedIndex.value);
            openDropdown.value = false;
            term.value = "";
        }
    }
}

function handleArrowsPressed(step: number, e: any) {
    e.preventDefault();
    if (!openDropdown.value) {
        openDropdown.value = true;
        return;
    }
    if (displayItems.value.length > 0) {
        let nextIndex = 0;
        const currentIndex = displayItems.value.findIndex((item) => item.index === pointedIndex.value);
        if (currentIndex <= 0 && step === -1) {
            nextIndex = displayItems.value.length - 1;
        } else if (currentIndex === displayItems.value.length - 1 && step === 1) {
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + step;
        }
        pointedIndex.value = displayItems.value[nextIndex].index;
    }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";
.autocomplete {
    position: relative;
}

.field {
    display: flex;
    flex: 1;
    align-items: center;
    max-height: 40px;
    position: relative;

    &__input {
        outline: none;
        flex: 1;
        min-width: 0;

        border-radius: 4px;
        padding: 8px 36px 8px 16px;
        border: 1px solid rgba(0, 0, 0, 0.5);

        &:focus {
            padding: 7px 35px 7px 15px;
            border: 2px solid $color-accent;

            & ~ .field__chevron {
                transform: rotate(180deg);
            }
        }
    }

    &__chevron {
        width: 20px;
        height: 20px;
        transition: transform 200ms;
        position: absolute;
        right: 16px;
    }

    &__selected-chip {
        background-color: rgba(0, 0, 0, 0.1);
        height: 32px;
        padding: 2px 12px 2px 8px;
        border-radius: 20px;
        display: flex;
        align-items: center;

        position: absolute;
        left: 16px;

        &__img {
            width: 21px;
            height: 21px;
        }

        &__text {
            margin-left: 6px;
            font-size: 14px;
        }
    }
}

.dropdown {
    position: absolute;
    z-index: 1;
    top: 41px;
    left: 0;
    width: 100%;
    max-height: 100vh;
    padding: 4px 0;
    border-radius: 4px;
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &__item {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &__selected {
            background-color: rgba(37, 105, 199, 0.1);
        }

        &__pointed {
            background-color: rgba(0, 0, 0, 0.1);
        }

        &__img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }
}
</style>
