<script setup>
import ShortItem from "./ShortItem.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { defineProps } from "vue";

const props = defineProps({
  short: Object,
  nextId: Number,
  prevId: Number,
});
const short = props.short;
const nextId = props.nextId;
const prevId = props.prevId;
</script>

<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex justify-center align-center"
  >
    <ShortItem :short="short" :nextId="nextId" :prevId="prevId" />
  </div>
</template>

<style scoped></style>
