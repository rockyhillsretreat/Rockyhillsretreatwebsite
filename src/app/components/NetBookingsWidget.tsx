import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "nb-accom-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "data-server"?: string;
        "data-db"?: string;
        "data-business"?: string;
        "data-ga4"?: string;
        "data-currency_code"?: string;
      };
    }
  }
}

export function NetBookingsWidget() {
  const [ready, setReady] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) {
      setReady(true);
      return;
    }

    const existing = document.querySelector(
      'script[data-netbookings]'
    ) as HTMLScriptElement | null;

    if (existing) {
      loadedRef.current = true;
      setReady(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://secure.netbookings.com.au/widgets/accom/dist/index.js";

    script.async = true;

    script.setAttribute("data-netbookings", "true");

    script.onload = () => {
      loadedRef.current = true;

      // give browser time to register custom element
      setTimeout(() => {
        setReady(true);
      }, 100);
    };

    script.onerror = () => {
      console.error("Failed to load NetBookings widget");
    };

    document.body.appendChild(script);
  }, []);

  if (!ready) {
    return (
      <div className="text-bone/60 text-sm italic py-8">
        Loading availability calendar…
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px]">
      <nb-accom-widget
        data-server="https://secure.netbookings.com.au"
        data-db="tourism"
        data-business="1451"
        data-ga4=""
        data-currency_code="AUD"
      />
    </div>
  );
}
