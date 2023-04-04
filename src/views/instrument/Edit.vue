<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Instrument Edit</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="instrument.name"
            id="firstName"
            :counter="50"
            label="First Name"
            required
          >
          </v-text-field>
          
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="updateInstrument ()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
  
  import InstrumentServices from "../../services/Instrument/services";
  
  export default {
    name: "edit-instrument ",
    props: ["id"],
    data() {
      return {
        valid: false,
        instrument : {},
        message: "Enter data and click save",
      };
    },
    methods: {
      retrieveInstrument () {
        InstrumentServices.get(this.id)
          .then((response) => {
            this.instrument  = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
  
      updateInstrument () {
        var data = {
          name: this.instrument .name,
          
        };
        InstrumentServices.update(this.id, data)
          .then((response) => {
            this.instrument .id = response.data.id;
            this.$router.push({ name: "InstrumentList" });
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.push({ name: "Instrument List" });
      },
    },
    mounted() {
      this.retrieveInstrument ();
    },
  };
  </script>
  <style></style>
  