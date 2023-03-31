<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Missing information</v-toolbar-title>
        </v-toolbar>
        <br /><br />
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p>If you need help finding this information, Chatgpt is a place you can go and search for it</p>
          </v-col>
        </v-row>
        <form>
          <v-row justify="center">
            <v-col cols="4" class="text-center">
              <v-btn color="primary" @click="showTextField1 = true; showFields = false; showTextField2 = false">Accompanist</v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" @click="showTextField1 = false; showFields = true; showTextField2 = false">Composer</v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" @click="showTextField1 = false; showFields = false; showTextField2 = true">Voice/Instrument</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="showTextField1" justify="center">
            <v-col cols="12" class="text-center">
              <v-text-field label="First Name of Accompanist" outlined></v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-text-field label="Last Name of Accompanist" outlined></v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn color="primary">Submit</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="showFields" justify="center">
            <v-col v-for="(field, index) in fields" :key="index" cols="12" class="text-center">
              <v-text-field :label="field.label" outlined></v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn color="primary">Submit</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="showTextField2" justify="center">
            <v-col cols="12" class="text-center">
              <v-text-field label="Name of Voice Part or Instrument" outlined></v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn color="primary">Submit</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showTextField1: false,
        showTextField2: false,
        showFields: false,
        fields: [
          { label:'First Name of Composer' },
          { label: 'Last Name of Composer' },
          { label: 'Birthdate of Composer' },
          { label: 'Date of Composers death ' },
          { label: 'Nationality of Composer' },
        ],
      };
    },
  };
  </script>
  