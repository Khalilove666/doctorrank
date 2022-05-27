<template>
    <v-list-item
        class="d-flex"
        v-ripple
    >
        <img :src="img" alt="avatar" class="prevent-user-select user-img">
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
    font-size: 10px;
    overflow: hidden;
    background-color: #757575;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>