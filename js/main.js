const D = PACE_ZERO;
// Se alguma lista for apagada ou comentada no dados.js, trata como vazia em vez de quebrar o site
for (const lista of ["numeros", "corridas", "eventos", "galeria", "podios", "parceiros"]) D[lista] ||= [];
D.contato ||= {};
const $ = (s) => document.querySelector(s);
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const dataDe = (iso, hora = "00:00") => new Date(`${iso}T${hora}:00`);
const diaSemana = (d) => d.toLocaleDateString("pt-BR", { weekday: "long" });
const dataLonga = (d) => d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });

// Só mostra corridas e eventos que ainda não passaram (com folga até o fim do dia)
const futuros = (lista) =>
  lista
    .map((x) => ({ ...x, quando: dataDe(x.data, x.hora) }))
    .filter((x) => x.quando.getTime() + 86400000 > Date.now())
    .sort((a, b) => a.quando - b.quando);

/* ---------- MENU ---------- */
$("#menuBtn").addEventListener("click", () => $("#menu").classList.toggle("aberto"));
$("#menu").addEventListener("click", (e) => e.target.tagName === "A" && $("#menu").classList.remove("aberto"));
addEventListener("scroll", () => $("#topo").classList.toggle("rolado", scrollY > 40));

/* ---------- NÚMEROS ---------- */
// Provas e km com auto somam as corridas que já passaram depois de contarDesde
const kmDe = (d) => parseFloat(String(d).replace(",", ".")) || 0;
const disputadas = D.corridas
  .map((c) => ({ ...c, quando: dataDe(c.data, c.hora) }))
  .filter((c) => c.quando >= dataDe(D.contarDesde || "9999-12-31") && c.quando.getTime() + 86400000 <= Date.now());
const somaAuto = {
  provas: disputadas.length,
  km: disputadas.reduce((t, c) => {
    if (c.atletas && typeof c.atletas === "object")
      return t + Object.entries(c.atletas).reduce((s, [d, n]) => s + kmDe(d) * n, 0);
    return t + Math.max(0, ...(c.distancias || []).map(kmDe)) * (c.atletas || 1);
  }, 0),
};
const valorDe = (n) =>
  n.auto ? Math.round((Number(String(n.valor).replace(/\./g, "").replace(",", ".")) || 0) + somaAuto[n.auto]).toLocaleString("pt-BR") : n.valor;
$("#numeros").innerHTML = D.numeros.map((n) => `<div class="numero"><b>${valorDe(n)}</b><span>${n.rotulo}</span></div>`).join("");

/* ---------- CORRIDAS ---------- */
const corridas = futuros(D.corridas);

/* Compartilhar no WhatsApp e salvar na agenda.
   No iPhone a agenda vem como arquivo .ics (abre direto no Calendário); nos outros, Google Agenda. */
const doisDig = (n) => String(n).padStart(2, "0");
const carimbo = (d) => `${d.getFullYear()}${doisDig(d.getMonth() + 1)}${doisDig(d.getDate())}T${doisDig(d.getHours())}${doisDig(d.getMinutes())}00`;
const ehIphone = /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && "ontouchend" in document);
const fimDe = (c) => new Date(c.quando.getTime() + 3 * 3600000);
const detalhesDe = (c) => `Distâncias: ${c.distancias.join(" / ")}\nInscrição: ${c.link}`;

const linkWhats = (c) =>
  "https://wa.me/?text=" +
  encodeURIComponent(
    `🏃 ${c.nome}\n📅 ${dataLonga(c.quando)} às ${c.hora}\n📍 ${c.cidade}\n📏 ${c.distancias.join(" / ")}\n📝 Inscrição: ${c.link}\n\nBora junto com o Pace Zero! 🧡\nhttps://pacezero.com.br/#corridas`
  );

const linkAgenda = (c) =>
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(c.nome)}&dates=${carimbo(c.quando)}/${carimbo(fimDe(c))}&ctz=America/Sao_Paulo` +
  `&location=${encodeURIComponent(c.cidade)}&details=${encodeURIComponent(detalhesDe(c))}`;

function icsDe(c) {
  const esc = (s) => String(s).replace(/[\\,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pace Zero//PT-BR", "BEGIN:VEVENT",
    `UID:${c.data}-${c.nome.replace(/\W/g, "")}@pacezero.com.br`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g, "")}`,
    `DTSTART:${carimbo(c.quando)}`, `DTEND:${carimbo(fimDe(c))}`,
    `SUMMARY:${esc(c.nome)}`, `LOCATION:${esc(c.cidade)}`, `DESCRIPTION:${esc(detalhesDe(c))}`,
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", `DESCRIPTION:${esc(c.nome)} é amanhã`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-agenda]");
  if (!a || !ehIphone) return;
  e.preventDefault();
  location.href = URL.createObjectURL(new Blob([icsDe(corridas[a.dataset.agenda])], { type: "text/calendar" }));
});

