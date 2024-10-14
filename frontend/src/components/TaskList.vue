<script setup lang="ts">
import type { Item } from '~/types/proto/todo_pb';

const { items = [] } = defineProps<{ items: Item[] }>();

const emits = defineEmits([
  'delete-todo',
  'edit-todo',
  'toggle-todo',
]);

const editingItem = ref<Item | null>(null);
const editInput = ref<HTMLInputElement[] | null>(null);

const editItem = computed({
  get() {
    return editingItem?.value?.title ?? '';
  },
  set(value: string) {
    if (editingItem?.value) {
      editingItem.value.title = value;
    }
  }
});

const startEdit = (item: Item, index: number) => {
  editingItem.value = item;
  nextTick(() => {
    if (editInput.value && editInput.value[index]) {
      editInput.value[index].focus();
    }
  });
};

const onEnter = (item: Item) => {
  editingItem.value = null;
};

const onBlur = (item: Item) => {
  if (editingItem?.value?.title === item.title) {
    editingItem.value = null;
    return;
  }

  editingItem.value = null;
  emits('edit-todo', item);
};

const onCheckbox = (item: Item) => {
  emits('toggle-todo', item);
};

const onRemoveButton = (item: Item) => {
  emits('delete-todo', item);
};
</script>

<template>
  <div class="TaskList">
    <ul class="TaskList__Items">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="TaskList__Item"
        :class="{
          '-editing': editingItem && editingItem.id === item.id,
          '-completed': item.isComplete,
        }"
      >
        <div class="TaskList__View">
          <input class="TaskList__Checkbox" type="checkbox" @click="onCheckbox(item)" />
          <span @dblclick="startEdit(item, index)" class="TaskList__Label">{{ item.title }}</span>
          <button class="TaskList__RemoveButton" @click="onRemoveButton(item)"></button>
        </div>
        <div class="TaskList__Edit">
          <input
            class="TaskList__Input"
            ref="editInput"
            v-model="editItem"
            type="text"
            @keyup.enter="onEnter(item)"
            @blur="onBlur(item)"
          />
        </div>
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

.TaskList__Item.-completed .TaskList__Label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
  text-decoration: line-through;
  color: #949494;
}

.TaskList__Item.-editing .TaskList__Edit {
  display: block;
  margin: 0 0 0 43px;
  width: calc(100% - 43px);
}

.TaskList__Item.-editing .TaskList__Label {
  background-image: none;
}

.TaskList__Item:hover .TaskList__RemoveButton {
  display: block;
}

.TaskList__Item + .TaskList__Item {
  border-top: 1px solid #ededed;
}

.TaskList__View {
  position: relative;
  display: flex;
  align-items: center;
}

.TaskList__Checkbox {
  position: absolute;
  padding: 12px 16px;
  background-color: transparent;
  border: none;
  appearance: none;
  cursor: pointer;
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