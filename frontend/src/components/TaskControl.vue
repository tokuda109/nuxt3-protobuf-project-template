<script setup lang="ts">
const { filterType, taskAmount } = defineProps<{
  filterType: FilterType;
  taskAmount: number;
}>();

const emits = defineEmits([
  'change-filter',
  'clear-completed',
]);

export type FilterType = 'all' | 'active' | 'completed';

const onFilterButton = (type: FilterType) => {
  emits('change-filter', type);
};

const onClearButton = () => {
  emits('clear-completed');
};
</script>

<template>
  <div class="TaskControl">
    <span class="TaskControl__Count">{{ taskAmount }} items left</span>
    <div class="TaskControl__Filters">
      <button class="TaskControl__Button" :class="{ '-active': filterType === 'all' }" @click="onFilterButton('all')">
        <span class="TaskControl__Text">All</span>
      </button>
      <button class="TaskControl__Button" :class="{ '-active': filterType === 'active' }" @click="onFilterButton('active')">
        <span class="TaskControl__Text">Active</span>
      </button>
      <button class="TaskControl__Button" :class="{ '-active': filterType === 'completed' }" @click="onFilterButton('completed')">
        <span class="TaskControl__Text">Completed</span>
      </button>
    </div>
    <button class="TaskControl__Clear" @click="onClearButton">Clear Completed</button>
  </div>
</template>

<style scoped>
.TaskControl {
  position: relative;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  font-weight: 300;
}

.TaskControl__Count {
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  margin: auto 0;
  height: 16px;
}

.TaskControl__Filters {
  display: flex;
  justify-content: center;
  column-gap: 8px;
}

.TaskControl__Button {
  padding: 0;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  appearance: none;
}

.TaskControl__Button.-active {
  border-color: #ce4646;
}

.TaskControl__Text {
  display: block;
  padding: 3px 7px;
}

.TaskControl__Clear {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  appearance: none;
}
</style>