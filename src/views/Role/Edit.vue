<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Role Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
            <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="user.fName"
          id="name"
          :counter="50"
          label="First Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="user.lName"
          id="name"
          :counter="50"
          label="Last Name"
          required
        ></v-text-field>

        <v-select
          v-model="roleName"
          :items="roles"
          item-text="name"
          filled
          return-object
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateRole()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import RoleServices from "../../services/Role/services";

export default {
  name: "edit-role",
  props: ["id"],
  data() {
    return {
      valid: false,

      user: {},
      roles: [],
      roleName: {},

      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveUser() {
      RoleServices.get(this.id)
        .then((response) => {
          this.user = response.data;
          this.roleName = this.user.roles[0];
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveRoles() {
      RoleServices.getRoles()
        .then((response) => {
          this.roles = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateRole() {
      var data = {
        fName: this.user.fName,
        lName: this.user.lName,
        roles: this.roleName.id,
      };
      RoleServices.update(this.id, data)
        .then((response) => {
          this.user.id = response.data.id;
          this.$router.push({ name: "RoleList" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "RoleList" });
    },
  },
  mounted() {
    this.retrieveUser();
    this.retrieveRoles();
  },
};
</script>
<style></style>
