import { useEffect, useMemo, useState } from "react";
import { Router, useRouter } from "next/router";

function useBeforeUnload(shouldPreventLeaving: boolean) {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (shouldPreventLeaving) {
      const routeChangeStart = (e: any) => {
        if (!isConfirmed) {
          const ok = confirm(
            "Unsaved changes will be lost. Are you sure you want to continue?"
          );
          if (!ok) {
            Router.events.emit("routeChangeError");
            window.history.pushState(null, router.asPath, router.asPath);
            throw "Abort route change.";
          }
        } else {
          setIsConfirmed(true);
        }
      };
      Router.events.on("routeChangeStart", routeChangeStart);

      return () => {
        Router.events.off("routeChangeStart", routeChangeStart);
      };
    }
  }, [shouldPreventLeaving, isConfirmed, router.asPath]);
}
export default useBeforeUnload;
