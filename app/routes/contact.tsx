import { createFileRoute } from "@tanstack/react-router";
import { linkStyles } from "~/components/link";
import { H1, H2, P } from "~/components/typography";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "H3VAL Music | Contact" },
      { name: "description", content: "H3VAL Music Contact & Impressum" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-10">
      <div className="space-y-4 text-center">
        <H1>Contact</H1>
      </div>

      <section>
        <H2 as="h2">Booking</H2>
        <P>
          E-Mail:{" "}
          <a className={linkStyles()} href="mailto:booking@h3val.com">
            booking@h3val.com
          </a>
          <br />
          Instagram:{" "}
          <a className={linkStyles()} href="https://instagram.com/h3val.dj">
            @h3val.dj
          </a>
        </P>
      </section>

      <section>
        <H2 as="h2">Impressum</H2>
        <P>
          Rackles & Reinecke Tumult Events GbR
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
        <P>
          <span className="font-bold">Vertreten durch:</span> Gesellschafter
          Johannes Rackles und Leonhard Reinecke
        </P>
      </section>
    </div>
  );
}
