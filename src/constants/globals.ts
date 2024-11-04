import { application } from "@/config/metadata";

// ANIMATIONS
export const TRANSITION_DURATION = 0.7;

// GLOBALS
export const MAX_POPULAR_LINKS = 6;

// FUNCTIONS
function createUniqueKey(key: string): string {
  return `@${application.name}/${key}/${application.version}`;
}

// KEYS
export const KEY_JOYRIDE = createUniqueKey("joyride");
export const KEY_SIDEBAR = createUniqueKey("sidebar");
export const KEY_PROVIDER_SELECTED = createUniqueKey("provider-selected-auth");
