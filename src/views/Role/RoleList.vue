<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Role!</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>
          Roles

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="roles"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDRoleForUser(item)">
                  mdi-pencil
                </v-icon> -->

              <v-icon
                v-show="user.role == 'Admin'"
                small
                class="mx-4"
                @click="editRole(item)"
              >
                mdi-pencil
              </v-icon>
              <!-- <v-icon small class="mx-4" @click="viewRole(item)">
                mdi-format-list-bulleted-type
              </v-icon> -->
              <!-- <v-icon small class="mx-4" @click="deleteRole(item)">
                mdi-trash-can
              </v-icon> -->
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import RoleServices from "../services/roleServices";

import Utils from "@/config/utils.js";

export default {
  name: "roles-list",
  data() {
    return {
      search: "",
      roles: [],
      currentRole: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit Roles",
      headers: [
        { text: "First Name", value: "fName" },
        { text: "Last Name", value: "lName" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveRoles();
  },
  methods: {
    editRole(role) {
      this.$router.push({ name: "EditRole", params: { id: role.id } });
    },
    viewRole(role) {
      this.$router.push({ name: "viewRole", params: { id: role.id } });
    },

    deleteRole(role) {
      RoleServices.delete(role.id)
        .then(() => {
          this.retrieveRoles();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveRoles() {
      RoleServices.getAll()
        .then((response) => {
          this.roles = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveRoles();
      this.currentRole = null;
      this.currentIndex = -1;
    },
    setActiveRole(role, index) {
      this.currentRole = role;
      this.currentIndex = role ? index : -1;
    },
    removeAllRoles() {
      RoleServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
