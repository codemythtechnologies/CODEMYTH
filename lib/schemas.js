import { z } from "zod";

// Shared, server-enforced limits. The client uses the same schema so
// validation errors match exactly — but the SERVER copy is what actually
// protects the database and inbox, since client-side checks can always
// be bypassed by anyone calling the API directly.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(500),
  stage: z.enum(["", "idea", "validating", "mvp", "launched"]).optional().default(""),
  need: z
    .enum(["", "ba-product", "full-stack", "ai", "landing", "not-sure"])
    .optional()
    .default(""),
  // Honeypot field: real users never fill this in (it's visually hidden).
  // Any bot that blindly fills every field trips this and gets silently dropped.
  company_website: z.string().max(0, "Spam check failed").optional().default(""),
});

export const baConsultSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  company: z.string().trim().max(150).optional().default(""),
  phone: z.string().trim().max(30).optional().default(""),
  need: z
    .enum([
      "URS / FRS / PQ / IQ documentation",
      "Agile delivery & sprint planning",
      "Dashboarding & reporting",
      "SAP integration & process mapping",
      "Something else",
    ])
    .optional()
    .default("URS / FRS / PQ / IQ documentation"),
  message: z.string().trim().min(10, "Please add a few details (min 10 characters)").max(500),
  company_website: z.string().max(0, "Spam check failed").optional().default(""),
});

// ---- Client-side variants ----
// Same field rules as above, EXCEPT the honeypot ("company_website") is not
// capped at length 0 here. Reason: that field is invisible to real users,
// but Chrome/Edge autofill can still silently type a value into it (it's
// sitting right next to real Name/Email/Company fields, and its label makes
// it look like a normal "company website" input to the browser's autofill
// heuristics). When that happened, react-hook-form's zodResolver produced a
// validation error the UI never displays (there's no error element wired up
// for company_website), so handleSubmit(onSubmit) silently refused to run
// and no network request was ever sent — exactly the "Request consultation
// does nothing, Network tab shows nothing" symptom.
// The server (route.js) still receives this field and still enforces the
// spam check itself (see baConsultSchema / contactSchema above), so bots
// are handled exactly as before — this only stops a legitimate user's own
// browser from blocking their own submission before it even leaves the page.
export const contactClientSchema = contactSchema.extend({
  company_website: z.string().optional().default(""),
});

export const baConsultClientSchema = baConsultSchema.extend({
  company_website: z.string().optional().default(""),
});