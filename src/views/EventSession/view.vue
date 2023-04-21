<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Event Session View</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ eventSession.type }}
          <v-spacer></v-spacer>
          <!-- <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mx-4"
            ></v-text-field> -->
          <v-btn class="mx-2" color="primary" @click="editEventSession()"
            >Edit</v-btn
          >
          <v-btn class="mx-2" color="success" @click="addEvent(id)"
            >Add Event</v-btn
          >
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table  :headers="headers"
          :search="search"
          :items="events"
          :items-per-page="50"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>
                  {{ item.startTime }}
                </td>
                <td>
                  {{ item.endTime }}
                </td>
                
                <td>
                  <v-icon small class="mx-4" @click="editEvent(item)">
                mdi-pencil
              </v-icon>
              <v-icon small class="mx-4" @click="deleteEvent(item)">
                mdi-trash-can
              </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
       
      </v-card>
    </v-container>
  </div>
</template>
<script>
import EventSessionServices from "../../services/EventSession/services";
import EventServices from "../../services/Event/services";

export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      search: "",
      eventSession: {},
      events: [],
      message: "Add, Edit or Delete Events",
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
    this.retrieveEvents();
  },
  methods: {
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },
    retrieveEvents() {
      EventSessionServices.get(this.id)
        .then((response) => {
          this.eventSession = response.data;
          EventServices.getAllEvents(this.id)
            .then((response) => {
              this.events = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    editEventSession() {
      this.$router.push({ name: "AddEventSession", params: { id: this.id } });
    },
    editEvent(event) {
      this.$router.push({
        name: "EditEvent",
        params: { eventSessionId: this.id, eventId: event.id },
      });
    },
    addEvent() {
      this.$router.push({
        name: "AddEvent",
        params: { eventSessionId: this.id },
      });
    },
    deleteEvent(event) {
      EventServices.deleteEvent(event.eventSessionId, event.id)
        .then(() => {
          this.retrieveEvents();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "eventSessions" });
    },
  },
};
</script>

<style></style>
