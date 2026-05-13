import { useEffect, useRef, useState } from "react";
import { mountNetBookings } from "../widgets/netbookings";

type Props = {
  businessId: string;
};

export function useNetBookings({ businessId }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!ref.current) return;

    let cleanup: (() => void) | undefined;

    mountNetBookings(ref.current, { businessId })
      .then((c) => {
        cleanup = c;
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });

    return () => {
      cleanup?.();
    };
  }, [businessId]);

  return { ref, status };
}
