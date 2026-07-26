/**
 * Site content — DRAFT.
 *
 * Every fact below was transcribed from SSC's own printed/social marketing
 * material found in the photo batch (banners, admission posters, brochures).
 * Anything the source material did not state is marked TODO and must be
 * supplied by SSC before launch. Nothing here is invented.
 */

export const site = {
  name: "Study Skills Center",
  shortName: "SSC",
  tagline: "Learning Through Experience",
  // Source: SSC banner + admission posters
  address: {
    line1: "P-9, LGF, P-Block",
    line2: "Malviya Nagar (near the Post Office)",
    city: "New Delhi",
    pin: "110017",
    full: "P-9, LGF, P-Block, Malviya Nagar, New Delhi – 110017",
  },
  phones: ["8800688555", "011-49401934", "9899299900"],
  primaryPhone: "8800688555",
  whatsapp: "918800688555",
  email: "sscdelhi17@gmail.com",
  website: "www.studyskillscenter.in",
  hours: "TODO — confirm opening hours",
  mapQuery: "Study Skills Center, P-Block, Malviya Nagar, New Delhi 110017",
} as const;

export const divisions = [
  {
    slug: "academics",
    name: "Study Skills Center",
    label: "Tuition Centre",
    blurb:
      "School tuition for Classes I to XII, in small online and offline batches, with printed study material and a free demo class.",
    href: "/courses",
    accent: "blue",
  },
  {
    slug: "mads",
    name: "MADS",
    label: "Music & Dance Studio",
    blurb:
      "The creative division — dance, music, martial arts and fine art for ages 6–14 and a separate adult batch.",
    href: "/mads",
    accent: "gold",
  },
  {
    slug: "grades",
    name: "Grades Career Institute",
    label: "Competitive Exams",
    blurb:
      "JEE, NEET, Olympiads and foundation coaching for students building towards engineering and medical entrance.",
    href: "/grades",
    accent: "navy",
  },
] as const;

/** Source: "Admission Open" poster + SSC banner */
export const academicPrograms = [
  {
    slug: "class-1-to-5",
    title: "Classes I – V",
    stage: "Primary",
    summary:
      "All subjects taught together, building the reading, writing and number sense everything later depends on.",
    subjects: ["All Subjects", "Maths", "English", "Hindi", "EVS"],
  },
  {
    slug: "class-6-to-8",
    title: "Classes VI – VIII",
    stage: "Middle School",
    summary:
      "The years where subjects separate and study habits are formed. Concept-first teaching in small batches.",
    subjects: ["Science", "Maths", "English", "SST", "Sanskrit", "Hindi"],
  },
  {
    slug: "class-9-10",
    title: "Classes IX – X",
    stage: "Board Preparation",
    summary:
      "Focused board preparation with regular testing, printed material and individual attention on weak areas.",
    subjects: ["Science", "Maths", "English", "SST", "Sanskrit", "Hindi"],
  },
  {
    slug: "class-11-12",
    title: "Classes XI – XII",
    stage: "Senior Secondary",
    summary:
      "Stream-specific coaching for the board years, taught by subject specialists.",
    subjects: ["Physics", "Chemistry", "Biology", "Accounts", "Maths", "English"],
  },
  {
    slug: "english-speaking",
    title: "English Speaking & Communication",
    stage: "Skills",
    summary:
      "Spoken English, grammar and confident communication for students and adults.",
    subjects: ["English Grammar", "Spoken English", "Communication"],
  },
  {
    slug: "languages",
    title: "Language Classes",
    stage: "Skills",
    summary: "Additional languages taught alongside school study.",
    subjects: ["French", "German", "Spanish", "Sanskrit"],
  },
  {
    slug: "mental-maths",
    title: "Mental Maths",
    stage: "Skills",
    summary: "Speed, accuracy and number confidence built through structured practice.",
    subjects: ["Mental Maths"],
  },
  {
    slug: "handwriting",
    title: "Handwriting",
    stage: "Skills",
    summary: "Legible, consistent handwriting — often the quickest win in a board exam.",
    subjects: ["Handwriting"],
  },
] as const;

