<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>EventSession Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="eventSession.type"
          id="type"
          :counter="50"
          label=" Name"
          required
        >
        </v-text-field>
        

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateEventSession()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import EventSessionServices from "../../services/EventSession/services";

export default {
  name: "edit-eventSession ",
  props: ["id"],
  data() {
    return {
      valid: false,
      eventSession: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveEventSession() {
      EventSessionServices.get(this.id)
        .then((response) => {
          this.eventSession = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateEventSession() {
      var data = {
        type: this.eventSession.type,
        
      };
      EventSessionServices.update(this.id, data)
        .then((response) => {
          this.eventSession.id = response.data.id;
          this.$router.push({ name: "EventSessionList" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "EventSessionList" });
    },
  },
  mounted() {
    this.retrieveEventSession();
  },
};
</script>
<style></style>
