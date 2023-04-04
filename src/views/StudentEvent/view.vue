<template>
  <div>
    <v-container>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Item Details</v-card-title>
          <v-card-text>
            <div v-if="selectedItem">
              <p>Date: {{ selectedItem.date }}</p>
              <p>Room: {{ selectedItem.room }}</p>
              <p>Start Time: {{ selectedItem.startTime }}</p>
              <p>End Time: {{ selectedItem.endTime }}</p>

              <!-- <h2>Available Accompanist List</h2>
              <v-text-field
                v-model="searchUser"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              >
              </v-text-field>
              <v-data-table
                :headers="userHeaders"
                :search="searchUser"
                :items="users"
                :items-per-page="50"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <div>
                    <v-icon small class="mx-4" @click="selectedUser(item)">
                      mdi-pencil
                    </v-icon>
                  </div>
                </template>
              </v-data-table> -->
              <v-select
                v-model="signUpData.userId"
                :items="users"
                :searchable="true"
                item-text="fName"
                item-value="id"
                label="Select an available accompanist"
              />
              <v-select
                v-model="signUpData.instrumentId"
                :items="Instruments"
                :searchable="true"
                item-text="name"
                item-value="id"
                label="Select an instrument"
              />
              <v-select
                v-model="signUpData.composerId"
                :items="Composers"
                :searchable="true"
                item-text="firstName"
                item-value="id"
                label="Select an composer"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" class="mr-4" @click="SaveSignUp()">
              Save
            </v-btn>
            <v-btn color="error" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-toolbar>
        <v-toolbar-title> {{ eventSession.type }} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ this.message }}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
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
                <td>{{ item.startTime }}</td>
                <td>
                  <!-- <v-icon
                    :color="item.isSelected ? 'green' : 'green'"
                    @click="UpdateEvent(item)"
                  >
                    {{ item.isSelected ? "mdi-check" : "mdi-close" }}
                  </v-icon> -->
                  <v-btn color="green" class="mr-4" @click="UpdateEvent(item)">
                    Sign Up
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
      <br />
      <br />

      <v-card>
        <v-card-title>
          Past event
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
                <!-- <td>
                  <v-icon :color="item.isSelected ? 'green' : 'red'">
                    {{ item.isSelected ? "mdi-check" : "mdi-close" }}
                  </v-icon>
                </td> -->

                <td>
                  <v-chip v-if="item.isSelected === true" :color="'green'" dark>
                    Attend
                  </v-chip>
                  <v-chip v-if="item.isSelected === false" :color="'red'" dark>
                    Did not Attend
                  </v-chip>
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
// import EventServices from "../../services/Event/services";
import AvalabilityServices from "../../services/Avalability/services";
import Utils from "@/config/utils.js";
import moment from "moment";
import StudentEventServices from "../../services/StudentEvent/services";
import InstrumentServices from "../../services/Instrument/services";
import ComposerServices from "../../services/Composer/services";

export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      search: "",
      searchUser: "",
      signUpData: {},
      selectedUserValue: [],
      user: {},
      users: [],
      eventSession: {},
      items: [],
      events: [],
      Composers: [],
      userAvalablity: [],
      Instruments: [],
      eventsOld: [],
      message: "",
      mess: "",
      dialog: false,
      userHeaders: [
        { text: "First Name", value: "fName" },
        { text: "Last Name", value: "lName" },
        { text: "Actions", value: "actions", sortable: false },
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
    this.retrieveEvents();
    this.retrieveEventSessionServices();
    this.user = Utils.getStore("user");
    this.retrieveInstruments();
    this.retrieveComposers();
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
    selectedUser(item) {
      this.selectedUserValue = item.id;
    },
    retrieveAllUsers(id) {
      AvalabilityServices.getOneAllUser(id)
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },
    AddEvent(event) {
      var data = {
        eventId: event.id,
        userId: this.user.userId,
        isSelected: true,
      };

      AvalabilityServices.create(data)
        .then((response) => {
          this.$router.go(this.$router.currentRoute);
          console.log("add " + response.data);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });

      event.isSelected = !event.isSelected;
    },
    SaveSignUp() {
      //this.signUpData
      this.dialog = false;
    },
    openDialog(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    UpdateEvent(item) {
      this.signUpData.eventId = item.id;
      this.retrieveAllUsers(item.id);
      this.openDialog(item);
    },
    retrieveInstruments() {
      InstrumentServices.getAll()
        .then((response) => {
          this.Instruments = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveComposers() {
      ComposerServices.getAll()
        .then((response) => {
          this.Composers = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    retrieveEvents() {
      StudentEventServices.getAll()
        .then((response) => {
          var data = response.data;

          var fillterDatas = data.filter((i) => i.eventSessionId == this.id);

          for (let index = 0; index < fillterDatas.length; index++) {
            let fillterData = fillterDatas[index];

            if (fillterData.avalability.length === 0) continue;

            let avalabilitys = fillterData.avalability.filter(
              (i) =>
                i.eventId == fillterData.id && i.userId !== this.user.userId
            );

            this.events.push({
              id: fillterData.id,
              date: fillterData.date,
              room: fillterData.room,
              startTime: fillterData.startTime,
              eventSessionId: fillterData.eventSessionId,
              isApproved: fillterData.isApproved,
              isSelected:
                avalabilitys.length === 0 ? false : avalabilitys[0].isSelected,
              avalabilityId: avalabilitys.length === 0 ? 0 : avalabilitys[0].id,
            });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    retrieveEventSessionServices() {
      EventSessionServices.get(this.id)
        .then((response) => {
          this.eventSession = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    ViewAvalability() {
      this.$router.push({
        name: "UserAvalablity",
        params: { id: this.user.userId },
      });
    },
    toggleStatus(item) {
      item.isSelected = !item.isSelected;
    },
    getColor(item) {
      if (item === true) return "green";
      else if (item === false) return "red";
      else return "yellow";
    },
  },
};
</script>

<style></style>
