import { useSyncExternalStore } from "react";
import {
  getSoundcloudConsent,
  getSoundcloudConsentServerSnapshot,
  grantSoundcloudConsent,
  subscribeSoundcloudConsent,
} from "~/lib/soundcloud-consent";

type Props = {
  url: string;
  name: string;
};

export function SoundcloudEmbed({ url, name }: Props) {
  const loaded = useSyncExternalStore(
    subscribeSoundcloudConsent,
    getSoundcloudConsent,
    getSoundcloudConsentServerSnapshot,
  );

  if (!loaded) {
    return (
      <button
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-muted/40 px-4 py-8 text-center hover:bg-muted/60"
        onClick={grantSoundcloudConsent}
        type="button"
      >
        <span className="text-sm font-medium">Load "{name}"</span>
        <span className="text-muted-foreground text-xs">
          Hidden until you click to avoid loading SoundCloud (and its cookies)
          before you consent. One click loads all sets.
        </span>
      </button>
    );
  }

  return (
    <iframe
      allow="autoplay"
      className="block rounded-lg"
      height="166"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&show_comments=false&visual=true`}
      title={name}
      width="100%"
    />
  );
}
