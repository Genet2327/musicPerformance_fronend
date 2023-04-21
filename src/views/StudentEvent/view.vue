<template>
  <div>
    <v-dialog v-model="showConfirmDialog">
      <v-card>
      <v-card-title>
        View Avalability
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchUser"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-4"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headersUser"
        :items="listUser"
        :search="searchUser"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.fName }}</td>
            <td>{{ item.lName }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn color="red" text @click="showConfirmDialog = false">
          Cancel
        </v-btn>       
      </v-card-actions>
    </v-card>
    </v-dialog>

    <v-container>
      <v-toolbar>
        <v-toolbar-title> Sign UP</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ this.message }}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ eventSession.type }}
          Upcoming event
          <!-- <v-btn class="mx-2" color="success" @click="ViewAvalability()"
            >View</v-btn
          > -->
          <v-spacer></v-spacer>
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
        <v-data-table :headers="headers" :items="filterItems" :search="search">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.endTime }}</td>
                <td>
                  <v-btn color="green" class="mr-4" @click="UpdateEvent(item)">
                    select
                  </v-btn>
                  <v-btn color="green" class="mr-4" @click="ViewUser(item)">
                    View Avalability
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
      <br />
      <br />
    </v-container>
  </div>
</template>
<script>
import EventServices from "../../services/Event/services";
import EventSessionServices from "../../services/EventSession/services";
import AvalabilityServices from "../../services/Avalability/services";

import Utils from "@/config/utils.js";
import moment from "moment";

export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      searchUser: null,
      showConfirmDialog: false,
      selectedUs: null,
      searchTerm: "",
      search: "",
      listUser: [],
      selectedUserValue: [],
      user: {},
      users: [],
      eventSession: {},
      items: [],
      events: [],

      eventsOld: [],
      message: "",
      mess: "",
      headersUser: [
        { text: "First Name", value: "fName" },
        { text: "Last Name", value: "lName" },
      ],
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
    this.retrieveEventServices();
    this.retrieveEventSession();
    this.user = Utils.getStore("user");
  },
  computed: {
    filterOldItems() {
      const current = new Date();
      var localTime = moment(current).format("YYYY-MM-DD"); // store localTime
      var proposedDate = localTime + "T00:00:00.000Z";
      return this.events.filter((item) => item.date < proposedDate);
    },
    filterItems() {
      const current = new Date();
      var localTime = moment(current).format("YYYY-MM-DD"); // store localTime
      var proposedDate = localTime + "T00:00:00.000Z";

      return this.events.filter((item) => item.date >= proposedDate);
    },
  },
  methods: {
    ViewUser(item) {
      this.showConfirmDialog = true;
      AvalabilityServices.getOneAllUser(item.id)
        .then((response) => {
          this.listUser = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveEventSession() {
      EventSessionServices.get(this.id)
        .then((response) => {
          this.eventSession = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },

    UpdateEvent(item) {
      this.$router.push({
        name: "signUpEvent",
        params: { id: item.id },
      });
    },

    retrieveEventServices() {
      EventServices.getSignUpEvent(this.id)
        .then((response) => {
          this.events = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>

<style></style>
