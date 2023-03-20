import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";
import RoleList from "./views/Role/List";
import EditRole from "./views/Role/Edit.vue";

import ComposerList from "./views/Composer/List";
import EditComposer from "./views/Composer/Edit";
import AddComposer from "./views/Composer/Add";

import ViewEventSession from "./views/EventSession/view";
import EditEventSession from "./views/EventSession/Edit";
import AddEventSession from "./views/EventSession/Add";
import EventSessionList from "./views/EventSession/List";

import InstrumentList from "./views/instrument/List";
import EditInstrument from "./views/instrument/Edit";
import AddInstrument from "./views/instrument/Add";

import AddCritique from "./views/critique/Add";

import SongList from "./views/Song/List";
import EditSong from "./views/Song/Edit";
import AddSong from "./views/Song/Add";
//import TranslateSong from"./views/Song/TranslateSong";

import AddEvent from "./views/Event/Add";
import EditEvent from "./views/Event/Edit";

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



    // {
    //   path: "/TranslateSong",
    //   name: "TranslateSong",
    //   component: TranslateSong,
    // },

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


    {
      path: "/SongList",
      name: "SongList",
      component: SongList,
    },

    {
      path: "/edit-Song/:id",
      name: "EditSong",
      component: EditSong,
      props: true,
    },
    {
      path: "/AddSong",
      name: "AddSong",
      component: AddSong,
    },


    {
      path: "/AddCritique",
      name: "AddCritique",
      component: AddCritique,
    },
    {
      path: "/EventSessionList",
      name: "EventSessionList",
      component: EventSessionList,
    },

    {
      path: "/edit-EventSession/:id",
      name: "EditEventSession",
      component: EditEventSession,
      props: true,
    },
    {
      path: "/AddEventSession",
      name: "AddEventSession",
      component: AddEventSession,
    },
    {
      path: "/ViewEventSession/:id",
      name: "ViewEventSession",
      component: ViewEventSession,
      props: true,
    },

    {
      path: "/addEvent/:eventSessionId",
      name: "AddEvent",
      component: AddEvent,
      props: true,
    },
    {
      path: "/editEvent/:eventSessionId/:eventId",
      name: "EditEvent",
      component: EditEvent,
      props: true,
    },
  ],
});

export default router;
