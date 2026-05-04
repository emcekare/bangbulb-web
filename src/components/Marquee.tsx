"use client";

const items = [
  "sosyal medya",
  "kurumsal kimlik",
  "prodüksiyon",
  "TV reklamları",
  "açık hava",
  "META",
  "Google ADS",
  "Yandex",
  "TikTok",
  "influencer",
  "PR",
  "ambalaj",
  "stant",
];

const sequence = [...items, ...items];

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {sequence.map((s, i) => (
          <span className="marquee__item" key={i}>
            <span className={i % 2 ? "ital" : ""}>{s}</span>
            <span className="marquee__dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
