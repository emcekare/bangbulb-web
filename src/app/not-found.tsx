import Link from "next/link";
import { getAssetPath } from "@/lib/asset";

export default function NotFound() {
  return (
    <main className="nf">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="nf-logo"
        src={getAssetPath("/assets/bangbulb-pinwheel.svg")}
        alt="BangBulb"
        width={96}
        height={135}
      />
      <h1 className="nf-title">Bu oda boş.</h1>
      <p className="nf-text">Aradığınız sayfa burada değil.</p>
      <Link className="nf-btn" href="/">
        Ana sayfaya dön
      </Link>
    </main>
  );
}
