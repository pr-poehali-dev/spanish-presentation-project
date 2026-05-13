import { useState, useEffect, useRef } from "react";

const slides = [
  { id: "title", label: "Начало" },
  { id: "spanish", label: "Испанский" },
  { id: "facts", label: "Факты" },
  { id: "chart", label: "Топ-10" },
  { id: "stats", label: "Статистика" },
  { id: "conclusion", label: "Выводы" },
];

const top10Languages = [
  { lang: "Английский", speakers: 1500, color: "#4A90D9" },
  { lang: "Мандаринский", speakers: 1100, color: "#357ABD" },
  { lang: "Хинди", speakers: 600, color: "#5BA3E8" },
  { lang: "Испанский", speakers: 560, color: "#C9A84C" },
  { lang: "Французский", speakers: 310, color: "#4A90D9" },
  { lang: "Арабский", speakers: 290, color: "#357ABD" },
  { lang: "Бенгальский", speakers: 270, color: "#5BA3E8" },
  { lang: "Русский", speakers: 255, color: "#C9A84C" },
  { lang: "Португальский", speakers: 240, color: "#4A90D9" },
  { lang: "Урду", speakers: 230, color: "#357ABD" },
];

const speakersStats = [
  { region: "Мексика", value: 130, total: 130 },
  { region: "Колумбия", value: 51, total: 130 },
  { region: "Испания", value: 48, total: 130 },
  { region: "Аргентина", value: 45, total: 130 },
  { region: "Перу", value: 33, total: 130 },
  { region: "Венесуэла", value: 32, total: 130 },
  { region: "Чили", value: 19, total: 130 },
  { region: "Куба", value: 11, total: 130 },
];

function useIntersectionObserver(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedBar({
  value,
  max,
  color,
  delay = 0,
  visible,
}: {
  value: number;
  max: number;
  color: string;
  delay?: number;
  visible: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      setWidth((value / max) * 100);
    }, delay);
    return () => clearTimeout(timeout);
  }, [visible, value, max, delay]);

  return (
    <div className="h-full rounded-sm" style={{
      width: `${width}%`,
      backgroundColor: color,
      transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
    }} />
  );
}

