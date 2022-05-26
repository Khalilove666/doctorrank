<template>
    <v-list-item
        class="d-flex"
        v-ripple
    >
        <img :src="img" alt="avatar thumbnail" class="prevent-user-select user-img">
        <div>
            <p class="v-list-item-title">{{ fullName }}</p>
            <p class="v-list-item-subtitle">{{ username }}</p>
        </div>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{ fullName: string, username: string, img: string }>();
</script>

<style scoped lang="scss">
.user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
}
</style>