<script setup lang="ts">
const emits = defineEmits([
  'delete-todo',
  'edit-todo',
  'toggle-todo',
]);

type Mode = 'view' | 'edit';

const mode = ref<Mode>('view');
const editInput = ref<HTMLInputElement | null>(null);

const startEdit = () => {
  mode.value = 'edit';
  nextTick(() => {
    editInput && editInput.value?.focus();
  });
};

const finishEdit = () => {
  mode.value = 'view';
};

const cancelEdit = () => {
  mode.value = 'view';
};

const onRemoveButton = () => {
  emits('delete-todo');
};
</script>

<template>
  <div class="TaskList">
    <ul class="TaskList__Items">
      <li class="TaskList__Item" :class="{ '-editing': mode === 'edit' }">
        <div class="TaskList__View">
          <input class="TaskList__Checkbox" type="checkbox" />
          <span @dblclick="startEdit" class="TaskList__Label">test 1</span>
          <button class="TaskList__RemoveButton" @click="onRemoveButton"></button>
        </div>
        <div class="TaskList__Edit" v-show="mode === 'edit'">
          <input class="TaskList__Input" ref="editInput" type="text" @keyup.enter="finishEdit" @blur="cancelEdit" />
        </div>
      </li>
      <li class="TaskList__Item">
        <input class="TaskList__Checkbox" type="checkbox" />
        <span class="TaskList__Label">test 2</span>
        <button class="TaskList__RemoveButton" @click="onRemoveButton"></button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.TaskList {
  border-top: 1px solid #e6e6e6;
}

.TaskList__Items {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.TaskList__Item {
  position: relative;
}

.TaskList__Item.-editing .TaskList__Edit {
  display: block;
  margin: 0 0 0 43px;
  width: calc(100% - 43px);
}

.TaskList__Item:hover > .TaskList__RemoveButton {
  display: block;
}

.TaskList__Item + .TaskList__Item {
  border-top: 1px solid #ededed;
}

.TaskList__View {}

.TaskList__Checkbox {
  display: none;
}

.TaskList__Label {
  display: block;
  padding: 15px 15px 15px 60px;
  background: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E') no-repeat center left;
  font-size: 24px;
  font-weight: 300;
  color: #484848;
}

.TaskList__RemoveButton {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  display: none;
  margin: auto 0;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  font-size: 30px;
  color: #949494;
  cursor: pointer;
  appearance: none;
}

.TaskList__RemoveButton::after {
  display: block;
  height: 100%;
  line-height: 1.1;
  content: "×";
}

.TaskList__Edit {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
}

.TaskList__Input {
  display: block;
  padding: 15px;
  width: 100%;
  border: none;
  font-size: 24px;
  font-weight: 300;
  color: #484848;
  appearance: none;
}

.TaskList__Input:focus {
  box-shadow: 0 0 2px 2px #cf7d7d;
  outline: none;
}
</style>