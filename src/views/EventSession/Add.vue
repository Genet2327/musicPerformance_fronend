<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>EventSession Add</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
  
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
            <v-text-field
          v-model="eventSession.type"
          id="type"
          :counter="50"
          label=" Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="eventSession.durationSession"
          id="durationSession"
          :counter="50"
          label=" duration Session"
          required
        >
        </v-text-field>
       
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveEventSession()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
 import EventSessionServices from "../../services/EventSession/services";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "add-eventSession",
    data() {
      return {
        valid: false,
        user: {},
        eventSession: {
          id: null,
          type: "",
          durationSession: "",
          
  
         
        },
        message: "Enter data and click save",
      };
      
    },
    mounted() {
      this.user = Utils.getStore("user");
      
    },
    
    methods: {
        
      saveEventSession() {
        var data = {
          type: this.eventSession.type,
        durationSession: this.eventSession.durationSession,
         
        };
  
        console.log(data);
        EventSessionServices.create(data)
          .then((response) => {
            this.eventSession.id = response.data.id;
            console.log("add " + response.data);
            this.$router.push({ name: "EventSessionList" });
          })
          .catch((e) => {
            console.log("add Eroro" + e.response.data.message);
            this.message = e.response.data.message;
          });
      },
      cancel() {
        console.log("add tetstststts");
  
        this.$router.push({ name: "EventSessionList" });
      },
      
    
    },
  };
  </script>
  <style></style>
  