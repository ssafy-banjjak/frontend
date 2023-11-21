<script setup>
import { onMounted, ref } from "vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style

const editor = ref();

onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "500px",
    initialEditType: "wysiwyg",
  });
});
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped></style>
