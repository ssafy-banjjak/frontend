<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import MapSetMarker from "../map/MapSetMarker.vue";
const route = useRoute();
const router = useRouter();

const { articleno } = route.params;

const tripSpots = [
  {
    name: "부산",
    place: "장소1",
  },
  {
    name: "경기도",
    place: "장소2",
  },
  {
    name: "경상도",
    place: "장소3",
  },
  {
    name: "충청도",
    place: "장소4",
  },
  {
    name: "서울",
    place: "장소5",
  },
];
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%">
      <v-row>
        <v-col cols="3">
          <v-sheet
            v-for="tripSpot in tripSpots"
            :key="tripSpot.name"
            outlined
            width="100%"
            height="100px"
            variant="outlined"
          >
            <p style="text-align: center">{{ tripSpot.place }}</p>
          </v-sheet>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="3">
              <v-sheet> 지역 </v-sheet>
            </v-col>
            <v-col cols="9">
              <v-sheet> 제목 </v-sheet>
            </v-col>
          </v-row>
          <!-- 오른쪽 아래 -->
          <div style="margin: 20px">
            <MapSetMarker></MapSetMarker>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
