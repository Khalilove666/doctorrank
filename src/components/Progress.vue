<template>
    <div class="d-flex justify-center align-center progress-modal">
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
    </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";

onMounted(() => {
    document.documentElement.style.overflow = "clip";
});

onBeforeUnmount(() => {
    document.documentElement.style.overflow = "scroll";
});

</script>

<style scoped lang="scss">
@import "src/styles/variables";

.progress-modal {
    position: absolute;
    top: 0;
    backdrop-filter: blur(2px);
    width: 100vw;
    left: 0;
    height: 100vh;
}
</style>