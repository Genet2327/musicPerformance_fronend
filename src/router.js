import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";

import TutorialsList from "./views/TutorialsList.vue";
import EditTutorial from "./views/EditTutorial.vue";
import AddTutorial from "./views/AddTutorial.vue";
import ViewTutorial from "./views/ViewTutorial.vue";
import AddLesson from "./views/AddLesson.vue";
import EditLesson from "./views/EditLesson.vue";

import RoleList from "./views/Role/List";
import EditRole from "./views/Role/Edit.vue";

import ComposerList from "./views/Composer/List";
import EditComposer from "./views/Composer/Edit";
import AddComposer from "./views/Composer/Add";

import InstrumentList from "./views/instrument/List";
import EditInstrument from "./views/instrument/Edit";
import AddInstrument from "./views/instrument/Add";

import Home from "./views/Home/home.vue";
Vue.use(Router);

const router = new Router({
  mode: "hash",
  linkExactActiveClass: "active",
  base:
    //    process.env.NODE_ENV === 'development'? "/" : "/tutorScheduling/", - for AWS
    process.env.NODE_ENV === "development" ? "/" : "/",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/tutorials",
      name: "tutorials",
      component: TutorialsList,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditTutorial,
      props: true,
    },
    {
      path: "/add",
      name: "add",
      component: AddTutorial,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewTutorial,
      props: true,
    },
    {
      path: "/addLesson/:tutorialId",
      name: "addLesson",
      component: AddLesson,
      props: true,
    },
    {
      path: "/editLesson/:tutorialId/:lessonId",
      name: "editLesson",
      component: EditLesson,
      props: true,
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/RoleList",
      name: "RoleList",
      component: RoleList,
    },
   
    {
      path: "/edit-role/:id",
      name: "EditRole",
      component: EditRole,
      props: true,
    },
    {
      path: "/ComposerList",
      name: "ComposerList",
      component: ComposerList,
    },
   
    {
      path: "/edit-Composer/:id",
      name: "EditComposer",
      component: EditComposer,
      props: true,
    },
    {
      path: "/AddComposer",
      name: "AddComposer",
      component: AddComposer,
    },
    {
      path: "/InstrumentList",
      name: "InstrumentList",
      component: InstrumentList,
    },
   
    {
      path: "/edit-Instrument/:id",
      name: "EditInstrument",
      component: EditInstrument,
      props: true,
    },
    {
      path: "/AddInstrument",
      name: "AddInstrument",
      component: AddInstrument,
    },
  ],
});

export default router;
