import { loadScript } from "../lib/scriptRegistry";
import { mountWidget } from "../lib/widgetEngine";

const SCRIPT_URL =
  "https://secure.netbookings.com.au/widgets/accom/dist/index.js";

type Options = {
  businessId: string;
  db?: string;
  server?: string;
  currencyCode?: string;
  ga4?: string;
};

export async function mountNetBookings(
  container: HTMLElement,
  options: Options
) {
  await loadScript(SCRIPT_URL);

  return mountWidget({
    container,
    render: () => {
      const el = document.createElement("span");

      el.id = "nbaccom";
      el.setAttribute(
        "data-server",
        options.server ?? "https://secure.netbookings.com.au"
      );
      el.setAttribute("data-db", options.db ?? "tourism");
      el.setAttribute("data-business", options.businessId);
      el.setAttribute("data-ga4", options.ga4 ?? "");
      el.setAttribute("data-currency_code", options.currencyCode ?? "AUD");

      container.appendChild(el);

      // trigger widget scan safely (some widgets require DOM mutation tick)
      queueMicrotask(() => {
        window.dispatchEvent(new Event("resize"));
      });
    },
  });
}
