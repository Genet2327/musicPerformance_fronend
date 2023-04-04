<template>
  <v-navigation-drawer
    darek="false"
    color="red darken-4"
    dark
    permanent
    
    v-show="user != null"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          {{ initials }}
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item v-show="role == 'ADMIN'" link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'ComposerList' }" text
            >Composer
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'ADMIN'" link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'InstrumentList' }" text
            >Instrument
          </v-btn></v-list-item-title
        >
      </v-list-item>
      <v-list-item v-show="role == 'STUDENT'" link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'StudentEvent' }" text
            >Sign up
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'ADMIN'" link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-title
          ><v-btn exact :to="{ name: 'RoleList' }" text
            >Users
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'ADMIN'" link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-title
          ><v-btn exact :to="{ name: 'EventSessionList' }" text
            >Event
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'FACULITY'" link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-title>
          <v-btn exact :to="{ name: 'CritiqueList' }" text
            >Critiques
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'STUDENT'" link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'SongList' }" text
            >Piece
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'Accompanist'" link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'Avalablity' }" text
            >Sign up Avalablity
          </v-btn></v-list-item-title
        >
      </v-list-item>

      <v-list-item v-show="role == 'FACULITY'" link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-btn exact :to="{ name: 'Avalablity' }" text
            >Sign up Avalablity
          </v-btn></v-list-item-title
        >
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
import EventSessionServices from "../services/EventSession/services";
export default {
  name: "App",
  data: () => ({
    user: {},
    title: "Music Peformance",
    initials: "",
    EventSessions: [],
    name: "",
    email: "",
    role: "",
    selectedItem: null,
    icon: "mdi-menu-down",
    items: [
      { title: "Click Me", HELO: "HEL" },
      { title: "Click Me", HELO: "HEL" },
      { title: "Click Me", HELO: "HEL" },
      { title: "Click Me 2", HELO: "HEL" },
    ],
  }),
  async created() {
    this.resetMenu();
  },
  async mounted() {
    this.resetMenu();
    this.retrieveEventSessions();
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
        this.email = this.user.email;
        this.role = this.user.role[0];
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
    retrieveEventSessions() {
      EventSessionServices.getAll()
        .then((response) => {
          this.EventSessions = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    navigate(id) {
      // Navigate to a different page based on the selected item's ID
      // For example, using Vue Router:
      this.$router.push({ name: "ViewStudentEvent", params: { id: id } });
    },
  },
};
</script>
