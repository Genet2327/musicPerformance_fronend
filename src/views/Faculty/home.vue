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
            cols="9"
          >
            <v-card color="#EDE7F6">
              <v-card-text>
                {{ session.type }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="CreateCritique(session)">Create Critique</v-btn>
                <v-btn @click="ViewCritique(session)">view Critique</v-btn>
                <v-btn @click="Avalablity(session)">sign UP  Avalablity</v-btn>
                
                <v-btn
                  v-show="session.type == 'jury'"
                  @click="CreateCritique(session)"
                  >Set level</v-btn
                >
                <v-btn
                  v-show="session.type == 'jury'"
                  @click="CreateCritique(session)"
                  >Print Critique</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card color="#EDE7F6">
              <v-card-text> Student </v-card-text>
              <v-card-actions>
                <v-btn @click="Repertoire()">Student Repertoire Listing</v-btn>
                <v-btn @click="vocal()">Vocal Level Details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
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
    CreateCritique(EventSession) {
      this.$router.push({
        name: "CritiqueList",
        params: { id: EventSession.id },
      });
    },
    ViewCritique(EventSession) {
      this.$router.push({
        name: "ViewListCritique",
        params: { id: EventSession.id },
      });
    },
    Avalablity(EventSession) {
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
