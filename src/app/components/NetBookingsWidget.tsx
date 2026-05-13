import { useEffect } from "react";

export function NetBookingsWidget() {
  useEffect(() => {
    const existing = document.getElementById("netbookings-script");

    if (!existing) {
      const script = document.createElement("script");
      script.id = "netbookings-script";
      script.src =
        "https://secure.netbookings.com.au/widgets/accom/dist/index.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="nbaccom"
      data-server="https://secure.netbookings.com.au"
      data-db="tourism"
      data-business="1451"
      data-currency_code="AUD"
    />
  );
}
