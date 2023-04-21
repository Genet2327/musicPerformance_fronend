<template>
  <div>
    <v-container >
      <v-toolbar>
        <v-toolbar-title>Instrument List</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Instruments
          <v-btn
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddInstrument' }"
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
          :items="Instruments"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDInstrumentForUser(item)">
                    mdi-pencil
                  </v-icon> -->

              <v-icon small class="mx-4" @click="editInstrument(item)">
                mdi-pencil
              </v-icon>

              <v-icon small class="mx-4" @click="deleteInstrument(item)">
                mdi-trash-can
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import InstrumentServices from "../../services/Instrument/services";
import Utils from "@/config/utils.js";

export default {
  name: "Instruments-list",
  data() {
    return {
      search: "",
      Instruments: [],
      currentInstrument: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete",
      headers: [
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveInstruments();
  },
  methods: {
    editInstrument(Instrument) {
      this.$router.push({
        name: "EditInstrument",
        params: { id: Instrument.id },
      });
    },
    viewInstrument(Instrument) {
      this.$router.push({
        name: "viewInstrument",
        params: { id: Instrument.id },
      });
    },
    addInstrumenttoUser(Instrument) {
      var data = {
        userId: this.user.userId,
        InstrumentId: Instrument.id,
      };
      console.log("add ", data);
    },
    deleteInstrument(Instrument) {
      InstrumentServices.delete(Instrument.id)
        .then(() => {
          this.retrieveInstruments();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
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
    refreshList() {
      this.retrieveInstruments();
      this.currentInstrument = null;
      this.currentIndex = -1;
    },
    setActiveInstrument(Instrument, index) {
      this.currentInstrument = Instrument;
      this.currentIndex = Instrument ? index : -1;
    },
    removeAllInstruments() {
      InstrumentServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
