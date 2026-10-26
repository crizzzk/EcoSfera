(function () {
  "use strict";

  var LS_USER = "ecosfera_user";
  var LS_DIAGNOSTICOS = "ecosfera_diagnosticos";
  var LS_GOAL = "ecosfera_meta";
  var LS_PREMIUM = "ecosfera_premium";
  var LS_CALIB = "ecosfera_calibracion";
  var LS_RETOS = "ecosfera_retos";

  /* Funciones Premium: true = activa, false = apagada (el código queda listo, solo no se muestra) */
  var FEATURES = {
    tramo: true,    // 1. Alerta de tramo de tarifa
    sim: true,      // 2. Simulador "¿y si…?"
    roi: true,      // 3. Retorno de inversión con tus datos
    cmp: true,      // 4. Comparar diagnósticos
    retos: true,   // 5. Meta de ahorro y retos         
    calib: true,   // 6. Calibrar con el recibo real    
    pdfPlus: true   // 7. PDF Premium ampliado (3 páginas) 
  };

  var ICONS = {
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2.2h5c.1-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>',
    plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0V8z"/><path d="M12 17v4"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13z"/></svg>',
    fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="1.5"/><path d="M6 10h12"/><path d="M9 5.5v2M9 13v2"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.3c2.6.3 4.5 2.4 4.5 5.7"/></svg>'
  };

  (function () {
    function svg(inner) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>'; }
    ICONS.tv = svg('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>');
    ICONS.wind = svg('<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>');
    ICONS.flame = svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>');
    ICONS.wash = svg('<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M8 6h.01M11 6h.01"/>');
    ICONS.snow = svg('<path d="M12 2v20M4.9 7l14.2 10M4.9 17 19.1 7"/>');
    ICONS.gauge = svg('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>');
    ICONS.sprout = svg('<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>');
    ICONS.wrench = svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>');
    ICONS.trend = svg('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>');
    ICONS.target = svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>');
    ICONS.receipt = svg('<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>');
    ICONS.spark = svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>');
    ICONS.coin = svg('<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.4-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 1.9 0 2.6 5 1.2 5 3.9 0 1.1-1.1 2-2.5 2-1.1 0-2.1-.5-2.5-1.3M12 6.5V8m0 8v1.5"/>');
    ICONS.lock = svg('<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>');
    ICONS.tag = svg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>');
  })();

  var QUESTIONS = [
    { id: "personas", icon: "users", title: "¿Cuántas personas viven en tu casa?",
      options: [
        { value: "1-2", label: "1 a 2 personas" },
        { value: "3-4", label: "3 a 4 personas" },
        { value: "5+", label: "5 o más personas" }
      ] },
    { id: "terma", icon: "bolt", title: "¿Tienes terma eléctrica?",
      options: [
        { value: "no", label: "No tengo" },
        { value: "30", label: "Sí, unos 30 minutos al día" },
        { value: "60", label: "Sí, cerca de 1 hora al día" },
        { value: "120", label: "Sí, 2 horas o más al día" }
      ] },
    { id: "iluminacion", icon: "bulb", title: "¿Cuántos focos mantienes encendidos por la noche, y por cuántas horas?",
      options: [
        { value: "baja", label: "Menos de 3 focos, unas 2 horas" },
        { value: "media", label: "3 a 5 focos, unas 4 horas" },
        { value: "alta", label: "6 focos o más, unas 5 horas" }
      ] },
    { id: "pantallas", icon: "tv", title: "¿Cuántas horas al día están prendidos en total el TV, las computadoras y las consolas?",
      options: [
        { value: "poco", label: "Menos de 3 horas" },
        { value: "medio", label: "Entre 3 y 6 horas" },
        { value: "mucho", label: "Entre 6 y 10 horas" },
        { value: "muchisimo", label: "Más de 10 horas" }
      ] },
    { id: "clima", icon: "wind", title: "¿Usas ventilador o aire acondicionado?",
      options: [
        { value: "no", label: "No uso ninguno" },
        { value: "ventilador", label: "Solo ventilador" },
        { value: "ac_poco", label: "Aire acondicionado, 2 a 4 horas al día" },
        { value: "ac_mucho", label: "Aire acondicionado, 6 horas o más al día" }
      ] },
    { id: "cocina", icon: "flame", title: "¿Con qué cocinas principalmente?",
      options: [
        { value: "gas", label: "Solo cocina a gas" },
        { value: "gas_micro", label: "Gas, pero uso mucho el microondas, la olla arrocera o la freidora de aire" },
        { value: "electrica", label: "Cocina eléctrica o de inducción" }
      ] },
    { id: "lavadora", icon: "wash", title: "¿Cuántas veces a la semana lavas ropa?",
      options: [
        { value: "mano", label: "No tengo lavadora, lavo a mano" },
        { value: "poca", label: "1 o 2 veces con lavadora" },
        { value: "media", label: "3 o 4 veces con lavadora" },
        { value: "mucha", label: "5 veces o más con lavadora" }
      ] },
    { id: "refri", icon: "fridge", title: "¿Qué tan llena o antigua es tu refrigeradora?",
      options: [
        { value: "eficiente", label: "Eficiente o medio llena" },
        { value: "antigua", label: "Muy llena o de modelo antiguo" }
      ] },
    { id: "congeladora", icon: "snow", title: "¿Tienes una congeladora o una segunda refrigeradora?",
      options: [
        { value: "no", label: "No, solo una refrigeradora" },
        { value: "si", label: "Sí, tengo otra" }
      ] },
    { id: "fantasma", icon: "plug", title: "¿Dejas cargadores o electrodomésticos enchufados sin usarlos?",
      options: [
        { value: "nunca", label: "Nunca, desconecto todo" },
        { value: "aveces", label: "A veces se me pasa" },
        { value: "siempre", label: "Casi siempre quedan enchufados" }
      ] },
    { id: "bomba", icon: "gauge", title: "¿Tu casa tiene tanque elevado o cisterna con bomba de agua?",
      options: [
        { value: "no", label: "No tengo" },
        { value: "si", label: "Sí, con bomba eléctrica" }
      ] },
    { id: "agua", icon: "drop", title: "¿Cuántas duchas diarias se dan en tu casa, y de cuánto tiempo en total?",
      options: [
        { value: "cortas", label: "Cortas, menos de 5 minutos" },
        { value: "moderadas", label: "Moderadas, unos 10 minutos" },
        { value: "largas", label: "Largas, más de 15 minutos" }
      ] },
    { id: "riego", icon: "sprout", title: "¿Riegas plantas o lavas el carro o el patio con manguera?",
      options: [
        { value: "no", label: "No" },
        { value: "poco", label: "Una vez por semana" },
        { value: "mucho", label: "Varias veces por semana" }
      ] },
    { id: "fugas", icon: "wrench", title: "¿Tienes caños que gotean o un inodoro que pierde agua?",
      options: [
        { value: "no", label: "No, todo está bien" },
        { value: "grifo", label: "Algún caño gotea" },
        { value: "inodoro", label: "El inodoro sigue corriendo o pierde agua" }
      ] },
    { id: "social", icon: "tag", title: "¿Tu recibo de agua tiene tarifa social o subsidio?",
      options: [
        { value: "no", label: "No, o no lo sé" },
        { value: "si", label: "Sí, tengo tarifa social o subsidio" }
      ] }
  ];

  /* ==========================================================================
     CONVERSIÓN A SOLES — SAN JUAN DE LURIGANCHO (Lima)
     Electricidad: Pluz Energía Perú (distribuidora de Lima Norte, incluye SJL)
     Agua:         Sedapal (tarifas reguladas por Sunass)
     Si alguna tarifa cambia, solo edita TARIFA o AGUA.
     ========================================================================== */
  var DISTRITO = "San Juan de Lurigancho";

  // --- Electricidad: Pluz Energía Perú, Pliego Tarifario N° 07-2026 (desde 04/07/2026)
  //     Unidad Lima Norte, tarifa BT5B residencial. Precios YA incluyen IGV.
  var TARIFA = {
    fuente: "Pluz Energía Perú, Pliego Tarifario N° 07-2026 (BT5B residencial, incl. IGV)",
    t1: { fijo: 2.67, kwh: 0.5052 },                       // 0 a 30 kWh
    t2: { fijo: 2.67, primeros30: 15.15, exceso: 0.7217 }, // 31 a 140 kWh
    t3: { fijo: 2.73, kwh: 0.7390 }                        // más de 140 kWh
  };

  function energyBill(kwh) {
    if (kwh <= 0) return 0;
    if (kwh <= 30) return TARIFA.t1.fijo + kwh * TARIFA.t1.kwh;
    if (kwh <= 140) return TARIFA.t2.fijo + TARIFA.t2.primeros30 + (kwh - 30) * TARIFA.t2.exceso;
    return TARIFA.t3.fijo + kwh * TARIFA.t3.kwh;
  }

  function savingSoles(kwhTotal, kwhAhorrados) {
    return Math.round(energyBill(kwhTotal) - energyBill(Math.max(0, kwhTotal - kwhAhorrados)));
  }

  // --- Agua: Sedapal, categoría Doméstico (Grupo 1: todos los distritos salvo Punta Negra,
  //     Punta Hermosa, San Bartolo y Santa María del Mar). Resolución 145-2025-SUNASS-CD.
  //     Las tarifas NO incluyen IGV (16%) ni IPM (2%), por eso se multiplica por 1.18.
  var AGUA = {
    fuente: "Sedapal, categoría Doméstico (Res. 145-2025-SUNASS-CD, incl. IGV e IPM)",
    cargoFijo: 6.32,
    subsidiado: { agua: 1.92, saneamiento: 0.90 }, // Doméstico Subsidiado, primer tramo (0 a 10 m³)
    impuestos: 1.18,
    tramos: [
      { hasta: 10,       agua: 2.20, saneamiento: 1.38 },
      { hasta: 20,       agua: 2.36, saneamiento: 1.48 },
      { hasta: 50,       agua: 3.22, saneamiento: 1.98 },
      { hasta: Infinity, agua: 7.32, saneamiento: 3.49 }
    ]
  };

  // Cada m³ se cobra por tramos: agua potable + saneamiento (alcantarillado y tratamiento)
  function waterBill(m3, subsidiado) {
    if (m3 <= 0) return 0;
    var total = AGUA.cargoFijo, previo = 0;
    for (var i = 0; i < AGUA.tramos.length; i++) {
      var t = AGUA.tramos[i];
      var m3EnTramo = Math.min(m3, t.hasta) - previo;
      var ag = t.agua, sa = t.saneamiento;
      if (subsidiado && i === 0) { ag = AGUA.subsidiado.agua; sa = AGUA.subsidiado.saneamiento; }
      if (m3EnTramo > 0) total += m3EnTramo * (ag + sa);
      previo = t.hasta;
      if (m3 <= t.hasta) break;
    }
    return total * AGUA.impuestos;
  }

  function savingWater(m3Total, m3Ahorrados, subsidiado) {
    return Math.round(waterBill(m3Total, subsidiado) - waterBill(Math.max(0, m3Total - m3Ahorrados), subsidiado));
  }

  // --- Supuestos de consumo eléctrico (kWh/mes) por respuesta: potencia x horas x 30 días
  var KWH = {
    personas:    { "1-2": 25, "3-4": 40, "5+": 55 },          // router, cargadores, licuadora, plancha, etc.
    terma:       { "no": 0, "30": 23, "60": 45, "120": 90 }, // ~1.5 kW x tiempo de uso
    iluminacion: { "baja": 2, "media": 10, "alta": 21 },     // focos de ~20 W x horas nocturnas
    pantallas:   { "poco": 7, "medio": 12, "mucho": 19, "muchisimo": 29 }, // TV/PC de ~80 W promedio
    clima:       { "no": 0, "ventilador": 12, "ac_poco": 45, "ac_mucho": 90 }, // ventilador ~50 W; A/A ~0.8 kW
    cocina:      { "gas": 0, "gas_micro": 15, "electrica": 60 },  // microondas/arrocera vs. inducción
    lavadora:    { "mano": 0, "poca": 3, "media": 8, "mucha": 13 }, // ~0.5 kWh por lavado
    refri:       { "eficiente": 30, "antigua": 70 },         // refrigeradora eficiente vs. antigua
    congeladora: { "no": 0, "si": 35 },                      // segunda refrigeradora o congeladora
    fantasma:    { "nunca": 0, "aveces": 8, "siempre": 20 }, // standby de cargadores y equipos
    bomba:       { "no": 0, "si": 12 }                       // bomba de ~0.4 kW, 1 hora al día
  };
  var ENERGY_KEYS = Object.keys(KWH);

  // --- Supuestos de consumo de agua (m³/mes)
  var PERSONAS_N = { "1-2": 1.5, "3-4": 3.5, "5+": 5 };       // personas promedio por rango
  var DUCHA_MIN = { "cortas": 4, "moderadas": 10, "largas": 16 }; // minutos por ducha
  var LITROS_DUCHA_MIN = 9;          // caudal típico de una ducha: ~9 litros por minuto
  var LITROS_BASE_PERSONA_DIA = 80;  // cocina, baño, lavado y limpieza por persona al día
  var WATER_EXTRA_M3 = {             // agua adicional según otras respuestas
    lavadora: { "mano": 1.5, "poca": 0.7, "media": 1.5, "mucha": 2.6 }, // ~100 L por lavado en máquina
    riego:    { "no": 0, "poco": 1.5, "mucho": 5 },                      // manguera ~15 L/min
    fugas:    { "no": 0, "grifo": 1.5, "inodoro": 6 }                    // goteo de caño o fuga de inodoro
  };

  function computeUsage(ans, calib) {
    // calib (solo Premium): factores que acercan la estimación al recibo real del usuario
    var fk = (calib && calib.fk) || 1, fm = (calib && calib.fm) || 1;
    var kwhBreakdown = {}, kwhTotal = 0;
    ENERGY_KEYS.forEach(function (k) {
      var v = ((KWH[k][ans[k]]) || 0) * fk;
      kwhBreakdown[k] = v;
      kwhTotal += v;
    });
    var bill = energyBill(kwhTotal);
    var rate = kwhTotal > 0 ? bill / kwhTotal : 0;

    var n = PERSONAS_N[ans.personas] || 0;
    var showerM3 = n * (DUCHA_MIN[ans.agua] || 0) * LITROS_DUCHA_MIN * 30 / 1000 * fm;
    var baseM3 = n * LITROS_BASE_PERSONA_DIA * 30 / 1000 * fm;
    var extraM3 = {}, extraTotal = 0;
    Object.keys(WATER_EXTRA_M3).forEach(function (k) {
      var v = ((WATER_EXTRA_M3[k][ans[k]]) || 0) * fm;
      extraM3[k] = v;
      extraTotal += v;
    });
    var subsidiado = ans.social === "si";
    var m3 = showerM3 + baseM3 + extraTotal;
    var wBill = waterBill(m3, subsidiado);
    var wRate = m3 > 0 ? wBill / m3 : 0;

    return {
      kwhBreakdown: kwhBreakdown, kwhTotal: kwhTotal, bill: bill, rate: rate,
      showerM3: showerM3, baseM3: baseM3, extraM3: extraM3, m3: m3,
      subsidiado: subsidiado, waterBill: wBill, wRate: wRate
    };
  }

  // Resultado completo de un diagnóstico a partir de las respuestas (lo usan el cuestionario y las herramientas)
  function buildResult(ans, calib) {
    var u = computeUsage(ans, calib), breakdown = {};
    ENERGY_KEYS.forEach(function (key) {
      breakdown[key] = Math.round(u.kwhBreakdown[key] * u.rate);
    });
    Object.keys(u.extraM3).forEach(function (k) {
      breakdown[k] = (breakdown[k] || 0) + Math.round(u.extraM3[k] * u.wRate);
    });
    breakdown.agua = Math.round(u.showerM3 * u.wRate);
    breakdown.personas += Math.round(u.baseM3 * u.wRate);

    var total = Object.keys(breakdown).reduce(function (s, k) { return s + breakdown[k]; }, 0);
    var lim = NIVELES[ans.personas] || NIVELES["3-4"];
    var level = total < lim[0] ? "bajo" : (total <= lim[1] ? "moderado" : "alto");
    return {
      total: total, level: level, breakdown: breakdown, answers: Object.assign({}, ans),
      kwh: Math.round(u.kwhTotal * 10) / 10, kwhBreakdown: u.kwhBreakdown,
      m3: u.m3, showerM3: u.showerM3, subsidiado: u.subsidiado
    };
  }

  var CONSUMER_META = {
    terma: { icon: "bolt", name: "Terma eléctrica", type: "energy" },
    iluminacion: { icon: "bulb", name: "Iluminación nocturna", type: "energy" },
    fantasma: { icon: "plug", name: "Consumo fantasma", type: "energy" },
    agua: { icon: "drop", name: "Duchas y agua", type: "water" },
    refri: { icon: "fridge", name: "Refrigeradora", type: "energy" },
    pantallas: { icon: "tv", name: "TV, computadoras y pantallas", type: "energy" },
    clima: { icon: "wind", name: "Ventilador / aire acondicionado", type: "energy" },
    cocina: { icon: "flame", name: "Cocina eléctrica y microondas", type: "energy" },
    lavadora: { icon: "wash", name: "Lavado de ropa", type: "energy" },
    congeladora: { icon: "snow", name: "Congeladora", type: "energy" },
    bomba: { icon: "gauge", name: "Bomba de agua", type: "energy" },
    riego: { icon: "sprout", name: "Riego y lavado con manguera", type: "water" },
    fugas: { icon: "wrench", name: "Fugas de agua", type: "water" }
  };

  var CONSUMER_DESC = {
    terma: "El calentador de agua es de los equipos que más electricidad usa en una casa peruana.",
    iluminacion: "Mantener varios focos encendidos por horas suma más de lo que parece a fin de mes.",
    fantasma: "Los cargadores y equipos enchufados sin uso siguen consumiendo energía en silencio.",
    agua: "Duchas largas significan más agua caliente y una terma trabajando más tiempo.",
    refri: "Una refrigeradora muy llena o antigua exige más esfuerzo para mantener la temperatura.",
    pantallas: "Tener el TV o la computadora prendidos por muchas horas se nota en el recibo, sobre todo si nadie los está mirando.",
    clima: "El aire acondicionado es de los equipos que más electricidad consume: unas pocas horas más al día pueden duplicar el recibo.",
    cocina: "Cocinar con electricidad cuesta bastante más que hacerlo con gas, sobre todo con cocinas de inducción.",
    lavadora: "Cada lavado gasta electricidad y unos 100 litros de agua, así que la frecuencia pesa en los dos recibos.",
    congeladora: "Una segunda refrigeradora o congeladora funciona las 24 horas y suma consumo todo el mes.",
    bomba: "La bomba del tanque o cisterna arranca varias veces al día y suma más de lo que parece.",
    riego: "Regar o lavar con manguera puede gastar muchos litros en poco tiempo, y los m³ altos se cobran a tarifa más cara.",
    fugas: "Un inodoro o caño con fuga gasta agua las 24 horas, aunque no te des cuenta, y la pagas en el recibo."
  };

  var TIP_POOL = {
    terma: {
      "120": { text: "Baja la temperatura de tu terma a 60°C y limita su uso a una hora al día.", kwh: 45, icon: "bolt" },
      "60": { text: "Instala un temporizador en tu terma para que no se quede encendida de más.", kwh: 10, icon: "bolt" },
      "30": { text: "Ya usas la terma con moderación: mantener ese hábito sostiene tu ahorro.", kwh: 0, icon: "bolt" },
      "no": { text: "No depender de una terma eléctrica ya te ahorra bastante cada mes.", kwh: 0, icon: "bolt" }
    },
    iluminacion: {
      "alta": { text: "Cambia tus focos por LED de bajo consumo y apaga los ambientes vacíos.", kwh: 12, icon: "bulb" },
      "media": { text: "Apaga los focos de los ambientes que no estés usando por la noche.", kwh: 4, icon: "bulb" },
      "baja": { text: "Tu uso de luz artificial ya es bajo: aprovecha también la luz natural de día.", kwh: 0, icon: "bulb" }
    },
    fantasma: {
      "siempre": { text: "Usa una regleta con interruptor para desconectar varios equipos a la vez.", kwh: 15, icon: "plug" },
      "aveces": { text: "Antes de dormir, revisa qué cargadores quedaron enchufados sin uso.", kwh: 5, icon: "plug" },
      "nunca": { text: "Desconectar todo al no usarlo es un hábito que ya te está ahorrando dinero.", kwh: 0, icon: "plug" }
    },
    agua: {
      "largas": { text: "Usa un temporizador de ducha y apunta a bajar a 7 u 8 minutos.", waterFrac: 0.5, icon: "drop" },
      "moderadas": { text: "Cierra la llave mientras te enjabonas para ahorrar minutos de agua caliente.", waterFrac: 0.2, icon: "drop" },
      "cortas": { text: "Tus duchas cortas ya cuidan el agua y la energía de tu terma.", waterFrac: 0, icon: "drop" }
    },
    refri: {
      "antigua": { text: "Limpia el serpentín trasero de tu refrigeradora y evita sobrellenarla.", kwh: 8, icon: "fridge" },
      "eficiente": { text: "Mantener tu refrigeradora medio llena y ordenada ya la hace más eficiente.", kwh: 0, icon: "fridge" }
    },
    pantallas: {
      "muchisimo": { text: "Apaga el TV y las pantallas cuando nadie las usa y activa el modo ahorro.", kwh: 8, icon: "tv" },
      "mucho": { text: "Apaga el TV al salir de la sala y evita dejarlo prendido de fondo.", kwh: 4, icon: "tv" },
      "medio": { text: "Tu uso de pantallas es moderado: apágalas por completo en vez de dejarlas en espera.", kwh: 0, icon: "tv" },
      "poco": { text: "Prender pocas horas el TV y las computadoras ya te ahorra energía.", kwh: 0, icon: "tv" }
    },
    clima: {
      "ac_mucho": { text: "Fija el aire acondicionado en 24°C y apóyate con un ventilador para usarlo menos horas.", kwh: 25, icon: "wind" },
      "ac_poco": { text: "Limpia los filtros del aire acondicionado: un filtro sucio lo hace gastar más.", kwh: 8, icon: "wind" },
      "ventilador": { text: "Un ventilador gasta mucho menos que un aire acondicionado: buena elección.", kwh: 0, icon: "wind" },
      "no": { text: "No usar aire acondicionado ya te ahorra una parte importante del recibo.", kwh: 0, icon: "wind" }
    },
    cocina: {
      "electrica": { text: "Cocina con las ollas tapadas y apaga la cocina unos minutos antes de terminar.", kwh: 10, icon: "flame" },
      "gas_micro": { text: "Usa el microondas para porciones pequeñas y apaga la olla arrocera al terminar.", kwh: 4, icon: "flame" },
      "gas": { text: "Cocinar con gas es más barato que hacerlo con electricidad.", kwh: 0, icon: "flame" }
    },
    lavadora: {
      "mucha": { text: "Junta la ropa y lava siempre con la carga completa y con agua fría.", kwh: 3, m3: 0.8, icon: "wash" },
      "media": { text: "Lava con la lavadora llena para hacer menos lavados al mes.", kwh: 1.5, m3: 0.3, icon: "wash" },
      "poca": { text: "Lavas pocas veces por semana: mantener la carga completa sostiene tu ahorro.", kwh: 0, icon: "wash" },
      "mano": { text: "Lavar a mano no gasta electricidad, pero cuida el agua cerrando la llave al enjabonar.", kwh: 0, icon: "wash" }
    },
    congeladora: {
      "si": { text: "Mantén la congeladora llena y descongélala cuando se forme escarcha gruesa.", kwh: 8, icon: "snow" },
      "no": { text: "Tener una sola refrigeradora ya reduce el consumo de tu casa.", kwh: 0, icon: "snow" }
    },
    bomba: {
      "si": { text: "Revisa el flotador y las fugas del tanque para que la bomba no arranque de más.", kwh: 3, icon: "gauge" },
      "no": { text: "Sin bomba eléctrica te ahorras ese consumo cada mes.", kwh: 0, icon: "gauge" }
    },
    riego: {
      "mucho": { text: "Riega temprano o al atardecer y usa balde o regadera en vez de manguera.", m3: 2.5, icon: "sprout" },
      "poco": { text: "Reutiliza el agua de lavar verduras o de la ducha fría para regar tus plantas.", m3: 0.5, icon: "sprout" },
      "no": { text: "No usar manguera ya te ahorra varios m³ de agua al mes.", m3: 0, icon: "sprout" }
    },
    fugas: {
      "inodoro": { text: "Repara la fuga del inodoro cuanto antes: puede ser lo que más agua desperdicia en tu casa.", m3: 6, icon: "wrench" },
      "grifo": { text: "Cambia la empaquetadura o el caño que gotea: pequeñas fugas suman muchos litros.", m3: 1.5, icon: "wrench" },
      "no": { text: "Sin fugas: revisa de vez en cuando tus caños e inodoro para mantenerlo así.", m3: 0, icon: "wrench" }
    }
  };

  // Gasto máximo posible (todas las respuestas más altas), para escalar el medidor
  var MAX_TOTAL = (function () {
    var u = computeUsage({ personas: "5+", terma: "120", iluminacion: "alta", pantallas: "muchisimo", clima: "ac_mucho", cocina: "electrica", lavadora: "mucha", refri: "antigua", congeladora: "si", fantasma: "siempre", bomba: "si", agua: "largas", riego: "mucho", fugas: "inodoro", social: "no" });
    // Ningún hogar real llega al máximo teórico, así que el medidor se llena antes
    return Math.round((u.bill + u.waterBill) * 0.6);
  })();

  // Límites de nivel según el tamaño del hogar: [bajo si es menor, alto si es mayor]
  var NIVELES = { "1-2": [90, 150], "3-4": [160, 270], "5+": [215, 360] };

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) { return fallback; }
  }
  function writeJSON(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (err) { return false; }
  }
  // Los datos se guardan por cuenta: cada correo tiene su propio historial, meta, plan, retos y ajuste.
  function scopeId() {
    var u = readJSON(LS_USER, null);
    return u && u.email ? String(u.email).trim().toLowerCase() : "invitado";
  }
  function k(base) { return base + "::" + scopeId(); }
  var DATA_KEYS = [LS_DIAGNOSTICOS, LS_GOAL, LS_PREMIUM, LS_CALIB, LS_RETOS];
  // Lo que se hizo sin sesión (o con la versión anterior, sin cuentas) pasa a la primera cuenta que inicia sesión.
  function claimGuestData(email, soloAntiguo) {
    var acc = String(email).trim().toLowerCase();
    try {
      DATA_KEYS.forEach(function (base) {
        var srcs = soloAntiguo ? [base] : [base + "::invitado", base], moved = [];
        srcs.forEach(function (sk) {
          var raw = window.localStorage.getItem(sk);
          if (raw) { moved.push(JSON.parse(raw)); }
          window.localStorage.removeItem(sk);
        });
        if (!moved.length) return;
        var dk = base + "::" + acc, cur = window.localStorage.getItem(dk);
        if (base === LS_DIAGNOSTICOS) {
          var lista = cur ? JSON.parse(cur) : [];
          moved.forEach(function (m) { if (Array.isArray(m)) lista = m.concat(lista); });
          window.localStorage.setItem(dk, JSON.stringify(lista));
        } else if (!cur) {
          window.localStorage.setItem(dk, JSON.stringify(moved[0]));
        }
      });
    } catch (e) {}
  }
  // Si ya había una sesión abierta antes de esta versión, sus datos antiguos pasan a esa cuenta al cargar la página.
  (function () { var u0 = readJSON(LS_USER, null); if (u0 && u0.email) claimGuestData(u0.email, true); })();
  function refreshPremium() { var p = getPremium(); isPremium = !!(p && p.activo); }
  function getUser() { return readJSON(LS_USER, null); }
  function saveUser(user) { writeJSON(LS_USER, user); }
  function clearUser() { try { window.localStorage.removeItem(LS_USER); } catch (e) {} }
  function getDiagnosticos() { return readJSON(k(LS_DIAGNOSTICOS), []); }
  function saveDiagnostico(diag) {
    var lista = getDiagnosticos();
    lista.unshift(diag);
    writeJSON(k(LS_DIAGNOSTICOS), lista);
    return lista;
  }
  function getGoal() { return readJSON(k(LS_GOAL), null); }
  function saveGoal(value) { writeJSON(k(LS_GOAL), value); }
  function getPremium() { return readJSON(k(LS_PREMIUM), null); }
  function setPremium(activo) {
    if (activo) writeJSON(k(LS_PREMIUM), { activo: true, desde: new Date().toISOString() });
    else { try { window.localStorage.removeItem(k(LS_PREMIUM)); } catch (e) {} }
    isPremium = !!activo;
  }

  function getCalib() { return readJSON(k(LS_CALIB), null); }
  function saveCalib(v) {
    if (v) writeJSON(k(LS_CALIB), v);
    else { try { window.localStorage.removeItem(k(LS_CALIB)); } catch (e) {} }
  }
  function getRetos() { return readJSON(k(LS_RETOS), null); }
  function saveRetos(v) {
    if (v) writeJSON(k(LS_RETOS), v);
    else { try { window.localStorage.removeItem(k(LS_RETOS)); } catch (e) {} }
  }

  var isLoggedIn = !!getUser();
  var isPremium = !!(getPremium() && getPremium().activo);

  var viewIntro = document.getElementById("view-intro");
  var viewQuiz = document.getElementById("view-quiz");
  var viewResults = document.getElementById("view-results");
  var viewLogin = document.getElementById("view-login");
  var viewPerfil = document.getElementById("view-perfil");
  var viewComo = document.getElementById("view-como");
  var viewAcerca = document.getElementById("view-acerca");
  var viewPremium = document.getElementById("view-premium");
  var viewTools = document.getElementById("view-tools");
  var allMainViews = [viewIntro, viewQuiz, viewResults, viewLogin, viewPerfil, viewComo, viewAcerca, viewPremium, viewTools].filter(Boolean);
  allMainViews.forEach(function (v) { v.style.display = v === viewIntro ? "flex" : "none"; });

  var ticksWrap = document.getElementById("quiz-ticks");
  var progressLabel = document.getElementById("quiz-progress-label");
  var quizIcon = document.getElementById("quiz-icon");
  var quizQuestionEl = document.getElementById("quiz-question-text");
  var quizOptionsEl = document.getElementById("quiz-options");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var topLoginBtn = document.getElementById("btn-top-login");

  QUESTIONS.forEach(function () {
    var t = document.createElement("span");
    t.className = "tick";
    ticksWrap.appendChild(t);
  });
  var ticks = ticksWrap.children;

  var answers = {};
  var currentQuestion = 0;
  var lastResult = null;

  function showView(view) {
    allMainViews.forEach(function (v) {
      v.classList.remove("is-active");
      v.style.display = "none";
    });
    view.style.display = "flex";
    view.classList.add("is-active");
    if (view === viewTools) renderTools();
    window.scrollTo(0, 0);
  }

  function clearNavActive() {
    document.querySelectorAll(".nav-link").forEach(function (l) { l.classList.remove("is-active"); });
  }

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var target = link.getAttribute("data-view");
      clearNavActive();

      if (target === "view-results" && !lastResult) {
        // Todavía no hay un diagnóstico calculado en esta sesión
        showView(viewIntro);
        document.querySelector('[data-view="view-intro"]').classList.add("is-active");
        return;
      }

      link.classList.add("is-active");
      var targetView = document.getElementById(target);
      if (targetView) showView(targetView);
    });
  });

  function setTopButtonState() {
    if (topLoginBtn) topLoginBtn.textContent = isLoggedIn ? "Mi perfil" : "Iniciar sesión";
    if (premiumBadge) {
      premiumBadge.textContent = isPremium ? "⭐ Premium" : "✨ Hazte Premium";
      premiumBadge.classList.toggle("is-active-plan", isPremium);
    }
  }

  function openLoginOrProfile() {
    clearNavActive();
    if (isLoggedIn) { renderPerfil(); showView(viewPerfil); }
    else { showView(viewLogin); }
  }

  if (topLoginBtn) {
    topLoginBtn.addEventListener("click", function (e) { e.preventDefault(); openLoginOrProfile(); });
  }

  var premiumBadge = document.getElementById("btn-premium-badge");
  if (premiumBadge) {
    premiumBadge.addEventListener("click", function () {
      clearNavActive();
      renderPremiumArea();
      showView(viewPremium);
    });
  }

  var loginForm = document.getElementById("form-login-eco");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = document.getElementById("login-email");
      var email = (emailInput.value || "").trim();
      if (!email) return;
      var username = email.split("@")[0];
      var nombre = username.charAt(0).toUpperCase() + username.slice(1);
      claimGuestData(email);
      saveUser({ nombre: nombre, email: email });
      refreshPremium();
      isLoggedIn = true;
      setTopButtonState();
      loginForm.reset();
      renderPerfil();
      showView(viewPerfil);
    });
  }

  function formatFecha(iso) {
    try { return new Date(iso).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return iso; }
  }

  var LEVEL_BADGE = {
    bajo: { label: "BAJO", bg: "var(--good-dim)", border: "var(--good)", color: "var(--good)" },
    moderado: { label: "MODERADO", bg: "var(--energy-dim)", border: "var(--energy)", color: "var(--energy)" },
    alto: { label: "ALTO", bg: "var(--alert-dim)", border: "var(--alert)", color: "var(--alert)" }
  };

  var ICON_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var ICON_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var ICON_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>';

  /* ---------- Gráfico de barras: desglose por categoría de un diagnóstico ---------- */
  function buildBreakdownHTML(breakdown) {
    var rows = Object.keys(CONSUMER_META).map(function (key) {
      return { key: key, name: CONSUMER_META[key].name, type: CONSUMER_META[key].type, value: breakdown[key] || 0 };
    });
    var conGasto = rows.filter(function (r) { return r.value > 0; });
    if (conGasto.length) rows = conGasto;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([1]));
    rows.sort(function (a, b) { return b.value - a.value; });

    return '<div class="breakdown-list">' + rows.map(function (r) {
      var pct = Math.round((r.value / max) * 100);
      return '<div class="breakdown-row">' +
        '<span>' + r.name + '</span>' +
        '<div class="breakdown-track"><i class="' + (r.type === "water" ? "is-water" : "") + '" style="width:' + pct + '%"></i></div>' +
        '<span class="breakdown-amount">S/ ' + r.value + '</span>' +
      '</div>';
    }).join("") + '</div>';
  }

  /* ---------- Gráfico de líneas: evolución del gasto total en el tiempo ---------- */
  function buildEvoChartHTML(diagnosticos) {
    if (diagnosticos.length < 2) {
      return '<p class="perfil-empty">Guarda al menos 2 diagnósticos para ver tu evolución en el tiempo.</p>';
    }

    var serie = diagnosticos.slice(0, isPremium ? 12 : 8).slice().reverse(); // más antiguo -> más reciente
    var W = 500, H = 150, padL = 8, padR = 8, padT = 16, padB = 24;
    var values = serie.map(function (d) { return d.total; });
    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    if (max === min) { max += 10; min = Math.max(0, min - 10); }

    var stepX = (W - padL - padR) / (serie.length - 1);
    var points = serie.map(function (d, i) {
      var x = padL + i * stepX;
      var y = padT + (H - padT - padB) * (1 - (d.total - min) / (max - min));
      return { x: x, y: y, total: d.total, fecha: d.fecha };
    });

    var linePath = points.map(function (p, i) { return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
    var areaPath = linePath + " L" + points[points.length - 1].x.toFixed(1) + "," + (H - padB) + " L" + points[0].x.toFixed(1) + "," + (H - padB) + " Z";

    var gridLines = [0, 0.5, 1].map(function (f) {
      var y = padT + (H - padT - padB) * f;
      return '<line class="evo-grid-line" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y + '" y2="' + y + '"/>';
    }).join("");

    var dots = points.map(function (p, i) {
      var isLast = i === points.length - 1;
      return '<circle class="evo-dot' + (isLast ? " is-last" : "") + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (isLast ? 5 : 3.5) + '"/>' +
        (isLast ? '<text class="evo-value" x="' + p.x.toFixed(1) + '" y="' + (p.y - 12) + '" text-anchor="end">S/ ' + p.total + '</text>' : "");
    }).join("");

    var labels = points.map(function (p, i) {
      if (serie.length > 5 && i % 2 !== 0 && i !== serie.length - 1) return "";
      var d = new Date(p.fecha);
      var label = isNaN(d) ? "" : d.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
      return '<text class="evo-label" x="' + p.x.toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle">' + label + '</text>';
    }).join("");

    return '<svg class="evo-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
      gridLines + '<path class="evo-area" d="' + areaPath + '"/>' +
      '<path class="evo-line" d="' + linePath + '"/>' + dots + labels + '</svg>';
  }

  /* ---------- Comparación con el diagnóstico anterior ---------- */
  function buildDeltaHTML(diagnosticos) {
    if (diagnosticos.length < 2) return "";
    var actual = diagnosticos[0].total, anterior = diagnosticos[1].total;
    if (anterior === 0) return "";
    var diff = actual - anterior;
    var pct = Math.round((Math.abs(diff) / anterior) * 100);
    if (diff === 0) return '<span class="perfil-delta">Igual que tu diagnóstico anterior</span>';
    var down = diff < 0;
    return '<span class="perfil-delta ' + (down ? "is-down" : "is-up") + '">' + (down ? ICON_DOWN : ICON_UP) +
      pct + '% ' + (down ? "menos" : "más") + ' que el anterior</span>';
  }

  /* ---------- Modal de detalle de un diagnóstico guardado ---------- */
  function openDiagnosticoModal(d, numero) {
    var overlay = document.createElement("div");
    overlay.className = "perfil-modal-overlay";
    var badge = LEVEL_BADGE[d.level];
    overlay.innerHTML =
      '<div class="perfil-modal">' +
        '<div class="perfil-modal-head">' +
          '<div><h3>Diagnóstico ' + numero + '</h3><span>' + formatFecha(d.fecha) + '</span></div>' +
          '<button type="button" class="perfil-modal-close" aria-label="Cerrar">' + ICON_CLOSE + '</button>' +
        '</div>' +
        '<div class="perfil-modal-total">S/ ' + d.total + '</div>' +
        '<div class="perfil-modal-stats">' +
          '<span class="diagnostico-badge" style="background:' + badge.bg + ';border:1px solid ' + badge.border + ';color:' + badge.color + ';">' + badge.label + '</span>' +
          (d.topConsumer ? '<span class="stat-chip stat-energy" style="border:1px solid var(--line);">Mayor gasto: ' + d.topConsumer + '</span>' : "") +
          (d.savingPotential ? '<span class="stat-chip stat-good" style="border:1px solid var(--line);">Ahorro posible: S/ ' + d.savingPotential + '</span>' : "") +
        '</div>' +
        buildBreakdownHTML(d.breakdown || {}) +
        (isPremium
          ? '<button type="button" class="btn-pdf" id="btn-pdf-modal">' + ICON_DOWNLOAD + ' Descargar PDF</button>'
          : '<button type="button" class="btn-pdf is-locked" id="btn-pdf-modal-locked">' + ICON_DOWNLOAD + ' Descargar PDF (Premium)</button>') +
      '</div>';

    document.body.appendChild(overlay);
    function close() { overlay.remove(); }

    var pdfBtn = document.getElementById("btn-pdf-modal");
    if (pdfBtn) pdfBtn.addEventListener("click", function () { generatePDF(d, numero); });
    var pdfLockedBtn = document.getElementById("btn-pdf-modal-locked");
    if (pdfLockedBtn) pdfLockedBtn.addEventListener("click", function () {
      close();
      clearNavActive();
      renderPremiumArea();
      showView(viewPremium);
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector(".perfil-modal-close").addEventListener("click", close);
  }

  function renderPerfil() {
    var user = getUser();
    var bloqueIzquierdo = document.getElementById("perfil-bloque-izquierdo");
    var bloqueDerecho = document.getElementById("perfil-bloque-derecho");
    if (!user || !bloqueIzquierdo || !bloqueDerecho) return;

    var diagnosticos = getDiagnosticos();
    var inicial = user.nombre.charAt(0).toUpperCase();
    var goal = getGoal();

    /* ---------- Columna izquierda: identidad + configuración ---------- */
    bloqueIzquierdo.innerHTML =
      '<div class="perfil-card perfil-card--user">' +
        '<div class="perfil-avatar">' + inicial + '</div>' +
        '<div class="perfil-nombre-row">' +
          '<h3 class="perfil-nombre" id="perfil-nombre-text">' + user.nombre + '</h3>' +
          '<button type="button" class="perfil-edit-btn" id="btn-edit-nombre" aria-label="Editar nombre">' + ICON_EDIT + '</button>' +
        '</div>' +
        '<p class="perfil-email">' + user.email + '</p>' +
      '</div>' +
      '<div class="perfil-card perfil-card--plan' + (isPremium ? " is-premium" : "") + '">' +
        '<div class="plan-badge-row"><h4>Tu plan</h4><span class="plan-tag' + (isPremium ? " is-premium" : "") + '">' + (isPremium ? "PREMIUM" : "GRATIS") + '</span></div>' +
        '<p>' + (isPremium
          ? "Tienes historial ilimitado, reportes en PDF y " + TOOL_TABS.length + " herramientas para ahorrar más."
          : "Desbloquea el historial completo, reportes en PDF ampliados y herramientas como la alerta de tramo y el simulador “¿y si…?”.") + '</p>' +
        (isPremium
          ? '<button type="button" class="btn-plan-upgrade" id="btn-open-tools">Abrir mis herramientas</button><button type="button" class="btn-plan-cancel" id="btn-cancel-plan">Cancelar suscripción</button>'
          : '<button type="button" class="btn-plan-upgrade" id="btn-upgrade-plan">✨ Mejorar a Premium</button>') +
      '</div>' +
      '<div class="perfil-card perfil-card--config">' +
        '<h4>Configuración</h4>' +
        '<button type="button" id="btn-logout-dashboard" class="perfil-logout">Cerrar sesión</button>' +
      '</div>' +
      '<div class="perfil-card perfil-card--goal">' +
        '<h4>Meta mensual</h4>' +
        '<div class="goal-form">' +
          '<input type="number" min="0" step="5" id="goal-input" placeholder="Ej: 150" value="' + (goal || "") + '">' +
          '<button type="button" id="btn-save-goal">Guardar</button>' +
        '</div>' +
        '<div id="goal-progress"></div>' +
      '</div>';

    renderGoalProgress(diagnosticos, goal);

    var upgradeBtn = document.getElementById("btn-upgrade-plan");
    if (upgradeBtn) upgradeBtn.addEventListener("click", function () {
      clearNavActive();
      renderPremiumArea();
      showView(viewPremium);
    });
    var toolsBtn = document.getElementById("btn-open-tools");
    if (toolsBtn) toolsBtn.addEventListener("click", function () { openTools(); });
    var cancelBtn = document.getElementById("btn-cancel-plan");
    if (cancelBtn) cancelBtn.addEventListener("click", function () {
      setPremium(false);
      setTopButtonState();
      renderPerfil();
    });

    var nombreText = document.getElementById("perfil-nombre-text");
    var editBtn = document.getElementById("btn-edit-nombre");
    editBtn.addEventListener("click", function () {
      var row = editBtn.parentElement;
      row.innerHTML =
        '<form class="perfil-nombre-form" id="form-edit-nombre">' +
          '<input type="text" id="input-nuevo-nombre" value="' + user.nombre + '" maxlength="30" autofocus>' +
          '<button type="submit">Guardar</button>' +
        '</form>';
      document.getElementById("form-edit-nombre").addEventListener("submit", function (e) {
        e.preventDefault();
        var nuevo = document.getElementById("input-nuevo-nombre").value.trim();
        if (!nuevo) return;
        user.nombre = nuevo;
        saveUser(user);
        renderPerfil();
      });
    });

    document.getElementById("btn-save-goal").addEventListener("click", function () {
      var val = parseFloat(document.getElementById("goal-input").value);
      saveGoal(isNaN(val) || val <= 0 ? null : val);
      renderGoalProgress(diagnosticos, getGoal());
    });

    /* ---------- Columna derecha: estadísticas, gráficos e historial ---------- */
    var ultimo = diagnosticos[0];
    var estadoLabel = ultimo ? LEVEL_BADGE[ultimo.level].label : "SIN DATOS";
    var estadoColor = ultimo ? LEVEL_BADGE[ultimo.level].color : "var(--text-faint)";
    var gastoActual = ultimo ? "S/ " + ultimo.total : "—";
    var ahorroAcumulado = diagnosticos.reduce(function (sum, d) { return sum + (d.savingPotential || 0); }, 0);

    var historialHTML = "";
    if (diagnosticos.length === 0) {
      historialHTML = '<p class="perfil-empty">Todavía no tienes diagnósticos guardados. Completa el cuestionario y presiona "Guardar" para verlo aquí.</p>';
    } else {
      var limite = isPremium ? diagnosticos.length : 2;   // Premium: historial ilimitado
      var visibles = diagnosticos.slice(0, limite);
      var ocultos = diagnosticos.length - visibles.length;

      historialHTML = '<div class="perfil-historial-grid">' +
        visibles.map(function (d, i) {
          var badge = LEVEL_BADGE[d.level];
          return '<div class="diagnostico-card" data-idx="' + i + '" role="button" tabindex="0">' +
            '<div><h5 class="diagnostico-titulo">Diagnóstico ' + (diagnosticos.length - i) + '</h5>' +
            '<span class="diagnostico-fecha">' + formatFecha(d.fecha) + '</span></div>' +
            '<span class="diagnostico-badge" style="background:' + badge.bg + ';border:1px solid ' + badge.border + ';color:' + badge.color + ';">' + badge.label + '</span>' +
            '<strong class="diagnostico-total">S/ ' + d.total + '</strong>' +
          '</div>';
        }).join("") +
        (ocultos > 0
          ? '<div class="diagnostico-card diagnostico-card--locked"></div>'.repeat(Math.min(2, ocultos)) +
            '<div class="historial-upsell"><p>Tienes ' + ocultos + ' diagnóstico' + (ocultos === 1 ? "" : "s") + ' más guardado' + (ocultos === 1 ? "" : "s") + '. Hazte Premium para ver tu historial completo.</p><button type="button" class="btn-plan-upgrade" id="btn-historial-upsell" style="width:auto;padding:10px 20px;">✨ Ver plan Premium</button></div>'
          : "") +
        '</div>';
    }

    bloqueDerecho.innerHTML =
      '<div class="perfil-stats">' +
        '<div class="perfil-stat perfil-stat--highlight"><span>Estado actual</span><strong style="color:' + estadoColor + ';">' + estadoLabel + '</strong></div>' +
        '<div class="perfil-stat"><span>Último gasto estimado</span><strong>' + gastoActual + '</strong>' + buildDeltaHTML(diagnosticos) + '</div>' +
        '<div class="perfil-stat"><span>Tests completados</span><strong>' + diagnosticos.length + '</strong></div>' +
      '</div>' +
      (ultimo ? '<div class="perfil-card perfil-card--breakdown"><h4>Desglose de tu último diagnóstico</h4><p class="breakdown-sub">En qué se te va el dinero cada mes, por categoría</p>' + buildBreakdownHTML(ultimo.breakdown || {}) + pdfButtonHTML(0) + '</div>' : "") +
      '<div class="perfil-card perfil-card--evo"><h4>Evolución de tu gasto</h4><p class="evo-sub">Gasto total estimado en cada diagnóstico guardado</p>' + buildEvoChartHTML(diagnosticos) + '</div>' +
      '<div class="perfil-card perfil-card--historial"><h4>Mis diagnósticos' + (ahorroAcumulado > 0 ? ' <span style="font-family:var(--font-mono);font-size:.78rem;font-weight:600;color:var(--good);">· S/ ' + ahorroAcumulado + ' de ahorro potencial identificado</span>' : "") + '</h4>' + historialHTML + '</div>';

    if (ultimo) bindPdfButtons(bloqueDerecho, diagnosticos);

    var historialUpsellBtn = document.getElementById("btn-historial-upsell");
    if (historialUpsellBtn) historialUpsellBtn.addEventListener("click", function () {
      clearNavActive();
      renderPremiumArea();
      showView(viewPremium);
    });

    document.querySelectorAll(".diagnostico-card[data-idx]").forEach(function (card) {
      card.addEventListener("click", function () {
        var idx = Number(card.getAttribute("data-idx"));
        openDiagnosticoModal(diagnosticos[idx], diagnosticos.length - idx);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
      });
    });

    var logoutBtn = document.getElementById("btn-logout-dashboard");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        clearUser();
        refreshPremium();
        isLoggedIn = false;
        setTopButtonState();
        clearNavActive();
        document.querySelector('[data-view="view-intro"]').classList.add("is-active");
        showView(viewIntro);
      });
    }
  }

  function renderGoalProgress(diagnosticos, goal) {
    var box = document.getElementById("goal-progress");
    if (!box) return;
    var ultimo = diagnosticos[0];

    if (!goal) {
      box.innerHTML = '<p class="goal-empty">Define cuánto quieres gastar como máximo al mes y compáralo con tu diagnóstico más reciente.</p>';
      return;
    }
    if (!ultimo) {
      box.innerHTML = '<p class="goal-empty">Guarda tu primer diagnóstico para comparar tu gasto contra esta meta.</p>';
      return;
    }

    var pct = Math.min(150, Math.round((ultimo.total / goal) * 100));
    var over = ultimo.total > goal;
    box.innerHTML =
      '<div class="goal-status"><span>S/ ' + ultimo.total + ' de S/ ' + goal + '</span><strong>' + pct + '%</strong></div>' +
      '<div class="goal-track"><span class="goal-fill' + (over ? " is-over" : "") + '" style="width:' + Math.min(100, pct) + '%"></span></div>' +
      '<p class="goal-msg ' + (over ? "is-over" : "is-under") + '">' +
        (over
          ? "Estás S/ " + (ultimo.total - goal) + " por encima de tu meta este mes."
          : "Vas bien: te quedan S/ " + (goal - ultimo.total) + " dentro de tu meta.") +
      '</p>';
  }

  /* ==========================================================================
     PREMIUM — checkout simulado, PDF y simulador de retorno de inversión
     ========================================================================== */
  var ICON_CHECK_BIG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
  var ICON_DOWNLOAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 19h16"/></svg>';

  function renderPremiumArea() {
    var area = document.getElementById("premium-area");
    if (!area) return;

    if (isPremium) {
      var p = getPremium();
      area.innerHTML =
        '<div class="checkout-success">' + ICON_CHECK_BIG +
          '<h3>Ya eres Premium</h3>' +
          '<p>Activo desde ' + (p ? formatFecha(p.desde) : "hoy") + '. Disfruta tu historial completo, tus reportes en PDF y tus herramientas de ahorro.</p>' +
          '<button type="button" class="btn btn-primary" id="btn-ir-herramientas" style="width:100%;margin-bottom:10px;">Abrir mis herramientas</button>' +
          '<button type="button" class="btn btn-secondary" id="btn-ir-perfil-premium">Ir a mi perfil</button>' +
        '</div>';
      var goPerfil = document.getElementById("btn-ir-perfil-premium");
      if (goPerfil) goPerfil.addEventListener("click", function () { openLoginOrProfile(); });
      var goTools = document.getElementById("btn-ir-herramientas");
      if (goTools) goTools.addEventListener("click", function () { openTools(); });
      return;
    }

    area.innerHTML = '<button type="button" class="btn btn-primary" id="btn-ir-checkout">Suscribirme</button>';
    document.getElementById("btn-ir-checkout").addEventListener("click", showCheckoutForm);
  }

  function showCheckoutForm() {
    var area = document.getElementById("premium-area");
    area.innerHTML =
      '<form class="checkout-form" id="form-checkout">' +
        '<input type="text" id="ck-nombre" placeholder="Nombre en la tarjeta" required>' +
        '<input type="text" id="ck-numero" placeholder="0000 0000 0000 0000" maxlength="19" required>' +
        '<div class="checkout-row">' +
          '<input type="text" id="ck-venc" placeholder="MM/AA" maxlength="5" required>' +
          '<input type="text" id="ck-cvv" placeholder="CVV" maxlength="3" required>' +
        '</div>' +
        '<p class="checkout-note">Pago 100% simulado — no se envía ni almacena ningún dato real.</p>' +
        '<button type="submit" class="btn btn-primary">Confirmar suscripción · S/ 9.90</button>' +
      '</form>';

    var numeroInput = document.getElementById("ck-numero");
    numeroInput.addEventListener("input", function () {
      var digits = numeroInput.value.replace(/\D/g, "").slice(0, 16);
      numeroInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
    });
    var vencInput = document.getElementById("ck-venc");
    vencInput.addEventListener("input", function () {
      var digits = vencInput.value.replace(/\D/g, "").slice(0, 4);
      vencInput.value = digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
    });

    document.getElementById("form-checkout").addEventListener("submit", function (e) {
      e.preventDefault();
      area.innerHTML = '<div class="checkout-processing"><span class="checkout-spinner"></span>Procesando pago simulado…</div>';
      window.setTimeout(function () {
        setPremium(true);
        setTopButtonState();
        renderPremiumArea();
      }, 900);
    });
  }

  /* ==========================================================================
     HERRAMIENTAS PREMIUM
     Alerta de tramo, simulador "¿y si…?", retorno de inversión con tus datos,
     comparar diagnósticos, retos de ahorro y calibración con tu recibo real.
     Todo se calcula con el mismo motor (computeUsage / TARIFA / AGUA) del diagnóstico.
     ========================================================================== */
  var KWH_POR_KWP = 100;     // kWh al mes que produce 1 kWp en Lima (supuesto referencial)
  var COSTO_POR_KWP = 4800;  // S/ por kWp instalado (precio referencial: edítalo en el simulador)

  var toolState = { tab: "tramo", baseId: null, sim: {}, roiEquipo: "terma-solar", roiCosto: null, roiManual: null, cmpA: 1, cmpB: 0, cmpMetric: "total" };

  var TOOL_TABS = [
    { id: "tramo", label: "Alerta de tramo", icon: "gauge", needs: true },
    { id: "sim", label: "¿Y si…?", icon: "spark", needs: true },
    { id: "roi", label: "Retorno de inversión", icon: "coin", needs: true },
    { id: "cmp", label: "Comparar", icon: "trend", needs: false },
    { id: "retos", label: "Retos", icon: "target", needs: true },
    { id: "calib", label: "Mi recibo", icon: "receipt", needs: true }
  ].filter(function (t) { return FEATURES[t.id]; });

  function n1(x) { return (Math.round(x * 10) / 10).toLocaleString("es-PE", { maximumFractionDigits: 1 }); }
  function sol(x) { return "S/ " + Math.round(x).toLocaleString("es-PE"); }
  function sgn(x) { return (x < 0 ? "−" : "+") + "S/ " + Math.abs(Math.round(x)); }
  function clampN(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function openPremiumPage() { clearNavActive(); renderPremiumArea(); showView(viewPremium); }
  function openTools(tab) { if (tab) toolState.tab = tab; clearNavActive(); showView(viewTools); }

  // Consejos con su ahorro en soles, calculados para unas respuestas concretas
  function tipCandidatesFor(ans, res) {
    var out = [];
    Object.keys(TIP_POOL).forEach(function (category) {
      var tip = TIP_POOL[category][ans[category]];
      if (!tip) return;
      var m3Saved = (tip.waterFrac ? res.showerM3 * tip.waterFrac : 0) + (tip.m3 || 0);
      var saving = (tip.kwh ? savingSoles(res.kwh, tip.kwh) : 0) + (m3Saved ? savingWater(res.m3, m3Saved, res.subsidiado) : 0);
      out.push({ text: tip.text, saving: saving, kwh: tip.kwh || 0, m3: m3Saved, icon: tip.icon, category: category });
    });
    out.sort(function (a, b) { return b.saving - a.saving; });
    return out;
  }

  /* ---------- Tramos de tarifa: dónde estás y cuánto falta para el siguiente ---------- */
  function tramoInfo(kwh, m3, subsidiado) {
    var e = { kwh: kwh };
    if (kwh <= 30) { e.tier = 1; e.toNext = Math.round((30 - kwh) * 10) / 10; }
    else if (kwh <= 140) {
      e.tier = 2; e.toNext = Math.round((140 - kwh) * 10) / 10;
      e.crossCost = Math.round(energyBill(141) - energyBill(kwh));
    } else {
      e.tier = 3; e.over = Math.round((kwh - 140) * 10) / 10;
      e.saveIfBelow = Math.round(energyBill(kwh) - energyBill(140));
    }
    var w = { m3: m3, idx: 0 }, i;
    for (i = 0; i < AGUA.tramos.length; i++) { if (m3 <= AGUA.tramos[i].hasta) { w.idx = i; break; } }
    var t = AGUA.tramos[w.idx];
    w.price = (subsidiado && w.idx === 0 ? AGUA.subsidiado.agua + AGUA.subsidiado.saneamiento : t.agua + t.saneamiento) * AGUA.impuestos;
    if (isFinite(t.hasta)) {
      var nx = AGUA.tramos[w.idx + 1];
      w.toNext = Math.round((t.hasta - m3) * 10) / 10;
      w.nextPrice = (nx.agua + nx.saneamiento) * AGUA.impuestos;
    }
    if (w.idx > 0) {
      var prev = AGUA.tramos[w.idx - 1].hasta;
      w.over = Math.round((m3 - prev) * 10) / 10;
      w.prevLimit = prev;
      w.saveIfBelow = Math.round(waterBill(m3, subsidiado) - waterBill(prev, subsidiado));
    }
    return { e: e, w: w };
  }

  function tramoLines(info) {
    var e = info.e, w = info.w, luz, agua;
    if (e.tier === 3) {
      luz = { level: "alert", title: "Estás en la tarifa más cara",
        text: "Pasaste los 140 kWh por " + n1(e.over) + " kWh. Desde ese punto todo tu consumo se cobra a S/ " + TARIFA.t3.kwh.toFixed(2) + " por kWh. Si logras bajar esos " + n1(e.over) + " kWh, tu recibo de luz bajaría unos S/ " + e.saveIfBelow + " al mes.",
        short: "Luz: pasaste los 140 kWh por " + n1(e.over) + " kWh; bajarlos te ahorraría unos S/ " + e.saveIfBelow + " al mes." };
    } else if (e.tier === 2) {
      var near = e.toNext <= 20;
      luz = { level: near ? "warn" : "ok", title: near ? "Cerca de la tarifa más cara" : "Tramo intermedio",
        text: "Estás a " + n1(e.toNext) + " kWh de pasar a la tarifa más cara (más de 140 kWh)." + (near ? " Si la pasas, tu recibo de luz subiría de golpe unos S/ " + e.crossCost + "." : " Todavía tienes margen este mes."),
        short: "Luz: estás a " + n1(e.toNext) + " kWh del tramo más caro" + (near ? " (pasarlo costaría unos S/ " + e.crossCost + " más)." : ".") };
    } else {
      luz = { level: "ok", title: "Tramo más barato",
        text: "Tu consumo está dentro de los primeros 30 kWh, que se cobran a S/ " + TARIFA.t1.kwh.toFixed(2) + " por kWh.",
        short: "Luz: estás en el tramo más barato." };
    }
    var nTr = w.idx + 1;
    var lvl = w.idx >= 3 ? "alert" : (w.idx === 2 ? "warn" : ((w.toNext !== undefined && w.toNext <= 2) ? "warn" : "ok"));
    var wt = "Estás en el tramo " + nTr + " de Sedapal: cada m³ se cobra a S/ " + w.price.toFixed(2) + " (agua y alcantarillado, con impuestos).";
    var ws = "Agua: tramo " + nTr + " de Sedapal (S/ " + w.price.toFixed(2) + " por m³)";
    if (w.over) {
      wt += " Si logras bajar " + n1(w.over) + " m³ (hasta " + w.prevLimit + " m³) ahorrarías unos S/ " + w.saveIfBelow + " al mes.";
      ws += "; bajar " + n1(w.over) + " m³ te ahorraría unos S/ " + w.saveIfBelow;
    }
    if (w.toNext !== undefined && w.toNext <= 5) {
      wt += " Estás a " + n1(w.toNext) + " m³ del siguiente tramo, donde cada m³ cuesta S/ " + w.nextPrice.toFixed(2) + ".";
      ws += "; a " + n1(w.toNext) + " m³ del siguiente tramo";
    }
    agua = { level: lvl, title: "Tramo " + nTr + " de agua", text: wt, short: ws + "." };
    return { luz: luz, agua: agua };
  }

  // Escala horizontal con los tramos y un marcador con tu consumo
  function tierScaleHTML(value, limits, max, unit) {
    var cols = ["#7CC79A", "#F3BC3C", "#EE7B6D", "#D14B3C"];
    var prev = 0, segs = "", ticks = "";
    limits.concat([max]).forEach(function (lim, i) {
      segs += '<i class="tl-seg" style="left:' + (prev / max * 100).toFixed(2) + '%;width:' + ((lim - prev) / max * 100).toFixed(2) + '%;background:' + cols[i] + '"></i>';
      if (i < limits.length) ticks += '<span class="tl-tick" style="left:' + (lim / max * 100).toFixed(2) + '%">' + lim + '</span>';
      prev = lim;
    });
    var pos = clampN(value / max * 100, 7, 93);
    return '<div class="tl-scale"><div class="tl-track">' + segs + '</div>' +
      '<span class="tl-pin" style="left:' + pos.toFixed(2) + '%"><b>' + n1(value) + ' ' + unit + '</b></span></div>' +
      '<div class="tl-ticks">' + ticks + '</div>';
  }

  /* ---------- Estructura general de la pantalla de herramientas ---------- */
  function getToolBases() {
    var list = [], saved = getDiagnosticos();
    var dupe = lastResult && saved[0] && saved[0].answers && JSON.stringify(saved[0].answers) === JSON.stringify(lastResult.answers);
    if (lastResult && !dupe) list.push({ id: "actual", label: "Resultado actual (sin guardar)", answers: lastResult.answers });
    saved.forEach(function (d, i) {
      if (d.answers) list.push({ id: "d" + d.fecha, label: "Diagnóstico " + (saved.length - i) + " · " + formatFecha(d.fecha) + " · S/ " + d.total, answers: d.answers });
    });
    return list;
  }

  function currentBase(bases) {
    if (!bases.length) return null;
    var b = bases.filter(function (x) { return x.id === toolState.baseId; })[0] || bases[0];
    toolState.baseId = b.id;
    var calib = FEATURES.calib ? getCalib() : null;
    b.calib = calib;
    b.res = buildResult(b.answers, calib);
    b.resRaw = calib ? buildResult(b.answers, null) : b.res;
    return b;
  }

  function refreshTools() {
    if (viewTools && viewTools.classList.contains("is-active")) renderTools();
  }

  function renderToolsLocked(root) {
    var items = [
      ["gauge", "Alerta de tramo", "Te avisa cuántos kWh o m³ te faltan para pasar a la tarifa más cara de Pluz y Sedapal.", "tramo"],
      ["spark", "Simulador “¿y si…?”", "Cambia un hábito y mira al instante cuánto bajaría tu gasto mensual.", "sim"],
      ["coin", "Retorno de inversión real", "Calcula en cuántos meses recuperas un equipo usando tu propio consumo.", "roi"],
      ["trend", "Comparar diagnósticos", "Gráfico de tu evolución y cuánto subiste o bajaste desde el último.", "cmp"],
      ["target", "Retos de ahorro", "Ponte una meta, marca tus hábitos y mira tu barra de progreso.", "retos"],
      ["receipt", "Ajuste con tu recibo real", "Escribe los kWh de tu recibo y la app corrige sus estimaciones.", "calib"]
    ].filter(function (it) { return FEATURES[it[3]]; });
    root.innerHTML =
      '<div class="locked-card tl-locked">' +
        '<div class="locked-icon" aria-hidden="true">' + ICONS.lock + '</div>' +
        '<h3>Herramientas exclusivas de Premium</h3>' +
        '<p>Tu diagnóstico básico sigue completo y gratis. Con Premium sumas estas herramientas para ahorrar más:</p>' +
        '<ul class="tl-locklist">' + items.map(function (it) {
          return '<li><span>' + ICONS[it[0]] + '</span><div><strong>' + it[1] + '</strong><em>' + it[2] + '</em></div></li>';
        }).join("") + '</ul>' +
        '<button type="button" class="btn btn-primary" id="tl-upsell">Ver plan Premium</button>' +
      '</div>';
    document.getElementById("tl-upsell").addEventListener("click", openPremiumPage);
  }

  function emptyBaseHTML() {
    var saved = getDiagnosticos();
    var oldOnes = saved.length && !saved.some(function (d) { return d.answers; });
    return '<div class="tl-card tl-empty"><h4>Primero necesito un diagnóstico</h4>' +
      '<p class="tl-text">Esta herramienta usa tus respuestas para calcular con tus propios datos.' +
      (oldOnes ? ' Tus diagnósticos anteriores se guardaron antes de esta función y no incluyen las respuestas: haz uno nuevo y guárdalo.' : '') +
      '</p><button type="button" class="btn btn-primary" id="tl-start">Hacer mi diagnóstico</button></div>';
  }

  function renderTools() {
    var root = document.getElementById("tools-root");
    if (!root) return;
    if (!isPremium) { renderToolsLocked(root); return; }

    root.innerHTML =
      '<div class="tl-tabs" role="tablist">' + TOOL_TABS.map(function (t) {
        var on = t.id === toolState.tab;
        return '<button type="button" class="tl-tab' + (on ? " is-active" : "") + '" role="tab" aria-selected="' + on + '" data-tab="' + t.id + '">' + ICONS[t.icon] + '<span>' + t.label + '</span></button>';
      }).join("") + '</div><div id="tl-body" class="tl-body"></div>';
    Array.prototype.forEach.call(root.querySelectorAll("[data-tab]"), function (b) {
      b.addEventListener("click", function () { toolState.tab = b.getAttribute("data-tab"); renderTools(); });
    });

    var tab = TOOL_TABS.filter(function (t) { return t.id === toolState.tab; })[0] || TOOL_TABS[0];
    var body = document.getElementById("tl-body");
    var bases = getToolBases();
    var base = currentBase(bases);

    if (tab.needs && !base) {
      body.innerHTML = emptyBaseHTML();
      document.getElementById("tl-start").addEventListener("click", function () { document.getElementById("btn-start").click(); });
      return;
    }
    var head = "";
    if (tab.needs && bases.length > 1) {
      head = '<label class="tl-base"><span>Diagnóstico base</span><select id="tl-base-sel">' + bases.map(function (b) {
        return '<option value="' + b.id + '"' + (b.id === base.id ? " selected" : "") + '>' + b.label + '</option>';
      }).join("") + '</select></label>';
    }
    body.innerHTML = head + '<div id="tl-content"></div>';
    var sel = document.getElementById("tl-base-sel");
    if (sel) sel.addEventListener("change", function () { toolState.baseId = sel.value; toolState.sim = {}; toolState.roiCosto = null; renderTools(); });

    var content = document.getElementById("tl-content");
    var fn = { tramo: toolTramo, sim: toolSim, roi: toolRoi, cmp: toolCmp, retos: toolRetos, calib: toolCalib }[tab.id];
    fn(content, base);
  }

  /* ---------- 1) Alerta de tramo ---------- */
  function toolTramo(content, base) {
    var r = base.res, info = tramoInfo(r.kwh, r.m3, r.subsidiado), L = tramoLines(info);
    var cand = tipCandidatesFor(base.answers, r).filter(function (t) { return t.saving > 0; });
    function helps(list, unitFn) {
      if (!list.length) return "";
      return '<div class="tl-helps"><h5>Para bajar de tramo</h5><ul>' + list.slice(0, 3).map(function (t) {
        return '<li>' + t.text + '<em>' + unitFn(t) + '</em></li>';
      }).join("") + '</ul></div>';
    }
    var maxK = Math.max(200, Math.ceil(r.kwh * 1.15 / 10) * 10);
    var maxM = Math.max(60, Math.ceil(r.m3 * 1.15 / 5) * 5);
    function card(kind, Ls, scale, helpHTML) {
      var luz = kind === "luz";
      return '<div class="tl-card tl-tramo is-' + Ls.level + '">' +
        '<div class="tl-card-head"><span class="tl-ico is-' + (luz ? "energy" : "water") + '">' + ICONS[luz ? "bolt" : "drop"] + '</span>' +
        '<div><h4>' + (luz ? "Electricidad · Pluz" : "Agua · Sedapal") + '</h4><span class="tl-status">' + Ls.title + '</span></div></div>' +
        scale + '<p class="tl-text">' + Ls.text + '</p>' + helpHTML + '</div>';
    }
    content.innerHTML =
      '<p class="tl-intro">Tu recibo no sube de forma pareja: cambia de tarifa al pasar ciertos límites. Así estás hoy' + (base.calib ? ' (ajustado a tu recibo real)' : '') + ':</p>' +
      '<div class="tl-grid2">' +
        card("luz", L.luz, tierScaleHTML(r.kwh, [30, 140], maxK, "kWh"),
          helps(cand.filter(function (t) { return t.kwh > 0; }), function (t) { return "−" + n1(t.kwh) + " kWh al mes"; })) +
        card("agua", L.agua, tierScaleHTML(r.m3, [10, 20, 50], maxM, "m³"),
          helps(cand.filter(function (t) { return t.m3 > 0; }), function (t) { return "−" + n1(t.m3) + " m³ al mes"; })) +
      '</div>' +
      '<p class="tl-note">Tarifas: ' + TARIFA.fuente + '. ' + AGUA.fuente + '.</p>';
  }

  /* ---------- 2) Simulador "¿y si…?" ---------- */
  var SIM_IDS = ["terma", "agua", "clima", "iluminacion", "pantallas", "fantasma", "lavadora", "riego", "fugas", "cocina", "refri", "congeladora"];
  var SIM_PRESETS = [
    { label: "Duchas cortas (menos de 5 min)", id: "agua", value: "cortas", only: ["moderadas", "largas"] },
    { label: "Terma solo 30 min al día", id: "terma", value: "30", only: ["60", "120"] },
    { label: "Ventilador en vez de aire acondicionado", id: "clima", value: "ventilador", only: ["ac_poco", "ac_mucho"] },
    { label: "Desenchufar lo que no uso", id: "fantasma", value: "nunca", only: ["aveces", "siempre"] },
    { label: "Arreglar las fugas", id: "fugas", value: "no", only: ["grifo", "inodoro"] },
    { label: "Menos focos encendidos", id: "iluminacion", value: "baja", only: ["media", "alta"] }
  ];
  function questionById(id) { return QUESTIONS.filter(function (q) { return q.id === id; })[0]; }

  function simOutHTML(r1, r2) {
    var diff = r2.total - r1.total, pct = r1.total ? Math.round(Math.abs(diff) / r1.total * 100) : 0;
    var cls = diff < 0 ? "is-down" : (diff > 0 ? "is-up" : "");
    var msg = diff === 0
      ? "Cambia una opción o elige un cambio rápido para ver cuánto variaría tu gasto."
      : (diff < 0 ? "Ahorrarías S/ " + (-diff) + " al mes (" + pct + " %), unos S/ " + (-diff * 12) + " al año."
                  : "Gastarías S/ " + diff + " más al mes (" + pct + " %).");
    var mx = Math.max(r1.total, r2.total, 1);
    var i1 = tramoInfo(r1.kwh, r1.m3, r1.subsidiado), i2 = tramoInfo(r2.kwh, r2.m3, r2.subsidiado);
    var tierMsg = "";
    if (i2.e.tier < i1.e.tier) tierMsg += '<p class="tl-tierchg is-good">¡Bajarías al tramo ' + i2.e.tier + ' de luz!</p>';
    if (i2.e.tier > i1.e.tier) tierMsg += '<p class="tl-tierchg is-bad">Pasarías al tramo ' + i2.e.tier + ' de luz, que es más caro.</p>';
    if (i2.w.idx < i1.w.idx) tierMsg += '<p class="tl-tierchg is-good">¡Bajarías al tramo ' + (i2.w.idx + 1) + ' de agua!</p>';
    if (i2.w.idx > i1.w.idx) tierMsg += '<p class="tl-tierchg is-bad">Pasarías al tramo ' + (i2.w.idx + 1) + ' de agua, que es más caro.</p>';

    var deltas = Object.keys(CONSUMER_META).map(function (k) {
      return { name: CONSUMER_META[k].name, d: (r2.breakdown[k] || 0) - (r1.breakdown[k] || 0) };
    }).filter(function (x) { return x.d !== 0; }).sort(function (a, b) { return a.d - b.d; });
    var list = deltas.length ? '<ul class="tl-deltas">' + deltas.map(function (x) {
      return '<li><span>' + x.name + '</span><b class="' + (x.d < 0 ? "is-down" : "is-up") + '">' + sgn(x.d) + '</b></li>';
    }).join("") + '</ul>' : "";

    return '<div class="tl-sim-total"><div><span>Hoy</span><strong>S/ ' + r1.total + '</strong></div><i aria-hidden="true">→</i>' +
      '<div><span>Con tus cambios</span><strong class="' + cls + '">S/ ' + r2.total + '</strong></div></div>' +
      '<div class="tl-cmpbars"><span style="width:' + (r1.total / mx * 100).toFixed(1) + '%"></span><span class="is-new ' + cls + '" style="width:' + (r2.total / mx * 100).toFixed(1) + '%"></span></div>' +
      '<p class="tl-sim-delta ' + cls + '">' + msg + '</p>' + tierMsg +
      '<div class="tl-mini"><div><span>Luz</span><b>' + n1(r1.kwh) + ' → ' + n1(r2.kwh) + ' kWh</b></div><div><span>Agua</span><b>' + n1(r1.m3) + ' → ' + n1(r2.m3) + ' m³</b></div></div>' + list;
  }

  function toolSim(content, base) {
    var sim = toolState.sim;
    var ans = Object.assign({}, base.answers, sim);
    var r2 = buildResult(ans, base.calib);

    var chips = SIM_PRESETS.filter(function (p) { return p.only.indexOf(ans[p.id]) > -1; }).map(function (p) {
      return '<button type="button" class="hx-chip tl-chip" data-preset="' + p.id + '|' + p.value + '">' + p.label + '</button>';
    }).join("");

    var fields = SIM_IDS.map(function (id) {
      var q = questionById(id), cur = ans[id], changed = Object.prototype.hasOwnProperty.call(sim, id);
      return '<label class="tl-field' + (changed ? " is-changed" : "") + '"><span class="tl-field-name">' + CONSUMER_META[id].name + '</span>' +
        '<select data-sim="' + id + '">' + q.options.map(function (o) {
          return '<option value="' + o.value + '"' + (o.value === cur ? " selected" : "") + '>' + o.label + '</option>';
        }).join("") + '</select></label>';
    }).join("");

    content.innerHTML =
      '<p class="tl-intro">Cambia tus hábitos y mira al instante cómo quedaría tu gasto. No se guarda nada: es solo una simulación.</p>' +
      (chips ? '<div class="tl-chips">' + chips + '</div>' : "") +
      '<div class="tl-sim"><div class="tl-sim-form">' + fields + '</div>' +
      '<div class="tl-card tl-sim-out">' + simOutHTML(base.res, r2) +
      (Object.keys(sim).length ? '<button type="button" class="btn-plan-cancel" id="tl-sim-reset" style="margin-top:14px;">Volver a mis respuestas</button>' : "") +
      '</div></div>';

    Array.prototype.forEach.call(content.querySelectorAll("[data-sim]"), function (s) {
      s.addEventListener("change", function () {
        var id = s.getAttribute("data-sim");
        if (s.value === base.answers[id]) delete toolState.sim[id]; else toolState.sim[id] = s.value;
        toolSim(content, base);
      });
    });
    Array.prototype.forEach.call(content.querySelectorAll("[data-preset]"), function (b) {
      b.addEventListener("click", function () {
        var p = b.getAttribute("data-preset").split("|");
        toolState.sim[p[0]] = p[1];
        toolSim(content, base);
      });
    });
    var rs = document.getElementById("tl-sim-reset");
    if (rs) rs.addEventListener("click", function () { toolState.sim = {}; toolSim(content, base); });
  }

  /* ---------- 3) Retorno de inversión con tu consumo ---------- */
  function kwpSugerido(base) { return Math.max(0.5, Math.round(base.res.kwh * 0.8 / KWH_POR_KWP * 2) / 2); }

  var ROI_OPTS = [
    { id: "terma-solar", name: "Terma solar", costo: function () { return 1800; },
      nota: function () { return "Se supone que cubre cerca del 75 % de lo que hoy gasta tu terma eléctrica."; },
      calc: function (b) {
        return { kwh: b.res.kwhBreakdown.terma * 0.75, m3: 0, vacio: b.answers.terma === "no" ? "Según tu diagnóstico no usas terma eléctrica, así que no te ahorraría luz." : "" };
      } },
    { id: "refri-inverter", name: "Refrigeradora Inverter", costo: function () { return 2200; },
      nota: function () { return "Se supone que una Inverter consume unos 22 kWh al mes."; },
      calc: function (b) {
        var k = Math.max(0, b.res.kwhBreakdown.refri - 22);
        return { kwh: k, m3: 0, vacio: k <= 0 ? "Tu refrigeradora ya consume poco: casi no ahorrarías." : "" };
      } },
    { id: "led", name: "Cambio completo a focos LED", costo: function () { return 150; },
      nota: function () { return "El ahorro sale de lo que hoy gastas en iluminación nocturna."; },
      calc: function (b) {
        var t = TIP_POOL.iluminacion[b.answers.iluminacion], k = t ? t.kwh : 0;
        return { kwh: k, m3: 0, vacio: k <= 0 ? "Tu uso de luz artificial ya es bajo: casi no ahorrarías." : "" };
      } },
    { id: "fugas", name: "Reparar fugas (gasfitero)", costo: function () { return 120; },
      nota: function () { return "El ahorro sale de las fugas que indicaste en tu diagnóstico."; },
      calc: function (b) {
        var t = TIP_POOL.fugas[b.answers.fugas], m = t ? t.m3 : 0;
        return { kwh: 0, m3: m, vacio: m <= 0 ? "En tu diagnóstico no indicaste fugas." : "" };
      } },
    { id: "panel-solar", name: "Panel solar doméstico", costo: function (b) { return Math.round(kwpSugerido(b) * COSTO_POR_KWP); },
      nota: function (b) {
        var kp = kwpSugerido(b);
        return "Sistema sugerido de " + n1(kp) + " kWp (potencia pico), unos " + Math.round(kp * KWH_POR_KWP) + " kWh al mes, para cubrir cerca del 80 % de tu consumo. Precio referencial de S/ " + COSTO_POR_KWP + " por kWp.";
      },
      calc: function (b) { return { kwh: Math.min(kwpSugerido(b) * KWH_POR_KWP, b.res.kwh), m3: 0, vacio: "" }; } },
    { id: "otro", name: "Otro equipo (manual)", manual: true, costo: function () { return 1000; }, nota: function () { return "Escribe el costo y el ahorro mensual que te prometen."; }, calc: function () { return { kwh: 0, m3: 0, vacio: "" }; } }
  ];

  function roiBarsHTML(costo, ahorroMes) {
    var vals = [1, 2, 3, 4, 5].map(function (y) { return Math.round(ahorroMes * 12 * y - costo); });
    var maxAbs = Math.max.apply(null, vals.map(Math.abs).concat([1]));
    return '<div class="tl-bars">' + vals.map(function (v, i) {
      var h = Math.round(Math.abs(v) / maxAbs * 100);
      return '<div class="tl-bar-col"><div class="tl-bar-half tl-bar-up">' + (v >= 0 ? '<i class="is-pos" style="height:' + h + '%"></i>' : '') + '</div>' +
        '<div class="tl-bar-half tl-bar-down">' + (v < 0 ? '<i class="is-neg" style="height:' + h + '%"></i>' : '') + '</div>' +
        '<span class="tl-bar-val ' + (v < 0 ? "is-neg" : "is-pos") + '">' + sgn(v) + '</span><span class="tl-bar-year">Año ' + (i + 1) + '</span></div>';
    }).join("") + '</div>';
  }

  function roiOutHTML(costo, ahorro, res) {
    if (!(costo > 0) || !(ahorro > 0)) return '<p class="tl-note">Con estos datos no hay ahorro que recuperar. Prueba con otro equipo.</p>';
    var meses = Math.ceil(costo / ahorro);
    var txt = meses > 120 ? "más de 10 años" : (meses >= 24 ? meses + " meses (≈ " + n1(meses / 12) + " años)" : meses + " meses");
    var acum5 = Math.round(ahorro * 60 - costo);
    var pct = Math.min(100, Math.round(meses / 60 * 100));
    return '<div class="roi-resultado" style="display:block;margin-top:18px;">' +
      '<div class="roi-meses">' + txt + '</div>' +
      '<p class="roi-desc">Es lo que tardarías en recuperar tu inversión de S/ ' + costo + ' ahorrando S/ ' + Math.round(ahorro) + ' al mes. Hoy pagas S/ ' + res.total + ' al mes en luz y agua; con este equipo pagarías cerca de S/ ' + Math.max(0, res.total - Math.round(ahorro)) + '.</p>' +
      '<div class="roi-timeline"><i style="width:' + pct + '%"></i></div>' +
      '<p class="tl-roi-5">' + (acum5 >= 0 ? 'A 5 años habrías ahorrado <b>S/ ' + acum5 + '</b> por encima de lo que costó.' : 'A 5 años todavía no recuperarías la inversión (te faltarían <b>S/ ' + (-acum5) + '</b>).') + '</p>' +
      '</div><h5 class="tl-h5">Ahorro acumulado, descontando lo que pagaste</h5>' + roiBarsHTML(costo, ahorro);
  }

  function toolRoi(content, base) {
    var opt = ROI_OPTS.filter(function (o) { return o.id === toolState.roiEquipo; })[0] || ROI_OPTS[0];
    var calc = opt.calc(base);
    var ahorroCalc = savingSoles(base.res.kwh, calc.kwh) + (calc.m3 ? savingWater(base.res.m3, calc.m3, base.res.subsidiado) : 0);
    var costoDef = opt.costo(base);
    var costoVal = toolState.roiCosto !== null ? toolState.roiCosto : costoDef;
    var ahorroVal = opt.manual ? (toolState.roiManual || "") : ahorroCalc;

    content.innerHTML =
      '<p class="tl-intro">El ahorro se calcula con tu propio diagnóstico y las tarifas reales de Pluz y Sedapal; ya no son montos fijos.</p>' +
      '<form class="roi-form" id="tl-roi-form" onsubmit="return false;">' +
        '<label class="roi-label" for="tl-roi-eq">Equipo o mejora</label>' +
        '<select id="tl-roi-eq" class="roi-select">' + ROI_OPTS.map(function (o) {
          return '<option value="' + o.id + '"' + (o.id === opt.id ? " selected" : "") + '>' + o.name + '</option>';
        }).join("") + '</select>' +
        '<div class="roi-grid">' +
          '<div><label class="roi-label" for="tl-roi-costo">Costo del equipo (S/)</label><input type="number" id="tl-roi-costo" min="1" step="10" value="' + costoVal + '"></div>' +
          '<div><label class="roi-label" for="tl-roi-ahorro">Ahorro al mes (S/)</label><input type="number" id="tl-roi-ahorro" min="1" step="1" value="' + ahorroVal + '"' + (opt.manual ? "" : " readonly") + '></div>' +
        '</div>' +
        '<p class="tl-note" style="text-align:left;">' + opt.nota(base) + ' Los precios son referenciales: reemplázalos por tu cotización.</p>' +
        (calc.vacio ? '<p class="tl-tierchg is-bad">' + calc.vacio + '</p>' : "") +
      '</form><div id="tl-roi-out"></div>';

    var eq = document.getElementById("tl-roi-eq"), ci = document.getElementById("tl-roi-costo"), ai = document.getElementById("tl-roi-ahorro"), out = document.getElementById("tl-roi-out");
    function paint() { out.innerHTML = roiOutHTML(parseFloat(ci.value), parseFloat(ai.value), base.res); }
    eq.addEventListener("change", function () { toolState.roiEquipo = eq.value; toolState.roiCosto = null; toolState.roiManual = null; toolRoi(content, base); });
    ci.addEventListener("input", function () { toolState.roiCosto = parseFloat(ci.value) || null; paint(); });
    if (opt.manual) ai.addEventListener("input", function () { toolState.roiManual = ai.value; paint(); });
    paint();
  }

  /* ---------- 4) Comparar diagnósticos ---------- */
  var CMP_METRICS = { total: { label: "Gasto (S/)", pre: "S/ ", suf: "", name: "gasto" }, kwh: { label: "Luz (kWh)", pre: "", suf: " kWh", name: "consumo de luz" }, m3: { label: "Agua (m³)", pre: "", suf: " m³", name: "consumo de agua" } };

  function lineChartHTML(points, pre, suf) {
    var W = 500, H = 150, padL = 8, padR = 8, padT = 22, padB = 24;
    var vals = points.map(function (p) { return p.value; });
    var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
    if (max === min) { max += 10; min = Math.max(0, min - 10); }
    var stepX = (W - padL - padR) / (points.length - 1);
    var pts = points.map(function (p, i) {
      return { x: padL + i * stepX, y: padT + (H - padT - padB) * (1 - (p.value - min) / (max - min)), v: p.value, label: p.label };
    });
    var line = pts.map(function (p, i) { return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
    var area = line + " L" + pts[pts.length - 1].x.toFixed(1) + "," + (H - padB) + " L" + pts[0].x.toFixed(1) + "," + (H - padB) + " Z";
    var grid = [0, 0.5, 1].map(function (f) { var y = padT + (H - padT - padB) * f; return '<line class="evo-grid-line" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y + '" y2="' + y + '"/>'; }).join("");
    var many = pts.length > 6;
    var dots = pts.map(function (p, i) {
      var last = i === pts.length - 1;
      var showVal = !many || last || i === 0;
      return '<circle class="evo-dot' + (last ? " is-last" : "") + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (last ? 5 : 3.5) + '"/>' +
        (showVal ? '<text class="evo-value" x="' + p.x.toFixed(1) + '" y="' + (p.y - 10).toFixed(1) + '" text-anchor="' + (last ? "end" : (i === 0 ? "start" : "middle")) + '">' + pre + n1(p.v) + suf + '</text>' : "");
    }).join("");
    var labels = pts.map(function (p, i) {
      if (many && i % 2 !== 0 && i !== pts.length - 1) return "";
      return '<text class="evo-label" x="' + p.x.toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle">' + p.label + '</text>';
    }).join("");
    return '<svg class="evo-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' + grid + '<path class="evo-area" d="' + area + '"/><path class="evo-line" d="' + line + '"/>' + dots + labels + '</svg>';
  }

  function toolCmp(content) {
    var ds = getDiagnosticos();
    if (ds.length < 2) {
      content.innerHTML = '<div class="tl-card tl-empty"><h4>Aún no hay con qué comparar</h4><p class="tl-text">Guarda al menos 2 diagnósticos (con un mes de diferencia es ideal) y aquí verás tu evolución y cuánto subiste o bajaste.</p></div>';
      return;
    }
    var M = CMP_METRICS[toolState.cmpMetric] || CMP_METRICS.total, key = toolState.cmpMetric in CMP_METRICS ? toolState.cmpMetric : "total";
    var a = clampN(toolState.cmpA, 0, ds.length - 1), b = clampN(toolState.cmpB, 0, ds.length - 1);
    if (a === b) { a = Math.min(1, ds.length - 1); b = 0; }
    toolState.cmpA = a; toolState.cmpB = b;

    var serie = ds.slice(0, 12).slice().reverse().map(function (d) {
      var dt = new Date(d.fecha);
      return { label: isNaN(dt) ? "" : dt.toLocaleDateString("es-PE", { day: "numeric", month: "short" }), value: d[key] };
    }).filter(function (p) { return p.value !== null && p.value !== undefined && !isNaN(p.value); });
    var chart = serie.length >= 2 ? lineChartHTML(serie, M.pre, M.suf) : '<p class="perfil-empty">Faltan datos de ' + M.name + ' en tus diagnósticos para dibujar el gráfico.</p>';

    var last = ds[0][key], prev = ds[1][key], msg = "";
    if (last != null && prev != null) {
      var diff = last - prev, pct = prev ? Math.round(Math.abs(diff) / prev * 100) : 0;
      var amount = key === "total" ? "S/ " + Math.abs(Math.round(diff)) : n1(Math.abs(diff)) + (key === "kwh" ? " kWh" : " m³");
      msg = diff === 0 ? "Tu " + M.name + " se mantuvo igual que en el diagnóstico anterior."
        : (diff < 0 ? '<b class="is-down">Bajaste ' + amount + '</b> (' + pct + ' %) desde tu diagnóstico anterior. ¡Buen trabajo!'
                    : '<b class="is-up">Subiste ' + amount + '</b> (' + pct + ' %) desde tu diagnóstico anterior.');
    }

    function opts(sel) {
      return ds.map(function (d, i) { return '<option value="' + i + '"' + (i === sel ? " selected" : "") + '>Diagnóstico ' + (ds.length - i) + ' · ' + formatFecha(d.fecha) + '</option>'; }).join("");
    }
    var A = ds[a], B = ds[b];
    var rows = Object.keys(CONSUMER_META).map(function (k) {
      var va = (A.breakdown && A.breakdown[k]) || 0, vb = (B.breakdown && B.breakdown[k]) || 0;
      return { name: CONSUMER_META[k].name, va: va, vb: vb, d: vb - va };
    }).filter(function (r) { return r.va || r.vb; }).sort(function (x, y) { return Math.abs(y.d) - Math.abs(x.d); });

    content.innerHTML =
      '<div class="tl-chips">' + Object.keys(CMP_METRICS).map(function (k) {
        return '<button type="button" class="hx-chip tl-chip" aria-pressed="' + (k === key) + '" data-metric="' + k + '">' + CMP_METRICS[k].label + '</button>';
      }).join("") + '</div>' +
      '<div class="tl-card"><h4>Tu evolución</h4>' + (msg ? '<p class="tl-text">' + msg + '</p>' : '') + chart + '</div>' +
      '<div class="tl-card"><h4>Compara dos diagnósticos</h4>' +
        '<div class="roi-grid"><div><label class="roi-label" for="tl-cmp-a">Antes</label><select id="tl-cmp-a" class="roi-select">' + opts(a) + '</select></div>' +
        '<div><label class="roi-label" for="tl-cmp-b">Después</label><select id="tl-cmp-b" class="roi-select">' + opts(b) + '</select></div></div>' +
        '<div class="tl-sim-total" style="margin-top:16px;"><div><span>Antes</span><strong>S/ ' + A.total + '</strong></div><i aria-hidden="true">→</i><div><span>Después</span><strong class="' + (B.total < A.total ? "is-down" : (B.total > A.total ? "is-up" : "")) + '">S/ ' + B.total + '</strong></div></div>' +
        (rows.length ? '<ul class="tl-deltas">' + rows.map(function (r) {
          return '<li><span>' + r.name + ' <em>S/ ' + r.va + ' → S/ ' + r.vb + '</em></span><b class="' + (r.d < 0 ? "is-down" : (r.d > 0 ? "is-up" : "")) + '">' + (r.d === 0 ? "igual" : sgn(r.d)) + '</b></li>';
        }).join("") + '</ul>' : '') +
      '</div>';

    Array.prototype.forEach.call(content.querySelectorAll("[data-metric]"), function (btn) {
      btn.addEventListener("click", function () { toolState.cmpMetric = btn.getAttribute("data-metric"); toolCmp(content); });
    });
    document.getElementById("tl-cmp-a").addEventListener("change", function (e) { toolState.cmpA = Number(e.target.value); toolCmp(content); });
    document.getElementById("tl-cmp-b").addEventListener("change", function (e) { toolState.cmpB = Number(e.target.value); toolCmp(content); });
  }

  /* ---------- 5) Retos de ahorro ---------- */
  function toolRetos(content, base) {
    var res = base.res;
    var cands = tipCandidatesFor(base.answers, res).filter(function (t) { return t.saving > 0; }).slice(0, 8);
    var st = getRetos() || { meta: null, hechos: [] };

    if (!cands.length) {
      content.innerHTML = '<div class="tl-card tl-empty"><h4>¡Ya tienes muy buenos hábitos!</h4><p class="tl-text">Según tu diagnóstico no hay hábitos con ahorro pendiente. Repite tu diagnóstico el próximo mes para ver si algo cambió.</p></div>';
      return;
    }

    var totalPosible = savingSoles(res.kwh, cands.reduce(function (s, t) { return s + t.kwh; }, 0)) + savingWater(res.m3, cands.reduce(function (s, t) { return s + t.m3; }, 0), res.subsidiado);

    if (!st.meta) {
      var sug = Math.max(5, Math.round(totalPosible / 2 / 5) * 5);
      content.innerHTML =
        '<div class="tl-card"><h4>Ponte una meta de ahorro</h4>' +
        '<p class="tl-text">¿Cuántos soles al mes quieres bajar de tu recibo? Con los hábitos de tu diagnóstico podrías llegar hasta unos S/ ' + totalPosible + '.</p>' +
        '<form class="goal-form" id="tl-meta-form" onsubmit="return false;"><input type="number" min="1" step="1" id="tl-meta-input" value="' + sug + '" aria-label="Meta de ahorro en soles al mes"><button type="submit">Empezar reto</button></form></div>';
      document.getElementById("tl-meta-form").addEventListener("submit", function () {
        var v = parseFloat(document.getElementById("tl-meta-input").value);
        if (!(v > 0)) return;
        saveRetos({ meta: v, hechos: [], desde: new Date().toISOString() });
        toolRetos(content, base);
      });
      return;
    }

    var hechos = st.hechos.filter(function (c) { return cands.some(function (t) { return t.category === c; }); });
    var chosen = cands.filter(function (t) { return hechos.indexOf(t.category) > -1; });
    var ahorro = savingSoles(res.kwh, chosen.reduce(function (s, t) { return s + t.kwh; }, 0)) + savingWater(res.m3, chosen.reduce(function (s, t) { return s + t.m3; }, 0), res.subsidiado);
    var pct = Math.min(100, Math.round(ahorro / st.meta * 100));
    var done = ahorro >= st.meta;

    content.innerHTML =
      '<div class="tl-card tl-reto' + (done ? " is-done" : "") + '">' +
        '<div class="goal-status"><span>Meta: bajar S/ ' + st.meta + ' al mes</span><strong>' + pct + ' %</strong></div>' +
        '<div class="goal-track"><span class="goal-fill" style="width:' + pct + '%"></span></div>' +
        '<p class="goal-msg ' + (done ? "is-under" : "") + '">' + (done ? '¡Meta cumplida! Con tus hábitos ahorras unos S/ ' + ahorro + ' al mes, S/ ' + ahorro * 12 + ' al año.' : 'Llevas S/ ' + ahorro + ' de S/ ' + st.meta + '. Marca los hábitos que ya haces o te comprometes a hacer.') + '</p>' +
      '</div>' +
      '<div class="tl-habits">' + cands.map(function (t) {
        var on = hechos.indexOf(t.category) > -1, type = CONSUMER_META[t.category] ? CONSUMER_META[t.category].type : "energy";
        return '<label class="tl-habit' + (on ? " is-on" : "") + '"><input type="checkbox" data-hab="' + t.category + '"' + (on ? " checked" : "") + '>' +
          '<span class="tl-ico is-' + type + '">' + ICONS[t.icon] + '</span>' +
          '<span class="tl-habit-body"><strong>' + t.text + '</strong><em>Ahorro estimado: S/ ' + t.saving + ' al mes</em></span>' +
          '<span class="tl-check" aria-hidden="true"></span></label>';
      }).join("") + '</div>' +
      '<div class="tl-actions"><button type="button" class="btn-plan-cancel" id="tl-meta-edit">Cambiar meta</button><button type="button" class="btn-plan-cancel" id="tl-meta-reset">Reiniciar reto</button></div>' +
      '<p class="tl-note">El ahorro se calcula sobre tu consumo y las tarifas por tramos, así que los hábitos combinados pueden valer distinto que la suma de cada uno.</p>';

    Array.prototype.forEach.call(content.querySelectorAll("[data-hab]"), function (cb) {
      cb.addEventListener("change", function () {
        var list = [];
        Array.prototype.forEach.call(content.querySelectorAll("[data-hab]"), function (x) { if (x.checked) list.push(x.getAttribute("data-hab")); });
        var chosen2 = cands.filter(function (t) { return list.indexOf(t.category) > -1; });
        var ahorro2 = savingSoles(res.kwh, chosen2.reduce(function (s, t) { return s + t.kwh; }, 0)) + savingWater(res.m3, chosen2.reduce(function (s, t) { return s + t.m3; }, 0), res.subsidiado);
        saveRetos({ meta: st.meta, hechos: list, desde: st.desde });
        if (ahorro2 >= st.meta && !done) launchLeaves();
        toolRetos(content, base);
      });
    });
    document.getElementById("tl-meta-edit").addEventListener("click", function () { saveRetos({ meta: null, hechos: hechos, desde: st.desde }); toolRetos(content, base); });
    document.getElementById("tl-meta-reset").addEventListener("click", function () { saveRetos(null); toolRetos(content, base); });
  }

  /* ---------- 6) Calibrar con tu recibo real ---------- */
  function toolCalib(content, base) {
    var cal = getCalib(), est = base.resRaw;
    content.innerHTML =
      (cal ? '<div class="tl-card tl-cal-on"><h4>Ajuste activo</h4><p class="tl-text">Desde el ' + formatFecha(cal.fecha) + ' tus estimaciones usan tu recibo real: luz ×' + cal.fk.toFixed(2) + (cal.fm && cal.fm !== 1 ? ' · agua ×' + cal.fm.toFixed(2) : '') + '. Se aplica a tus próximos diagnósticos y a estas herramientas.</p><button type="button" class="btn-plan-cancel" id="tl-cal-off" style="width:auto;padding:10px 18px;">Quitar ajuste</button></div>' : '') +
      '<div class="tl-card"><h4>Compara con tu recibo real</h4>' +
      '<p class="tl-text">Mira en tu último recibo de luz los kWh consumidos (y, si quieres, los m³ del recibo de agua). Los comparo con lo que estimó tu diagnóstico: <b>' + n1(est.kwh) + ' kWh</b> y <b>' + n1(est.m3) + ' m³</b>.</p>' +
      '<form class="roi-form" id="tl-cal-form" onsubmit="return false;"><div class="roi-grid">' +
        '<div><label class="roi-label" for="tl-cal-k">kWh de tu recibo de luz</label><input type="number" id="tl-cal-k" min="1" step="1" required></div>' +
        '<div><label class="roi-label" for="tl-cal-m">m³ de tu recibo de agua (opcional)</label><input type="number" id="tl-cal-m" min="1" step="0.1"></div>' +
      '</div><button type="submit" class="btn btn-primary">Comparar</button></form><div id="tl-cal-out"></div></div>';

    var off = document.getElementById("tl-cal-off");
    if (off) off.addEventListener("click", function () { saveCalib(null); renderTools(); });

    function precision(pct) {
      var a = Math.abs(pct);
      return a <= 10 ? ["Muy cerca", "is-good"] : (a <= 25 ? ["Bastante cerca", "is-ok"] : ["Lejos", "is-bad"]);
    }
    function row(name, unit, e, real) {
      var pct = Math.round((e - real) / real * 100), p = precision(pct);
      return '<div class="tl-calrow ' + p[1] + '"><div><span>' + name + '</span><b>' + n1(e) + ' → ' + n1(real) + ' ' + unit + '</b></div>' +
        '<strong>' + p[0] + '</strong><em>' + (pct === 0 ? "Coincide exacto." : "Tu diagnóstico estimó " + Math.abs(pct) + " % " + (pct < 0 ? "menos" : "más") + " de lo que dice tu recibo.") + '</em></div>';
    }
    document.getElementById("tl-cal-form").addEventListener("submit", function () {
      var kr = parseFloat(document.getElementById("tl-cal-k").value), mr = parseFloat(document.getElementById("tl-cal-m").value);
      if (!(kr > 0)) return;
      var fk = clampN(kr / est.kwh, 0.4, 2.5), fm = (mr > 0 && est.m3 > 0) ? clampN(mr / est.m3, 0.4, 2.5) : 1;
      var out = document.getElementById("tl-cal-out");
      out.innerHTML = row("Luz", "kWh", est.kwh, kr) + (mr > 0 ? row("Agua", "m³", est.m3, mr) : "") +
        '<p class="tl-note" style="text-align:left;">Si hay mucha diferencia, puede que tengas equipos que el cuestionario no considera o que vivan más personas de las indicadas. Puedes aplicar el ajuste para que tus próximos diagnósticos se acerquen a tu recibo.</p>' +
        '<button type="button" class="btn btn-secondary" id="tl-cal-apply">Aplicar este ajuste</button>';
      document.getElementById("tl-cal-apply").addEventListener("click", function () {
        saveCalib({ fk: fk, fm: fm, kwhReal: kr, m3Real: mr > 0 ? mr : null, estKwh: est.kwh, estM3: est.m3, fecha: new Date().toISOString() });
        renderTools();
      });
    });
  }

  /* ---------- Resumen de tramo en los resultados (Premium) / invitación (gratis) ---------- */
  function renderTramoCallout() {
    var el = document.getElementById("tramo-callout");
    if (!el || !lastResult) return;
    el.style.display = "";
    if (!isPremium) {
      el.className = "tramo-callout is-locked";
      el.innerHTML = '<span class="tramo-ico" aria-hidden="true">' + ICONS.lock + '</span>' +
        '<div class="tramo-body"><strong>Alerta de tramo · Premium</strong><p>Descubre si estás cerca de pasar a la tarifa más cara de luz o agua y cuánto ahorrarías.</p></div>' +
        '<button type="button" class="btn-pdf" id="tramo-upsell">Ver Premium</button>';
      document.getElementById("tramo-upsell").addEventListener("click", openPremiumPage);
      return;
    }
    var L = tramoLines(tramoInfo(lastResult.kwh, lastResult.m3, lastResult.subsidiado));
    var rank = { ok: 0, warn: 1, alert: 2 }, worst = rank[L.luz.level] >= rank[L.agua.level] ? L.luz.level : L.agua.level;
    el.className = "tramo-callout is-" + worst;
    el.innerHTML = '<span class="tramo-ico" aria-hidden="true">' + ICONS.gauge + '</span>' +
      '<div class="tramo-body"><strong>Alerta de tramo</strong><p>' + L.luz.short + '</p><p>' + L.agua.short + '</p></div>' +
      '<button type="button" class="btn-pdf" id="tramo-open">Ver detalle</button>';
    document.getElementById("tramo-open").addEventListener("click", function () { openTools("tramo"); });
  }

  /* ---------- Logo para el PDF: se lee desde la imagen de la carpeta img ---------- */
  var LOGO_SRC = "img/logo.png";   // si cambias el nombre del archivo, cámbialo aquí y en index.html
  var logoPDF = null;               // se llena cuando la imagen carga correctamente
  (function () {
    if (typeof Image === "undefined") return;
    var im = new Image();
    im.onload = function () {
      try {
        var c = document.createElement("canvas");
        c.width = im.naturalWidth; c.height = im.naturalHeight;
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(im, 0, 0);
        logoPDF = { data: c.toDataURL("image/jpeg", 0.92), w: c.width, h: c.height };
      } catch (e) { logoPDF = null; } // si el navegador lo bloquea, el PDF usa el logo dibujado
    };
    im.src = LOGO_SRC;
  })();

  /* ---------- Generación de reporte PDF (misma paleta y logo del sitio EcoHogar) ---------- */
  function generatePDF(d, numero) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert("No se pudo cargar el generador de PDF. Revisa tu conexión a internet e inténtalo de nuevo.");
      return;
    }
    var doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    var user = getUser();
    var level = LEVEL_BADGE[d.level] ? d.level : "moderado";
    var badge = LEVEL_BADGE[level];
    var TOTAL_PAGES = FEATURES.pdfPlus ? 3 : 2;

    var PW = 210, PH = 297, M = 14, CW = PW - 2 * M;

    // Paleta tomada de style.css (variables :root del sitio)
    var C = {
      bg: [241, 246, 242], white: [255, 255, 255], line: [220, 230, 223],
      text: [23, 50, 38], soft: [85, 107, 96], faint: [134, 152, 142],
      brand: [31, 92, 70], brandDark: [22, 69, 51], brandSoft: [229, 242, 233], brandSoft2: [211, 235, 218], accent: [124, 199, 154],
      energy: [168, 112, 0], energyBright: [243, 188, 60], energyDim: [255, 244, 217], energyLine: [241, 212, 143],
      water: [29, 127, 176], waterBright: [91, 184, 230], waterDim: [226, 242, 250],
      good: [35, 122, 85], goodDim: [227, 243, 234], goodLine: [183, 224, 201],
      alert: [209, 75, 60], alertDim: [253, 234, 231], alertLine: [244, 185, 177]
    };
    var LV = {
      bajo: { fill: [76, 192, 138], dim: C.goodDim, line: C.goodLine, ink: C.good },
      moderado: { fill: C.energyBright, dim: C.energyDim, line: C.energyLine, ink: C.energy },
      alto: { fill: [238, 123, 109], dim: C.alertDim, line: C.alertLine, ink: C.alert }
    };
    var lv = LV[level];
    var LEVEL_TEXT = {
      bajo: "¡Buen trabajo! Tus hábitos actuales generan un gasto bastante controlado.",
      moderado: "Vas por buen camino, pero hay hábitos que están inflando tu recibo.",
      alto: "Tu consumo actual es elevado. Con algunos ajustes puedes notar la diferencia."
    };

    /* ----- utilidades de dibujo ----- */
    function fill(c) { doc.setFillColor(c[0], c[1], c[2]); }
    function stroke(c) { doc.setDrawColor(c[0], c[1], c[2]); }
    function ink(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function font(style, size) { doc.setFont("helvetica", style); doc.setFontSize(size); }

    // Texto con alineación y espaciado de letras opcional (cs, en mm)
    function put(txt, x, y, size, style, col, align, cs) {
      txt = String(txt);
      font(style, size); ink(col);
      // "³" se dibuja como un 3 pequeño elevado (evita depender del glifo de la fuente)
      if (txt.indexOf("³") >= 0) {
        var parts = txt.split("³"), pw = [], tw = 0, k;
        for (k = 0; k < parts.length; k++) { pw[k] = doc.getTextWidth(parts[k]); tw += pw[k]; }
        doc.setFontSize(size * 0.62);
        var sw = doc.getTextWidth("3");
        tw += sw * (parts.length - 1);
        var sx = align === "right" ? x - tw : (align === "center" ? x - tw / 2 : x);
        for (k = 0; k < parts.length; k++) {
          doc.setFontSize(size); doc.text(parts[k], sx, y); sx += pw[k];
          if (k < parts.length - 1) { doc.setFontSize(size * 0.62); doc.text("3", sx, y - size * 0.1); sx += sw; }
        }
        doc.setFontSize(size);
        return;
      }
      if (!cs) { doc.text(txt, x, y, align ? { align: align } : undefined); return; }
      var ws = [], w = 0, i;
      for (i = 0; i < txt.length; i++) { ws[i] = doc.getTextWidth(txt.charAt(i)); w += ws[i]; }
      w += cs * Math.max(0, txt.length - 1);
      var px = align === "right" ? x - w : (align === "center" ? x - w / 2 : x);
      for (i = 0; i < txt.length; i++) { doc.text(txt.charAt(i), px, y); px += ws[i] + cs; }
    }
    // Párrafo con salto de línea automático; devuelve la cantidad de líneas
    function para(txt, x, y, w, size, style, col, lh) {
      font(style, size);
      var lines = doc.splitTextToSize(String(txt), w);
      lines.forEach(function (l, i) { put(l, x, y + i * lh, size, style, col); });
      return lines.length;
    }
    function label(txt, x, y, col, align) { put(txt, x, y, 6.3, "bold", col || C.faint, align, 0.28); }

    // Esquinas interiores tipo marco técnico
    function brackets(x, y, w, h, len, col, lw) {
      var o = 1.8; x += o; y += o; w -= 2 * o; h -= 2 * o;
      stroke(col); doc.setLineWidth(lw);
      doc.line(x, y, x + len, y); doc.line(x, y, x, y + len);
      doc.line(x + w, y, x + w - len, y); doc.line(x + w, y, x + w, y + len);
      doc.line(x, y + h, x + len, y + h); doc.line(x, y + h, x, y + h - len);
      doc.line(x + w, y + h, x + w - len, y + h); doc.line(x + w, y + h, x + w, y + h - len);
    }
    function card(x, y, w, h, o) {
      o = o || {};
      fill(o.fill || C.white); stroke(o.border || C.line); doc.setLineWidth(0.3);
      doc.roundedRect(x, y, w, h, 2.2, 2.2, "FD");
      if (o.br !== false) brackets(x, y, w, h, 3, o.brCol || C.accent, 0.45);
    }
    function pill(x, y, w, h, bg, border, txt, col, size, cs) {
      fill(bg); stroke(border); doc.setLineWidth(0.3);
      doc.roundedRect(x, y, w, h, h / 2, h / 2, "FD");
      put(txt, x + w / 2, y + h / 2 + size * 0.125, size, "bold", col, "center", cs);
    }
    function titleBar(x, y, w) {
      var n = 8, i, t;
      for (i = 0; i < n; i++) {
        t = i / (n - 1);
        fill([Math.round(C.brand[0] + (C.accent[0] - C.brand[0]) * t), Math.round(C.brand[1] + (C.accent[1] - C.brand[1]) * t), Math.round(C.brand[2] + (C.accent[2] - C.brand[2]) * t)]);
        doc.rect(x + i * w / n, y, w / n + 0.05, 1.1, "F");
      }
    }
    function sectionTitle(txt, x, y) {
      fill(C.brand); doc.rect(x, y - 3.3, 1.2, 4.6, "F");
      put(txt, x + 3.6, y, 8.5, "bold", C.brandDark, null, 0.3);
    }

    // Logo de EcoHogar (casa con hojas), igual al del encabezado del sitio
    function logo(x, y, size) {
      if (logoPDF) {   // usa tu imagen, respetando su proporción
        var k = Math.min(size / logoPDF.w, size / logoPDF.h);
        var lw = logoPDF.w * k, lh = logoPDF.h * k;
        try { doc.addImage(logoPDF.data, "JPEG", x + (size - lw) / 2, y + (size - lh) / 2, lw, lh); return; } catch (e) {}
      }
      var s = size / 40;
      fill(C.brand); doc.roundedRect(x, y, size, size, 11 * s, 11 * s, "F");
      stroke(C.white); doc.setLineWidth(2.6 * s);
      doc.setLineCap("round"); doc.setLineJoin("round");
      doc.lines([[12, -10.5], [12, 10.5]], x + 8 * s, y + 19.5 * s, [s, s], "S", false);
      doc.lines([[0, 11.5], [16, 0], [0, -11.5]], x + 12 * s, y + 18.5 * s, [s, s], "S", false);
      doc.setLineCap("butt"); doc.setLineJoin("miter");
      fill([143, 217, 168]);
      doc.lines([[-4, 0, -6, -3, -6, -6], [4, 0, 6, 2, 6, 6]], x + 20 * s, y + 29 * s, [s, s], "F", true);
      fill([93, 187, 132]);
      doc.lines([[4, 0, 6, -3, 6, -6], [-4, 0, -6, 2, -6, 6]], x + 20 * s, y + 29 * s, [s, s], "F", true);
    }

    // Iconos simples (rayo, gota, hoja) dibujados en una caja de 24 x 24
    function icon(kind, cx, cy, size, col) {
      var s = size / 24, x = cx - size / 2, y = cy - size / 2;
      fill(col);
      if (kind === "bolt") {
        doc.lines([[-9, 12], [7, 0], [-1, 8], [9, -12], [-7, 0]], x + 13 * s, y + 2 * s, [s, s], "F", true);
      } else if (kind === "drop") {
        doc.lines([[4, 5, 7, 9, 7, 13], [0, 3.87, -3.13, 7, -7, 7], [-3.87, 0, -7, -3.13, -7, -7], [0, -4, 3, -8, 7, -13]], x + 12 * s, y + 3 * s, [s, s], "F", true);
      } else {
        doc.lines([[0, -7, 4, -11, 14, -11], [0, 10, -4, 14, -11, 14], [-3, 0]], x + 5 * s, y + 14 * s, [s, s], "F", true);
      }
    }

    // Olas del pie de página (mismos colores que la decoración del sitio)
    function wave(yTop, h, col, flip) {
      var sx = PW / 1440, sy = h / 120;
      var a = flip ? [240, 40, 480, -40, 720, 0] : [240, -40, 480, 40, 720, 0];
      fill(col);
      doc.lines([a, a.slice(), [0, 60], [-1440, 0]], 0, yTop + 60 * sy, [sx, sy], "F", true);
    }
    function footer(pageNo) {
      wave(278, 19, [191, 224, 203], true);
      wave(283, 14, [214, 235, 221], false);
      put("EcoHogar", M, 294.6, 7.5, "bold", C.brand);
      put("Más conciencia, más ahorro", PW / 2, 294.6, 7, "italic", C.brandDark, "center");
      put("Página " + pageNo + " de " + TOTAL_PAGES, PW - M, 294.6, 7, "normal", C.brandDark, "right");
    }
    function pageBg() { fill(C.bg); doc.rect(0, 0, PW, PH, "F"); }
    function header(top, bottom) {
      fill(C.white); doc.rect(0, 0, PW, 22, "F");
      stroke(C.line); doc.setLineWidth(0.3); doc.line(0, 22, PW, 22);
      logo(M, 5.5, 11);
      put("EcoHogar", M + 14.5, 13.4, 15, "bold", C.brand);
      label(top, PW - M, 10, C.faint, "right");
      put(bottom, PW - M, 16.2, 10, "bold", C.brandDark, "right");
    }

    var pad = ("000" + numero).slice(-3);
    var anio = (new Date(d.fecha)).getFullYear();
    var breakdown = d.breakdown || {};

    /* =====================================================================
       PÁGINA 1 — Diagnóstico
       ===================================================================== */
    pageBg();
    header("REPORTE DE DIAGNÓSTICO", "N° " + pad + "  ·  " + formatFecha(d.fecha));

    put("Reporte de consumo doméstico", M, 33, 17, "bold", C.brandDark);
    titleBar(M, 36, 14);
    put("Energía y agua  ·  " + DISTRITO, M, 43, 8.5, "normal", C.soft);

    // ----- Datos del reporte -----
    var yInfo = 47, hInfo = 14;
    card(M, yInfo, CW, hInfo);
    var cw4 = CW / 4;
    var uName = user ? String(user.nombre) : "—";
    if (uName.length > 18) uName = uName.slice(0, 17) + "…";
    [
      ["USUARIO", uName],
      ["FECHA", formatFecha(d.fecha)],
      ["DIAGNÓSTICO", "N° " + numero],
      ["ID DE REPORTE", "EH-" + (isNaN(anio) ? "----" : anio) + "-" + pad]
    ].forEach(function (c, i) {
      var cx = M + i * cw4 + 6;
      if (i > 0) { stroke(C.line); doc.setLineWidth(0.3); doc.line(M + i * cw4, yInfo + 3.5, M + i * cw4, yInfo + hInfo - 3.5); }
      label(c[0], cx, yInfo + 5.8);
      put(c[1], cx, yInfo + 10.6, 9, "bold", C.text);
    });

    // ----- Resultado principal: medidor semicircular como en el sitio -----
    var yHero = 66, hHero = 52;
    card(M, yHero, CW, hHero);
    var gcx = M + 46, gcy = yHero + 36, gr = 25, gw = 4.4;
    var frac = Math.max(0, Math.min(1, d.total / (typeof MAX_TOTAL !== "undefined" && MAX_TOTAL ? MAX_TOTAL : 300)));
    function arc(f) {
      var n = Math.max(2, Math.ceil(70 * f)), pts = [], i, th;
      for (i = 0; i <= n; i++) { th = Math.PI - Math.PI * f * (i / n); pts.push([gcx + gr * Math.cos(th), gcy - gr * Math.sin(th)]); }
      var segs = [];
      for (i = 1; i < pts.length; i++) segs.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]);
      doc.lines(segs, pts[0][0], pts[0][1], [1, 1], "S", false);
    }
    doc.setLineCap("round"); doc.setLineJoin("round");
    stroke([230, 238, 232]); doc.setLineWidth(gw); arc(1);
    if (frac > 0.01) { stroke(lv.fill); doc.setLineWidth(gw); arc(frac); }
    doc.setLineCap("butt"); doc.setLineJoin("miter");
    put("S/ " + d.total, gcx, gcy - 6, 24, "bold", C.brandDark, "center");
    put("estimado al mes", gcx, gcy + 0.5, 7, "normal", C.faint, "center");
    var cap = (d.kwh ? "aprox. " + d.kwh + " kWh de luz" : "") + (d.kwh && d.m3 ? " y " : "") + (d.m3 ? d.m3 + " m³ de agua" : "");
    if (cap) put(cap, gcx, gcy + 8.5, 7.2, "normal", C.soft, "center");

    stroke(C.line); doc.setLineWidth(0.3); doc.line(M + 92, yHero + 7, M + 92, yHero + hHero - 7);
    var rx = M + 100;
    label("NIVEL DE GASTO", rx, yHero + 11, C.faint);
    pill(rx, yHero + 14.5, 46, 8, lv.dim, lv.line, "GASTO " + badge.label, lv.ink, 7.5, 0.25);
    para(LEVEL_TEXT[level], rx, yHero + 31, CW - 100 - 6, 9, "normal", C.text, 4.6);
    put("Calculado para " + DISTRITO, rx, yHero + hHero - 5, 6.5, "normal", C.faint);

    // ----- Indicadores -----
    var yK = 123, hK = 20, gap = 4, kw = (CW - 2 * gap) / 3;
    [
      { t: "ELECTRICIDAD", v: d.kwh ? d.kwh + " kWh" : "—", s: "consumo mensual", ic: "bolt", c: C.energy, dim: C.energyDim },
      { t: "AGUA", v: d.m3 ? d.m3 + " m³" : "—", s: "consumo mensual", ic: "drop", c: C.water, dim: C.waterDim },
      { t: "AHORRO POSIBLE", v: "S/ " + (d.savingPotential || 0), s: "por mes con los consejos", ic: "leaf", c: C.good, dim: C.goodDim }
    ].forEach(function (k, i) {
      var kx = M + i * (kw + gap);
      card(kx, yK, kw, hK);
      fill(k.dim); doc.circle(kx + 11, yK + hK / 2, 4.8, "F");
      icon(k.ic, kx + 11, yK + hK / 2, 5.4, k.c);
      label(k.t, kx + 19.5, yK + 7.4);
      put(k.v, kx + 19.5, yK + 13.6, 12.5, "bold", C.brandDark);
      put(k.s, kx + 19.5, yK + 17.4, 6.4, "normal", C.soft);
    });

    // ----- Mayor consumidor -----
    var yT = 148, hT = 33;
    card(M, yT, CW, hT, { fill: C.brandSoft, border: C.brandSoft2, brCol: C.white });
    var topKey = null;
    Object.keys(CONSUMER_META).forEach(function (k) { if (CONSUMER_META[k].name === d.topConsumer) topKey = k; });
    var topType = topKey ? CONSUMER_META[topKey].type : "energy";
    var topVal = topKey ? (breakdown[topKey] || 0) : 0;
    var totalAll = Object.keys(breakdown).reduce(function (s, k) { return s + (breakdown[k] || 0); }, 0) || 1;
    fill(topType === "water" ? C.waterDim : C.energyDim); doc.roundedRect(M + 7, yT + 6, 14, 14, 3, 3, "F");
    icon(topType === "water" ? "drop" : "bolt", M + 14, yT + 13, 8, topType === "water" ? C.water : C.energy);
    label("MAYOR CONSUMIDOR", M + 26, yT + 8, C.good);
    put(d.topConsumer || "—", M + 26, yT + 13.8, 11, "bold", C.brandDark);
    if (topVal) put("S/ " + topVal + " / mes", M + 26, yT + 19, 8.5, "bold", C.soft);
    if (topVal) pill(M + CW - 7 - 27, yT + 7, 27, 6.6, C.white, C.brandSoft2, Math.round((topVal / totalAll) * 100) + "% del total", C.good, 6.8, 0);
    if (topKey && CONSUMER_DESC[topKey]) para(CONSUMER_DESC[topKey], M + 7, yT + 26.5, CW - 14, 7.8, "normal", C.soft, 4);

    // ----- Desglose por categoría (máx. 9 filas + "Otras") -----
    var rows = Object.keys(CONSUMER_META).map(function (key) {
      return { name: CONSUMER_META[key].name, type: CONSUMER_META[key].type, val: breakdown[key] || 0 };
    }).filter(function (r) { return r.val > 0; }).sort(function (a, b) { return b.val - a.val; });
    if (rows.length > 10) {
      var resto = rows.slice(9);
      rows = rows.slice(0, 9);
      rows.push({ name: "Otras categorías", type: "other", val: resto.reduce(function (s, r) { return s + r.val; }, 0) });
    }
    var yB = 186, hB = 80;
    card(M, yB, CW, hB);
    sectionTitle("DESGLOSE POR CATEGORÍA", M + 7, yB + 10);
    fill(C.energyBright); doc.roundedRect(M + CW - 50, yB + 7.2, 2.8, 2.8, 0.7, 0.7, "F");
    put("Electricidad", M + CW - 46, yB + 9.6, 7, "normal", C.soft);
    fill(C.waterBright); doc.roundedRect(M + CW - 25, yB + 7.2, 2.8, 2.8, 0.7, 0.7, "F");
    put("Agua", M + CW - 21, yB + 9.6, 7, "normal", C.soft);

    if (!rows.length) put("Este diagnóstico no tiene desglose por categoría.", M + 7, yB + 24, 8.5, "normal", C.faint);
    var maxVal = rows.length ? rows[0].val : 1;
    var rowH = rows.length ? Math.min(6.4, (hB - 19 - 5) / rows.length) : 6.4;
    var barX = M + 72, barW = CW - 72 - 34;
    rows.forEach(function (r, i) {
      var cy = yB + 19 + i * rowH + rowH / 2;
      if (i % 2 === 0) { fill([246, 250, 247]); doc.rect(M + 3, cy - rowH / 2, CW - 6, rowH, "F"); }
      put(r.name, M + 7, cy + 1, 8, "normal", C.text);
      fill(C.brandSoft); doc.roundedRect(barX, cy - 1.2, barW, 2.4, 1.2, 1.2, "F");
      fill(r.type === "water" ? C.waterBright : (r.type === "other" ? C.accent : C.energyBright));
      doc.roundedRect(barX, cy - 1.2, Math.max(2.4, barW * (r.val / maxVal)), 2.4, 1.2, 1.2, "F");
      put("S/ " + r.val, M + CW - 17, cy + 1, 8, "bold", C.brandDark, "right");
      put(Math.round((r.val / totalAll) * 100) + "%", M + CW - 6, cy + 1, 7, "normal", C.faint, "right");
    });

    var nota = "Estimaciones referenciales para hogares de " + DISTRITO + ". Luz: " + TARIFA.fuente + ". Agua: " + AGUA.fuente + ". Este reporte no reemplaza tu recibo real.";
    para(nota, M, 271, CW, 6.2, "normal", C.faint, 2.6);
    footer(1);

    if (FEATURES.pdfPlus) {
    /* =====================================================================
       PÁGINA 2 — Análisis Premium: proyección anual, tramos y plan de 30 días
       ===================================================================== */
    doc.addPage();
    pageBg();
    header("ANÁLISIS PREMIUM", "Proyección y plan de ahorro");

    put("Tu análisis de ahorro", M, 33, 17, "bold", C.brandDark);
    titleBar(M, 36, 14);
    put("Proyección a 12 meses, tarifas por tramos y un plan para los próximos 30 días", M, 43, 8.5, "normal", C.soft);

    // ----- Proyección anual -----
    var sav = d.savingPotential || 0;
    var yP = 49, hP = 37;
    card(M, yP, CW, hP);
    sectionTitle("PROYECCIÓN ANUAL", M + 7, yP + 9);
    var cw3 = (CW - 14) / 3;
    [
      { t: "SI NO CAMBIAS NADA", v: "S/ " + (d.total * 12), s: "gasto estimado en 12 meses", c: C.brandDark },
      { t: "CON LOS CONSEJOS", v: "S/ " + (Math.max(0, d.total - sav) * 12), s: "gasto estimado en 12 meses", c: C.good },
      { t: "AHORRO EN UN AÑO", v: "S/ " + (sav * 12), s: "unos S/ " + sav + " cada mes", c: C.good }
    ].forEach(function (k, i) {
      var kx = M + 7 + i * cw3;
      label(k.t, kx, yP + 16.5);
      put(k.v, kx, yP + 24.5, 14, "bold", k.c);
      put(k.s, kx, yP + 28.5, 6.6, "normal", C.soft);
    });
    var barW2 = CW - 14, fracKeep = d.total > 0 ? Math.max(0, Math.min(1, (d.total - sav) / d.total)) : 1;
    fill(C.goodDim); doc.roundedRect(M + 7, yP + 31, barW2, 2.6, 1.3, 1.3, "F");
    fill(C.good); doc.roundedRect(M + 7, yP + 31, Math.max(2.6, barW2 * fracKeep), 2.6, 1.3, 1.3, "F");

    // ----- Gráfico de tramos -----
    var tr = tramoLines(tramoInfo(d.kwh != null ? d.kwh : 0, d.m3 != null ? d.m3 : 0, d.subsidiado === true));
    var yT2 = 91, hT2 = 82;
    card(M, yT2, CW, hT2);
    sectionTitle("TU POSICIÓN EN LAS TARIFAS POR TRAMOS", M + 7, yT2 + 9);
    var SC = [[124, 199, 154], [243, 188, 60], [238, 123, 109], [209, 75, 60]];
    function scaleBar(x, y, w, value, limits, max, unit) {
      var prev = 0;
      limits.concat([max]).forEach(function (lim, i) {
        fill(SC[i]); doc.rect(x + w * prev / max, y, w * (lim - prev) / max, 3.4, "F");
        prev = lim;
      });
      stroke(C.white); doc.setLineWidth(0.5);
      limits.forEach(function (lim) {
        var tx = x + w * lim / max;
        doc.line(tx, y, tx, y + 3.4);
        put(lim + " " + unit, tx, y + 8, 6.4, "normal", C.soft, "center");
      });
      var px = x + w * Math.min(value, max) / max;
      fill(C.brandDark); doc.lines([[-1.7, -2.6], [3.4, 0]], px, y - 0.5, [1, 1], "F", true);
      put(n1(value) + " " + unit, Math.max(x + 9, Math.min(x + w - 9, px)), y - 4, 7.6, "bold", C.brandDark, "center");
    }
    function tramoBlock(y, name, color, dim, ico, value, limits, max, unit, textObj) {
      fill(dim); doc.circle(M + 12, y + 3, 4, "F");
      icon(ico, M + 12, y + 3, 4.6, color);
      label(name, M + 19, y + 4.2, color);
      if (value == null) {
        put("Este diagnóstico no guardó el dato de consumo.", M + 19, y + 11, 8, "normal", C.faint);
        return;
      }
      scaleBar(M + 19, y + 15, CW - 19 - 9, value, limits, max, unit);
      para(textObj.text, M + 19, y + 27.5, CW - 19 - 9, 7.4, "normal", C.text, 3.7);
    }
    var maxKd = Math.max(200, Math.ceil(((d.kwh || 0) * 1.15) / 10) * 10);
    var maxMd = Math.max(60, Math.ceil(((d.m3 || 0) * 1.15) / 5) * 5);
    tramoBlock(yT2 + 14, "ELECTRICIDAD · PLUZ", C.energy, C.energyDim, "bolt", d.kwh, [30, 140], maxKd, "kWh", tr.luz);
    tramoBlock(yT2 + 49, "AGUA · SEDAPAL", C.water, C.waterDim, "drop", d.m3, [10, 20, 50], maxMd, "m³", tr.agua);

    // ----- Plan de 30 días -----
    function planItems() {
      var items = [], seen = {};
      if (d.answers) {
        var rr = buildResult(d.answers, null);
        tipCandidatesFor(d.answers, rr).filter(function (t) { return t.saving > 0; }).slice(0, 3).forEach(function (t) {
          items.push({ text: t.text, saving: t.saving }); seen[t.category] = true;
        });
      }
      if (items.length < 3) {
        Object.keys(breakdown).sort(function (a, b) { return breakdown[b] - breakdown[a]; }).forEach(function (cat) {
          if (items.length >= 3 || seen[cat] || !TIP_POOL[cat]) return;
          var best = null;
          Object.keys(TIP_POOL[cat]).forEach(function (v) {
            var t = TIP_POOL[cat][v], w = (t.kwh || 0) + (t.m3 || 0) * 10 + (t.waterFrac || 0) * 10;
            if (!best || w > best.w) best = { t: t, w: w };
          });
          if (best && best.w > 0) { items.push({ text: best.t.text, saving: null }); seen[cat] = true; }
        });
      }
      return items;
    }
    var plan = planItems();
    var weeks = [];
    for (var wi = 0; wi < 3; wi++) {
      weeks.push(plan[wi] || { text: "Revisa tu recibo del mes y compáralo con este reporte para ver tu avance.", saving: null });
    }
    weeks.push({ text: "Repite tu diagnóstico en EcoHogar y compara el resultado con este reporte.", saving: null, last: true });

    var yPl = 177, hPl = 97;
    card(M, yPl, CW, hPl);
    sectionTitle("PLAN DE 30 DÍAS", M + 7, yPl + 9);
    if (sav > 0) pill(M + CW - 7 - 50, yPl + 4.2, 50, 6.4, C.goodDim, C.goodLine, "META: AHORRAR S/ " + sav + " AL MES", C.good, 6.2, 0.15);
    weeks.forEach(function (wk, i) {
      var ry2 = yPl + 15 + i * 19;
      if (i > 0) { stroke(C.line); doc.setLineWidth(0.25); doc.line(M + 7, ry2 - 2.4, M + CW - 7, ry2 - 2.4); }
      fill(wk.last ? C.brandSoft : C.goodDim); doc.circle(M + 14, ry2 + 5.4, 5, "F");
      put("S" + (i + 1), M + 14, ry2 + 6.7, 8, "bold", wk.last ? C.brand : C.good, "center");
      label("SEMANA " + (i + 1), M + 24, ry2 + 2.2, C.faint);
      para(wk.text, M + 24, ry2 + 7, CW - 24 - 36, 8, "normal", C.text, 4.1);
      if (wk.saving) {
        put("S/ " + wk.saving, M + CW - 7, ry2 + 6.2, 10, "bold", C.good, "right");
        put("al mes", M + CW - 7, ry2 + 10.2, 6.4, "normal", C.soft, "right");
      }
    });

    footer(2);
    }

    /* =====================================================================
       Guía rápida de energía (kW, kWh y kWp)
       ===================================================================== */
    doc.addPage();
    pageBg();
    header("GUÍA RÁPIDA", "Unidades de energía");

    put("kW, kWh y kWp: no los confundas", M, 33, 17, "bold", C.brandDark);
    titleBar(M, 36, 14);
    put("Para entender las cifras de tu diagnóstico y de tu recibo de luz", M, 43, 8.5, "normal", C.soft);

    var defs = [
      { badge: "kW", title: "POTENCIA", col: C.water, dim: C.waterDim, line: [196, 227, 243],
        desc: "Cuánta energía usa o produce un equipo en un instante. Es la rapidez con la que trabaja, como la velocidad de un auto.",
        ex: "Ejemplo: una plancha de 2 kW demanda 2 kW mientras está encendida." },
      { badge: "kWh", title: "ENERGÍA", col: C.good, dim: C.goodDim, line: C.goodLine,
        desc: "Cuánta energía se consume durante un periodo de tiempo. Es lo que mide tu medidor y lo que se cobra en tu recibo de luz.",
        ex: "Ejemplo: 2 kW durante media hora (0.5 h) = 1 kWh." },
      { badge: "kWp", title: "POTENCIA PICO", col: C.energy, dim: C.energyDim, line: C.energyLine,
        desc: "La potencia máxima de un panel solar en condiciones estándar de prueba. Indica la capacidad instalada, no lo que produce cada hora.",
        ex: "Ejemplo: 10 paneles de 450 W = 4500 W = 4.5 kWp." }
    ];
    var yD = 49, hD = 36, gD = 4;
    defs.forEach(function (df, i) {
      var y = yD + i * (hD + gD);
      card(M, y, CW, hD);
      fill(df.col); doc.circle(M + 14, y + 12, 7, "F");
      put(df.badge, M + 14, y + 13.4, df.badge.length > 2 ? 9 : 10.5, "bold", C.white, "center");
      put(df.badge + "  ·  " + df.title, M + 27, y + 9, 10.5, "bold", df.col, null, 0.2);
      para(df.desc, M + 27, y + 15.2, CW - 27 - 8, 8.2, "normal", C.soft, 4.3);
      fill(df.dim); stroke(df.line); doc.setLineWidth(0.25);
      doc.roundedRect(M + 27, y + 25, CW - 27 - 8, 7, 1.8, 1.8, "FD");
      put(df.ex, M + 30, y + 29.6, 7.8, "bold", df.col);
    });

    // Fórmula
    var yF = yD + 3 * (hD + gD) + 0;
    fill(C.brandDark); stroke(C.brandDark); doc.roundedRect(M, yF, CW, 16, 2.4, 2.4, "FD");
    label("FÓRMULA", M + 7, yF + 9.4, C.accent);
    put("Energía (kWh) = Potencia (kW) × Tiempo (h)", M + CW / 2 + 12, yF + 9.8, 11, "bold", C.white, "center");

    // Equivalencias
    var yE = yF + 21, hE = 13, cwE = (CW - 2 * 4) / 3;
    ["1 kW = 1000 W", "1 kWh = 1000 Wh", "1 MW = 1000 kW"].forEach(function (t, i) {
      var ex = M + i * (cwE + 4);
      fill(C.brandSoft); stroke(C.brandSoft2); doc.setLineWidth(0.3);
      doc.roundedRect(ex, yE, cwE, hE, 2.2, 2.2, "FD");
      put(t, ex + cwE / 2, yE + 8.2, 9, "bold", C.brandDark, "center");
    });

    // En tu diagnóstico
    var yG = yE + hE + 5, hG = 22;
    card(M, yG, CW, hG);
    fill(C.goodDim); doc.circle(M + 14, yG + hG / 2, 5.4, "F");
    icon("leaf", M + 14, yG + hG / 2, 6.4, C.good);
    label("EN TU DIAGNÓSTICO", M + 25, yG + 7.6, C.good);
    var kwhDia = d.kwh ? (Math.round(d.kwh / 30 * 10) / 10) : 0;
    var gtxt = d.kwh
      ? "Tu hogar consume aproximadamente " + d.kwh + " kWh de electricidad al mes, unos " + kwhDia + " kWh por día. Es una cantidad de energía (kWh), no de potencia (kW)."
      : "EcoHogar estima tu consumo eléctrico en kWh al mes: es energía consumida durante un periodo, no potencia.";
    para(gtxt, M + 25, yG + 12.8, CW - 25 - 8, 8.2, "normal", C.text, 4.3);

    // Error común
    var yR = yG + hG + 5, hR = 22;
    card(M, yR, CW, hR, { fill: C.alertDim, border: C.alertLine, brCol: C.white });
    fill(C.alert); stroke(C.alert); doc.setLineWidth(1.2);
    doc.setLineJoin("round");
    doc.lines([[6.2, 10.6], [-12.4, 0]], M + 14, yR + 5.4, [1, 1], "FD", true);
    doc.setLineJoin("miter");
    put("!", M + 14, yR + 15, 11, "bold", C.white, "center");
    label("ERROR COMÚN", M + 27, yR + 7.6, C.alert);
    para("Decir que un sistema de 5 kWp produce 5 kWh por hora es incorrecto: la producción real depende de la luz solar del momento.", M + 27, yR + 12.8, CW - 27 - 8, 8.2, "normal", C.text, 4.3);

    footer(FEATURES.pdfPlus ? 3 : 2);

    doc.save("ecohogar-diagnostico-" + numero + ".pdf");
  }

  function pdfButtonHTML(idx) {
    if (isPremium) {
      return '<button type="button" class="btn-pdf" data-pdf-idx="' + idx + '">' + ICON_DOWNLOAD + ' Descargar PDF</button>';
    }
    return '<button type="button" class="btn-pdf is-locked" data-pdf-locked="1">' + ICON_DOWNLOAD + ' Descargar PDF (Premium)</button>';
  }

  function bindPdfButtons(scopeEl, diagnosticos) {
    scopeEl.querySelectorAll("[data-pdf-idx]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var idx = Number(btn.getAttribute("data-pdf-idx"));
        generatePDF(diagnosticos[idx], diagnosticos.length - idx);
      });
    });
    scopeEl.querySelectorAll("[data-pdf-locked]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        clearNavActive();
        renderPremiumArea();
        showView(viewPremium);
      });
    });
  }

  setTopButtonState();

  function renderQuestion() {
    window.scrollTo(0, 0);
    var q = QUESTIONS[currentQuestion];
    for (var i = 0; i < ticks.length; i++) {
      ticks[i].classList.toggle("is-filled", i <= currentQuestion);
    }
    progressLabel.textContent = "Pregunta " + (currentQuestion + 1) + " de " + QUESTIONS.length;
    quizIcon.innerHTML = ICONS[q.icon];
    quizQuestionEl.textContent = q.title;

    quizOptionsEl.innerHTML = "";
    q.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("role", "radio");
      var checked = answers[q.id] === opt.value;
      btn.setAttribute("aria-checked", checked ? "true" : "false");
      btn.innerHTML = '<span class="option-dot" aria-hidden="true"></span><span class="option-label">' + opt.label + "</span>";
      btn.addEventListener("click", function () {
        answers[q.id] = opt.value;
        renderQuestion();
        window.setTimeout(advance, 260);
      });
      quizOptionsEl.appendChild(btn);
    });

    btnBack.style.display = currentQuestion === 0 ? "none" : "inline-flex";
    btnNext.style.display = answers[q.id] ? "inline-flex" : "none";
  }

  function advance() {
    if (currentQuestion < QUESTIONS.length - 1) { currentQuestion++; renderQuestion(); }
    else { computeAndShowResults(); }
  }

  btnNext.addEventListener("click", advance);
  btnBack.addEventListener("click", function () {
    if (currentQuestion > 0) { currentQuestion--; renderQuestion(); }
    else { showView(viewIntro); }
  });

  function startDiagnostico() {
    currentQuestion = 0;
    answers = {};
    clearNavActive();
    showView(viewQuiz);
    renderQuestion();
  }

  document.getElementById("btn-start").addEventListener("click", startDiagnostico);
  var btnStartComo = document.getElementById("btn-start-como");
  if (btnStartComo) btnStartComo.addEventListener("click", startDiagnostico);

  function computeAndShowResults() {
    var calib = (isPremium && FEATURES.calib) ? getCalib() : null;   // el ajuste con el recibo real es de Premium
    lastResult = buildResult(answers, calib);
    lastResult.calibrado = !!calib;

    renderGauge(lastResult.total, lastResult.level);
    renderConsumer(lastResult.breakdown);
    renderTips();
    renderTramoCallout();
    goToScreen(1);
    showView(viewResults);
  }

  function renderGauge(total, level) {
    var gaugeWrap = document.getElementById("gauge-wrap");
    gaugeWrap.className = "gauge-wrap gauge-level-" + level;

    var fraction = Math.max(0, Math.min(1, total / MAX_TOTAL));
    var circumference = 251;
    var offset = circumference - fraction * circumference;
    var fillPath = document.getElementById("gauge-fill");
    window.requestAnimationFrame(function () { fillPath.style.strokeDashoffset = offset; });

    var gaugeNum = document.getElementById("gauge-number");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gaugeNum.textContent = "S/ " + total;
    } else {
      gaugeNum.textContent = "S/ 0";
      var t0 = null;
      var tick = function (ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / 900);
        gaugeNum.textContent = "S/ " + Math.round(total * (1 - Math.pow(1 - k, 3)));
        if (k < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    }

    var levelText = {
      bajo: "¡Buen trabajo! Tus hábitos actuales generan un gasto bastante controlado.",
      moderado: "Vas por buen camino, pero hay hábitos que están inflando tu recibo.",
      alto: "Tu consumo actual es elevado. Con algunos ajustes puedes notar la diferencia."
    };
    document.getElementById("result-level-text").textContent = levelText[level];

    var captionEl = document.getElementById("gauge-caption");
    if (captionEl && lastResult) captionEl.textContent = "estimado al mes · ≈ " + lastResult.kwh + " kWh de luz y " + (Math.round(lastResult.m3 * 10) / 10) + " m³ de agua" + (lastResult.calibrado ? " · ajustado a tu recibo" : "");
    var tarifaNote = document.getElementById("tarifa-note");
    if (tarifaNote) tarifaNote.textContent = "Calculado para " + DISTRITO + ". Luz: " + TARIFA.fuente + ". Agua: " + AGUA.fuente + ".";

    var levelLabel = { bajo: "Gasto BAJO", moderado: "Gasto MODERADO", alto: "Gasto ALTO" };
    document.getElementById("level-pill").textContent = levelLabel[level];
  }

  function renderConsumer(breakdown) {
    var topKey = null, topValue = -1;
    Object.keys(CONSUMER_META).forEach(function (key) {
      if (breakdown[key] > topValue) { topValue = breakdown[key]; topKey = key; }
    });
    if (!topKey || topValue <= 0) { topKey = "iluminacion"; topValue = breakdown.iluminacion; }

    document.getElementById("consumer-icon").className = "consumer-icon is-" + CONSUMER_META[topKey].type;
    document.getElementById("consumer-icon").innerHTML = ICONS[CONSUMER_META[topKey].icon];
    document.getElementById("consumer-name").textContent = CONSUMER_META[topKey].name;
    document.getElementById("consumer-cost").textContent = "S/ " + topValue + " / mes";
    document.getElementById("consumer-desc").textContent = CONSUMER_DESC[topKey];

    var totalAll = Object.keys(breakdown).reduce(function (s, k) { return s + (breakdown[k] || 0); }, 0) || 1;
    var shareEl = document.getElementById("consumer-share");
    if (shareEl) shareEl.textContent = Math.round((topValue / totalAll) * 100) + "% del total";

    var othersEl = document.getElementById("consumer-others");
    var othersWrap = document.getElementById("consumer-others-wrap");
    if (othersEl) {
      var rows = Object.keys(CONSUMER_META)
        .filter(function (k) { return k !== topKey && breakdown[k] > 0; })
        .sort(function (a, b) { return breakdown[b] - breakdown[a]; })
        .map(function (k) {
          var m = CONSUMER_META[k];
          return '<div class="other-row">' +
            '<div class="other-icon is-' + m.type + '" aria-hidden="true">' + ICONS[m.icon] + '</div>' +
            '<div class="other-text"><strong>' + m.name + '</strong><span>S/ ' + breakdown[k] + ' al mes</span></div>' +
            '<span class="share-pill">' + Math.round((breakdown[k] / totalAll) * 100) + '%</span>' +
          '</div>';
        });
      othersEl.innerHTML = rows.join("");
      if (othersWrap) othersWrap.style.display = rows.length ? "" : "none";
    }

    if (lastResult) lastResult.topConsumer = CONSUMER_META[topKey].name;
  }

  function renderTips() {
    var candidates = [];
    Object.keys(TIP_POOL).forEach(function (category) {
      var tip = TIP_POOL[category][answers[category]];
      if (tip) {
        var kwhTotal = lastResult ? lastResult.kwh : 0;
        var m3Total = lastResult ? lastResult.m3 : 0;
        var m3Saved = lastResult ? (tip.waterFrac ? lastResult.showerM3 * tip.waterFrac : 0) + (tip.m3 || 0) : 0;
        var savingS = (tip.kwh ? savingSoles(kwhTotal, tip.kwh) : 0) + (m3Saved ? savingWater(m3Total, m3Saved, lastResult && lastResult.subsidiado) : 0);
        candidates.push({ text: tip.text, saving: savingS, kwh: tip.kwh || 0, m3: m3Saved, icon: tip.icon, category: category });
      }
    });

    candidates.sort(function (a, b) { return b.saving - a.saving; });
    var improvement = candidates.filter(function (t) { return t.saving > 0; });
    var reinforcement = candidates.filter(function (t) { return t.saving === 0; });
    var chosen = improvement.slice(0, 3);
    if (chosen.length < 3) chosen = chosen.concat(reinforcement.slice(0, 3 - chosen.length));

    if (lastResult) {
      var kwhPotential = improvement.reduce(function (sum, t) { return sum + t.kwh; }, 0);
      var m3Potential = improvement.reduce(function (sum, t) { return sum + t.m3; }, 0);
      lastResult.savingPotential = savingSoles(lastResult.kwh, kwhPotential) + savingWater(lastResult.m3, m3Potential, lastResult.subsidiado);
    }

    var list = document.getElementById("tip-list");
    list.innerHTML = "";
    chosen.forEach(function (tip) {
      var card = document.createElement("div");
      card.className = "tip-card";
      var type = CONSUMER_META[tip.category] ? CONSUMER_META[tip.category].type : "energy";
      var savingHTML = tip.saving > 0
        ? '<span class="tip-saving">Ahorro estimado: S/ ' + tip.saving + '/mes' + (tip.kwh ? ' (' + tip.kwh + ' kWh)' : '') + '</span>'
        : '<span class="tip-saving" style="color:var(--text-faint);">Buen hábito</span>';
      card.innerHTML =
        '<div class="tip-icon is-' + type + '" aria-hidden="true">' + ICONS[tip.icon] + '</div>' +
        '<div><p class="tip-text">' + tip.text + '</p>' + savingHTML + '</div>';
      list.appendChild(card);
    });
  }

  var resultScreens = Array.prototype.slice.call(document.querySelectorAll(".result-screen"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("#results-dots .dot"));

  function goToScreen(n) {
    resultScreens.forEach(function (s) { s.classList.toggle("is-active", Number(s.getAttribute("data-screen")) === n); });
    dots.forEach(function (d, i) { d.classList.toggle("is-active", i === n - 1); });
    window.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () { goToScreen(Number(btn.getAttribute("data-goto"))); });
  });

  document.getElementById("btn-save").addEventListener("click", function () {
    if (lastResult) {
      saveDiagnostico({
        fecha: new Date().toISOString(),
        total: lastResult.total,
        kwh: lastResult.kwh || null,
        m3: lastResult.m3 ? Math.round(lastResult.m3 * 10) / 10 : null,
        level: lastResult.level,
        breakdown: lastResult.breakdown,
        topConsumer: lastResult.topConsumer || null,
        savingPotential: lastResult.savingPotential || 0,
        answers: lastResult.answers,
        subsidiado: !!lastResult.subsidiado
      });
    }
    var d = new Date();
    d.setDate(d.getDate() + 30);
    var formatted = d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
    var el = document.getElementById("reminder-date");
    el.textContent = "Repite tu diagnóstico el " + formatted;
    el.classList.add("is-visible");

    if (!isLoggedIn) {
      var note = document.getElementById("reminder-date");
      note.insertAdjacentHTML("afterend", '<p id="save-login-hint" style="margin-top:10px;font-size:.82rem;color:var(--text-faint);">Consejo: inicia sesión para ver este diagnóstico guardado en tu perfil.</p>');
    }
  });

  document.getElementById("btn-restart").addEventListener("click", function () {
    currentQuestion = 0;
    answers = {};
    document.getElementById("reminder-date").classList.remove("is-visible");
    var hint = document.getElementById("save-login-hint");
    if (hint) hint.remove();
    clearNavActive();
    document.querySelector('[data-view="view-intro"]').classList.add("is-active");
    showView(viewIntro);
  });


  /* ---------- Lluvia de hojas al guardar el diagnóstico ---------- */
  function launchLeaves() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colors = ["#4FA36F", "#7CC79A", "#2F7D58", "#63B784", "#A8DBBB", "#F7C948"];
    for (var i = 0; i < 26; i++) {
      var el = document.createElement("span");
      el.className = "confetti-leaf";
      var size = 16 + Math.random() * 16;
      el.style.left = (Math.random() * 100) + "vw";
      el.style.width = size + "px";
      el.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      el.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      el.style.setProperty("--dur", (2.2 + Math.random() * 1.6) + "s");
      el.style.setProperty("--delay", (Math.random() * 0.5) + "s");
      el.innerHTML = '<svg viewBox="0 0 40 26" aria-hidden="true"><path d="M2 13C10 0 30 0 38 13C30 26 10 26 2 13Z" fill="' + colors[i % colors.length] + '"/><path d="M6 13H34" stroke="#fff" stroke-opacity=".4" stroke-width="1.5" stroke-linecap="round"/></svg>';
      document.body.appendChild(el);
      (function (node) { window.setTimeout(function () { node.remove(); }, 4600); })(el);
    }
  }
  document.getElementById("btn-save").addEventListener("click", launchLeaves);

  /* ==========================================================================
     INICIO — animaciones y secciones interactivas (prueba rápida, datos curiosos)
     Usa TARIFA y AGUA definidas arriba, así los datos cambian solos si cambian las tarifas.
     ========================================================================== */
  (function homeExtras() {
    try {
      var root = document.querySelector(".home-extra");
      if (!root) return;
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      root.classList.add("hx-js");

      function fmt(n, d) { return n.toLocaleString("es-PE", { minimumFractionDigits: d, maximumFractionDigits: d }); }

      // anima un número hasta su valor final
      function tween(el, to, dec, ms) {
        var from = parseFloat(el.getAttribute("data-v") || "0");
        el.setAttribute("data-v", String(to));
        if (reduce) { el.textContent = fmt(to, dec); return; }
        var t0 = null, dur = ms || 500;
        function step(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(from + (to - from) * e, dec);
          if (p < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      }

      /* ----- Cifras que suben al aparecer ----- */
      function countStats(box) {
        Array.prototype.forEach.call(box.querySelectorAll("[data-count]"), function (el) {
          var to = parseFloat(el.getAttribute("data-count"));
          el.setAttribute("data-v", "0");
          if (reduce) { el.textContent = String(to); return; }
          el.textContent = "0";
          tween(el, to, 0, 1100);
        });
      }

      /* ----- Aparición al hacer scroll ----- */
      var items = root.querySelectorAll(".reveal");
      if ("IntersectionObserver" in window && !reduce) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            en.target.classList.add("is-in");
            if (en.target.classList.contains("hx-stats")) countStats(en.target);
            io.unobserve(en.target);
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
        Array.prototype.forEach.call(items, function (el) { io.observe(el); });
      } else {
        Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); });
      }

      /* ----- Botones "Comenzar" extra: usan el mismo botón de siempre ----- */
      Array.prototype.forEach.call(root.querySelectorAll("[data-start]"), function (b) {
        b.addEventListener("click", function () { document.getElementById("btn-start").click(); });
      });

      /* ----- Prueba rápida: costo de un equipo ----- */
      var EQ = [
        { n: "Terma eléctrica", kw: 1.5, h: 1 },
        { n: "Aire acondicionado", kw: 0.8, h: 4 },
        { n: "TV", kw: 0.08, h: 4 },
        { n: "Ventilador", kw: 0.05, h: 6 },
        { n: "Plancha", kw: 1, h: 0.5 },
        { n: "Foco de 20 W", kw: 0.02, h: 5 }
      ];
      var chipsBox = document.getElementById("hx-chips");
      var range = document.getElementById("hx-hours");
      if (chipsBox && range) {
        var cur = EQ[0], precio = TARIFA.t3.kwh;
        var elSoles = document.getElementById("hx-soles"), elKwh = document.getElementById("hx-kwh"),
            elYear = document.getElementById("hx-year"), elBar = document.getElementById("hx-bar"),
            elOut = document.getElementById("hx-hours-out"), elNote = document.getElementById("hx-note");
        elNote.textContent = "Cálculo con S/ " + precio.toFixed(2) + " por kWh (tarifa de Pluz sobre 140 kWh). Es un ejemplo de un solo equipo: tu recibo suma todos los de tu casa.";

        var update = function () {
          var h = parseFloat(range.value);
          var kwh = cur.kw * h * 30, soles = kwh * precio;
          elOut.textContent = fmt(h, h % 1 ? 1 : 0) + " h";
          tween(elKwh, Math.round(kwh * 10) / 10, 1);
          tween(elSoles, Math.round(soles), 0);
          tween(elYear, Math.round(soles * 12), 0);
          elBar.style.width = Math.min(100, soles / 120 * 100) + "%";
        };
        EQ.forEach(function (eq, i) {
          var b = document.createElement("button");
          b.type = "button"; b.className = "hx-chip"; b.textContent = eq.n;
          b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
          b.addEventListener("click", function () {
            cur = eq; range.value = eq.h;
            Array.prototype.forEach.call(chipsBox.children, function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
            update();
          });
          chipsBox.appendChild(b);
        });
        range.addEventListener("input", update);
        update();
      }

      /* ----- Datos curiosos que rotan (se calculan con las tarifas reales del sitio) ----- */
      function tramo(i) { return (AGUA.tramos[i].agua + AGUA.tramos[i].saneamiento).toFixed(2); }
      var FACTS = [
        { tag: "Pluz Energía", text: "Los primeros 30 kWh del mes son los más baratos (S/ " + TARIFA.t1.kwh.toFixed(2) + " por kWh). Después el kWh sube a S/ " + TARIFA.t2.exceso.toFixed(2) + " y, desde los 140 kWh, a S/ " + TARIFA.t3.kwh.toFixed(2) + "." },
        { tag: "Sedapal", text: "En Sedapal el agua cuesta más mientras más consumes: S/ " + tramo(0) + " por m³ hasta 10 m³, S/ " + tramo(1) + " hasta 20 m³ y S/ " + tramo(2) + " hasta 50 m³ (agua y alcantarillado, antes de impuestos)." },
        { tag: "Estimación EcoHogar", text: "Una terma eléctrica encendida 1 hora al día consume unos 45 kWh al mes: cerca de S/ " + Math.round(45 * TARIFA.t3.kwh) + " en tu recibo de luz." },
        { tag: "Estimación EcoHogar", text: "Un inodoro que pierde agua puede desperdiciar unos 6 m³ al mes. Es agua que pagas y no usas." },
        { tag: "Estimación EcoHogar", text: "Dejar cargadores y equipos enchufados sin usar puede sumar entre 8 y 20 kWh al mes en un hogar típico." }
      ];
      var fBox = document.getElementById("hx-fact"), fTag = document.getElementById("hx-fact-tag"),
          fText = document.getElementById("hx-fact-text"), dots = document.getElementById("hx-dots");
      if (fBox && fTag && fText && dots) {
        var idx = 0, timer = null, paused = false;
        var show = function (i, instant) {
          idx = (i + FACTS.length) % FACTS.length;
          var put = function () {
            fTag.textContent = FACTS[idx].tag; fText.textContent = FACTS[idx].text;
            Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle("is-active", k === idx); d.setAttribute("aria-selected", k === idx ? "true" : "false"); });
            fBox.classList.remove("is-out");
          };
          if (instant || reduce) { put(); return; }
          fBox.classList.add("is-out");
          window.setTimeout(put, 280);
        };
        FACTS.forEach(function (f, i) {
          var d = document.createElement("button");
          d.type = "button"; d.className = "hx-dot"; d.setAttribute("role", "tab"); d.setAttribute("aria-label", "Dato " + (i + 1));
          d.addEventListener("click", function () { show(i); restart(); });
          dots.appendChild(d);
        });
        var restart = function () {
          if (timer) window.clearInterval(timer);
          if (!reduce) timer = window.setInterval(function () { if (!paused) show(idx + 1); }, 6500);
        };
        var card = document.getElementById("hx-facts");
        card.addEventListener("mouseenter", function () { paused = true; });
        card.addEventListener("mouseleave", function () { paused = false; });
        show(0, true); restart();
      }

      /* ----- Consejos que pasan: se duplican para que el recorrido sea continuo ----- */
      var track = document.getElementById("hx-track");
      if (track && !reduce) {
        Array.prototype.slice.call(track.children).forEach(function (p) {
          var c = p.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c);
        });
      }
    } catch (e) { /* si algo falla, el resto de la página sigue funcionando */ }
  })();

})();
