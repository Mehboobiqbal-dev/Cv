// Small helpers shared by the page and the ⌘K palette. Kept apart from CommandPalette.jsx so that
// importing them does not pull the palette (cmdk + dialog) into the first page load.
import { toast } from "sonner";

import { CONTACT } from "@/utils/SocialMedia";

export const openCommandPalette = () => window.dispatchEvent(new Event("open-command-palette"));

export const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(CONTACT.email);
    toast.success("Email copied", { description: CONTACT.email });
  } catch (error) {
    window.location.href = `mailto:${CONTACT.email}`;
  }
};
