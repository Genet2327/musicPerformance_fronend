<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Piece </v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Pieces
          <v-btn
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddSong' }"
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
          :items="Songs"
          :items-per-page="50"
        >
          <template v-slot:[`item.title`]="{ item }">
            {{ item.title }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="editSong(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteSong(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-card v-show="showSong">
          <v-card-title>
            {{ editMode ? "Edit Song" : "Add Song" }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="song.title" label="Title"></v-text-field>
            <v-select
              v-model="song.composerId"
              :items="Composers"
              item-text="name"
              item-value="id"
              label="Composer"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveSong">
              {{ editMode ? "Save" : "Add" }}
            </v-btn>
            <v-btn color="secondary" @click="closeDialog"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
        <v-btn v-show="!showSong" @click="editSong(session)">ADD Piece</v-btn>

        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title>
              {{ editMode ? "Edit Song" : "Add Song" }}
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="song.title" label="Title"></v-text-field>
              <v-select
                v-model="song.composerId"
                :items="Composers"
                item-text="name"
                item-value="id"
                label="Composer"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="saveSong">
                {{ editMode ? "Save" : "Add" }}
              </v-btn>
              <v-btn color="secondary" @click="closeDialog"> Cancel </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SongServices from "../../services/Song/services";
import ComposerServices from "../../services/Composer/services";
import Utils from "@/config/utils.js";
export default {
  name: "Songs-list",
  data() {
    return {
      search: "",
      showSong: false,
      Songs: [],
      currentSong: null,
      currentIndex: -1,
      name: "",
      fullname: "",
      user: {},
      songs: [],
      Composers: [],
      composer: {},
      dialog: false,
      editMode: false,
      song: {
        id: null,
        title: "",
        lyrics: "",
        translatedSong: "",
        language: "",
        composerId: "",
      },
      message: "Search, Edit or Delete Pieces",
      headers: [
        { text: "Title", value: "title" },
        { text: "Composer", value: "composer.firstName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSongs();
    this.retrieveComposers();
  },
  methods: {
    retrieveComposers() {
      ComposerServices.getAll()
        .then((response) => {
          const array = response.data;

          for (let index = 0; index < array.length; index++) {
            const comp = array[index];
            this.Composers.push({
              name: `${comp.firstName} ${comp.lastName}`,
              id: comp.id,
            });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    editSong() {
      this.showSong = true;
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
      SongServices.getAllSongForUser(this.user.userId)
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
    getComposerName(id) {
      this.id = id;
      ComposerServices.get(id)
        .then((response) => {
          this.composer = response.data;
          this.fullname = `${this.composer.fName} ${this.composer.lName}`;
          return this.fullname;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    closeDialog() {
      this.showSong = false;
    },
    saveSong() {
      var data = {
        title: this.song.title,
        userId: this.user.userId,
        composerId: this.song.composerId,
      };
      console.log(data);
      SongServices.create(data)
        .then((response) => {
          this.song.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "SongList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
      this.showSong = false;
    },
  },
};
</script>
