import {
  AppEvent,
  AppState,
  ChildrenFetchDone,
  LoggedInEvent,
  PartialAppContext,
} from "./app-machine-types";
import { assign, createMachine } from "xstate";
import {
  bootstrap,
  bootstrapDone,
  childAdded, childEdited,
  childrenFetched,
  childSelected,
  fetchChildren, fetchUser,
  logout
} from "./app-machine-actions";

export const appMachine = createMachine<PartialAppContext, AppEvent, AppState>({
  id: "app-machine",
  initial: "init",
  states: {
    init: {
      invoke: {
        id: "user-bootstrap",
        src: bootstrap,
        onDone: {
          target: "loggedIn",
          actions: bootstrapDone,
        },
        onError: {
          target: "guest",
        },
      },
    },
    guest: {
      on: {
        LOGGED_IN: {
          target: "loggedIn",
          actions: assign((_, event: LoggedInEvent) => {
            return {
              user: event.user,
            };
          }),
        },
      },
    },
    loggedIn: {
      initial: "init",
      states: {
        init: {
          invoke: {
            id: "on-logged-in",
            src: fetchChildren,
            onDone: [
              {
                target: "children",
                actions: childrenFetched,
                cond: (_, event: ChildrenFetchDone) =>
                  event.data.children.length > 0,
              },
              {
                target: "register",
                actions: childrenFetched,
              },
            ],
            onError: {
              target: "error",
            },
          },
        },
        children: {
          on: {
            SELECT_CHILD: {
              target: "child",
              actions: childSelected,
            },
          },
        },
        parent: {},
        child: {
          on: {
            SELECT_CHILD: {
              target: "child",
              actions: childSelected,
            },
          },
        },
        register: {},
        error: {
          on: {
            RETRY: "init",
          },
        },
      },
      on: {
        LOGGED_OUT: { target: "guest", actions: logout },
        ADD_CHILD: { target: ".child", actions: childAdded },
        EDIT_CHILD: { target: ".parent", actions: childEdited },
        FETCH_USER: { target: ".parent", actions: fetchUser },
        PARENT_PASS: { target: ".parent" },
      },
    },
  },
});
