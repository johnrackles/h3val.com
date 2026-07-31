const KEY = "soundcloud-consent";
const listeners = new Set<() => void>();

let consent =
  typeof localStorage !== "undefined" && localStorage.getItem(KEY) === "true";

export function getSoundcloudConsent() {
  return consent;
}

export function getSoundcloudConsentServerSnapshot() {
  return false;
}

export function grantSoundcloudConsent() {
  consent = true;
  localStorage.setItem(KEY, "true");
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeSoundcloudConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
