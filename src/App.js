import React, { useState, useEffect, useRef } from "react";

const PURPLE = { bg: "#EEEDFE", mid: "#534AB7", dark: "#3C3489", darker: "#26215C", border: "#AFA9EC" };
const TEAL   = { bg: "#E1F5EE", mid: "#1D9E75", dark: "#085041", darker: "#04342C", border: "#5DCAA5" };
const CORAL  = { bg: "#FAECE7", mid: "#D85A30", dark: "#712B13", darker: "#4A1B0C", border: "#F0997B" };
const BLUE   = { bg: "#E6F1FB", mid: "#378ADD", dark: "#0C447C", border: "#85B7EB" };

const skills = [
  { name: "Communication",  pct: 90, color: PURPLE.mid, bg: PURPLE.bg },
  { name: "Research skills", pct: 85, color: TEAL.mid,   bg: TEAL.bg },
  { name: "Data analysis",  pct: 80, color: BLUE.mid,   bg: BLUE.bg },
  { name: "MS Office",      pct: 88, color: CORAL.mid,  bg: CORAL.bg },
  { name: "SPSS",           pct: 72, color: PURPLE.mid, bg: PURPLE.bg },
  { name: "QGIS",           pct: 65, color: TEAL.mid,   bg: TEAL.bg },
];

const experience = [
  {
    title: "Research Assistant",
    org: "GTA Foundation",
    period: "2024–2025",
    desc: "Worked on maternal health records, suicide prevention, and antimicrobial stewardship programs.",
    chips: ["Maternal health", "Research", "AMS"],
    accent: PURPLE,
  },
  {
    title: "Data Entry Specialist",
    org: "Karuna Foundation Nepal",
    period: "2023",
    desc: "Managed disability-related data within MIS systems, ensuring accuracy and consistency.",
    chips: ["MIS", "Data management"],
    accent: TEAL,
  },
  {
    title: "Health Office Volunteer",
    org: "Local Health Office",
    period: "2020",
    desc: "Assisted COVID-19 vaccination operations and public communication campaigns.",
    chips: ["COVID-19", "Public outreach"],
    accent: CORAL,
  },
];

function SkillBar({ name, pct, color, bg, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(pct), 80);
      return () => clearTimeout(t);
    } else {
      setWidth(0);
    }
  }, [animate, pct]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
        <span style={{ color: "var(--color-text-primary)" }}>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: "var(--color-background-secondary)", borderRadius: 4, overflow: "hidden", border: "0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 4, transition: "width 0.9s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function FadeSection({ children, active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (active && ref.current) {
      const els = ref.current.querySelectorAll(".anim-child");
      els.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(16px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        }, i * 70);
      });
    }
  }, [active]);
  if (!active) return null;
  return <div ref={ref}>{children}</div>;
}

const sectionLabel = {
  fontSize: 11, fontWeight: 500, letterSpacing: "0.06em",
  color: "var(--color-text-secondary)", textTransform: "uppercase", marginBottom: 10
};

const card = {
  background: "var(--color-background-primary)",
  border: "0.5px solid var(--color-border-tertiary)",
  borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1rem"
};

