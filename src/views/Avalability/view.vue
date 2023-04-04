<template>
  <div>
    <v-container>
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
                  <v-icon
                    :color="item.isSelected ? 'green' : 'red'"
                    @click="UpdateEvent(item)"
                  >
                    {{ item.isSelected ? "mdi-check" : "mdi-close" }}
                  </v-icon>
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
                  <v-chip
                    v-if="item.isSelected === true"
                    :color="'green'"
                    dark
                  >
                  Attend
                  </v-chip>
                  <v-chip
                    v-if="item.isSelected === false"
                    :color="'red'"
                    dark
                  >
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

export default {
  name: "view-eventSession",
  props: ["id"],                                                      
  data() {
    return {
      search: "",
      user: {},
      eventSession: {},
      items: [],
      events: [],
      userAvalablity: [],
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
  created() {
    //this.retrieveEvents();
  },
  mounted() {
    this.retrieveEvents();
    this.retrieveEventSessionServices();
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
    UpdateEvent(event) {
      if (event.avalabilityId === 0) {
        this.AddEvent(event);
      } else {
        var dataup = {
          eventId: event.id,
          userId: this.user.userId,
          isSelected: !event.isSelected,
        };
        AvalabilityServices.update(event.avalabilityId, dataup)
          .then((response) => {
            this.$router.go(this.$router.currentRoute);
            console.log("add " + response.data);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
      event.isSelected = !event.isSelected;
    },
    retrieveEvents() {
      StudentEventServices.getAll()
        .then((response) => {
          var data = response.data;

          var fillterDatas = data.filter((i) => i.eventSessionId == this.id);

          for (let index = 0; index < fillterDatas.length; index++) {
            let fillterData = fillterDatas[index];

            let avalabilitys = fillterData.avalability.filter(
              (i) => i.eventId == fillterData.id && i.userId == this.user.userId
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
