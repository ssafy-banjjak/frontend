<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr class="text-center">
    <router-link
      :to="{ name: 'article-detail', params: { articleno: article.articleNo } }"
      class="article-title link-dark"
    >
      <th scope="row">{{ article.region }}</th>
      <td class="text-start">
        {{ article.title }}
      </td>
      <td>{{ article.recruits }}</td>
    </router-link>
  </tr>
</template>

<style scoped></style>
