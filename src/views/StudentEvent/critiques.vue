<template>
  <div>
    <div>
      <v-dialog v-model="showConfirmDialog">
        <v-card>
          <v-card-title class="headline"> Confirm Deletion </v-card-title>
          <v-card-text>
            Are you sure you want to delete this item?
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" text @click="showConfirmDialog = false">
              Cancel
            </v-btn>
            <v-btn color="green" text @click="confirmDelete"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-container>
      <v-toolbar>
        <v-toolbar-title> Critiques </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ this.message }}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          View  
          {{ eventSession.type }} Critiques
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
        <v-data-table
          :headers="headers"
          :items="filterOldItems"
          :search="search"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.startTime }}</td>
                <td>
                  <v-icon small class="mx-4" @click="ViewCritiques(item)">
                    mdi-pencil
                  </v-icon>                  
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
import Utils from "@/config/utils.js";
import moment from "moment";

export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      selectedUs: null,
      searchTerm: "",
      search: "",

      selectedUserValue: [],
      user: {},
      users: [],
      eventSession: {},
      items: [],
      events: [],
      showConfirmDialog: false,
      item: "test",
      eventsOld: [],
      message: "",
      mess: "",

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
    this.user = Utils.getStore("user");
    this.retrieveEventServices();
    this.retrieveEventSession();
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

    ViewCritiques(item) {
      this.$router.push({
        name: "ViewCritiques",
        params: { id: item.signUpId },
      });
    },
    confirmDelete() {
      this.showConfirmDialog = false;

      var dataEvent = {
        signUpId: null,
      };
      EventServices.update(this.id, dataEvent)
        .then((response) => {
          this.Event = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
      this.$router.go(this.$router.currentRoute);
    },
    Delete(item) {
      this.$router.push({
        name: "signUpEvent",
        params: { id: item.id },
      });
    },

    retrieveEventServices() {
      EventServices.getUserSignUpEvent(this.id, this.user.userId)
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
