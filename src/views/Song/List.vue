<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Song </v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Songs
          <v-btn class="mx-2" color="success" exact :to="{ name: 'AddSong' }" text>
            Add
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :search="search" :items="Songs" :items-per-page="50">
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mx-4" @click="editSong(item)">
                mdi-pencil
              </v-icon>

              <v-icon small class="mx-4" @click="deleteSong(item)">
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
import SongServices from "../../services/Song/services";
import Utils from "@/config/utils.js";

export default {
  name: "Songs-list",
  data() {
    return {
      search: "",
      Songs: [],
      currentSong: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Songs",
      headers: [
        { text: "Name", value: "name" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSongs();
  },
  methods: {
    editSong(Song) {
      this.$router.push({
        name: "EditSong",
        params: { id: Song.id },
      });
    },
    viewSong(Song) {
      this.$router.push({
        name: "viewSong",
        params: { id: Song.id },
      });
    },
    addSongtoUser(Song) {
      var data = {
        userId: this.user.userId,
        SongId: Song.id,
      };
      console.log("add ", data);
    },
    deleteSong(Song) {
      SongServices.delete(Song.id)
        .then(() => {
          this.retrieveSongs();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSongs() {
      SongServices.getAll()
        .then((response) => {
          this.Songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveSongs();
      this.currentSong = null;
      this.currentIndex = -1;
    },
    setActiveSong(Song, index) {
      this.currentSong = Song;
      this.currentIndex = Song ? index : -1;
    },
    removeAllSongs() {
      SongServices.deleteAll()
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