export default function Portfolio() {
  const [tab, setTab] = useState("about");
  const tabs = ["about", "experience", "skills", "education"];

  return (
    <div style={{ padding: "1.5rem 0 0", fontFamily: "var(--font-sans)", maxWidth: 640, margin: "0 auto" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: PURPLE.bg, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 24, fontWeight: 500,
          color: PURPLE.dark, margin: "0 auto 1rem",
          border: `2px solid ${PURPLE.border}`
        }}>PB</div>
        <h1 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>
          Prabin Upadhayay Bhurtel
        </h1>
        <div style={{ height: 3, width: 48, background: PURPLE.mid, borderRadius: 2, margin: "8px auto 0" }} />
        <p style={{ fontSize: 14, color: PURPLE.mid, marginTop: 10, fontWeight: 500 }}>
          Public Health Professional
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>
          Boudha, Kathmandu · +977-9865712809
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <a href="mailto:prabinbhurtel2000@gmail.com" style={{
            background: PURPLE.mid, color: PURPLE.bg,
            borderRadius: 8, padding: "9px 22px", fontSize: 13, textDecoration: "none"
          }}>Email me</a>
          <a href="https://www.linkedin.com/in/prabin-bhurtel-a1672a293/" target="_blank" style={{
            background: "transparent", border: `0.5px solid ${PURPLE.mid}`, color: PURPLE.mid,
            borderRadius: 8, padding: "9px 22px", fontSize: 13, textDecoration: "none"
          }}>LinkedIn ↗</a>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10, marginBottom: "1.5rem" }}>
        {[["5+", "Years experience", PURPLE.mid], ["3", "Organisations", TEAL.mid], ["6", "Core skills", CORAL.mid]].map(([n, l, c]) => (
          <div key={l} style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "1rem", textAlign: "center", border: "0.5px solid var(--color-border-tertiary)" }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: c }}>{n}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", margin: "0 0 1.25rem", padding: 6, background: "var(--color-background-secondary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? PURPLE.mid : "transparent",
            color: tab === t ? PURPLE.bg : "var(--color-text-secondary)",
            border: "none", borderRadius: 8, padding: "7px 18px",
            fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)",
            transition: "all 0.2s", textTransform: "capitalize"
          }}>{t}</button>
        ))}
      </div>

      {/* About */}
      <FadeSection active={tab === "about"}>
        <div className="anim-child" style={card}>
          <p style={sectionLabel}>Summary</p>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.75 }}>
            Detail-oriented public health graduate with strong analytical and communication skills.
            Passionate about improving community health through research, data analysis, and outreach programs.
          </p>
        </div>
        <div className="anim-child" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(0,1fr))", gap: 10 }}>
          {[
            ["Location", "Boudha, Kathmandu, Nepal", PURPLE],
            ["Availability", "Open to opportunities", TEAL],
          ].map(([label, val, c]) => (
            <div key={label} style={{ background: c.bg, border: `0.5px solid ${c.border}`, borderRadius: 12, padding: "1.25rem 1.5rem" }}>
              <div style={{ fontSize: 12, color: c.dark, fontWeight: 500, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, color: c.darker }}>{val}</div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Experience */}
      <FadeSection active={tab === "experience"}>
        <p className="anim-child" style={sectionLabel}>Work history</p>
        {experience.map((e, i) => (
          <div key={i} className="anim-child" style={{ display: "flex", gap: 14, marginBottom: i < experience.length - 1 ? 0 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: e.accent.mid, border: `2px solid ${e.accent.border}`, flexShrink: 0, marginTop: 5 }} />
              {i < experience.length - 1 && <div style={{ width: 1, background: "var(--color-border-tertiary)", flex: 1, minHeight: 16, margin: "4px 0 4px 5.5px" }} />}
            </div>
            <div style={{ ...card, flex: 1, borderLeft: `2px solid ${e.accent.mid}`, borderRadius: "0 12px 12px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>{e.title}</p>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: 13, color: e.accent.mid, margin: "3px 0 8px" }}>{e.org}</p>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65 }}>{e.desc}</p>
              <div style={{ marginTop: 10 }}>
                {e.chips.map(ch => (
                  <span key={ch} style={{ display: "inline-block", fontSize: 11, padding: "3px 9px", borderRadius: 20, margin: 3, background: e.accent.bg, color: e.accent.dark }}>{ch}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </FadeSection>

      {/* Skills */}
      <FadeSection active={tab === "skills"}>
        <div className="anim-child" style={card}>
          <p style={sectionLabel}>Proficiency</p>
          {skills.map(s => <SkillBar key={s.name} {...s} animate={tab === "skills"} />)}
        </div>
        <div className="anim-child" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 8 }}>
          {[
            ["SPSS", "Statistical", PURPLE],
            ["QGIS", "Geospatial", TEAL],
            ["MS Office", "Productivity", CORAL],
            ["Research", "Methodology", BLUE],
          ].map(([name, sub, c]) => (
            <div key={name} style={{ background: c.bg, border: `0.5px solid ${c.border}`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.dark }}>{name}</div>
              <div style={{ fontSize: 11, color: c.mid, marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* Education */}
      <FadeSection active={tab === "education"}>
        <div className="anim-child" style={{ background: PURPLE.bg, border: `0.5px solid ${PURPLE.border}`, borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, background: "#CECBF6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🎓</div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, color: PURPLE.darker }}>Bachelor of Public Health</p>
              <p style={{ fontSize: 13, color: PURPLE.mid, margin: "4px 0 8px" }}>Nepal Institute of Health Sciences</p>
              <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: "#CECBF6", color: PURPLE.darker }}>2018 – 2023</span>
            </div>
          </div>
        </div>
        <div className="anim-child" style={card}>
          <p style={sectionLabel}>Areas of focus</p>
          {[
            ["Epidemiology", PURPLE], ["Community health", TEAL], ["Biostatistics", BLUE],
            ["Health policy", CORAL], ["Research methods", PURPLE], ["Health informatics", TEAL]
          ].map(([name, c]) => (
            <span key={name} style={{ display: "inline-block", fontSize: 11, padding: "3px 9px", borderRadius: 20, margin: 3, background: c.bg, color: c.dark }}>{name}</span>
          ))}
        </div>
      </FadeSection>

      <div style={{ textAlign: "center", fontSize: 12, color: "var(--color-text-secondary)", marginTop: "2rem", paddingBottom: "1rem" }}>
        © 2025 Prabin Bhurtel
      </div>
    </div>
  );
}