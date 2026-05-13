import { useState, useEffect, useRef } from "react";

// Топ-10 языков на Duolingo (млн активных учеников, данные 2024)
const top10 = [
  { lang: "Английский", learners: 180, flag: "🇬🇧", color: "#58CC02" },
  { lang: "Испанский", learners: 90, flag: "🇪🇸", color: "#FFC800" },
  { lang: "Французский", learners: 60, flag: "🇫🇷", color: "#1CB0F6" },
  { lang: "Японский", learners: 45, flag: "🇯🇵", color: "#FF4B4B" },
  { lang: "Корейский", learners: 38, flag: "🇰🇷", color: "#CE82FF" },
  { lang: "Немецкий", learners: 32, flag: "🇩🇪", color: "#58CC02" },
  { lang: "Итальянский", learners: 28, flag: "🇮🇹", color: "#FFC800" },
  { lang: "Хинди", learners: 22, flag: "🇮🇳", color: "#FF9600" },
  { lang: "Мандаринский", learners: 18, flag: "🇨🇳", color: "#FF4B4B" },
  { lang: "Португальский", learners: 15, flag: "🇵🇹", color: "#1CB0F6" },
];

const slides = [
  { id: "title", emoji: "🦜", label: "Старт!" },
  { id: "why", emoji: "⭐", label: "Зачем?" },
  { id: "duolingo", emoji: "🦉", label: "Duolingo" },
  { id: "chart", emoji: "📊", label: "Топ-10" },
  { id: "facts", emoji: "🤩", label: "Факты" },
  { id: "finish", emoji: "🏆", label: "Финиш!" },
];

function useVisible(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedBar({ value, max, color, delay, visible }: {
  value: number; max: number; color: string; delay: number; visible: boolean;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setW((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [visible, value, max, delay]);
  return (
    <div style={{
      height: "100%", borderRadius: 99, backgroundColor: color,
      width: `${w}%`, transition: "width 1.1s cubic-bezier(0.34,1.56,0.64,1)",
    }} />
  );
}

// ========== Слайд 1: Титульный ==========
function SlideTitle() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);
  const s = (delay: number) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
    transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
  });
  return (
    <div className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)" }}>
      <div className="duo-confetti-bg" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div style={s(0)} className="mb-2">
          <span className="duo-badge">🎓 Моя презентация</span>
        </div>
        <div style={s(100)} className="duo-owl-big">🦉</div>
        <h1 style={s(200)} className="duo-title-main">
          ¡Hola!<br />
          <span style={{ color: "#58CC02" }}>Испанский язык</span>
        </h1>
        <p style={s(350)} className="duo-subtitle">
          Почему я учу испанский в Duolingo<br />и почему это круто 🔥
        </p>
        <div style={s(500)} className="flex gap-3 mt-6 flex-wrap justify-center">
          {["560 млн носителей 🌍", "21 страна 🗺️", "#2 в Duolingo 🏆"].map(t => (
            <span key={t} className="duo-chip">{t}</span>
          ))}
        </div>
      </div>
      <div className="slide-num-duo">01 / 06</div>
    </div>
  );
}

// ========== Слайд 2: Почему испанский ==========
function SlideWhy() {
  const { ref, visible } = useVisible();
  const reasons = [
    { emoji: "🌎", title: "Целый континент!", text: "Вся Латинская Америка говорит по-испански. Это 20 стран!" },
    { emoji: "🎮", title: "Игры и мультики", text: "Понимаешь оригинальные игры и сериалы без перевода" },
    { emoji: "✈️", title: "Путешествия", text: "В Испании, Мексике, Аргентине тебя поймут и полюбят!" },
    { emoji: "🧠", title: "Умнее на 10%", text: "Учёные доказали: два языка делают мозг быстрее и сильнее" },
    { emoji: "💰", title: "Будущая работа", text: "Знание испанского — это +30% к зарплате в будущем" },
    { emoji: "🤝", title: "Новые друзья", text: "560 миллионов новых друзей по всему миру ждут тебя!" },
  ];
  return (
    <div ref={ref} className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0D2137 100%)" }}>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-14 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(25px)", transition: "all 0.6s ease" }}>
          <span className="duo-badge mb-3 inline-block">⭐ Зачем учить испанский?</span>
          <h2 className="duo-section-title mb-8">6 супер-причин<br /><span style={{ color: "#FFC800" }}>учить испанский!</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reasons.map(({ emoji, title, text }, i) => (
            <div key={title} className="duo-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
              transition: `all 0.5s cubic-bezier(0.34,1.2,0.64,1) ${i * 90 + 150}ms`,
            }}>
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="duo-card-title">{title}</div>
              <div className="duo-card-text">{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-num-duo">02 / 06</div>
    </div>
  );
}

