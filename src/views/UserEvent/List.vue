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
        <v-card-title> EventSessions </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>

        <v-data-table :headers="headers" :items="EventSessions">
          <template v-slot:item="{ item }">
            {{ item.name }}
            <v-data-table :headers="subHeaders" :items="item.events">
              <template v-slot:[`item.actions`]="{ item }">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Add
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Legal first name*"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Legal middle name"
                              hint="example of helper text only on focus"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Legal last name*"
                              hint="example of persistent helper text"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Email*"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Password*"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="Instruments"
                              item-text="name"
                              label="Instruments"
                              filled
                              return-object
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="Composers"
                              label="Composer"
                              item-text="firstName"
                              filled
                              return-object
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn text color="primary" @click="add(item)">Add </v-btn>
              </template>
            </v-data-table>
          </template> </v-data-table
        >event
      </v-card>
    </v-container>
  </div>
</template>

<script>
import InstrumentServices from "../../services/Instrument/services";
import EventSessionServices from "../../services/EventSession/services";
import ComposerServices from "../../services/Composer/services";
export default {
  data() {
    return {
      dialog: false,
      EventSessions: [],
      headers: [],
      Instruments: [],
      Composers: [],
      subHeaders: [
        { text: " Room", value: "room" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  mounted() {
    this.retrieveEventSessions();
    this.retrieveInstruments();
    this.retrieveComposers();
  },
  methods: {
    add(item) {
      item.toppings.push({ name: "", calories: 0 });
    },
    retrieveEventSessions() {
      EventSessionServices.getAll()
        .then((response) => {
          const array = response.data;
          for (let index = 0; index < array.length; index++) {
            const es = array[index];
            this.EventSessions.push({ name: es.type, events: es.event });
          }
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
    retrieveComposers() {
      ComposerServices.getAll()
        .then((response) => {
          this.Composers = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
