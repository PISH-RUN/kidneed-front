import { useSelector } from "@xstate/react";
import { Api } from "@kidneed/services";
import { AppContext } from "@kidneed/context";
import { Models } from "@kidneed/types";
import { useCallback, useContext } from "react";

export default function useApp() {
  const { appService } = useContext(AppContext);

  const { send } = appService;

  const ctx = useSelector(appService, (state) => {
    return state.context;
  });

  const login = useCallback(
    (user: Models.User) => send("LOGGED_IN", { user }),
    [send]
  );

  const passParent = useCallback(
    (user: Models.User) => send("LOGGED_IN", { user }),
    [send]
  );

  const logout = useCallback(() => send("LOGGED_OUT"), [send]);

  const selectChild = useCallback(
    (child: Models.Child) => send("SELECT_CHILD", { child }),
    [send]
  );

  const addChild = useCallback(
    (child: Models.Child) => send("ADD_CHILD", { child }),
    [send]
  );

  const fetchUser = useCallback(
    async () => {
      const user = await Api.me();
      send("FETCH_USER", { user });
    },
    [send]
  );

  return {
    ctx,
    login,
    logout,
    passParent,
    selectChild,
    addChild,
    fetchUser
  };
}
