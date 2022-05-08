<template>
    <div class="d-flex justify-space-between align-center">
        <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
                <v-rating
                    v-model="rating"
                    half-increments
                    readonly
                    color="accent"
                    size="small"
                    density="compact"
                ></v-rating>
                <p class="ml-2">({{ rating }})</p>
            </div>
            <p class="ml-2 text-grey-darken-1">12.03.2020</p>
        </div>
        <div class="d-flex justify-space-between align-center">
            <v-btn
                size="small"
                variant="text"
                icon="mdi-thumb-up"
            ></v-btn>
            <p>34</p>
            <v-btn
                size="small"
                variant="text"
                icon="mdi-thumb-down"
            ></v-btn>
            <p>2</p>
        </div>
    </div>
    <div class="v-row">
        <div class="v-col-12 v-col-md-2">
            <v-list-item
                class="pl-0"
                v-ripple
                :prepend-avatar="evelyn"
                title="Evelyn Claire"
                subtitle="evelynclaire@gmail.com"
            ></v-list-item>
        </div>
        <div class="v-col-12 v-col-md-10">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum laboriosam laudantium nemo! Adipisci
                deserunt dolor ea eius, eum fuga hic labore, natus odio omnis quos rem soluta unde, velit vitae!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci debitis doloribus ducimus
                pariatur perferendis porro ullam voluptas. Accusamus commodi debitis dolorem dolores maxime nulla optio
                quia repellendus similique voluptatibus?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dignissimos dolore enim non omnis
                optio quidem quos repellendus. Optio, soluta, veritatis! Animi doloribus eveniet, maiores neque nobis
                repellat sunt? Expedita?
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import evelyn from "../assets/img/evelyn.jpg";
import {ref} from "vue";

const rating = ref(4);
</script>

<style scoped lang="scss">
</style>