<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title> Edit Data </v-card-title>
        <v-card-text>
          <v-form>
            <v-select
              :items="avalabilityUsers"
              item-text="fName"
              filled
              return-object
            ></v-select>
            <v-select
              :items="instruments"
              item-text="name"
              filled
              return-object
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveItem"> Save </v-btn>
          <v-btn @click="closeDialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>EventSession</v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          UpComing Event Sessions
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
          :items="filterItems"
          :group-by="'userId'"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.startTime }}</td>
                <td>
                  <v-chip
                    v-if="item.isApproved === 0"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Pending
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 1"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Approved
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 2"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Rejected
                  </v-chip>
                </td>
                <td>
                  <v-icon
                    :color="!item.isSelected ? 'green' : 'red'"
                    @click="editItem(item)"
                  >
                    {{ !item.isSelected ? "mdi-check" : "mdi-close" }}
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <v-container>
      <v-card color="indigo lighten-5">
        <v-card-title>
          Event Sessions
          <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="filterSelecteditems"
          :group-by="'userId'"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.startTime }}</td>
                <td>
                  <v-chip
                    v-if="item.isApproved === 0"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Pending
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 1"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Approved
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 2"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Rejected
                  </v-chip>
                </td>
                <td v-if="item.isApproved === 0">
                  <v-icon
                    :color="!item.isSelected ? 'green' : 'red'"
                    @click="editItem(item)"
                  >
                    {{ !item.isSelected ? "mdi-check" : "mdi-close" }}
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <v-container>
      <v-card color="indigo lighten-5">
        <v-card-title>
          Past Event Sessions
          <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="pastItems"
          :group-by="'userId'"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.startTime }}</td>
                <td>
                  <v-chip
                    v-if="item.isApproved === 2"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Approved
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 1"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Pending
                  </v-chip>
                  <v-chip
                    v-if="item.isApproved === 3"
                    :color="getColor(item.isApproved)"
                    dark
                  >
                    Rejected
                  </v-chip>
                </td>
                <td v-if="item.isApproved === 1">
                  <v-icon :color="!item.isSelected ? 'green' : 'red'">
                    {{ !item.isSelected ? "mdi-check" : "mdi-close" }}
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
import EventServices from "../../services/Event/services";
import SignUp from "../../services/SignUp/services";
import InstrumentServices from "../../services/Instrument/services";
import EventSessionServices from "../../services/EventSession/services";
import StudentEventServices from "../../services/StudentEvent/services";
import moment from "moment";
import Utils from "@/config/utils.js";

export default {
  name: "EventSessions-list",
  data() {
    return {
      dialog: false,
      search: "",
      items: [],
      pastItems: [],
      upComingitems: [],
      EventSessions: [],
      instruments: [],
      avalabilityUsers: [],
      currentEventSession: null,
      currentIndex: -1,
      type: "",
      durationSession: "",
      user: {},
      message: "Search, Edit or Delete Event Sessions",
      headers: [
        { text: "Date", value: "date" },
        { text: "Room", value: "room" },
        { text: "Start Time", value: "startTime" },
        { text: "End Time", value: "endTime" },
        { text: "Approval Status", value: "isApproved" },
        { text: "Status", value: "isSelected" },
      ],
      editedItem: {},
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveStudentEvent();
    this.retrieveEvents();
  },
  computed: {
    filterSelecteditems() {
      return this.items.filter(
        (item) =>
          (item.isApproved === 1 || item.isApproved === 0) &&
          item.isSelected === true &&
          item.studentId === this.user.userId
      );
    },
    filterItems() {
      return this.items.filter(
        (item) => item.isSelected === false && item.studentId === ""
      );
    },
  },
  methods: {
    retrieveEvents() {
      StudentEventServices.getAll()
        .then((response) => {
          var data = response.data;

          var fillterDatas = data.filter((i) => i.eventSessionId == this.id);

          for (let index = 0; index < fillterDatas.length; index++) {
            let fillterData = fillterDatas[index];

            let avalabilitys = fillterData.avalability.filter(
              (i) => i.eventId == fillterData.id && i.userId !== this.user.userId
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
    retrieveStudentEvent() {
      StudentEventServices.getAll()
        .then((response) => {
          var events = response.data;
          const current = new Date();
          var localTime = moment(current).format("YYYY-MM-DD");

          for (let index = 0; index < events.length; index++) {
            const event = events[index];
            const date = this.formatDate(event.date);
            if (event.avalability.length > 0) {
              if (localTime <= date) this.items.push(event);
              else this.pastItems.push(event);
            }
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateEvent() {
      var data = {
        date: this.editedItem.date,
        room: this.editedItem.room,
        startTime: this.editedItem.startTime,
        endTime: this.editedItem.endTime,
        isApproved: this.editedItem.isApproved === 0 ? "" : 0,
        isSelected: !this.editedItem.isSelected,
        studentId: this.user.userId,
      };

      EventServices.update(this.editedItem.id, data)
        .then(() => {})
        .catch((e) => {
          this.message = e.response.data.message;
        });

      var signUpdata = {
        userId: this.user.userId,
      };
      SignUp.create(signUpdata)
        .then(() => {})
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveUserEvent(eventId) {
      StudentEventServices.getUserAll(eventId)
        .then((response) => {
          this.avalabilityUsers = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveInstruments() {
      InstrumentServices.getAll()
        .then((response) => {
          this.instruments = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    editItem(item) {
      this.retrieveUserEvent(item.id);
      this.retrieveInstruments();
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    saveItem() {
      this.dialog = false;
      this.updateEvent();
      this.$router.go(this.$router.currentRoute);
    },
    closeDialog() {
      this.dialog = false;
    },
    toggleStatus(item) {
      item.isSelected = !item.isSelected;
    },
    getColor(item) {
      if (item === true) return "green";
      else if (item === false) return "red";
      else return "yellow";
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },
    viewEventSession(EventSession) {
      this.$router.push({
        name: "ViewStudentEvent",
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
