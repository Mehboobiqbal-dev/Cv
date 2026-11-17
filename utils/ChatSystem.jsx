import { useEffect } from "react";

// Tawk.to live chat. Loads only when NEXT_PUBLIC_TAWK_TO_API_KEY is set (e.g. "propertyId/widgetId"
// in Vercel's environment variables). Without it the old code requested embed.tawk.to/undefined and
// filled the browser console with CORS errors that any reviewing developer would see.
const TAWK_KEY = process.env.NEXT_PUBLIC_TAWK_TO_API_KEY;

const ChatSystem = () => {
  useEffect(() => {
    if (!TAWK_KEY || document.getElementById("tawk-script")) return;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.customStyle = { zIndex: 2 };
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_KEY}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
};

export default ChatSystem;
