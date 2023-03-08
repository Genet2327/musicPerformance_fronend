<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Critique</v-toolbar-title>

      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />



      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.department" id="name" :counter="50" label="Department" required>
        </v-text-field>
      </v-form>



      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.tone" id="name" :counter="50" label=" Tone" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.acurracy" id="name" :counter="50" label="Accuracy" required>
        </v-text-field>
      </v-form>


      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.technique" id="name" :counter="50" label="Technique" required>
        </v-text-field>
      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.interpretation" id="name" :counter="50" label="Interpretation" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.balanceblend" id="name" :counter="50" label="Balance Blend" required>
        </v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.diction" id="name" :counter="50" label="Diction (vocal)" required>
        </v-text-field>
      </v-form>

      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field v-model="critique.performanc" id="name" :counter="70" label="Performance/ Suggestions" required>
        </v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveCritique()">
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
  
<script>
import CritiqueServices from "../../services/Critique/services";
import Utils from "@/config/utils.js";

export default {
  name: "add-critique",
  data() {
    return {
      valid: false,
      user: {},
      critique: {
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

    saveCritique() {
      var data = {
        department: this.critique.department,
        tone: this.critique.tone,
        acurracy: this.critique.acurracy,
        technique: this.critique.technique,
        interpretation: this.critique.interpretation,
        balanceblend: this.critique.balanceblend,
        diction: this.critique.diction,
        performanc: this.critique.performanc,
        userId: this.user.userId,
      };

      console.log(data);
      CritiqueServices.create(data)
        .then((response) => {
          this.critique.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "CritiqueList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add");

      this.$router.push({ name: "CritiqueList" });
    },


  },
};
</script>
<style></style>
  