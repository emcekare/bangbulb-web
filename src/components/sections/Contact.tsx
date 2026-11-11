import { Fragment } from "react";
import { contact } from "@/content/contact";

export default function Contact() {
  const [emailUser, emailDomain] = contact.email.split("@");
  const [secondaryUser, secondaryDomain] = contact.emailSecondary.split("@");

  return (
    <section className="section contact" id="iletisim">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 07 / iletişim</div>
          <div>
            <h2 className="s-head__title display">
              Bir{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                kahve
              </span>{" "}
              içelim.
            </h2>
          </div>
        </div>

        <div className="contact__inner reveal">
          <h3 className="contact__big display">
            <span className="ital">yaz:</span>{" "}
            <a href={`mailto:${contact.email}`} data-cursor="mail at">
              {emailUser}<span className="ital">@</span>{emailDomain}
            </a>
            <br />
            <span className="ital">ara:</span>{" "}
            <a href={`tel:${contact.phone.tel}`} data-cursor="ara">
              {contact.phone.display}
            </a>
          </h3>

          <div className="contact__details">
            <div className="detail">
              <div className="detail__label">stüdyo</div>
              <div className="detail__value">
                {contact.addressLines.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="detail">
              <div className="detail__label">ikincil</div>
              <div className="detail__value">
                {secondaryUser}<span style={{ color: "var(--accent)" }}>@</span>
                {secondaryDomain}
                <br />{contact.phoneSecondary.display}
              </div>
            </div>
            <div className="detail">
              <div className="detail__label">çalışma saatleri</div>
              <div className="detail__value">
                {contact.hours.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
