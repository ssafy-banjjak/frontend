<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "codemirror/lib/codemirror.css"; // codemirror style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style

import Button from "./item/Button.vue";
const route = useRoute();

const { articleno } = route.params;

const content =
  "<blockquote><p>asdasd</p><p>asd</p><ol><li><p>ggg</p></li><li><p>asd</p></li><li><p>asd</p></li></ol></blockquote>";
const viewer = ref();
onMounted(() => {
  viewer.value = new Viewer({
    // ref="toastViewer"
    el: document.querySelector("#viewer"),
    height: "500px",
    initialEditType: "'wysiwyg'",
    initialValue: content,
  });
});

const apiData = ref({
  title: "국립 청태산자연휴양림",
  address: "강원도 횡성군 둔내면 청태산로 610",
  img1: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
  img2: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image3_1.jpg",
  lat: "37.52251412000000000",
  lng: "128.29191150000000000",
});
</script>

<template>
  <v-container>
    <v-card elevation="10" outlined width="100%" class="mx-auto">
      <v-card-title>
        <span class="mr-2">글 내용</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="제목"
              readonly
              dense
              :model-value="apiData.title"
              variant="underlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="작성자"
              readonly
              dense
              :model-value="apiData.address"
              variant="underlined"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="작성시간"
              readonly
              dense
              model-value="regDttm"
              variant="underlined"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="조회수"
              readonly
              dense
              model-value="view"
              variant="underlined"
            />
          </v-col>
        </v-row>
        내용<br />
        <div style="height: 300px">
          <div id="viewer"></div>
          <br />
        </div>
        Reply ({{ replyCount }})<br />
        <v-simple-table dense>
          <tbody>
            <tr v-for="(reply, index) in replies" :key="index">
              <td style="width: 110px; padding: 0" v-if="!isMobile()">
                <v-icon small> mdi-account </v-icon>
                {{ reply.writer }}
              </td>
              <td style="width: 40px; padding: 0" v-else>
                <Tooltip
                  bottom
                  iconName="mdi-account"
                  title="작성자"
                  :content="reply.writer"
                />
              </td>
              <td style="padding: 0">{{ reply.content }}</td>
              <td style="width: 140px; padding: 0" v-if="!isMobile()">
                {{ reply.regDttm }}
              </td>
              <td style="width: 40px; padding: 0" v-else>
                <Tooltip
                  bottom
                  iconName="mdi-clock-outline"
                  title="작성일시"
                  :content="reply.regDttm"
                />
              </td>
              <td style="width: 30px; padding: 0">
                <Button
                  @click="replyEdit(reply.replyNo, reply.content)"
                  color="grey"
                  icon
                  xsmall
                  iconName="mdi-pencil"
                ></Button>
              </td>
              <td style="width: 30px; padding: 0">
                <Button
                  @click="replyDel(reply.replyNo)"
                  color="red"
                  icon
                  xsmall
                  iconName="mdi-close"
                ></Button>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="11" style="padding: 0px 12px">
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              rows="2"
              no-resize
              full-width
              v-model="comment"
            ></v-textarea>
          </v-col>
          <v-col md="1" align-self="center" style="padding: 0px 10px">
            <Button
              @click="replySave"
              color="indigo"
              rounded
              small
              iconName="mdi-pencil"
              btnName="Save"
            ></Button>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <Button
          @click="movePage('/edit?docNo=' + docNo)"
          color="warning"
          rounded
          small
          iconName="mdi-pencil"
          btnName="Edit"
        ></Button>
        <Button
          @click="del"
          color="error"
          rounded
          small
          iconName="mdi-delete-forever"
          btnName="Delete"
        ></Button>
        <Button
          @click="movePage('/list')"
          color="grey darken-1"
          rounded
          small
          iconName="mdi-arrow-left"
          btnName="Back"
        ></Button>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<style scoped></style>
