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
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

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
                                <v-col cols="1">
                                    <v-checkbox
                                        v-model="noAccompanist"
                                        label="None"
                                        hide-details
                                    ></v-checkbox>
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
                                <v-col cols="1">
                                    <v-checkbox
                                        v-model="noAccompanist"
                                        label="None"
                                        hide-details
                                    ></v-checkbox>
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
                              <label>
                                <input type="checkbox" v-model="isChecked">
                                    If the text is in a Foreign Language Check
                              </label>
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
      isChecked: false
    };
  }
}
</script>
