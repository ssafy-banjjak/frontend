<script setup></script>

<template>
  <v-container style="height: 100%">
    <v-row style="height: 40%">
      <v-col align-self="center">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
mark.sky {
  background: linear-gradient(to top, #54fff9 20%, transparent 30%);
}
</style>
