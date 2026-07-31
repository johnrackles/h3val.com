import { createFileRoute } from "@tanstack/react-router";
import { linkStyles } from "~/components/link";
import { H1, H2, P } from "~/components/typography";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "H3VAL | Privacy Policy" },
      { name: "description", content: "H3VAL Privacy Policy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-10">
      <div className="space-y-4 text-center">
        <H1>Privacy Policy</H1>
      </div>

      <section>
        <H2 as="h2">Controller</H2>
        <P>
          Johannes Rackles
          <br />
          Colbestraße 25
          <br />
          10247 Berlin
          <br />
          E-Mail:{" "}
          <a className={linkStyles()} href="mailto:hello@h3val.com">
            hello@h3val.com
          </a>
        </P>
      </section>

      <section>
        <H2 as="h2">Hosting</H2>
        <P>
          This site is hosted on Cloudflare Workers. Cloudflare processes
          technical access data (e.g. IP address, requested page, timestamp,
          browser type) in server logs to deliver the site and for security
          purposes (Art. 6(1)(f) GDPR — legitimate interest in reliable and
          secure operation).
        </P>
      </section>

      <section>
        <H2 as="h2">SoundCloud embeds</H2>
        <P>
          On the About page, SoundCloud players are not loaded automatically.
          Only after you click "Load SoundCloud player" does your browser
          connect to SoundCloud (SoundCloud Global Ltd.), which may set cookies
          and process your IP address to play the track (Art. 6(1)(a) GDPR —
          your consent, given by clicking). See SoundCloud's own privacy policy
          for details on their processing.
        </P>
      </section>

      <section>
        <H2 as="h2">Contact by e-mail</H2>
        <P>
          If you contact us by e-mail, we process the data you send (e.g. e-mail
          address, message content) only to handle your request (Art. 6(1)(b)
          GDPR).
        </P>
      </section>

      <section>
        <H2 as="h2">Your rights</H2>
        <P>
          You have the right to access, rectify, or erase your data, restrict or
          object to processing, and data portability under Art. 15–21 GDPR, and
          to lodge a complaint with a supervisory authority. For GDPR requests,
          contact{" "}
          <a className={linkStyles()} href="mailto:privacy@h3val.com">
            privacy@h3val.com
          </a>
          .
        </P>
      </section>
    </div>
  );
}
