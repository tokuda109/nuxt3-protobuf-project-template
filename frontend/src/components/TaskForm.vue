<script setup lang="ts">
const { disableToggle } = defineProps<{
  disableToggle: boolean;
}>();

const emits = defineEmits([
  'toggle-all',
  'add-todo',
]);

const inputText = ref<string>('');

const onToggle = ({ target }: Event) => {
  if (target instanceof HTMLInputElement) {
    emits('toggle-all', target.checked);
  }
};

const onEnter = (event: KeyboardEvent) => {
  event.preventDefault();
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    emits('add-todo', target.value);
    inputText.value = '';
  }
};
</script>

<template>
  <form class="TaskForm" @submit.prevent>
    <label v-if="!disableToggle" class="TaskForm__Toggle" htmlFor="toggle-all-items">
      <input id="toggle-all-items" type="checkbox" @change="onToggle" />
    </label>
    <input
      v-model="inputText"
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
  position: relative;
  display: flex;
  align-items: center;
}

.TaskForm__Toggle {
  position: absolute;
  padding: 10px 24px;
}

.TaskForm__Toggle::before {
  display: inline-block;
  background-color: transparent;
  border: none;
  font-size: 22px;
  color: #949494;
  appearance: none;
  transform: rotate(90deg);
  content: "❯";
}

.TaskForm__Toggle input {
  display: none;
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