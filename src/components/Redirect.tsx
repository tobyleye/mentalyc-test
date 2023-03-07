import { useRouter } from "next/router";
import { useEffect } from "react";

export function Redirect({
  to,
  replace = false,
}: {
  to: any;
  replace?: boolean;
}) {
  let router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);

  return null;
}
