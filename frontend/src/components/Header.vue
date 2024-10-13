<template>
  <header class="Header">
    <h1 class="Header__Logo">
      <NuxtLink to="/">todos</NuxtLink>
    </h1>
  </header>
</template>

<style scoped>
.Header {
  width: 100%;
  line-height: 1;
}

.Header__Logo {
  margin: 0;
  text-align: center;
}

.Header__Logo > a {
  display: block;
  font-size: 80px;
  font-weight: 200;
  color: #b83f45;
  text-decoration: none;
  text-rendering: optimizeLegibility;
}
</style>
