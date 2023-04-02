<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Pass or Fail</v-toolbar-title>
        </v-toolbar>
        <br /><br />
  
        <form>
        
        <!-- Select Hearing Date -->
    
        <v-menu
          v-model="menu1"
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
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu1 = false">OK</v-btn>
          </v-date-picker>
        </v-menu>
  
        <!-- Select Hearing Time -->
  
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Select a hearing time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-model="time" format="ampm" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="menu2 = false">OK</v-btn>
          </v-time-picker>
        </v-menu>
  
          <!-- Student Selection -->
          <v-row>
            <v-col>
              <v-select
                v-model="selectedStudent"
                :items="students"
                item-text="fullName"
                item-value="id"
                label="Student"
              ></v-select>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col>
              <v-checkbox v-model="pass" label="Pass"></v-checkbox>
              <v-checkbox v-model="fail" label="Fail"></v-checkbox>
            </v-col>
          </v-row>
  
          <v-col cols="12" class="text-center">
              <v-btn color="primary">Submit</v-btn>
            </v-col>
        </form>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menu: false,
        date: '',
        selectedStudent: null,
        pass: false,
        fail: false,
        students: [
          { id: 1, fullName: 'John Doe' },
          { id: 2, fullName: 'Jane Smith' },
          { id: 3, fullName: 'Bob Johnson' }
        ]
      };
    },
  };
</script>