function CountUp({ target, visible, suffix = "" }: { target: number; visible: boolean; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span>{count.toLocaleString("ru")}{suffix}</span>;
}

// Slide 1: Title
function TitleSlide() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div className="slide-container" style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #0F1629 50%, #0A0E1A 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(74,144,217,0.08) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
      }} />
      <div className="grid-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <div style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="mb-6">
            <span className="tag-pill">Исследование</span>
          </div>
          <h1 className="title-main mb-4">
            Языки мира
          </h1>
          <p className="subtitle-text mb-8" style={{ transitionDelay: "0.2s", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>
            Многообразие, распространение и<br />статистика языкового наследия человечества
          </p>
          <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.8s 0.5s" }}>
            <div className="flex gap-8 justify-center flex-wrap">
              {[["7 000+", "языков в мире"], ["560 млн", "носителей испанского"], ["1.5 млрд", "говорят по-английски"]].map(([num, label]) => (
                <div key={num} className="stat-mini">
                  <span className="stat-mini-num">{num}</span>
                  <span className="stat-mini-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="slide-number">01 / 06</div>
    </div>
  );
}

// Slide 2: Spanish
function SpanishSlide() {
  const { ref, visible } = useIntersectionObserver(0.2);

  return (
    <div ref={ref} className="slide-container" style={{ background: "linear-gradient(150deg, #0A0E1A 0%, #0D1420 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 70% 30%, rgba(201,168,76,0.07) 0%, transparent 55%)`,
      }} />

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <span className="tag-pill mb-4 inline-block">Испанский язык</span>
          <h2 className="section-title mb-10">Второй язык мира<br /><span style={{ color: "#C9A84C" }}>по числу носителей</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { delay: 100, icon: "🌍", title: "21 страна", desc: "Официальный статус в 21 государстве на 4 континентах мира" },
            { delay: 200, icon: "📚", title: "500 лет истории", desc: "Восходит к латыни, активно распространился в эпоху Великих географических открытий" },
            { delay: 300, icon: "📈", title: "Рост 60%", desc: "За последние 30 лет число говорящих на испанском выросло на 60%" },
            { delay: 400, icon: "🎓", title: "21 млн учеников", desc: "Испанский — самый популярный иностранный язык для изучения в мире" },
            { delay: 500, icon: "🌐", title: "4-й в интернете", desc: "Занимает 4-е место по объёму контента в глобальной сети" },
            { delay: 600, icon: "💼", title: "Деловой язык", desc: "Открывает доступ к рынку в 600+ млн потребителей в Латинской Америке" },
          ].map(({ delay, icon, title, desc }) => (
            <div key={title} className="info-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: `all 0.6s ease ${delay}ms`,
            }}>
              <div className="text-2xl mb-3">{icon}</div>
              <div className="info-card-title">{title}</div>
              <div className="info-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-number">02 / 06</div>
    </div>
  );
}

// Slide 3: Interesting Facts
function FactsSlide() {
  const { ref, visible } = useIntersectionObserver(0.2);

  const facts = [
    { num: "7 000", label: "языков существует в мире сегодня", icon: "🗺️" },
    { num: "23", label: "языка охватывают половину населения Земли", icon: "🌐" },
    { num: "40%", label: "языков находятся под угрозой исчезновения", icon: "⚠️" },
    { num: "1", label: "язык исчезает каждые 2 недели", icon: "📉" },
    { num: "Папуа", label: "Новая Гвинея — 840 языков на одной территории", icon: "🏝️" },
    { num: "2 млрд", label: "человек изучают иностранные языки прямо сейчас", icon: "✍️" },
  ];

  return (
    <div ref={ref} className="slide-container" style={{ background: "linear-gradient(150deg, #0A0E1A 0%, #0C1218 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 30% 70%, rgba(74,144,217,0.06) 0%, transparent 55%)`,
      }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span className="tag-pill mb-4 inline-block">Факты</span>
          <h2 className="section-title mb-10">Интересные факты о<br /><span style={{ color: "#4A90D9" }}>языковом многообразии</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map(({ num, label, icon }, i) => (
            <div key={num + label} className="fact-card" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.92)",
              transition: `all 0.5s ease ${i * 100 + 150}ms`,
            }}>
              <div className="fact-icon">{icon}</div>
              <div className="fact-num">{num}</div>
              <div className="fact-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-number">03 / 06</div>
    </div>
  );
}

// Slide 4: Chart Top-10
function ChartSlide() {
  const { ref, visible } = useIntersectionObserver(0.2);
  const maxVal = 1500;

  return (
    <div ref={ref} className="slide-container" style={{ background: "linear-gradient(150deg, #0A0E1A 0%, #0D1420 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(74,144,217,0.07) 0%, transparent 55%)`,
      }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span className="tag-pill mb-4 inline-block">Диаграмма</span>
          <h2 className="section-title mb-8">Топ-10 <span style={{ color: "#4A90D9" }}>самых изучаемых</span><br />языков мира</h2>
        </div>

        <div className="space-y-3">
          {top10Languages.map(({ lang, speakers, color }, i) => (
            <div key={lang} className="flex items-center gap-4" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${i * 80 + 200}ms`,
            }}>
              <div className="chart-lang-label">{lang}</div>
              <div className="flex-1 h-8 bg-white/5 rounded-sm overflow-hidden">
                <AnimatedBar value={speakers} max={maxVal} color={lang === "Испанский" ? "#C9A84C" : color} delay={i * 80 + 300} visible={visible} />
              </div>
              <div className="chart-value">{speakers} млн</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>* Данные включают носителей и изучающих язык. Источник: Ethnologue, 2024</div>
      </div>
      <div className="slide-number">04 / 06</div>
    </div>
  );
}

// Slide 5: Stats
function StatsSlide() {
  const { ref, visible } = useIntersectionObserver(0.2);

  return (
    <div ref={ref} className="slide-container" style={{ background: "linear-gradient(150deg, #0A0E1A 0%, #0C1218 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 40%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
      }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-5xl mx-auto w-full">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span className="tag-pill mb-4 inline-block">Статистика</span>
          <h2 className="section-title mb-2">Говорящих на испанском<br /><span style={{ color: "#C9A84C" }}>по странам</span></h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>млн человек</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {speakersStats.map(({ region, value }, i) => (
            <div key={region} className="flex items-center gap-4" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${i * 100 + 200}ms`,
            }}>
              <div className="stats-country">{region}</div>
              <div className="flex-1">
                <div className="h-6 bg-white/5 rounded-sm overflow-hidden">
                  <AnimatedBar value={value} max={130} color="#C9A84C" delay={i * 100 + 400} visible={visible} />
                </div>
              </div>
              <div className="stats-value">
                {visible ? <CountUp target={value} visible={visible} suffix=" млн" /> : `${value} млн`}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { val: 560, suffix: " млн", label: "Всего носителей" },
            { val: 21, suffix: "", label: "Стран-носителей" },
            { val: 75, suffix: "%", label: "Взаимопонятность с португальским" },
          ].map(({ val, suffix, label }, i) => (
            <div key={label} className="big-stat-card" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ease ${800 + i * 150}ms`,
            }}>
              <div className="big-stat-num">
                {visible ? <CountUp target={val} visible={visible} suffix={suffix} /> : `${val}${suffix}`}
              </div>
              <div className="big-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-number">05 / 06</div>
    </div>
  );
}

// Slide 6: Conclusion
function ConclusionSlide() {
  const { ref, visible } = useIntersectionObserver(0.2);

  const conclusions = [
    "Испанский язык — второй в мире по числу носителей и первый по скорости роста",
    "Языковое многообразие планеты — ценнейшее культурное наследие, требующее защиты",
    "Знание нескольких языков открывает доступ к миллиардам людей и новым рынкам",
    "Каждые 2 недели исчезает один язык — вместе с ним уникальный взгляд на мир",
  ];

  return (
    <div ref={ref} className="slide-container" style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #0F1629 50%, #0A0E1A 100%)" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)`,
      }} />
      <div className="grid-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-4xl mx-auto w-full text-center">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span className="tag-pill mb-6 inline-block">Выводы</span>
          <h2 className="section-title mb-10">Ключевые <span style={{ color: "#C9A84C" }}>заключения</span></h2>
        </div>

        <div className="space-y-4 w-full text-left">
          {conclusions.map((text, i) => (
            <div key={i} className="conclusion-item" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.6s ease ${i * 150 + 200}ms`,
            }}>
              <div className="conclusion-num">0{i + 1}</div>
              <div className="conclusion-text">{text}</div>
            </div>
          ))}
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 1s" }} className="mt-10">
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            ЯЗЫКИ МИРА · 2024 · ИССЛЕДОВАНИЕ
          </p>
        </div>
      </div>
      <div className="slide-number">06 / 06</div>
    </div>
  );
}

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slideEls = container.querySelectorAll(".slide-container");
    if (slideEls[idx]) {
      slideEls[idx].scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideEls = container.querySelectorAll(".slide-container");
      const containerTop = container.scrollTop;
      const height = container.clientHeight;
      slideEls.forEach((el, i) => {
        const top = (el as HTMLElement).offsetTop;
        if (containerTop >= top - height / 2) {
          setActiveSlide(i);
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="presentation-root">
      {/* Navigation dots */}
      <nav className="nav-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`nav-dot ${activeSlide === i ? "nav-dot-active" : ""}`}
            onClick={() => scrollToSlide(i)}
            title={s.label}
          >
            <span className="nav-dot-label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div ref={containerRef} className="slides-scroll">
        <TitleSlide />
        <SpanishSlide />
        <FactsSlide />
        <ChartSlide />
        <StatsSlide />
        <ConclusionSlide />
      </div>
    </div>
  );
}
