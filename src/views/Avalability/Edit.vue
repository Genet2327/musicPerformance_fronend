<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>EventSession View</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ this.message }}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          <!-- {{ eventSession.type }} -->
          <v-btn class="mx-2" color="success" @click="ViewAvalability(id)"
            >View</v-btn
          >
          <v-spacer></v-spacer>
          <button @click="AddEvent(item)">Add Avalability</button>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mx-4"
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="events"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon :color="'red'" @click="deleteEvent(item)">
              mdi-trash-can
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import EventServices from "../../services/Event/services";
import Utils from "@/config/utils.js";
import moment from "moment";

export default {
  name: "view-user",
  props: ["id"],
  data() {
    return {
      search: "",
      user: {},
      events: [],
      message: "",
      headers: [
        { text: "Date", value: "date" },
        { text: "Room", value: "room" },
        { text: "Start time", value: "startTime" },
        { text: "End Time", value: "endTime" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.retrieveUserAvalablity();
    this.user = Utils.getStore("user");
  },
  methods: {
    deleteEvent(item) {
      EventServices.deleteAvalability(this.user.userId, item.avalability.id)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveUserAvalablity() {
      EventServices.getAvalableEvent(this.id)
        .then((response) => {
          this.userAvalableEvent = response.data;

          const current = new Date();
          var localTime = moment(current).format("YYYY-MM-DD"); // store localTime
          var proposedDate = localTime + "T00:00:00.000Z";

          var array = this.userAvalableEvent.Events;

          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            var eventDate = element.date;
            if (proposedDate <= eventDate) {
              this.events.push(element);
            }
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>

<style></style>
