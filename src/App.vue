<template>
  <v-app>
    <v-layout row>

    <MenuBar ></MenuBar>
 
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
  </v-app>

</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
export default {
  name: "App",
  components: {
    MenuBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
 