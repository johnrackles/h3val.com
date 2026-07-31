import { createFileRoute } from "@tanstack/react-router";
import { linkStyles } from "~/components/link";
import { H1, H2, P } from "~/components/typography";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "H3VAL Music | Imprint" },
      { name: "description", content: "H3VAL Music Contact & Imprint" },
    ],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-10">
      <div className="space-y-4 text-center">
        <H1>Imprint</H1>
      </div>

      <section>
        <H2 as="h2">Booking</H2>
        <P>
          E-Mail:{" "}
          <a className={linkStyles()} href="mailto:booking@h3val.com">
            booking@h3val.com
          </a>
          <br />
          Soundcloud:{" "}
          <a className={linkStyles()} href="https://soundcloud.com/h3val">
            @h3val
          </a>
        </P>
      </section>

      <section>
        <H2 as="h2">Impressum</H2>
        <P>
          Johannes Rackles
          <br />
          Colbestraße 25
          <br />
          10247 Berlin
        </P>
        <P>
          E-Mail:{" "}
          <a className={linkStyles()} href="mailto:hello@h3val.com">
            hello@h3val.com
          </a>
        </P>
      </section>
    </div>
  );
}