/** Source: MADS "Activity Classes" poster — Age Group 6–14, 15–Adults (separate batches) */
export const madsPrograms = [
  { slug: "western-dance", title: "Western Dance", group: "Dance", image: "dance-01" },
  { slug: "kathak", title: "Kathak Dance", group: "Dance", image: "dance-05" },
  { slug: "bharatnatyam", title: "Bharatnatyam", group: "Dance", image: "dance-08", note: "Certificate course — Saraswathy Natyalaya, by Nisha Saraswathy" },
  { slug: "zumba", title: "Zumba", group: "Dance", image: "dance-03" },
  { slug: "guitar", title: "Guitar", group: "Music", image: "music-02" },
  { slug: "keyboard", title: "Keyboard", group: "Music", image: "music-01" },
  { slug: "vocal", title: "Vocal (Singing)", group: "Music", image: "music-03" },
  { slug: "taekwondo", title: "Taekwon-Do", group: "Martial Arts", image: "taekwondo-01", note: "In association with School of Self Defence. Registration with the Taekwondo Federation; belt and competition training." },
  { slug: "drawing-painting", title: "Drawing & Painting", group: "Art", image: "art-01" },
  { slug: "art-craft", title: "Art & Craft", group: "Art", image: "art-04" },
  { slug: "chess", title: "Chess", group: "Mind Sports", image: "chess-01" },
] as const;

/** Source: Grades Career Institute / Grades Manager posters */
export const gradesPrograms = [
  { title: "JEE Advanced", detail: "IIT / KVPY" },
  { title: "JEE Main", detail: "NITs, IIITs, IIESTs, GFTIs, BITS" },
  { title: "Medical", detail: "NEET / KVPY" },
  { title: "Foundation Builder", detail: "Classes VII–X · NTSE, IMO" },
  { title: "Olympiads", detail: "IMO, ISO, IEO, NSO, IESO, NESO, NSSO" },
  { title: "Science & Maths", detail: "Classes VII–X" },
  { title: "Physics · Chemistry · Biology · Maths", detail: "Senior secondary" },
] as const;

/**
 * Source: "Heartiest Congratulations" result posters.
 * ⚠️ CONSENT REVIEW REQUIRED before these appear on a public site — see
 * docs/04-media-intake.md §2.3. Shown here because SSC already published them.
 */
export const results = {
  class12: {
    heading: "Class XII Boards 2025–26",
    subject: "Outstanding performance",
    students: [
      { name: "Pranay Singh", score: "96/100", school: "APJ School, Sheikh Sarai" },
      { name: "Dakshayani Babu Rao", score: "95/100", school: "Asan Memorial Senior Secondary School, Chennai" },
      { name: "Ariya Sachdeva", score: "93/100", school: "Naga Schools, Gurgaon" },
      { name: "Siddhi Jaiswal", score: "92/100", school: "TODO — confirm school" },
      { name: "Surkhab Wasil", score: "91/100", school: "TODO — confirm school" },
      { name: "Soumya Dhal", score: "91/100", school: "TODO — confirm school" },
    ],
  },
  class10: {
    heading: "Class X Achievers",
    subject: "Overall percentage",
    students: [
      { name: "Meeshika Ramteke", score: "99%", school: "Amity International, Mayur Vihar" },
      { name: "Niyati Jhamb", score: "95%", school: "Manav Rachna International School" },
      { name: "Satyam Dey", score: "93.6%", school: "Gyan Bharti School" },
      { name: "Ira Goel", score: "93%", school: "Delhi Public School" },
      { name: "Manvika Garg", score: "92.4%", school: "Laxman Public School" },
      { name: "Naman Shandilya", score: "90%", school: "The Indian School" },
    ],
  },
} as const;

/** Source: event posters in the photo batch */
export const events = [
  {
    slug: "art-exhibition-2026",
    title: "Art Exhibition",
    strap: "Creativity · Inspiration · Expression",
    date: "Sunday 21 June 2026",
    time: "11:00 AM – 1:30 PM",
    venue: "Study Skills Center, Malviya Nagar",
    description:
      "A celebration of young artists — a public showing of work made by students across the year, curated with Amitava Sir.",
    poster: "art-exhibition",
  },
  {
    slug: "annual-day-closing-ceremony",
    title: "Annual Day & Closing Ceremony of Summer Camp",
    strap: "The sixth annual day",
    date: "TODO — confirm date",
    time: "TODO",
    venue: "Study Skills Center, Malviya Nagar",
    description:
      "An evening of dance, music and theatre performed by summer camp students, followed by certificate distribution.",
    poster: "annual-day",
  },
  {
    slug: "summer-camp-2026",
    title: "Summer Camp 2026",
    strap: "Where talent meets transformation",
    date: "TODO — confirm dates",
    time: "TODO",
    venue: "Study Skills Center, Malviya Nagar",
    description:
      "A multi-week camp across dance, music, art and brain-power activities, closing with a stage showcase.",
    poster: "summer-camp",
  },
] as const;

