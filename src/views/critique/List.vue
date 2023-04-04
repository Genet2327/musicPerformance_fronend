<template>
    <div>
      <v-container >
        <v-toolbar>
          <v-toolbar-title>Critique </v-toolbar-title>
               </v-toolbar>
        <br /><br />
        <v-card color="indigo lighten-5">
          <v-card-title>
            Critiques
            <v-btn
              class="mx-2"
              color="success"
              exact
              :to="{ name: 'AddCritique' }"
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
            :items="Critiques"
            :items-per-page="50"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <!-- <v-icon small class="mx-4" @click="ADDCritiqueForUser(item)">
                      mdi-pencil
                    </v-icon> -->
  
                <v-icon small class="mx-4" @click="editCritique(item)">
                  mdi-pencil
                </v-icon>
  
                <v-icon small class="mx-4" @click="deleteCritique(item)">
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
import CritiqueServices from "../../services/Critique/services";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "Critiques-list",
    data() {
      return {
        search: "",
        Critiques: [],
        currentCritique: null,
        currentIndex: -1,
        name: "",
        user: {},
        message: "Search, Edit or Delete Critiques",
        headers: [
          { text: "StageDeportment", value: "stagedeportment" },
          { text: "Tone", value: "tone" },
          { text: "Accuracy", value: "accuracy" },
          { text: "Technique", value: "technique" },
          { text: "Interpretation", value: "interpretation" },
          { text: "Balance Blend", value: "balanceblend" },
          { text: "Diction", value: "diction" },
          { text: "Performance", value: "performance" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    mounted() {
      this.user = Utils.getStore("user");
      this.retrieveCritiques();
    },
    methods: {
      editCritique(Critique) {
        this.$router.push({
          name: "CritiqueEdit",
          params: { id: Critique.id },
        });
      },
      viewCritique(Critique) {
        this.$router.push({
          name: "viewCritique",
          params: { id: Critique.id },
        });
      },
      addCritiquetoUser(Critique) {
        var data = {
          userId: this.user.userId,
          CritiqueId: Critique.id,
        };
        console.log("add ", data);
      },
      deleteCritique(Critique) {
        CritiqueServices.delete(Critique.id)
          .then(() => {
            this.retrieveCritiques();
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      retrieveCritiques() {
        CritiqueServices.getAll()
          .then((response) => {
            this.Critiques = response.data;
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
      setActiveCritique(Critique, index) {
        this.currentCritique = Critique;
        this.currentIndex = Critique ? index : -1;
      },
      removeAllCritiques() {
        CritiqueServices.deleteAll()
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
  