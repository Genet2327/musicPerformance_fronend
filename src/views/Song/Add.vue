   <template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Piece Add</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field v-model="song.name" id="name" :counter="50" label="Piece Name" required>
          </v-text-field>
      
          <div class="translate-app">
      <div class="input-section">
        <label for="source-lang">Source Language:</label>
        <select id="source-lang" v-model="sourceLang">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
         
          <!-- Add more options for other languages as needed -->
        </select>
        <textarea v-model="inputText"></textarea>
      </div>
      <div class="output-section">
        <label for="target-lang">Target Language:</label>
        <select id="target-lang" v-model="targetLang">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
          
          <!-- Add more options for other languages as needed -->
        </select>
        <textarea v-model="outputText" readonly></textarea>
      </div>
      <v-btn class="mr-4" color="success" @click="translate">Translate</v-btn>
      <v-btn class="mr-4" color="error" @click="clear">Clear</v-btn>
          </div>
  
  
  
          
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveSong()">
            Save
          </v-btn>
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  <style>
  .translate-app {
    text-align: center;
  }
  .input-section,
  .output-section {
    display: inline-block;
    width: 45%;
    margin: 20px;
    vertical-align: top;
  }
  textarea {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  button {
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover {
    background-color: #eee;
  }
  </style>
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
        inputText: "",
        outputText: "",
        itemsLang: [
          { text: "English", value: "en" },
          { text: "Spanish", value: "es" },
          { text: "French", value: "fr" },
          { text: "Italian", value: "it" },
          // { text: "Chinese", value: "ch" },
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
          lyrics: this.song.lyrics,
          language: this.sourceLang,
          translationSong: this.song.translatedSong
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
          this.sourceLang +
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
      translate() {
        const url =
          "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
          this.sourceLang +
          "&tl=" +
          this.targetLang +
          "&dt=t&q=" +
          encodeURI(this.inputText);
        axios
          .get(url)
          .then((response) => {
            this.outputText = response.data[0][0][0];
          })
          .catch((error) => {
            console.error(error);
          });
      },
      clear() {
        this.inputText = "";
        this.outputText = "";
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