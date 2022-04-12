import { MachineContext, Models, OnlyMachineContext } from "@kidneed/types";
import { DoneInvokeEvent } from "xstate";

export type AppContext = {
  user: Models.User;
  child: Models.Child;
  children: Array<Models.Child>;
};

export type PartialAppContext = MachineContext<AppContext>;

export type LoggedInContext = OnlyMachineContext<AppContext, "user">;

export type BootstrapDone = DoneInvokeEvent<{
  user: Models.User;
}>;

export type ChildrenFetchDone = DoneInvokeEvent<{
  children: Array<Models.Child>;
}>;

export type LoggedInEvent = {
  type: "LOGGED_IN";
  user: Models.User;
};

export type SelectChildEvent = {
  type: "SELECT_CHILD";
  child: Models.Child;
};

export type AddChildEvent = {
  type: "ADD_CHILD";
  child: Models.Child;
};

export type EditChildEvent = {
  type: "EDIT_CHILD";
  child: Models.Child;
};

export type FetchUserEvent = {
  type: "FETCH_USER";
  user: Models.User;
};

export type ParentPassEvent = {
  type: "PARENT_PASS";
  child: Models.Child;
};

export type RetryEvent = {
  type: "RETRY";
};

export type LoggedOutEvent = {
  type: "LOGGED_OUT";
};

export type AppEvent =
  | LoggedInEvent
  | SelectChildEvent
  | AddChildEvent
  | EditChildEvent
  | FetchUserEvent
  | ParentPassEvent
  | RetryEvent
  | LoggedOutEvent;

export type AppState =
  | {
      value: "init";
      context: OnlyMachineContext<AppContext>;
    }
  | { value: "guest"; context: PartialAppContext }
  | { value: "loggedIn"; context: LoggedInContext }
  | {
      value: { loggedIn: "init" };
      context: LoggedInContext;
    }
  | {
      value: { loggedIn: "error" };
      context: LoggedInContext;
    }
  | {
      value: { loggedIn: "register" };
      context: LoggedInContext;
    }
  | {
      value: { loggedIn: "children" };
      context: OnlyMachineContext<AppContext, "user" | "children">;
    }
  | {
      value: { loggedIn: "parent" };
      context: OnlyMachineContext<AppContext, "user" | "children">;
    }
  | {
      value: { loggedIn: "child" };
      context: AppContext;
    };
