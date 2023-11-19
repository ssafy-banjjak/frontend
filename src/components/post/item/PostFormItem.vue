<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import MapSetMarker from "./MapSetMarker.vue";
import PostEditor from "./PostEditor.vue";

// 여행지 목록
let travels = ref([]);

let deleteIdx = ref(0);

const travelCallback = function (travelPath) {
  travels.value = travelPath.value;
};

const changeIdx = function (idx) {
  deleteIdx.value = idx;
};
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%"
      >``
      <v-row>
        <v-col cols="3">
          <v-col v-for="(travel, idx) in travels" :key="idx">
            <v-card class="mx-auto">
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">{{ idx + 1 }}번째 여행지</div>
                  <div class="text-h6 mb-1">
                    {{ travel.title }}
                  </div>
                  <div clss="text-caption">
                    {{ travel.address }}
                  </div>
                </div>
              </v-card-item>
              <v-card-actions>
                <v-btn @click="changeIdx(idx)"> 삭제 </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
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
            <MapSetMarker
              :delete-idx="deleteIdx"
              @travel-path="travelCallback"
            ></MapSetMarker>
          </div>
          <div style="margin: 20px">
            <PostEditor></PostEditor>
          </div>
          <v-spacer></v-spacer>
          <v-row>
            <v-btn color="success">
              <v-icon>mdi-content-save-all</v-icon>
            </v-btn>
            <v-btn color="grey darken-1">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
