<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Critiques</v-toolbar-title>

      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />



      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.department" id="name" :counter="50" label="Department" required>
        </v-text-field>
      </v-form>



      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.tone" id="name" :counter="50" label=" Tone" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.acurracy" id="name" :counter="50" label="Accuracy" required>
        </v-text-field>
      </v-form>


      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.technique" id="name" :counter="50" label="Technique" required>
        </v-text-field>
      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.interpretation" id="name" :counter="50" label="Interpretation" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.balanceblend" id="name" :counter="50" label="Balance Blend" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.diction" id="name" :counter="50" label="Diction (vocal)" required>
        </v-text-field>
      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="Critiques.performanc" id="name" :counter="70" label="Performance/ Suggestions" required>
        </v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveCritiques()">
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
  
<script>
import CritiquesServices from "../../services/Critiques/services";
import Utils from "@/config/utils.js";

export default {
  name: "add-Critiques",
  data() {
    return {
      valid: false,
      user: {},
      Critiques: {
        id: null,
        department: "",
        tone: "",
        acurracy: "",
        technique: "",
        interpretation: "",
        balanceblend: "",
        diction: "",
        performanc: "",

      },
      message: "Enter data and click save",
    };

  },


  mounted() {
    this.user = Utils.getStore("user");

  },

  methods: {

    saveCritiques() {
      var data = {
        department: this.Critiques.department,
        tone: this.Critiques.tone,
        acurracy: this.Critiques.acurracy,
        technique: this.Critiques.technique,
        interpretation: this.Critiques.interpretation,
        balanceblend: this.Critiques.balanceblend,
        diction: this.Critiques.diction,
        performanc: this.Critiques.performanc,
        userId: this.user.userId,
      };

      console.log(data);
      CritiquesServices.create(data)
        .then((response) => {
          this.Critiques.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "CritiquesList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add");

      this.$router.push({ name: "CritiquesList" });
    },


  },
};
</script>
<style></style>
  