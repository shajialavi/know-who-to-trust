/* ===================================================================
   SITE SETTINGS  (the only file you replace after editing the site)
   -------------------------------------------------------------------
   1. WHATSAPP LINK: change it here for every new workshop, OR open the
      site with  yourlink/#edit  , click "Settings", paste the new link,
      then click "Save changes" and upload the downloaded content.js.
   2. Everything else on the page can be edited visually at  /#edit
   =================================================================== */
window.SITE_CONFIG = {
  whatsapp: "https://chat.whatsapp.com/IAlK8vaXooG1hFl1JZCLd4", // current workshop community. Every "Join" and "Reserve" button uses this.
  coachEmail: "shaji.alavi@gmail.com", // Shaji's email: receives a copy of every test result
  emailjsService: "service_4wzexkn",   // EmailJS Service ID   (free account at emailjs.com, see README)
  emailjsTemplate: "template_5k9uxkq",  // EmailJS Template ID
  emailjsKey: "xFmjENwiAjxVC-en9",       // EmailJS Public Key
  leadWebhook: "",      // optional: Google Sheet (Apps Script) URL that stores every test result
  pixelId: ""           // optional: Meta Pixel ID
};

/* Filled automatically when you click "Save changes" in edit mode. Leave as null otherwise. */
window.SITE_HTML = null;
