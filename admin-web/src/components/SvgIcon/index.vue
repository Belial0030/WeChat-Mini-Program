<template>
<svg :class="svgClass" aria-hidden="true" v-on="$listeners">
  <use :xlink:href="iconName" />
</svg>
</template>

<script src="./index.options.js"></script>

<style scoped src="./index.styles.css"></style>
