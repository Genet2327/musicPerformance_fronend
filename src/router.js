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

import CritiqueList from "./views/critique/List";
import EditCritique from "./views/critique/Edit";
import AddCritique from "./views/critique/Add";

import ViewListCritique from "./views/critique/ViewList";
import ViewCritique from "./views/critique/View";

import SongList from "./views/Song/List";
import EditSong from "./views/Song/Edit";
import AddSong from "./views/Song/Add";
//import TranslateSong from"./views/Song/TranslateSong";

import AddEvent from "./views/Event/Add";
import EditEvent from "./views/Event/Edit";

import Avalablity from "./views/Avalability/List";
import ViewAvalablity from "./views/Avalability/view";
import UserAvalablity from "./views/Avalability/Edit";

import Home from "./views/Home/home.vue";

import UserEvent from "./views/UserEvent/List.vue";

import StudentEvent from "./views/StudentEvent/List.vue";
import ViewStudentEvent from "./views/StudentEvent/view";
import signUpEvent from "./views/StudentEvent/signUp";
import EditEventSignUP from "./views/StudentEvent/Edit";
import ChangesignUpEvent from "./views/StudentEvent/change.vue";

import CritiquesStudent from "./views/StudentEvent/critiques.vue";
import ViewCritiques from "./views/StudentEvent/ViewCritiques";

import faculityHome from "./views/Faculty/home";
import Repertoire from "./views/StudentEvent/Repertoire";
import userStudent from "./views/Student/Edit";
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
      path: "/critiques-student/:id",
      name: "CritiquesStudent",
      component: CritiquesStudent,
      props: true,
    },
    {
      path: "/critiques-view/:id",
      name: "ViewCritiques",
      component: ViewCritiques,
      props: true,
    },
    {
      path: "/Repertoire/",
      name: "Repertoire",
      component: Repertoire,
    },
    // {
    //   path: "/TranslateSong",
    //   name: "TranslateSong",
    //   component: TranslateSong,
    // },
    {
      path: "/faculityHome",
      name: "faculityHome",
      component: faculityHome,
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
      path: "/CritiqueList/:id",
      name: "CritiqueList",
      component: CritiqueList,
      props: true,
    },

    {
      path: "/edit-Critique/:id",
      name: "EditCritique",
      component: EditCritique,
      props: true,
    },

    {
      path: "/ViewCritique/:id",
      name: "ViewCritique",
      component: ViewCritique,
      props: true,
    },

    {
      path: "/view-list-critique/:id",
      name: "ViewListCritique",
      component: ViewListCritique,
      props: true,
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
    {
      path: "/userEvent",
      name: "userEvent",
      component: UserEvent,
    },
    {
      path: "/StudentEvent",
      name: "StudentEvent",
      component: StudentEvent,
    },
    {
      path: "/SignUp/:id",
      name: "ViewStudentEvent",
      component: ViewStudentEvent,
      props: true,
    },
    {
      path: "/SignUpAvalability",
      name: "Avalablity",
      component: Avalablity,
    },
    {
      path: "/SignUpAvalability/:id",
      name: "ViewAvalablity",
      component: ViewAvalablity,
      props: true,
    },
    {
      path: "/UserAvalablity/:id",
      name: "UserAvalablity",
      component: UserAvalablity,
      props: true,
    },
    {
      path: "/signUpEvent/:id",
      name: "signUpEvent",
      component: signUpEvent,
      props: true,
    },
    {
      path: "/EditsignUpEvent/:id/",
      name: "EditEventSignUP",
      component: EditEventSignUP,
      props: true,
    },
    {
      path: "/ChangesignUpEvent/:id",
      name: "ChangesignUpEvent",
      component: ChangesignUpEvent,
      props: true,
    },
    {
      path: "/userStudent",
      name: "userStudent",
      component: userStudent,
    },
  ],
});

export default router;
