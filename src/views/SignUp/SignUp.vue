<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Recital Hearing Sign Up</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      
      <form>
        
        
    
        <!-- Select Hearing Date -->
    
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Select a hearing date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu = false">OK</v-btn>
          </v-date-picker>
        </v-menu>
  
        <!-- Select Hearing Time -->
  
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Select a hearing time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-model="time" format="ampm" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu2 = false">OK</v-btn>
          </v-time-picker>
        </v-menu>
  
        <!-- Add an accompanist to the performance -->
        <v-row>
          <v-col>
            <v-select
              :disabled="noAccompanist"
              v-model="selectedAccompanist"
              :items="accompanists"
              item-text="fullName"
              item-value="id"
              label="Accompanist"
            ></v-select>
          </v-col>
        </v-row>
  
        <!-- Add an Private Instructor to the performance -->
        <v-row>
          <v-col>
            <v-select
              :disabled="noPrivateInstructor"
              v-model="selectedPrivateInstructor"
              :items="PrivateInstructor"
              item-text="fullName"
              item-value="id"
              label="Private Instructor"
            ></v-select>
          </v-col>
        </v-row>
  
        <!-- Select the instrument -->
        <v-row>
          <v-select
            label="Select Voice or Instrument"
             v-model="Instruments"
            :items="instruments"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-row>
        <br /><br />
  
        <div>
    <p>If there is any missing information associated with your composer, accompanist or other important informataion please sumbit the infomation by clicking  <a href="http://localhost:8081/#/MissingInfo">here</a></p>
  </div>

        <v-text-field
          v-model="SelectionTitle"
          :error-messages="SelectionTitle"
          :counter="150"
          label="Selection Title"
          required
          @input="$v.SelectionTitle.$touch()"
          @blur="$v.SelectionTitle.$touch()"
        ></v-text-field>


        <v-row>
          <v-col>
            <v-select
              :disabled="noComposer"
              v-model="selectedComposer"
              :items="Composer"
              item-text="fullName"
              item-value="id"
              label="Composer"
            ></v-select>
          </v-col>
        </v-row>

        <div>
          <div>
    <label>
      <input type="checkbox" v-model="isChecked">
      If the text is in a Foreign Language Check
    </label>
    <br>
    <textarea v-if="isChecked" v-model="foreignText" placeholder="Enter foreign text here" 
    style="width: 1750px; height: 200px;"></textarea>
  </div>
        </div>

        <v-col cols="12" class="text-center">
            <v-btn color="primary">Submit</v-btn>
          </v-col>
      </form>
    </v-container>
  </div>
</template>

<script>
import InstrumentServices from "../../services/Instrument/services";

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
      message: "Search, Edit or Delete Instruments",
      headers: [
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      menu: false,
      date: null,
      menu2: false,
      time: null,
    };
  },
  mounted() {
    this.retrieveInstruments();
  },
  methods: {
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
