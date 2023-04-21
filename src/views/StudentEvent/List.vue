<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Home</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-container>
        <v-row>
          <v-col
            v-for="(session, index) in EventSessions"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card color="#EDE7F6">
              <v-card-text>
                {{ session.type }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="viewEventSession(session)">Sign up</v-btn>
                <v-btn @click="viewSignUpEvent(session)">Change </v-btn>
                <v-btn @click="viewCritiquesStudent(session)">Critiques</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-card color="#EDE7F6">
            <v-card-text> Other </v-card-text>
            <v-card-actions>
              <v-btn @click="Repertoire()">My Repertoire</v-btn>
              <v-btn @click="vocal()">Vocal Level Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
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
      messa: "Duration Time:-",
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
        name: "ViewStudentEvent",
        params: { id: EventSession.id },
      });
    },
    viewSignUpEvent(EventSession) {
      this.$router.push({
        name: "EditEventSignUP",
        params: { id: EventSession.id },
      });
    },
    viewCritiquesStudent(EventSession) {
      this.$router.push({
        name: "CritiquesStudent",
        params: { id: EventSession.id },
      });
    },
    Repertoire() {
      this.$router.push({
        name: "Repertoire",
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
