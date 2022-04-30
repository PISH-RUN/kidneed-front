import { assign } from "xstate";
import { Api, strapi } from "@kidneed/services";
import {
  AddChildEvent,
  BootstrapDone,
  ChildrenFetchDone, DeleteChildEvent, EditChildEvent, EditUserEvent,
  FetchUserEvent,
  LoggedInContext,
  PartialAppContext,
  SelectChildEvent
} from "./app-machine-types";

export async function bootstrap() {
  const user = await Api.me();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return { user };
}

export async function fetchChildren(ctx: PartialAppContext) {
  const { user } = ctx as LoggedInContext;
  const children = await Api.children(user);
  return { children };
}

export const bootstrapDone = assign(
  (_: PartialAppContext, event: BootstrapDone) => ({
    user: event.data.user
  })
);

export const fetchUser = assign(
  (_: PartialAppContext, event: FetchUserEvent) => ({
    user: event.user
  })
);

export const editUser = assign(
  (_: PartialAppContext, event: EditUserEvent) => ({
    user: event.user
  })
);

export const childrenFetched = assign(
  (_: PartialAppContext, event: ChildrenFetchDone) => ({
    children: event.data.children
  })
);

export const childSelected = assign(
  (_: PartialAppContext, event: SelectChildEvent) => ({
    child: event.child
  })
);

export const childAdded = assign(
  (ctx: PartialAppContext, event: AddChildEvent) => ({
    children: [event.child, ...(ctx.children || [])],
    child: event.child
  })
);

export const childEdited = assign(
  (ctx: PartialAppContext, event: EditChildEvent) => {
    return {
      children: [...(ctx.children?.filter(c => c.id !== event.child.id) || []), event.child],
      child: event.child
    }
  }
);

export const childDeleted = assign(
  (ctx: PartialAppContext, event: DeleteChildEvent) => ({
    children: ctx.children?.filter(c => c.id !== event.child),
    child: event.child === ctx?.child?.id ? ctx.children?.filter(c => c.id !== event.child)[0] : ctx.child
  })
);

export const logout = () => {
  strapi.logout();
};
