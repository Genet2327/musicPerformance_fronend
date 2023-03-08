<template>
  <div>
    <v-container >
      <v-toolbar>
        <v-toolbar-title>Composer </v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Composers
          <v-btn
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddComposer' }"
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
          :items="Composers"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDComposerForUser(item)">
                    mdi-pencil
                  </v-icon> -->

              <v-icon small class="mx-4" @click="editComposer(item)">
                mdi-pencil
              </v-icon>

              <v-icon small class="mx-4" @click="deleteComposer(item)">
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
import ComposerServices from "../../services/Composer/services";
import Utils from "@/config/utils.js";

export default {
  name: "Composers-list",
  data() {
    return {
      search: "",
      Composers: [],
      currentComposer: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Composers",
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Nationality", value: "nationality" },
        { text: "Date of Birth", value: "dateOfBirth" },
        { text: "Date of Death", value: "dateOfDeath" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveComposers();
  },
  methods: {
    editComposer(Composer) {
      this.$router.push({
        name: "EditComposer",
        params: { id: Composer.id },
      });
    },
    viewComposer(Composer) {
      this.$router.push({
        name: "viewComposer",
        params: { id: Composer.id },
      });
    },
    addComposertoUser(Composer) {
      var data = {
        userId: this.user.userId,
        ComposerId: Composer.id,
      };
      console.log("add ", data);
    },
    deleteComposer(Composer) {
      ComposerServices.delete(Composer.id)
        .then(() => {
          this.retrieveComposers();
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
    refreshList() {
      this.retrieveComposers();
      this.currentComposer = null;
      this.currentIndex = -1;
    },
    setActiveComposer(Composer, index) {
      this.currentComposer = Composer;
      this.currentIndex = Composer ? index : -1;
    },
    removeAllComposers() {
      ComposerServices.deleteAll()
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
