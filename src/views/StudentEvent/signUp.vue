<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="headline">Sign UP</v-card-title>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-select
            v-model="signUpData.accompanistId"
            :items="Accompanist"
            :searchable="true"
            item-text="fName"
            item-value="id"
            label="Select your Accompanist"
          />
          <v-select
            v-model="signUpData.instrumentId"
            :items="Instruments"
            :searchable="true"
            item-text="name"
            item-value="id"
            label="Select Voice part/instrument"
          />
          <v-text-field
            v-model="signUpData.durationSession"
            id="durationSession"
            :counter="50"
            label="Duration Session"
            required
          >
          </v-text-field>
          <v-container>
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-data-table :headers="headersong" :items="songs">
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{ item.title }}</td>
                      <td>
                        {{ getComposerName(item.composerId) }}
                      </td>
                      <td>
                        <v-btn @click="editSong(item)"> Edit </v-btn>
                        <v-btn @click="deleteSong(item)">Delete</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
              <v-btn v-show="!showSong" @click="viewSong()">ADD Piece</v-btn>
            </v-card>
          </v-container>
          <div v-show="showSong">
            <v-card-title>
              {{ editMode ? "Edit Song" : "Add Piece" }}
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
            <div>
              <div>
                <label>
                  If the text is in a Foreign Language Check
                  <input type="checkbox" v-model="isChecked" />
                </label>
                <br>
                <label>
                  If your Composer or other information does not appear, submit that information to the music office by clicking <a href="#" @click.prevent="openDialog()">here</a> 
                 
                </label>

                <br />
                <v-form
                  v-if="isChecked"
                  ref="form"
                  v-model="valid"
                  lazy
                  validation
                >
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
                    <v-btn class="mr-4" color="success" @click="translate"
                      >Translate</v-btn
                    >
                    <v-btn class="mr-4" color="error" @click="clear"
                      >Clear</v-btn
                    >
                  </div>
                </v-form>
              </div>
            </div>
            <v-card-actions>
              <v-btn v-show="editMode" color="primary" @click="saveSong(song)">
                Save
              </v-btn>
              <v-btn v-show="!editMode" color="primary" @click="AddSong()">
                Add
              </v-btn>
              <v-btn color="secondary" @click="closeDialog"> Cancel </v-btn>
            </v-card-actions>
          </div>

          <div class="d-flex justify-center">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 text-center"
              @click="save()"
            >
              Submit
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 text-center"
              @click="cancel()"
            >
              Cancel
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-container>

    <v-col cols="12" class="text-center"> </v-col>
  </div>
</template>

<script>
import RoleServices from "../../services/Role/services";
import Utils from "@/config/utils.js";
import ComposerServices from "../../services/Composer/services";
import InstrumentServices from "../../services/Instrument/services";
import SignUpServices from "../../services/SignUp/services";
import SongServices from "../../services/Song/services";
import EventServices from "../../services/Event/services";
import EventSessionServices from "../../services/EventSession/services";
import axios from "axios";
export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      eventSession: {},
      targetLang: "en",
      sourceLang: "",
      inputText: "",
      outputText: "",
      isChecked: false,
      Event: {},
      songNew: [],
      Composers: [],
      showSong: false,
      itemsSongs: [],
      editMode: false,
      user: {},
      songs: [],
      signUp: {},
      Accompanist: [],
      Instruments: [],
      valid: false,
      signUpData: {
        id: null,
        userId: "",
        eventId: "",
        intrumentId: "",
        accompanistId: "",
      },
      song: {},
      headersong: [
        { text: "Title", value: "title" },
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      message: "Enter data and click save",
    };
  },
  computed: {
    // createSignUp() {
    // //   var data = {
    // //     userId: this.user.userId,
    // //     accompanistId: this.signUpData.accompanistId,
    // //     instrumentId: this.signUpData.instrumentId,
    // //     durationSession: this.signUpData.durationSession,
    // //   };
    // //   console.log(data);
    // //  SignUpServices.create(data)
    // //     .then((response) => {
    // //       this.signUp = response.data;
    // //       console.log(response.data);
    // //     })
    // //     .catch((e) => {
    // //       console.log("add Eroro" + e.response.data.message);
    // //       this.message = e.response.data.message;
    // //     });
    //   return this.signUp;
    // },
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveInstruments();
    this.retrieveAccompanist();
    this.retrieveComposers();
    this.retrieveEventSession();
  },
  methods: {
    openDialog(){
      this.$router.push({ name: "missItem" });
    },
    retrieveEventSession() {
      EventSessionServices.get(this.id)
        .then((response) => {
          this.eventSession = response.data;
         
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    deleteSong(item) {
      const index = this.songs.indexOf(item);
      this.songs.splice(index, 1);
    },
    editSong(item) {
      this.editMode = true;
      this.song = item;
      this.showSong = true;
    },
    getComposerName(composerId) {
      return this.Composers.filter((i) => i.id == composerId)[0].name;
    },
    saveSong(song) {
      const objIndex = this.songs.findIndex((i) => i.id == song.id);
      this.songs[objIndex].title = song.title;
      this.songs[objIndex].composerId = song.composerId;
      this.songs[objIndex].language = this.sourceLang;
      this.songs[objIndex].translationSong = this.outputText;
      this.songs[objIndex].lyrics = this.inputText;
      this.editMode = false;
      this.song = {};
      this.showSong = false;
    },
    AddSong() {
      this.editMode = false;
      this.songs.push({
        id: this.songs.length + 1,
        title: this.song.title,
        composerId: this.song.composerId,
        language: this.sourceLang,
        translationSong: this.outputText,
        lyrics: this.inputText,
      });
      this.song = {};
      this.showSong = false;
    },
    closeDialog() {
      this.showSong = false;
    },
    viewSong() {
      this.showSong = true;
      this.editMode = false;
    },
    retrieveInstruments() {
      InstrumentServices.getAll()
        .then((response) => {
          this.Instruments = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
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
    retrieveAccompanist() {
      RoleServices.getAllAccompanist()
        .then((response) => {
          this.Accompanist = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "ViewStudentEvent" });
    },
    clear() {
      this.inputText = "";
      this.outputText = "";
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
    async save() {
      var data = {
        userId: this.user.userId,
        accompanistId: this.signUpData.accompanistId,
        instrumentId: this.signUpData.instrumentId,
        durationSession: this.signUpData.durationSession,
      };

      console.log(data);

      await SignUpServices.create(data)
        .then((response) => {
          this.signUp = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });

      var dataEvent = {
        signUpId: this.signUp.id,
      };

      await EventServices.update(this.id, dataEvent)
        .then((response) => {
          this.Event = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });

      for (let index = 0; index < this.songs.length; index++) {
        const song = this.songs[index];
        var dataSong = {
          title: song.title,
          composerId: song.composerId,
          signUpId: this.signUp.id,
          language: song.language,
          translationSong: song.translationSong,
          lyrics: song.lyrics,
        };
        await SongServices.create(dataSong)
          .then((response) => {
            this.songNew = response.data;
          })
          .catch((e) => {
            console.log("add Eroro" + e.response.data.message);
            this.message = e.response.data.message;
          });
      }
      this.$router.push({ name: "ViewStudentEvent" });
    },
  },
};
</script>
<style></style>
