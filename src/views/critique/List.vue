<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Critique </v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Critiques
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
        <v-data-table :headers="headers" :items="filterOldItems" :search="search">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.room }}</td>
                <td>
                  {{ item.signUp.user.fName }} {{ item.signUp.user.lName }}
                </td>
                <td>
                  <v-icon small class="mx-4" @click="editCritique(item)">
                    mdi-pencil
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
import CritiqueServices from "../../services/Critique/services";
import Utils from "@/config/utils.js";
import moment from "moment";

export default {
  name: "Critiques-list",
  props: ["id"],
  data() {
    return {
      search: "",
      items: [],
      currentCritique: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Critiques",
      headers: [
        { text: " Performance Date", value: "date" },
        { text: " Performance Room", value: "room" },
        { text: "Performer Full Name", value: "fName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveCritiques();
  },
  computed: {
   
    filterOldItems() {
      const current = new Date();
      var localTime = moment(current).format("YYYY-MM-DD"); // store localTime
      var proposedDate = localTime + "T00:00:00.000Z";

      return this.items.filter((i) => i.signUpId != null && i.date < proposedDate);
    },
  },
  methods: {
    editCritique(item) {
      this.$router.push({
        name: "EditCritique",
        params: { id: item.signUpId },
      });
    },
    retrieveCritiques() {
      CritiqueServices.getAllEvents(this.id)
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveCritiques();
      this.currentCritique = null;
      this.currentIndex = -1;
    },
    setActiveCritique(item, index) {
      this.currentCritique = item;
      this.currentIndex = item ? index : -1;
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },
  },
};
</script>
