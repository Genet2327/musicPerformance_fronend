<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title></v-toolbar-title>
          <!-- <v-spacer></v-spacer>
              <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br />
        <h4>{{ message }}</h4>
        <br />
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field
            v-model="user.fName"
            id="fName"
            :counter="50"
            label="First Name"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="user.lName"
            id="lName"
            :counter="50"
            label="Last Name"
            required
          >
          </v-text-field>
          
          <v-text-field
            v-model="user.email"
            id="email"
            :counter="50"
            label=" Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="user.major"
            id="major"
            :counter="50"
            label=" Major"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="user.semesters"
            id="semesters"
            :counter="50"
            label=" Semesters"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="user.classification"
            id="classification"
            :counter="50"
            label=" Classification"
            required
          >
          </v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="updateuser()"
          >
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
 import userServices from "../../services/User/services";
  import Utils from "@/config/utils.js";
  export default {
    
    props: ["id"],
    data() {
      return {
        user: {},
        valid: false,
        instrument: {},
        message: "Enter data and click save",
      };
    },
    methods: {
     
  
      updateuser() {
        var data = {
          fName: this.user.fName,
          lName:this.user.lName,
          email:this.user.email,
          major:this.user.major,
          
          semesters:this.user.semesters,
          classification:this.user.classification,
          
        };
        userServices.update(this.user.userId, data)
          .then((response) => {
            this.instrument.id = response.data.id;
            
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
      
     
    this.user = Utils.getStore("user");
   
  
    },
  };
  </script>
  <style></style>
  