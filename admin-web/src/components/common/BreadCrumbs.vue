<template>
  <nav class="page-location" aria-label="当前位置">
    <router-link v-if="!isHome" to="/">工作台</router-link><span v-else aria-current="page">工作台</span>
    <template v-if="!isHome"><span class="location-divider" aria-hidden="true">/</span><span class="current-location" aria-current="page">{{ currentLabel }}</span></template>
  </nav>
</template>
<script src="./BreadCrumbs.options.js"></script>
<style lang="scss" scoped src="./BreadCrumbs.styles.scss"></style>
