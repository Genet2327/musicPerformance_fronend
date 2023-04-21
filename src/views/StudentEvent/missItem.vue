<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Missing information</v-toolbar-title>
      </v-toolbar>

      <br /><br />

      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-btn density="compact" @click="instrument()">Add Instrument</v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn density="default" @click="Composer()">Add Composer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "add-composer",
  data() {
    return {
      valid: true,
      user: {},
      menu: false,
      menu1: false,
      composer: {
        id: null,
        firstName: "",
        lastName: "",
        nationality: "",
        dateOfBirth: new Date().toISOString().substr(0, 10),
        dateOfDeath: new Date().toISOString().substr(0, 10),
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    instrument() {
      this.$router.push({
        name: "missAddInstrument"
      });
    },
    Composer() {
      this.$router.push({
        name: "missItemComposer"
      });
    },
  },
};
</script>
