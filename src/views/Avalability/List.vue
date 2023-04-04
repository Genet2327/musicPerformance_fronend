<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>EventSession</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          EventSessions
          <v-btn
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddEventSession' }"
            text
          >
            Add
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="EventSessions"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDEventSessionForUser(item)">
                    mdi-pencil
                  </v-icon> -->

              <v-icon small class="mx-4" @click="viewEventSession(item)">
                mdi-format-list-bulleted-type
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import EventSessionServices from "../../services/EventSession/services";
import Utils from "@/config/utils.js";

export default {
  name: "EventSessions-list",
  data() {
    return {
      search: "",
      EventSessions: [],
      currentEventSession: null,
      currentIndex: -1,
      type: "",
      durationSession: "",
      user: {},
      message: "Search, Edit or Delete EventSessions",
      headers: [
        { text: "Name", value: "type" },
        { text: "Duration Session", value: "durationSession", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveEventSessions();
  },
  methods: {
    viewEventSession(EventSession) {
      this.$router.push({
        name: "ViewAvalablity",
        params: { id: EventSession.id },
      });
    },

    retrieveEventSessions() {
      EventSessionServices.getAll()
        .then((response) => {
          this.EventSessions = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveEventSessions();
      this.currentEventSession = null;
      this.currentIndex = -1;
    },
    setActiveEventSession(EventSession, index) {
      this.currentEventSession = EventSession;
      this.currentIndex = EventSession ? index : -1;
    },
  },
};
</script>