// ========== Слайд 3: Про Duolingo ==========
function SlideDuolingo() {
  const { ref, visible } = useVisible();
  const stats = [
    { emoji: "🦉", num: "500 млн", label: "пользователей" },
    { emoji: "🌐", num: "40+", label: "языков" },
    { emoji: "🔥", num: "365 дней", label: "макс. стрик" },
    { emoji: "💎", num: "Бесплатно", label: "основной режим" },
  ];
  return (
    <div ref={ref} className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0D2137 100%)" }}>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-14 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(25px)", transition: "all 0.6s ease" }}>
          <span className="duo-badge mb-3 inline-block">🦉 Duolingo</span>
          <h2 className="duo-section-title mb-3">Самое крутое<br /><span style={{ color: "#58CC02" }}>приложение для языков!</span></h2>
          <p className="duo-body-text mb-8">Duolingo — это как игра, только вместо монстров побеждаешь новые слова и фразы 💪</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(({ emoji, num, label }, i) => (
            <div key={label} className="duo-stat-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
              transition: `all 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 100 + 200}ms`,
            }}>
              <div className="text-3xl mb-1">{emoji}</div>
              <div className="duo-stat-num">{num}</div>
              <div className="duo-stat-label">{label}</div>
            </div>
          ))}
        </div>
        <div className="duo-tip-box" style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 700ms",
        }}>
          <span className="text-2xl">💡</span>
          <p className="duo-tip-text">
            <b>Лайфхак:</b> занимайся по 10–15 минут каждый день — и через год будешь говорить по-испански лучше, чем многие взрослые!
          </p>
        </div>
      </div>
      <div className="slide-num-duo">03 / 06</div>
    </div>
  );
}

// ========== Слайд 4: Диаграмма Топ-10 ==========
function SlideChart() {
  const { ref, visible } = useVisible();
  const max = 180;
  return (
    <div ref={ref} className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0D2137 100%)" }}>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-14 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(25px)", transition: "all 0.6s ease" }}>
          <span className="duo-badge mb-3 inline-block">📊 Статистика Duolingo 2024</span>
          <h2 className="duo-section-title mb-1">
            Топ-10 языков <span style={{ color: "#1CB0F6" }}>по числу</span><br />
            <span style={{ color: "#1CB0F6" }}>учеников в мире</span>
          </h2>
          <p className="duo-small-note mb-5">млн активных учеников в месяц</p>
        </div>
        <div className="space-y-2">
          {top10.map(({ lang, learners, flag, color }, i) => (
            <div key={lang} className="flex items-center gap-3" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.3s ease ${i * 70 + 200}ms`,
            }}>
              <div className="duo-chart-rank">{i + 1}</div>
              <div className="duo-chart-flag">{flag}</div>
              <div className="duo-chart-name">{lang}</div>
              <div className="flex-1 h-7 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                <AnimatedBar value={learners} max={max} color={color} delay={i * 70 + 350} visible={visible} />
              </div>
              <div className="duo-chart-val">{learners} млн</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg">🥈</span>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
            Испанский — стабильно второй год за годом! Ты в отличной компании.
          </p>
        </div>
      </div>
      <div className="slide-num-duo">04 / 06</div>
    </div>
  );
}

// ========== Слайд 5: Факты ==========
function SlideFacts() {
  const { ref, visible } = useVisible();
  const facts = [
    { emoji: "🐙", text: "В испанском языке нет слова «скучно» в привычном смысле — говорят «мне делается скучно»!" },
    { emoji: "🔔", text: "Испанский и итальянский так похожи, что носители понимают друг друга на 80%!" },
    { emoji: "🧀", text: "Слово «mosquito» — испанское и означает «маленькая мошка». Мы его взяли оттуда!" },
    { emoji: "🎵", text: "Испанский — один из самых музыкальных языков. Рэп и реггетон часто поют именно на нём!" },
    { emoji: "📖", text: "«Дон Кихот» на испанском — вторая по переводам книга в мире после Библии" },
    { emoji: "⚡", text: "Испанский — один из самых лёгких языков для изучения. Всего ~600 часов практики!" },
  ];
  return (
    <div ref={ref} className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0D2137 100%)" }}>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-14 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(25px)", transition: "all 0.6s ease" }}>
          <span className="duo-badge mb-3 inline-block">🤩 Это ты не знал!</span>
          <h2 className="duo-section-title mb-8">Безумные факты<br /><span style={{ color: "#FF4B4B" }}>об испанском!</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facts.map(({ emoji, text }, i) => (
            <div key={i} className="duo-fact-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.5s ease ${i * 100 + 200}ms`,
            }}>
              <span className="text-2xl flex-shrink-0">{emoji}</span>
              <p className="duo-fact-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-num-duo">05 / 06</div>
    </div>
  );
}

