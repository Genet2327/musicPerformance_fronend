<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Recital Hearing Sign Up</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      
      <form>
        
        
    
        <!-- Select Hearing Date -->
    
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Select a hearing date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu = false">OK</v-btn>
          </v-date-picker>
        </v-menu>
  
        <!-- Select Hearing Time -->
  
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Select a hearing time"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu = false">OK</v-btn>
          </v-date-picker>
        </v-menu>
  
        <!-- Add an accompanist to the performance -->
        <v-row>
          <v-col>
            <v-select
              :disabled="noAccompanist"
              v-model="selectedAccompanist"
              :items="accompanists"
              item-text="fullName"
              item-value="id"
              label="Accompanist"
            ></v-select>
          </v-col>
        </v-row>
  
        <!-- Add an Private Instructor to the performance -->
        <v-row>
          <v-col>
            <v-select
              :disabled="noPrivateInstructor"
              v-model="selectedPrivateInstructor"
              :items="PrivateInstructor"
              item-text="fullName"
              item-value="id"
              label="Private Instructor"
            ></v-select>
          </v-col>
        </v-row>
  
        <!-- Select the instrument -->
        <v-row>
          <v-select
            label="Select Voice or Instrument"
            v-model="selectedInstrumentId"
            :items="instruments"
            item-text="instrument"
            item-value="id"
          ></v-select>
        </v-row>
  
        <div>
    <p>If there is any missing information associated with your composer, accompanist or other important informataion please sumbit the infomation by clicking  <a href="https://www.example.com">here</a></p>
  </div>

        <v-text-field
          v-model="SelectionTitle"
          :error-messages="SelectionTitle"
          :counter="150"
          label="Selection Title"
          required
          @input="$v.SelectionTitle.$touch()"
          @blur="$v.SelectionTitle.$touch()"
        ></v-text-field>


        <v-row>
          <v-col>
            <v-select
              :disabled="noComposer"
              v-model="selectedComposer"
              :items="Composer"
              item-text="fullName"
              item-value="id"
              label="Composer"
            ></v-select>
          </v-col>
        </v-row>

        <div>
          <div>
    <label>
      <input type="checkbox" v-model="isChecked">
      If the text is in a Foreign Language Check
    </label>
    <br>
    <textarea v-if="isChecked" v-model="foreignText" placeholder="Enter foreign text here" 
    style="width: 1750px; height: 200px;"></textarea>
  </div>
        </div>

        <div>
          <button @click="saveData">Submit</button>
        </div>
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      foreignText: ''
    }
  }
}
</script>