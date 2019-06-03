<template>
  <div id="app">
    <task-list />
  </div>
</template>

<script>
import store from "@/store";
import TaskList from "@/components/TaskList";
import "@/index.css";

export default {
  name: "app",
  store,
  components: {
    TaskList
  }
};
</script>
