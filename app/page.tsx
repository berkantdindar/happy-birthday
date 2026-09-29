'use client';

import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getBirthdayState(now: Date): { isBirthday: boolean; countdown: Countdown } {
  const birthday = new Date(now.getFullYear(), 9, 3);
  const isBirthday =
    now.getMonth() === 9 && now.getDate() === 3;

  if (!isBirthday && birthday.getTime() < now.getTime()) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const remaining = Math.max(0, birthday.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    isBirthday,
    countdown: {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    },
  };
}

const countdownLabels: { key: keyof Countdown; label: string }[] = [
  { key: "days", label: "gün" },
  { key: "hours", label: "saat" },
  { key: "minutes", label: "dakika" },
  { key: "seconds", label: "saniye" },
];

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [noteIsOpen, setNoteIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const birthdayState = now ? getBirthdayState(now) : null;

  return (
    <main className="birthday-page">
      <div className="page-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Başlangıca dön">
          <span className="wordmark-heart" aria-hidden="true">♥</span>
          <span>İKİMİZ</span>
        </a>
        <span className="header-note">SANA, EN GÜZELİNE</span>
        <span className="header-date">03 EKİM <span>♡</span></span>
      </header>

      <section className="hero" id="top" aria-labelledby="birthday-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> 3 EKİM’E KÜÇÜK BİR NOT</p>
          <h1 id="birthday-title">İyi ki<br />benim <span>güzelim.</span></h1>
          <p className="hero-description">
            Takvimde bir gün, benim için koca bir dünya. Senin gününe kavuşmak için
            saniyeleri bile sayıyorum.
          </p>
          <a className="letter-link" href="#geri-sayim">
            <span className="letter-link-icon" aria-hidden="true">↓</span>
            <span>Bu heyecanı benimle say</span>
          </a>
          <span className="handwritten-note" aria-hidden="true">en sevdiğim gün<br />yaklaşıyor <span>↗</span></span>
        </div>

        <div className="hero-art" aria-label="Birlikte kutlayacağımız güzel gün">
          <div className="photo-frame">
            <div className="photo-scene" role="img" aria-label="Birlikte kutlama anı" />
            <span className="photo-sticker" aria-hidden="true">★</span>
            <span className="photo-caption">sen + ben = en güzel şey</span>
          </div>
          <div className="orbit-stamp" aria-hidden="true">
            <span>DOĞDUĞUN GÜN</span>
            <strong>♡</strong>
            <span>DÜNYA GÜZELLEŞTİ</span>
          </div>
          <span className="art-spark art-spark-one" aria-hidden="true">✳</span>
          <span className="art-spark art-spark-two" aria-hidden="true">✦</span>
          <span className="floating-heart floating-heart-one" aria-hidden="true">♥</span>
          <span className="floating-heart floating-heart-two" aria-hidden="true">♥</span>
        </div>
      </section>

      <section className="countdown-section" id="geri-sayim" aria-live="polite">
        <div className="countdown-heading">
          <p className="eyebrow">KALBİM ŞİMDİDEN PİRPİR</p>
          <h2>{birthdayState?.isBirthday ? "Bugün senin günün!" : "Büyük güne kalan"}</h2>
        </div>
        {birthdayState?.isBirthday ? (
          <div className="birthday-message">
            <span aria-hidden="true">✷</span>
            <p>İyi ki doğdun sevgilim. Bugün ve her gün, en güzel dileğim sensin.</p>
            <span aria-hidden="true">✷</span>
          </div>
        ) : (
          <div className="countdown" aria-label="Doğum gününe kalan süre">
            {countdownLabels.map(({ key, label }) => (
              <div className="time-unit" key={key}>
                <span className="time-value">
                  {birthdayState ? String(birthdayState.countdown[key]).padStart(2, "0") : "--"}
                </span>
                <span className="time-label">{label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="countdown-footer">
          <span>3 EKİM</span>
          <span className="footer-heart" aria-hidden="true">♥</span>
          <span>HER ŞEY SENİNLE GÜZEL</span>
        </div>
      </section>

      <section className="little-note" aria-label="Sana küçük bir not">
        <span className="note-label">CEBİNE KOYABİLECEĞİN BİR ŞEY</span>
        <button
          className="note-button"
          type="button"
          aria-expanded={noteIsOpen}
          onClick={() => setNoteIsOpen((isOpen) => !isOpen)}
        >
          {noteIsOpen ? "Notu kapat" : "Sana bir notum var"}
          <span aria-hidden="true">{noteIsOpen ? "−" : "+"}</span>
        </button>
        {noteIsOpen && (
          <p className="love-note">
            Hayatıma geldiğin günden beri sıradan günler bile kutlamaya dönüştü.
            Yeni yaşında da elini hiç bırakmayacağım. Seni çok seviyorum.
          </p>
        )}
      </section>

      <footer className="site-footer">
        <span>SEVGİYLE, HEP SENİNLE</span>
        <span aria-hidden="true">♥</span>
        <span>03 / 10</span>
      </footer>
    </main>
  );
}
