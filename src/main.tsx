
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Google Analytics
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-H31M3QDB7D';
  document.head.appendChild(gaScript);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', 'G-H31M3QDB7D');

  // Meta Pixel
  (function(f: any, b: any, e: any, v: any) {
    if (f.fbq) return;
    const n: any = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const t: any = b.createElement(e); t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  (window as any).fbq('init', '1006075938837803');
  (window as any).fbq('track', 'PageView');

  createRoot(document.getElementById("root")!).render(<App />);
  