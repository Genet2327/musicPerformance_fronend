<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Composer Add</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="composer.firstName"
          id="firstName"
          :counter="50"
          label=" First Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="composer.lastName"
          id="lastName"
          :counter="50"
          label=" Last Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="composer.nationality"
          id="nationality"
          :counter="50"
          label=" Nationality"
          required
        >
        </v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="composer.dateOfBirth"
              label="Date of Birth"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="composer.dateOfBirth" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(composer.dateOfBirth)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="composer.dateOfDeath"
              label="Date of Death"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="composer.dateOfDeath" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu1.save(composer.dateOfDeath)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveComposer()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import ComposerServices from "../../services/Composer/services";
import Utils from "@/config/utils.js";

export default {
  name: "add-composer",
  data() {
    return {
      valid: false,
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
  mounted() {
    this.user = Utils.getStore("user");
  },

  methods: {
    saveComposer() {
      var data = {
        firstName: this.composer.firstName,
        lastName: this.composer.lastName,
        nationality: this.composer.nationality,
        dateOfBirth: this.composer.dateOfBirth,
        dateOfDeath: this.composer.dateOfDeath,
      };

      console.log(data);
      ComposerServices.create(data)
        .then((response) => {
          this.composer.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "ComposerList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
    

      this.$router.push({ name: "ComposerList" });
    },
  },
};
</script>
<style></style>
