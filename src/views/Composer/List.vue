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
          Composer
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
          :items="Composer"
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
import Composerervices from "../../services/Composer/services";
import Utils from "@/config/utils.js";

export default {
  name: "Composer-list",
  data() {
    return {
      search: "",
      Composer: [],
      currentComposer: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Composer",
      headers: [
        { text: "Name", value: "name" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveComposer();
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
      Composerervices.delete(Composer.id)
        .then(() => {
          this.retrieveComposer();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveComposer() {
      Composerervices.getAll()
        .then((response) => {
          this.Composer = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveComposer();
      this.currentComposer = null;
      this.currentIndex = -1;
    },
    setActiveComposer(Composer, index) {
      this.currentComposer = Composer;
      this.currentIndex = Composer ? index : -1;
    },
    removeAllComposer() {
      Composerervices.deleteAll()
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