export const stats = [
  { value: "I–XII", label: "Classes taught" },
  { value: "11+", label: "Creative programmes" },
  { value: "3", label: "Centres under one roof" },
  { value: "6th", label: "Annual Day held" },
] as const;

export const whySSC = [
  {
    title: "Small batches, online and offline",
    body: "Batch sizes kept small enough that a teacher notices when a student goes quiet.",
  },
  {
    title: "Free demo class",
    body: "Sit in before you commit. No fee, no obligation — the standard way we start.",
  },
  {
    title: "Printed study material",
    body: "Structured notes and practice sets prepared in-house, not photocopied from a guide.",
  },
  {
    title: "Academics and the arts together",
    body: "One place for tuition, dance, music, martial arts and art — so a child isn't shuttled across the city.",
  },
  {
    title: "Experienced, dedicated faculty",
    body: "Subject specialists for the senior classes, trained instructors for every creative discipline.",
  },
  {
    title: "Results we publish",
    body: "Board scores and achievers are put on record, with the school named alongside.",
  },
] as const;

export const faqs = [
  {
    q: "Which classes do you teach?",
    a: "Classes I to XII. Primary students are taught all subjects together; from Class VI subjects are taught by specialists; Classes XI and XII are stream-specific.",
  },
  {
    q: "Is there a demo class before I enrol my child?",
    a: "Yes. A free demo class is offered across academic and creative programmes so a student can sit in before committing.",
  },
  {
    q: "Are classes online or offline?",
    a: "Both. Small batches run online and offline — tell us which suits your child and we will place them accordingly.",
  },
  {
    q: "What age groups do the MADS creative classes take?",
    a: "Ages 6–14 in one group, and 15-and-above (including adults) in a separate batch, so the pace and material suit the age.",
  },
  {
    q: "Do you prepare students for JEE and NEET?",
    a: "Yes — through Grades Career Institute, our competitive-exam division, covering JEE Main, JEE Advanced, NEET, Olympiads and Class VII–X foundation.",
  },
  {
    q: "What are the fees?",
    a: "TODO — SSC to confirm whether fees are published on the site or handled by enquiry.",
  },
  {
    q: "Where exactly are you located?",
    a: `${site.address.full}. The centre is close to the Malviya Nagar post office.`,
  },
  {
    q: "How do I book a demo or ask a question?",
    a: `Call ${site.primaryPhone}, message us on WhatsApp, or use the enquiry form — whichever is easiest.`,
  },
] as const;

/** Placeholder — SSC to supply real testimonials with consent. */
export const testimonials = [
  {
    quote: "TODO — real parent testimonial required.",
    author: "Parent name",
    relation: "Parent of a Class IX student",
  },
  {
    quote: "TODO — real student testimonial required.",
    author: "Student name",
    relation: "Class XII",
  },
  {
    quote: "TODO — real MADS parent testimonial required.",
    author: "Parent name",
    relation: "Parent, Kathak batch",
  },
] as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/mads", label: "MADS" },
  { href: "/grades", label: "Grades" },
  { href: "/faculty", label: "Faculty" },
  { href: "/gallery", label: "Gallery" },
  { href: "/achievements", label: "Results" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/admissions", label: "Admissions" },
  { href: "/fees", label: "Fees" },
  { href: "/contact", label: "Contact" },
] as const;

/** Numeric stats for the animated counters on the home page. */
export const countStats = [
  { value: 12, suffix: "", label: "Classes taught (I–XII)" },
  { value: 11, suffix: "", label: "Creative programmes" },
  { value: 3, suffix: "", label: "Divisions under one roof" },
  { value: 6, suffix: "th", label: "Annual Day held" },
] as const;

/** The student journey — horizontal scroll section on the home page. */
export const journey = [
  {
    title: "You call, or send a message",
    body: "Tell us the class, the subject or the programme, and what you are hoping changes. We will tell you honestly whether we are the right fit.",
  },
  {
    title: "The student sits in on a demo",
    body: "A real class with the batch they would actually join. Free, and with no obligation on either side.",
  },
  {
    title: "We place them in the right batch",
    body: "Level and timing both matter. Online or offline, whichever suits the week — batches are kept small on purpose.",
  },
  {
    title: "The work begins",
    body: "Printed study material, regular practice, and a teacher close enough to notice when something is not landing.",
  },
  {
    title: "Progress gets measured",
    body: "Tests, corrections and honest feedback to parents — not just at the end of the year, but as it happens.",
  },
  {
    title: "Results, and a stage",
    body: "Board scores worth publishing, and for MADS students, an Annual Day audience to perform in front of.",
  },
] as const;
