   <template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Piece Edit</v-toolbar-title>
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field v-model="song.name" id="firstName" :counter="50" label="Piece Name" required>
          </v-text-field>
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateSong()">
            Save
          </v-btn>
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
    
  <script>
  import SongServices from "../../services/Song/services";
  export default {
    name: "edit-song ",
    props: ["id"],
    data() {
      return {
        valid: false,
        song: {},
        message: "Enter data and click save",
      };
    },
    methods: {
      retrieveSong() {
        SongServices.get(this.id)
          .then((response) => {
            this.song = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      updateSong() {
        var data = {
          name: this.song.name,
        };
        SongServices.update(this.id, data)
          .then((response) => {
            this.song.id = response.data.id;
            this.$router.push({ name: "SongList" });
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.push({ name: "Song List" });
      },
    },
    mounted() {
      this.retrieveSong();
    },
  };
  </script>
  <style></style>