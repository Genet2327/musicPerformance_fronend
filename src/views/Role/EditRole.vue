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
          v-model="role.fName"
          id="name"
          :counter="50"
          label="First Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="role.lName"
          id="name"
          :counter="50"
          label="Last Name"
          required
        ></v-text-field>

        <v-select
          v-model="roleId"
          :items="items"
          item-text="Select Role"
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
import RoleServices from "../services/roleServices";

export default {
  name: "edit-role",
  props: ["id"],
  data() {
    return {
      valid: false,
      items: ["Stu", "Admin", "Adv"],
      role: {},
      roleId: null,
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveRole() {
      RoleServices.get(this.id)
        .then((response) => {
          this.role = response.data;
          this.roleId = this.role.role;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateRole() {
      var data = {
        fName: this.role.fName,
        lName: this.role.lName,
        role: this.roleId,
      };
      RoleServices.update(this.id, data)
        .then((response) => {
          this.role.id = response.data.id;
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
    this.retrieveRole();
  },
};
</script>
<style></style>
