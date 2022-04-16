<template>
    <div class="d-flex text-error">
        <v-icon>mdi-alert</v-icon>
        <p class="ml-2" v-text="text"></p>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    text: {type: String, required: true},
})
</script>

<style scoped>

</style>