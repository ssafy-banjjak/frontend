<script setup>
import { onMounted } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

const props = defineProps({
  iconName: String,
  btnName: String,
});
</script>

<template>
  <v-btn class="white--text" v-bind="$attrs" v-if="!mobile.value">
    <v-icon small>
      {{ iconName }}
    </v-icon>
    <span style="width: 5px" v-if="btnName"></span>
    {{ btnName }}
  </v-btn>
  <v-btn class="white--text" v-bind="$attrs" v-else>
    <v-icon small>
      {{ iconName }}
    </v-icon>
  </v-btn>
</template>

<style scoped></style>
