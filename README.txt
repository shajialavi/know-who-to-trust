KNOW WHO TO TRUST - landing page: how to publish and edit (all free)

PUBLISH
  Drag this whole folder onto https://app.netlify.com/drop  -> you get a free link.

EDIT ANYTHING (no coding)
  Open  yourlink/#edit
  - Click any text and type. Click any photo to replace it. "+ Copy" / "Delete" on cards, FAQs, bullets.
  - "Settings" -> paste the new WhatsApp group link for each new workshop.
  - Click "Save changes": it downloads content.js. Put that file in the folder (replace the old one)
    and drag the folder to Netlify Drop again. (Or simply replace the files in img/ using the same names.)

WHATSAPP LINK
  Stored in content.js (whatsapp: "..."). All "Join" and "Reserve" buttons use it.

PERSONALITY TEST QUESTIONS (100 selected: 34 Know Who To Trust, 33 Ups and Downs, 33 Work)
  Edit questions.js. Each line: ["area","trait","Question text","y"]
  area = trust | updown | work ; trait = one of the 12 personality areas ; last item = healthy answer (y or n).

EMAIL THE RESULTS (participant + coach) - free, 10 minutes
  1. Create a free account at emailjs.com, connect Shaji's Gmail (Email Services -> Add service).
  2. Email Templates -> New template. Set  To email = {{to_email}} , Subject = {{subject}} , Content = {{{message_html}}} .
  3. Copy Service ID, Template ID and Public Key into content.js (or edit mode -> Settings), and set coachEmail.
  EmailJS is used ONLY to send each test result (to the participant and to shaji.alavi@gmail.com). Free plan: about 200 emails/month (each test = 2 emails).
