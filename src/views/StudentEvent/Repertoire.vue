<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Instrument Add</v-toolbar-title>
      </v-toolbar>
      <br />
      <br />
      <v-card v-for="song in songs" :key="song.id">
        <v-card-title>{{ song.title }}</v-card-title>
        <v-card-text>
          <div>
            Composer: {{ song.composer.firstName }} {{ song.composer.lastName }}
          </div>
          <div>Date of Birth: {{ formatDate(song.composer.dateOfBirth) }}</div>
          <div>Date of Death: {{ formatDate(song.composer.dateOfDeath) }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SongServices from "../../services/Song/services";
import Utils from "@/config/utils.js";

export default {
  name: "add-instrument",
  data() {
    return {
      valid: false,
      user: {},
      songs: [],
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSongs();
  },
  methods: {
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toISOString().split("T")[0];
    },
    retrieveSongs() {
      SongServices.getAllSongByUserId(this.user.userId)
        .then((response) => {
          this.songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style></style>
