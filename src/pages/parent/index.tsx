import { Guard } from "@kidneed/types";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function Parent() {
  const router = useRouter();

  useEffect(() => {
    router.push("/parent/dashboard");
  }, []);
  return null;
}

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    router.push("/login");
    return false;
  }

  if (ctx.children?.length) {
    return true;
  }

  if (ctx.user?.subscribedUntil === null) {
    router.push("/subscription");
  } else {
    router.push("/add-child");
  }

  return false;
};

Parent.guard = guard;
