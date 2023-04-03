<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Song Add</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="song.name" id="name" :counter="50" label="Song Name" required>
        </v-text-field>
        <v-text-field v-model="song.lyrics" id="lyrics" :counter="50" label="Layrs" required>
        </v-text-field>
        <v-select v-model="sourceLang" :items="itemsLang" item-text="text" filled return-object></v-select>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="translateText()">
          Translate
        </v-btn>
        <v-text-field v-model="song.translatedSong" id="translatedSong" :counter="50" label="Translated Song" required>
        </v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveSong()">
          Save
        </v-btn>
        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
  
<script>
import SongServices from "../../services/Song/services";
import Utils from "@/config/utils.js";
import axios from "axios";
export default {
  name: "add-song",
  data() {
    return {
      valid: false,
      Instruments: [],
      user: {},
      song: {
        id: null,
        name: "",
        lyrics: "",
        translatedSong: "",
        language: "",
      },
      targetLang: "en",
      sourceLang: "",
      itemsLang: [
        { text: "English", value: "en" },
        { text: "Spanish", value: "es" },
        { text: "French", value: "fr" }
      ],
      message: "Enter data and click save",
    };

  },
  mounted() {
    this.user = Utils.getStore("user");

  },

  methods: {
    saveSong() {
      var data = {
        name: this.song.name,
        natranslatedSongme: this.song.name,
        lyrics: this.song.lyrics,
        language: this.sourceLang.value,
        translationSong:this.song.translatedSong
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
    },
    translateText() {
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        this.sourceLang.value +
        "&tl=" +
        this.targetLang +
        "&dt=t&q=" +
        encodeURI(this.song.lyrics);
      axios
        .get(url)
        .then((response) => {
          this.song.translatedSong = response.data[0][0][0];
        })
        .catch((error) => {
          console.error(error);
        });
    },

    cancel() {
      console.log("add tetstststts");
      this.$router.push({ name: "SongList" });
    },
    retrieveInstruments() {
      SongServices.getAll()
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
  