import { useEffect, useRef } from "react";

declare global {
  interface Window {
    nbaccom?: any;
  }
}

export function NetBookingsWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // prevent duplicate script injection
    const existingScript = document.querySelector(
      'script[data-netbookings="true"]'
    );

    const renderWidget = () => {
      if (!containerRef.current) return;

      // clear old renders
      containerRef.current.innerHTML = "";

      // create target element
      const widget = document.createElement("span");

      widget.id = "nbaccom";

      widget.setAttribute(
        "data-server",
        "https://secure.netbookings.com.au"
      );

      widget.setAttribute("data-db", "tourism");

      widget.setAttribute("data-business", "1451");

      widget.setAttribute("data-ga4", "");

      widget.setAttribute("data-currency_code", "AUD");

      containerRef.current.appendChild(widget);

      // trigger widget init if available
      setTimeout(() => {
        try {
          if (window.nbaccom?.init) {
            window.nbaccom.init();
          }
        } catch (err) {
          console.error("NetBookings init failed", err);
        }
      }, 300);
    };

    if (!existingScript) {
      const script = document.createElement("script");

      script.src =
        "https://secure.netbookings.com.au/widgets/accom/dist/index.js";

      script.async = true;

      script.setAttribute("data-netbookings", "true");

      script.onload = () => {
        renderWidget();
      };

      script.onerror = () => {
        console.error("Failed to load NetBookings script");
      };

      document.body.appendChild(script);
    } else {
      renderWidget();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[400px] w-full"
    />
  );
}
