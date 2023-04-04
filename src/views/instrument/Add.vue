<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Instrument Add</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="instrument.name"
          id="name"
          :counter="50"
          label=" Name"
          required
        >
        </v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveInstrument()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import InstrumentServices from "../../services/Instrument/services";
import Utils from "@/config/utils.js";

export default {
  name: "add-instrument",
  data() {
    return {
      valid: false,
      user: {},
      instrument: {
        id: null,
        name: "",
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },

  methods: {
    saveInstrument() {
      var data = {
        name: this.instrument.name,
      };

      console.log(data);
      InstrumentServices.create(data)
        .then((response) => {
          this.instrument.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "InstrumentList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add tetstststts");

      this.$router.push({ name: "InstrumentList" });
    },
  },
};
</script>
<style></style>
