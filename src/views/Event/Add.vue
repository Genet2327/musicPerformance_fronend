<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Event Add</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <h4>EventSession: {{ eventSessionId }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
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
              v-model="event.date"
              label="Date"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="event.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(event.date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
        <v-text-field
          id="room"
          v-model="event.room"
          :counter="50"
          label="Room"
          required
        ></v-text-field>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="event.startTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="event.startTime"
              label="Start Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="event.startTime"
            full-width
            @click:minute="$refs.menu2.save(event.startTime)"
          ></v-time-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="event.endTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="event.endTime"
              label="End Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu3"
            v-model="event.endTime"
            full-width
            @click:minute="$refs.menu.save(event.endTime)"
          ></v-time-picker>
        </v-menu>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveEvent()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import EventServices from "../../services/Event/services";
export default {
  name: "AddEvent",
  props: {
    eventSessionId: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      valid: true,
      menu2: false,
      menu1: false,
      menu3: false,
      event: {
        id: null,
        startTime: "",
        endTime: "",
        room: "",
        date: new Date().toISOString().substr(0, 10),
        published: false,
      },
      message: "Enter data and click save",
    };
  },
  methods: {
    saveEvent() {
      var data = {
        date: this.event.date,
        room: this.event.room,
        startTime: this.event.startTime,
        endTime: this.event.endTime,
      };
      EventServices.createEvent(this.eventSessionId, data)
        .then((response) => {
          this.event.id = response.data.id;

          this.$router.push({
            name: "ViewEventSession",
            params: { id: this.eventSessionId },
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({
        name: "ViewEventSession",
        params: { id: this.eventSessionId },
      });
    },
  },
};
</script>
<style></style>
