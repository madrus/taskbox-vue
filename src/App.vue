<template>
  <div id="app">
    <inbox-screen />
  </div>
</template>

<script>
import store from "@/store";
import InboxScreen from "@/components/InboxScreen";
import "@/index.css";

export default {
  name: "app",
  store,
  components: {
    InboxScreen
  }
};
</script>
