<script setup lang="ts">
const emits = defineEmits(['add-todo']);

const onEnter = (event: KeyboardEvent) => {
  event.preventDefault();
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    emits('add-todo', target.value);
  }
};
</script>

<template>
  <form class="TaskForm" @submit.prevent>
    <input
      class="TaskForm__Input"
      type="text"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      @keyup.enter="onEnter"
    />
  </form>
</template>

<style scoped>
.TaskForm {
}

.TaskForm__Input {
  padding: 16px 16px 16px 60px;
  width: 100%;
  height: 65px;
  line-height: 1.4em;
  border: none;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 300;
}

.TaskForm__Input::-webkit-input-placeholder {
  font-style: italic;
	font-weight: 400;
	color: rgba(0 0 0 / 40%);
}

.TaskForm__Input:focus {
  box-shadow: 0 0 2px 2px #cf7d7d;
  outline: none;
}
</style>