$("#listaCorridas").innerHTML = corridas.length
  ? corridas
      .map(
        (c, i) => `
    <article class="corrida ${i === 0 ? "proxima" : ""} revelar">
      <div class="corrida-data">
        <b>${String(c.quando.getDate()).padStart(2, "0")}</b>
        <span>${MESES[c.quando.getMonth()]}</span>
        <small>${diaSemana(c.quando)}</small>
      </div>
      <img class="corrida-img" src="${c.imagem || "assets/img/logo.png"}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/img/logo.png'">
      <div>
        ${i === 0 ? '<span class="selo">Próxima prova</span>' : ""}
        <h3>${c.nome}</h3>
        <div class="corrida-meta">
          <span>📍 ${c.cidade}</span>
          <span>🕖 ${c.hora}</span>
          <span class="km-auto" data-cidade="${c.cidade}" data-km="${c.distanciaKm || ""}">🚗 calculando distância…</span>
        </div>
        <div class="chips">${c.distancias.map((d) => `<span class="chip">${d}</span>`).join("")}</div>
      </div>
      <div class="corrida-acoes">
        <a class="btn btn-sm" href="${c.link}" target="_blank" rel="noopener" data-goatcounter-click="inscricao: ${c.nome}">Inscrição</a>
        <a class="btn btn-sm btn-ghost" target="_blank" rel="noopener"
           href="https://www.google.com/maps/dir/${encodeURIComponent(D.base.nome + " SP")}/${encodeURIComponent(c.cidade)}">Como chegar</a>
        <a class="btn btn-sm btn-ghost" href="${linkWhats(c)}" target="_blank" rel="noopener" data-goatcounter-click="compartilhar: ${c.nome}">Compartilhar</a>
        <a class="btn btn-sm btn-ghost" href="${linkAgenda(c)}" target="_blank" rel="noopener" data-agenda="${i}" data-goatcounter-click="agenda: ${c.nome}">Agenda</a>
      </div>
    </article>`
      )
      .join("")
  : `<p style="color:var(--texto-2)">Novas provas em breve. Fique de olho no nosso Instagram!</p>`;

/* Distância automática: descobre as coordenadas da cidade (OpenStreetMap)
   e calcula a distância de carro a partir de Santa Cruz (OSRM).
   O resultado fica guardado no navegador para não recalcular. */
async function distanciaAte(cidade) {
  const chave = "km:" + cidade;
  try {
    const salvo = localStorage.getItem(chave);
    if (salvo) return Number(salvo);
  } catch {}
  const geo = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(cidade)}`
  ).then((r) => r.json());
  if (!geo.length) throw new Error("cidade não encontrada");
  const { lat, lon } = geo[0];
  const rota = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${D.base.lon},${D.base.lat};${lon},${lat}?overview=false`
  ).then((r) => r.json());
  const km = Math.round(rota.routes[0].distance / 1000);
  try { localStorage.setItem(chave, km); } catch {}
  return km;
}

document.querySelectorAll(".km-auto").forEach(async (el) => {
  const texto = (km) => km <= 5 ? "🏠 Aqui em Santa Cruz" : `🚗 ${km} km de Santa Cruz (ida e volta ${km * 2} km)`;
  if (el.dataset.km) return (el.textContent = texto(el.dataset.km));
  try {
    el.textContent = texto(await distanciaAte(el.dataset.cidade));
  } catch {
    el.remove();
  }
});

