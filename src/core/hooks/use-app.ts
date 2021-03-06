import { useSelector } from "@xstate/react";
import { Api } from "@kidneed/services";
import { AppContext } from "@kidneed/context";
import { Models } from "@kidneed/types";
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export default function useApp() {
  const { appService } = useContext(AppContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { send } = appService;

  const ctx = useSelector(appService, (state) => {
    return state.context;
  });

  const login = useCallback(
    (user: Models.User) => send("LOGGED_IN", { user }),
    [send]
  );

  const editUser = useCallback(
    (user: Models.User) => send("EDIT_USER", { user }),
    [send]
  );

  const passParent = useCallback(
    (user: Models.User) => send("LOGGED_IN", { user }),
    [send]
  );

  const logout = useCallback(() => {
    queryClient.invalidateQueries("yekodo");
    queryClient.resetQueries("yekodo");
    queryClient.removeQueries("yekodo");
    queryClient.clear();

    send("LOGGED_OUT");
  }, [send]);

  const selectChild = useCallback(
    (child: Models.Child) => {
      localStorage.setItem("selectedChild", child.id.toString());
      send("SELECT_CHILD", { child });
    },
    [send]
  );

  const addChild = useCallback(
    (child: Models.Child) => send("ADD_CHILD", { child }),
    [send]
  );

  const editChild = useCallback(
    (child: Models.Child) => send("EDIT_CHILD", { child }),
    [send]
  );

  const deleteChild = useCallback(
    (child: number) => send("DELETE_CHILD", { child }),
    [send]
  );

  const fetchUser = useCallback(
    async () => {
      const user = await Api.me();
      send("FETCH_USER", { user });
    },
    [send]
  );

  useEffect(() => {
    if (!ctx.child && ctx.children) {
      const selectedChild = localStorage.getItem("selectedChild");
      if (selectedChild) {
        const child = ctx.children?.find(c => c.id === parseInt(selectedChild));
        child && selectChild(child);
      } else {
        selectChild(ctx.children[0]);
      }
    }
    if (ctx.user?.subscribedUntil === null) {
      router.push("/subscription");
    } else if (!ctx.child && ctx.children && ctx.children.length === 0) {
      router.push("/add-child");
    }
  }, [ctx]);

  return {
    ctx,
    login,
    logout,
    passParent,
    selectChild,
    addChild,
    editChild,
    deleteChild,
    fetchUser,
    editUser
  };
}
