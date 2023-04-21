<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="headline">Change Sign Up Details</v-card-title>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-select
            v-model="signUp.accompanistId"
            :items="Accompanist"
            :searchable="true"
            item-text="fName"
            item-value="id"                                                                                                                                                       
            label="Select your Accompanist"
          />
          <v-select
            v-model="signUp.instrumentId"
            :items="Instruments"
            :searchable="true"
            item-text="name"
            item-value="id"
            label="Select Voice part/instrument"
          />
          <v-text-field
          v-model="signUp.durationSession"
          id="durationSession"
          :counter="50"
          label=" duration Session"
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
                        <v-icon small class="mx-4" @click="editSong(item)">
                          mdi-pencil
                        </v-icon>

                        <v-icon
                          small
                          class="mx-4"
                          @click="deleteSong(item)"
                        >
                          mdi-trash-can
                        </v-icon>
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
              <v-btn v-show="editMode" color="primary" @click="saveSong()">
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
import axios from "axios";

//import EventServices from "../../services/Event/services";
export default {
  name: "view-eventSession",
  props: ["id"],
  data() {
    return {
      targetLang: "en",
      sourceLang: "",
      inputText: "",
      outputText: "",
      isChecked: false,
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
      signUpData: {},
      song: {},
      headersong: [
        { text: "Title", value: "title" },
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveInstruments();
    this.retrieveAccompanist();
    this.retrieveComposers();
    this.retrieveSignUP();
    this.retrieveSong();
  },
  methods: {
    getComposerName(composerId) {
      return this.Composers.filter((i) => i.id == composerId)[0].name;
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

    retrieveSignUP() {
      SignUpServices.getById(this.id)
        .then((response) => {
          this.signUp = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "StudentEvent" });
    },
    retrieveSong() {
      SongServices.getAllSignUpIdr(this.id)
        .then((response) => {
          this.songs = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    closeDialog() {
      this.showSong = false;
    },
    save() {
      var data = {
        userId: this.user.userId,
        accompanistId: this.signUp.accompanistId,
        instrumentId: this.signUp.instrumentId,
        durationSession: this.signUp.durationSession,
      };

      // console.log(data);
      SignUpServices.update(this.id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
      this.$router.push({ name: "StudentEvent" });
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
    deleteSong(Song) {
      SongServices.delete(Song.id)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    editSong(item) {
      this.editMode = true;
      this.song = item;
      this.showSong = true;
    },

    saveSong() {
      var data = {
        signUpId: this.id,
        title: this.song.title,
        composerId: this.song.composerId,
        language: this.song.language,
        translationSong: this.song.translationSong,
        lyrics: this.song.lyrics,
      };
      SongServices.update(this.song.id, data)
        .then((response) => {
          this.song.id = response.data.id;
          this.$router.go(this.$router.currentRoute);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    viewSong() {
      this.showSong = true;
      this.editMode = false;
    },
    AddSong() {
      var data = {
        signUpId: this.id,
        title: this.song.title,
        composerId: this.song.composerId,
        language: this.song.language,
        translationSong: this.song.translationSong,
        lyrics: this.song.lyrics,
      };
      console.log(data);
      SongServices.create(data)
        .then((response) => {
          this.$router.go(this.$router.currentRoute);
          console.log("add " + response.data);
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style></style>
