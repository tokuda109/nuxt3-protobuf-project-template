<script setup lang="ts">
import Header from '~/components/Header.vue';
import TaskControl, { type FilterType } from '~/components/TaskControl.vue';
import TaskForm from '~/components/TaskForm.vue';
import TaskList from '~/components/TaskList.vue';
import { ToDoApi } from '~/types/proto/todo_pb';

const { $apiClient } = useNuxtApp();

const resp = await $apiClient.request(new ToDoApi.GetItem({}));

const addTodo = (value: string) => {
  console.log(value);
};

const deleteTodo = () => {
  console.log('delete');
};

const editTodo = () => {
  console.log('edit');
};

const toggleTodo = () => {
  console.log('toggle');
};

const changeFilter = (type: FilterType) => {
  console.log('change filter', type);
};
</script>

<template>
  <Header class="Header" />

  <main class="Content">
    <TaskForm @add-todo="addTodo" />

    <TaskList @delete-todo="deleteTodo" @edit-todo="editTodo" @toggle-todo="toggleTodo" />

    <TaskControl :task-amount="2" @change-filter="changeFilter" />
  </main>

  <p>{{ resp.item }}</p>
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
