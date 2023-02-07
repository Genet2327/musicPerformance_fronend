<template>
  
  <v-navigation-drawer darek="false" color="red darken-4"
    permanent
    expand-on-hover
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
         {{initials}}
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
           {{name}}
          </v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>  <v-btn   exact :to="{ name: 'ComposerList' }" text>Composer </v-btn></v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>  <v-btn   exact :to="{ name: 'InstrumentList' }" text>Instrument </v-btn></v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title><v-btn   exact :to="{ name: 'RoleList' }" text>Roles </v-btn></v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon @click="logout()">logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sign Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
<script>
import Utils from "@/config/utils.js";
import AuthServices from "@/services/authServices";

export default {
name: "App",
data: () => ({
  user: {},
  title: "Music Peformance",
  initials: "",
  name: "",
  email:"",
}),
async created() {
  this.resetMenu();
},
async mounted() {
  this.resetMenu();
},
computed: {
  // _link() {
  //     return "/" + this.selectedRoles.toLowerCase() + "Home/" + this.currentPersonRoleID;
  // }
},
methods: {
  resetMenu() {
    this.user = null;
    // ensures that their name gets set properly from store
    this.user = Utils.getStore("user");
    if (this.user != null) {
      this.initials = this.user.fName[0] + this.user.lName[0];
      this.name = this.user.fName + " " + this.user.lName;
      this.email=this.user.email
    }
  },
  logout() {
    AuthServices.logoutUser(this.user)
      .then((response) => {
        console.log(response);
        Utils.removeItem("user");
        this.$router.push({ name: "login" });
        this.$router.go();
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
},
};
</script>

