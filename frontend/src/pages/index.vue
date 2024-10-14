<script setup lang="ts">
import Header from '~/components/Header.vue';
import TaskControl, { type FilterType } from '~/components/TaskControl.vue';
import TaskForm from '~/components/TaskForm.vue';
import TaskList from '~/components/TaskList.vue';
import { ToDoApi, type Item } from '~/types/proto/todo_pb';

const { $apiClient } = useNuxtApp();

const filterType = ref<FilterType>('all');
const items = ref<Item[]>([]);

const fetchItems = async () => {
  const resp = await $apiClient.request(new ToDoApi.GetItems({}));
  if (resp.items) {
    items.value = resp.items;
  }
};

onMounted(() => {
  fetchItems();
});

const filteredTodos = computed(() => {
  if (items.value.length === 0) {
    return [];
  }

  switch (filterType.value) {
    case 'active':
      return items.value.filter((item) => !item.isComplete);
    case 'completed':
      return items.value.filter((item) => item.isComplete);
    default:
      return items.value;
  }
});

const hasItems = computed(() => {
  if (!items.value) return false;
  return items.value?.length > 0;
});

const addTodo = async (value: string) => {
  await $apiClient.request(new ToDoApi.AddItem({ title: value }));
  fetchItems();
};

const deleteTodo = async (item: Item) => {
  await $apiClient.request(new ToDoApi.DeleteItem({ id: item.id }));
  fetchItems();
};

const editTodo = async (item: Item) => {
  await $apiClient.request(new ToDoApi.EditTitle({ id: item.id, title: item.title }));
  fetchItems();
};

const toggleTodo = async (item: Item) => {
  await $apiClient.request(new ToDoApi.ToggleItem({ id: item.id }));
  fetchItems();
};

const toggleAllTodos = async () => {
  await $apiClient.request(new ToDoApi.ToggleAllItems({}));
  fetchItems();
};

const changeFilter = (type: FilterType) => {
  filterType.value = type;
};

const clearCompleted = () => {};
</script>

<template>
  <Header class="Header" />

  <main class="Content">
    <TaskForm
      :disable-toggle="!hasItems"
      @add-todo="addTodo"
      @toggle-all="toggleAllTodos"
    />

    <TaskList
      :items="filteredTodos"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
      @toggle-todo="toggleTodo"
    />

    <TaskControl
      :filter-type="filterType"
      :task-amount="filteredTodos.length"
      @change-filter="changeFilter"
      @clear-completed="clearCompleted"
    />
  </main>
</template>

<style scoped>
.Header {
  margin: 27px 0;
}

.Content {
  position: relative;
  margin: 0 auto;
  max-width: 550px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0 0 0 / 20%), 0 25px 50px 0 rgba(0 0 0 / 10%);
}

.Content::before {
  position: absolute;
  overflow: hidden;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
              0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2),
              0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 0.2);
  content: '';
}
</style>
