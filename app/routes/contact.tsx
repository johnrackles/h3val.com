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
    <div className="container mx-auto">
      <div>
        <H1>Contact</H1>
        <H2>Booking</H2>
        <P>
          E-Mail:{" "}
          <a href="mailto:booking@h3val.com" className={linkStyles()}>
            booking@h3val.com
          </a>
          <br />
          Instagram:{" "}
          <a href="https://instagram.com/h3val.dj" className={linkStyles()}>
            @h3val.dj
          </a>
        </P>

        <H2>Impressum</H2>
        <P>
          Rackles & Reinecke Tumult Events GbR
          <br />
          Colbestraße 25
          <br />
          10247 Berlin
        </P>
        <P>
          E-Mail:{" "}
          <a href="mailto:hello@h3val.com" className={linkStyles()}>
            hello@h3val.com
          </a>
        </P>
        <P>
          <div className="font-bold">Vertreten durch:</div> Gesellschafter
          Johannes Rackles und Leonhard Reinecke
        </P>
      </div>
    </div>
  );
}
