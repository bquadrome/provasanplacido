import { useEffect, useId, useRef, useState } from "react";
import { COPY, LANGS, LANG_LABEL, audioSrc, type Lang } from "./copy";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function excerpt(text: string, max = 148) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function Flag({ lang }: { lang: Lang }) {
  const clipId = useId().replace(/:/g, "");

  if (lang === "it") {
    return (
      <svg className="flag" preserveAspectRatio="xMidYMid slice" viewBox="0 0 3 2" aria-hidden>
        <rect width="1.1" height="2" fill="#009246" />
        <rect x="1.1" width="0.8" height="2" fill="#fff" />
        <rect x="1.9" width="1.1" height="2" fill="#ce2b37" />
      </svg>
    );
  }

  if (lang === "es") {
    return (
      <svg className="flag" preserveAspectRatio="xMidYMid slice" viewBox="0 0 3 2" aria-hidden>
        <rect width="3" height="2" fill="#aa151b" />
        <rect y="0.5" width="3" height="1" fill="#f1bf00" />
      </svg>
    );
  }

  return (
    <svg className="flag" preserveAspectRatio="xMidYMid slice" viewBox="0 0 60 30" aria-hidden>
      <clipPath id={clipId}>
        <path d="M0 0h60v30H0z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0 0h60v30H0z" fill="#012169" />
        <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

function goHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(".sheet")?.scrollTo({ top: 0, behavior: "smooth" });
}

function MobileMenu({
  lang,
  onChange,
  languageLabel,
  homeLabel,
  menuLabel,
  closeLabel,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  languageLabel: string;
  homeLabel: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    function onChangeMq() {
      if (mq.matches) setOpen(false);
    }
    mq.addEventListener("change", onChangeMq);
    return () => mq.removeEventListener("change", onChangeMq);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={open ? "menu-btn is-open" : "menu-btn"}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="menu-bars" aria-hidden />
      </button>
      {open ? (
        <div
          id="site-menu"
          className="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={menuLabel}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="nav-panel">
            <button
              type="button"
              className="nav-home"
              onClick={() => {
                setOpen(false);
                goHome();
              }}
            >
              {homeLabel}
            </button>
            <div className="nav-lang" role="listbox" aria-label={languageLabel}>
              {LANGS.map((item) => {
                const selected = item === lang;
                return (
                  <button
                    key={item}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={selected ? "nav-lang-opt is-on" : "nav-lang-opt"}
                    onClick={() => onChange(item)}
                  >
                    <Flag lang={item} />
                    <span>{LANG_LABEL[item]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function LangSelect({
  value,
  onChange,
  label,
  menu = "up",
}: {
  value: Lang;
  onChange: (lang: Lang) => void;
  label: string;
  menu?: "up" | "down";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang" ref={rootRef}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
      >
        <Flag lang={value} />
      </button>
      {open ? (
        <ul
          className={menu === "down" ? "lang-menu is-down" : "lang-menu"}
          role="listbox"
          aria-label={label}
        >
          {LANGS.map((lang) => {
            const selected = lang === value;
            return (
              <li key={lang}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={selected ? "lang-opt is-on" : "lang-opt"}
                  onClick={() => {
                    onChange(lang);
                    setOpen(false);
                  }}
                >
                  <Flag lang={lang} />
                  <span>{LANG_LABEL[lang]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("it");
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const copy = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    setExpanded(false);
  }, [lang]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    setMissing(false);
    setStarted(false);
    setTime(0);
    setDuration(0);
    audio.pause();
    audio.load();
  }, [lang]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio || missing) return;
    if (audio.paused) {
      void audio.play().then(
        () => {
          setPlaying(true);
          setStarted(true);
        },
        () => setMissing(true),
      );
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || missing) return;
    audio.currentTime = value;
    setTime(value);
  }

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <p className="brand">San Placido</p>
          <div className="header-tools">
            <button type="button" className="home-link" onClick={goHome}>
              {copy.home}
            </button>
            <div className="header-lang">
              <LangSelect value={lang} onChange={setLang} label={copy.language} menu="down" />
            </div>
            <MobileMenu
              lang={lang}
              onChange={setLang}
              languageLabel={copy.language}
              homeLabel={copy.home}
              menuLabel={copy.menu}
              closeLabel={copy.close}
            />
          </div>
        </div>
      </header>

      <main className="stage">
      <figure className="hero">
        <img src="/hero.png" alt="Chiostro di San Placido" />
      </figure>

      <section className="sheet" aria-label={copy.guide}>
        <audio
          ref={audioRef}
          src={audioSrc(lang)}
          preload="metadata"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration);
            setMissing(false);
          }}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setMissing(true);
            setPlaying(false);
          }}
        />

        <div className="sheet-inner">
          <h1 className="title">{copy.title}</h1>

          {missing ? <p className="missing">{copy.missing}</p> : null}

          {expanded ? (
            <div className="body">
              {copy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <button type="button" className="more" onClick={() => setExpanded(false)}>
                {copy.readLess}
              </button>
            </div>
          ) : (
            <p className="lead">
              {excerpt(copy.body[0])}{" "}
              <button type="button" className="more" onClick={() => setExpanded(true)}>
                {copy.readMore}
              </button>
            </p>
          )}

          {started && duration > 0 ? (
            <div className="scrub">
              <div className="scrub-meta">
                <span>{formatTime(time)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                className="range"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(time, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                style={{ ["--p" as string]: `${progress}%` }}
                aria-label={copy.guide}
              />
            </div>
          ) : null}

          <div className="actions">
            <button type="button" className="cta" onClick={toggle} disabled={missing}>
              {playing ? copy.pause : copy.guide}
            </button>
            <LangSelect value={lang} onChange={setLang} label={copy.language} />
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
