<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.deportment"
                id="name"
                :counter="50"
                label="Stage Deportment (Pois, entrance)"
                required
              >
              </v-text-field>
            </v-form>
            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.tone"
                id="name"
                :counter="50"
                label=" Tone"
                required
              >
              </v-text-field>
            </v-form>

            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.accuracy"
                id="name"
                :counter="50"
                label="Accuracy"
                required
              >
              </v-text-field>
            </v-form>

            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.technique"
                id="name"
                :counter="50"
                label="Technique"
                required
              >
              </v-text-field>
            </v-form>

            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.interpretation"
                id="name"
                :counter="50"
                label="Interpretation"
                required
              >
              </v-text-field>
            </v-form>

            <v-form ref="form" v-model="valid" lazy validation>
              <v-text-field
                v-model="editedItem.balanceblend"
                id="name"
                :counter="50"
                label="Balance Blend"
                required
              >
              </v-text-field>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="saveCritique"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Critiques </v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card color="indigo lighten-5">
        <v-card-title>
          Pieces
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
      </v-card>
      <v-data-table :headers="headers" :items="songs" :search="search">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.title }}</td>
              <td>
                {{ item.composer.firstName + item.composer.firstName }}
              </td>
              <td>{{ item.lyrics }}</td>
              <td>{{ item.translationSong }}</td>
              <td>
                <v-icon small class="mx-4" @click="openCreateDialog(item)">
                  mdi-plus
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import CritiqueServices from "../../services/Critique/services";
import SongServices from "../../services/Song/services";
import SongCritiqueServices from "../../services/SongCritique/services";
import Utils from "@/config/utils.js";

export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      songId : null,
      editedIndex: -1,
      editedItem: {},
      foreignText: null,
      songCritiques: {},
      search: null,
      valid: false,
      critique: {},
      songs: [],
      user: {},
      headers: [
        { text: "Title", value: "title" },
        { text: "Composer", value: "composer.firstName" },
        { text: "Lyrics", value: "composer.firstName" },
        { text: "Translation Song", value: "composer.firstName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      message: "Enter data and click save",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex.id < 0 ? "Critiques" : "Critiques";
    },
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSongs();
  },
  methods: {
    async openCreateDialog(item) {
     this.songId = item.id;

      this.dialog = true;
      await SongCritiqueServices.getOneBySongId(this.songId, this.user.userId)
        .then((response) => {
         
          const data = response.data;
          if (data != null) {
            this.editedItem = data.critique;
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });

      this.dialog = true;
    },
    async saveCritique() {
      var data = {
        tone: this.editedItem.tone,
        accuracy: this.editedItem.accuracy,
        technique: this.editedItem.technique,
        interpretation: this.editedItem.interpretation,
        balanceblend: this.editedItem.balanceblend,
      };
      if (this.editedItem.id != null) {
        await CritiqueServices.update(this.editedItem.id, data)
          .then((response) => {
            console.log("add " + response.data);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        await CritiqueServices.create(data)
          .then((response) => {
            this.editedItem.critiqueId = response.data.id;
          })
          .catch((e) => {
            console.log("add Eroro" + e.response.data.message);
            this.message = e.response.data.message;
          });

        var dataSong = {
          userId: this.user.userId,
          songId: this.songId,
          critiqueId: this.editedItem.critiqueId,
        };

        await SongCritiqueServices.create(dataSong)
          .then((response) => {
            console.log("add " + response.data);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
      this.$router.go(this.$router.currentRoute);
    },
    retrieveSongCritique() {
      SongCritiqueServices.get(this.id)
        .then((response) => {
          this.editedItem = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateSongCritique() {
      var data = {
        faculityId: this.user.userId,
        songId: this.editedItem.songId,
        critiqueId: this.editedItem.critiqueId,
      };
      SongCritiqueServices.update(this.id, data)
        .then((response) => {
          console.log("add " + response.data);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.songs[this.editedIndex], this.editedItem);
      } else {
        this.songs.push(this.editedItem);
      }
      this.close();
    },
    retrieveSongs() {
      SongServices.getAllSignUpIdr(this.id)
        .then((response) => {
          this.songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "CritiqueList" });
    },
    close() {},
  },
};
</script>
<style></style>