// ========== Слайд 6: Финал ==========
function SlideFinish() {
  const { ref, visible } = useVisible();
  const steps = [
    "Каждый день — хотя бы один урок в Duolingo 🔥",
    "Учи 10 новых слов в неделю — через год знаешь 500! 📚",
    "Смотри мультики на испанском — весело и полезно 🎬",
    "Найди друга по переписке из Испании или Мексики ✉️",
  ];
  return (
    <div ref={ref} className="duo-slide" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0F3460 100%)" }}>
      <div className="duo-confetti-bg" />
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 md:px-14 max-w-4xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.7)", transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)" }}
          className="text-7xl mb-4">🏆</div>
        <h2 style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 200ms" }} className="duo-section-title mb-2">
          ¡Muy bien!<br /><span style={{ color: "#58CC02" }}>Ты крутой!</span>
        </h2>
        <p style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 350ms" }} className="duo-body-text mb-8">
          Мой план: стать настоящим знатоком испанского 💪
        </p>
        <div className="w-full max-w-lg text-left space-y-3 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="duo-step" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.5s ease ${i * 130 + 500}ms`,
            }}>
              <span className="duo-step-num">{i + 1}</span>
              <span className="duo-step-text">{step}</span>
            </div>
          ))}
        </div>
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 1100ms" }}
          className="duo-final-badge">
          ¡Hasta luego! 👋 До новых встреч!
        </div>
      </div>
      <div className="slide-num-duo">06 / 06</div>
    </div>
  );
}

// ========== Главный компонент ==========
export default function Index() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    const els = containerRef.current?.querySelectorAll(".duo-slide");
    els?.[i]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onScroll = () => {
      const els = c.querySelectorAll(".duo-slide");
      els.forEach((el, i) => {
        const top = (el as HTMLElement).offsetTop;
        if (c.scrollTop >= top - c.clientHeight / 2) setActive(i);
      });
    };
    c.addEventListener("scroll", onScroll);
    return () => c.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") scrollTo(Math.min(active + 1, slides.length - 1));
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") scrollTo(Math.max(active - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="duo-root">
      <nav className="duo-nav">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => scrollTo(i)}
            className={`duo-nav-btn ${active === i ? "duo-nav-btn-active" : ""}`}
            title={s.label}>
            <span className="duo-nav-emoji">{s.emoji}</span>
            <span className="duo-nav-label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div ref={containerRef} className="duo-scroll">
        <SlideTitle />
        <SlideWhy />
        <SlideDuolingo />
        <SlideChart />
        <SlideFacts />
        <SlideFinish />
      </div>
    </div>
  );
}
