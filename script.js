// Skills: logos from the Devicon CDN. To self-host, download the SVGs into assets/ and change the base URL.
const base = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const logo = (n, v = "original") => base + n + "/" + n + "-" + v + ".svg";
const groups = {
  Languages: [
    ["Python", "python"],
    ["C++", "cplusplus"],
    ["TypeScript", "typescript"],
    ["JavaScript", "javascript"],
    ["Java", "java"],
    ["SQL"],
    ["HTML5", "html5"],
    ["CSS3", "css3"],
  ],
  Frameworks: [
    ["NestJS", "nestjs"],
    ["Flask", "flask"],
    ["Next.js", "nextjs"],
    ["React", "react"],
    ["SQLAlchemy", "sqlalchemy"],
    ["Prisma", "prisma"],
    ["HTMX"],
  ],
  Databases: [
    ["PostgreSQL", "postgresql"],
    ["MySQL", "mysql"],
    ["Oracle", "oracle"],
  ],
  "Tools and cloud": [
    ["Git", "git"],
    ["GitHub", "github"],
    ["Linux", "linux"],
    ["Azure", "azure"],
    ["Swagger", "swagger"],
    ["Postman", "postman"],
  ],
};
const root = document.getElementById("skillGroups");
for (const [title, items] of Object.entries(groups)) {
  const g = document.createElement("div");
  g.className = "group";
  g.innerHTML = "<h3>" + title + "</h3><div class='logos'></div>";
  for (const [name, icon] of items) {
    const s = document.createElement("div");
    s.className = "skill";
    const t = document.createElement("span");
    t.className = "t";
    const fallback = () => {
      t.innerHTML = "<span class='txt'>" + name.slice(0, 4) + "</span>";
    };
    if (icon) {
      const i = new Image();
      i.alt = "";
      i.src = logo(icon);
      i.onerror = fallback;
      t.append(i);
    } else fallback();
    s.append(t, name);
    g.querySelector(".logos").append(s);
  }
  root.append(g);
}
// Typing effect
const roles = [
  "REST APIs.",
  "backend services.",
  "database-driven apps.",
  "things in the cloud.",
  "things for the web.",
];
const el = document.getElementById("typed");
let r = 0,
  c = 0,
  del = false;
(function tick() {
  const w = roles[r];
  el.textContent = w.slice(0, c);
  if (!del && c === w.length) {
    del = true;
    return setTimeout(tick, 1600);
  }
  if (del && c === 0) {
    del = false;
    r = (r + 1) % roles.length;
  }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 35 : 70);
})();
// Tilt on project screenshots
if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
  document.querySelectorAll(".shot").forEach((s) => {
    s.addEventListener("mousemove", (e) => {
      const b = s.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5,
        y = (e.clientY - b.top) / b.height - 0.5;
      s.style.transform =
        "perspective(800px) rotateY(" +
        x * 8 +
        "deg) rotateX(" +
        -y * 8 +
        "deg) scale(1.02)";
    });
    s.addEventListener("mouseleave", () => (s.style.transform = ""));
  });
// Highlight current nav link
const links = [...document.querySelectorAll(".nav nav a")];
const ids = ["about", "projects", "skills", "path", "contact"];
function updateNav() {
  let active = null;
  ids.forEach((id) => {
    if (
      document.getElementById(id).getBoundingClientRect().top <=
      innerHeight * 0.5
    )
      active = id;
  });
  // The footer is short, so on reaching the bottom of the page we force "contact"
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
    active = "contact";
  links.forEach((l) => l.classList.toggle("on", l.hash === "#" + active));
}
addEventListener("scroll", updateNav, { passive: true });
addEventListener("resize", updateNav);
updateNav();
document.getElementById("year").textContent = new Date().getFullYear();
