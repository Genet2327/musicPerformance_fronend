<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text> </v-card-text>
        <v-data-table
          :headers="headersCre"
          :items="items"
          :search="search"
          hide-default-footer
        >
          <template v-slot:[`item.user`]="{ item }">
            {{ item.user.fName }} {{ item.user.lName }}
          </template>
          <template v-slot:[`item.critique`]="{ item }">
            <div>
              <div><strong>Tone:</strong> {{ item.critique.tone }}</div>
              <div><strong>Accuracy:</strong> {{ item.critique.accuracy }}</div>
              <div>
                <strong>Technique:</strong> {{ item.critique.technique }}
              </div>
              <div>
                <strong>Interpretation:</strong>
                {{ item.critique.interpretation }}
              </div>
              <div>
                <strong>Balance/Blend:</strong> {{ item.critique.balanceblend }}
              </div>
            </div>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
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
                  mdi-format-list-bulleted-type
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
import SongServices from "../../services/Song/services";
import SongCritiqueServices from "../../services/SongCritique/services";
import Utils from "@/config/utils.js";

export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      songId: null,
      editedIndex: -1,
      items: [],
      headersCre: [
        {
          text: "Faculty Name",
          value: "user",
        },
        {
          text: "All Critique",
          value: "critique",
        },
      ],
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
    close(){
      this.dialog = false;
    },
    async openCreateDialog(item) {
      this.songId = item.id;
      this.dialog = true;
      await SongCritiqueServices.getAllBySongId(this.songId)
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });

      this.dialog = true;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
  },
};
</script>
<style></style>