/* ---------- CONTAGEM REGRESSIVA ---------- */
function contagem() {
  const alvo = corridas.find((c) => c.quando > Date.now());
  if (!alvo) return ($("#contagem").style.display = "none");
  const s = Math.max(0, (alvo.quando - Date.now()) / 1000);
  const partes = [
    [Math.floor(s / 86400), "dias"],
    [Math.floor((s % 86400) / 3600), "horas"],
    [Math.floor((s % 3600) / 60), "min"],
    [Math.floor(s % 60), "seg"],
  ];
  $("#contagem").innerHTML = `
    <div class="contagem-info"><small>Próxima largada</small><strong>${alvo.nome}</strong></div>
    <div class="contagem-num">${partes.map(([v, r]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${r}</span></div>`).join("")}</div>`;
}
contagem();
setInterval(contagem, 1000);

/* ---------- EVENTOS ---------- */
$("#listaEventos").innerHTML = futuros(D.eventos)
  .map(
    (e) => `
  <article class="evento ${e.destaque ? "destaque" : ""} revelar">
    <span class="evento-emoji">${e.emoji || "📅"}</span>
    <span class="evento-data">${dataLonga(e.quando)} · ${e.hora}</span>
    <h3>${e.nome}</h3>
    <p>${e.descricao}</p>
    <p class="local">📍 ${e.local}</p>
  </article>`
  )
  .join("");

/* ---------- EVENTOS REALIZADOS (os que já passaram, do mais recente ao mais antigo) ---------- */
const realizados = D.eventos
  .map((e) => ({ ...e, quando: dataDe(e.data, e.hora) }))
  .filter((e) => e.quando.getTime() + 86400000 <= Date.now())
  .sort((a, b) => b.quando - a.quando);

$("#listaRealizados").innerHTML = realizados.length
  ? realizados
      .map((e) => {
        const capa = e.fotos?.[0] || "assets/img/logo.png";
        const extras = (e.fotos?.length || 0) > 1 ? `<span class="realizado-qtd">📷 ${e.fotos.length} fotos</span>` : "";
        return `
  <article class="realizado revelar">
    <div class="realizado-foto" data-fotos='${JSON.stringify(e.fotos || [capa])}'>
      <img src="${capa}" alt="${e.nome}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/logo.png'">${extras}
    </div>
    <div class="realizado-info">
      <span class="evento-data">${e.quando.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
      <h3>${e.emoji || ""} ${e.nome}</h3>
      <p>${e.descricao}</p>
      <p class="local">📍 ${e.local}</p>
    </div>
  </article>`;
      })
      .join("")
  : `<p style="color:var(--texto-2)">Os eventos do grupo aparecem aqui depois que acontecem.</p>`;

/* ---------- PÓDIOS (seção some enquanto a lista estiver vazia) ---------- */
if (!D.podios?.length) {
  $("#podios").remove();
  document.querySelector('a[href="#podios"]')?.remove();
} else $("#listaPodios").innerHTML = D.podios
  .map(
    (p) => `
  <article class="podio p${p.posicao} revelar">
    <div class="podio-foto" data-foto="${p.foto}"><img src="${p.foto}" alt="${p.atleta}" loading="lazy"><span class="medalha">${p.posicao}º</span></div>
    <div class="podio-info">
      <small>${p.categoria}</small>
      <h3>${p.atleta}</h3>
      <p>${p.corrida} · ${p.distancia}</p>
      <div class="podio-tempo"><span>Tempo</span><b>${p.tempo}</b></div>
    </div>
  </article>`
  )
  .join("");

/* ---------- GALERIA ---------- */
// A aba "Todas" mostra só as 3 últimas fotos adicionadas
function mostrarAlbum(indice) {
  const albuns = indice === -1 ? D.galeria : [D.galeria[indice]];
  const fotos = albuns.flatMap((al) => al.fotos.map((f) => ({ f, nome: al.nome })));
  $("#listaGaleria").innerHTML = (indice === -1 ? fotos.slice(-3) : fotos)
    .map(({ f, nome }) => `<figure class="foto" data-foto="${f}"><img src="${f}" alt="${nome}" loading="lazy"><figcaption>${nome}</figcaption></figure>`)
    .join("");
  document.querySelectorAll(".albuns-abas button").forEach((b) => b.classList.toggle("ativo", Number(b.dataset.i) === indice));
}
$("#albunsAbas").innerHTML =
  `<button data-i="-1">Todas</button>` + D.galeria.map((al, i) => `<button data-i="${i}">${al.nome}</button>`).join("");
$("#albunsAbas").addEventListener("click", (e) => e.target.dataset.i && mostrarAlbum(Number(e.target.dataset.i)));
mostrarAlbum(-1);

/* ---------- LIGHTBOX ---------- */
let lbFotos = [], lbAtual = 0;
function lbMostrar(i) {
  lbAtual = (i + lbFotos.length) % lbFotos.length;
  $("#lightbox img").src = lbFotos[lbAtual];
  $("#lightbox").classList.toggle("varias", lbFotos.length > 1);
}
const lbFechar = () => $("#lightbox").classList.remove("aberto");

document.addEventListener("click", (e) => {
  const seta = e.target.closest("[data-lb]");
  if (seta) return lbMostrar(lbAtual + Number(seta.dataset.lb));
  const alvo = e.target.closest("[data-foto], [data-fotos]");
  if (alvo) {
    lbFotos = alvo.dataset.fotos ? JSON.parse(alvo.dataset.fotos) : [alvo.dataset.foto];
    lbMostrar(0);
    $("#lightbox").classList.add("aberto");
  } else if (e.target.closest("#lightbox")) {
    lbFechar();
  }
});
addEventListener("keydown", (e) => {
  if (!$("#lightbox").classList.contains("aberto")) return;
  if (e.key === "Escape") lbFechar();
  if (e.key === "ArrowRight") lbMostrar(lbAtual + 1);
  if (e.key === "ArrowLeft") lbMostrar(lbAtual - 1);
});

/* ---------- CALCULADORA DE PACE ---------- */
const fmt = (seg) => {
  seg = Math.round(seg);
  const h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60), s = seg % 60;
  return (h ? `${h}:${String(m).padStart(2, "0")}` : `${m}`) + `:${String(s).padStart(2, "0")}`;
};
function calcular() {
  const dist = Number($("#calcDist").value);
  const total = Number($("#calcH").value) * 3600 + Number($("#calcM").value) * 60 + Number($("#calcS").value);
  if (!total) return;
  $("#calcPace").textContent = fmt(total / dist);
  $("#calcVel").textContent = (dist / (total / 3600)).toFixed(1).replace(".", ",");
  // Previsão pela fórmula de Riegel
  const provas = [[5, "5 km"], [6, "6 km"], [10, "10 km"], [21.0975, "21 km"], [42.195, "42 km"]];
  $("#calcPrev").innerHTML = provas.map(([d, n]) => `<div>${n}<b>${fmt(total * Math.pow(d / dist, 1.06))}</b></div>`).join("");
}
$("#calcForm").addEventListener("input", calcular);
calcular();

/* ---------- CONTATO / PARCEIROS ---------- */
const whats = `https://wa.me/${D.contato.whatsapp}?text=${encodeURIComponent("Olá! Quero correr com o Pace Zero 🧡")}`;
const insta = `https://instagram.com/${D.contato.instagram}`;
$("#btnWhats").href = whats;
$("#btnInsta").href = insta;
if (D.contato.strava) $("#btnStrava").href = D.contato.strava;
else $("#btnStrava").remove();
$("#rodapeLinks").innerHTML = `<a href="${insta}" target="_blank">Instagram</a><a href="${whats}" target="_blank">WhatsApp</a><a href="${D.contato.strava}" target="_blank">Strava</a><a href="mailto:${D.contato.email}">E-mail</a>`;

/* Patrocinadores: aceita só o nome ("Loja X") ou { nome, logo, link }.
   Com link, o card abre o site do patrocinador em outra aba. */
function mostrarParceiros() {
  if (!D.parceiros.length) return $("#parceiros")?.remove();
  $("#listaParceiros").innerHTML = D.parceiros
    .map((p) => {
      const { nome = "", logo, link } = typeof p === "string" ? { nome: p } : p;
      const miolo = logo
        ? `<img src="${logo}" alt="${nome}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:this.alt}))">`
        : `<span>${nome}</span>`;
      return link
        ? `<a class="parceiro ${logo ? "com-logo" : ""}" href="${link}" target="_blank" rel="noopener" title="${nome}">${miolo}</a>`
        : `<div class="parceiro ${logo ? "com-logo" : ""}" title="${nome}">${miolo}</div>`;
    })
    .join("");
}
mostrarParceiros();

/* ---------- ANIMAÇÃO AO ROLAR ---------- */
const obs = new IntersectionObserver((itens) =>
  itens.forEach((i) => i.isIntersecting && (i.target.classList.add("visivel"), obs.unobserve(i.target))), { threshold: 0.12 });
document.querySelectorAll(".revelar").forEach((el) => obs.observe(el));
/* ---------- CONTADOR DE VISITAS (GoatCounter) ---------- */
if (D.goatcounter) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${D.goatcounter}.goatcounter.com/count`;
  document.head.append(s);
}
