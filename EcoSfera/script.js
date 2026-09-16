/* ---------- BLOQUE 1: BANCO DE DATOS, COSTOS Y CONFIGURACIÓN INICIAL ---------- */
(function(){
  "use strict";

  /* Biblioteca de Iconos en formato SVG */
  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2.2h5c.1-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>',
    plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0V8z"/><path d="M12 17v4"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13z"/></svg>',
    fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="1.5"/><path d="M6 10h12"/><path d="M9 5.5v2M9 13v2"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 14C5 7 9 3 19 3c0 10-4 14-11 14H5z"/><path d="M5 21c2-5 6-8 10-9"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.3c2.6.3 4.5 2.4 4.5 5.7"/></svg>'
  };

  /* Listado oficial de preguntas del Diagnóstico */
  var QUESTIONS = [
    { id:"personas", icon:"users", title:"¿Cuántas personas viven en tu casa?",
      options:[
        {value:"1-2", label:"1 a 2 personas"},
        {value:"3-4", label:"3 a 4 personas"},
        {value:"5+",  label:"5 o más personas"}
      ]},
    { id:"terma", icon:"bolt", title:"¿Tienes terma eléctrica?",
      options:[
        {value:"no",  label:"No tengo"},
        {value:"30",  label:"Sí, unos 30 minutos al día"},
        {value:"60",  label:"Sí, cerca de 1 hora al día"},
        {value:"120", label:"Sí, 2 horas o más al día"}
      ]},
    { id:"iluminacion", icon:"bulb", title:"¿Cuántos focos mantienes encendidos por la noche, y por cuántas horas?",
      options:[
        {value:"baja",  label:"Menos de 3 focos, unas 2 horas"},
        {value:"media", label:"3 a 5 focos, unas 4 horas"},
        {value:"alta",  label:"6 focos o más, unas 5 horas"}
      ]},
    { id:"fantasma", icon:"plug", title:"¿Dejas cargadores o electrodomésticos enchufados sin usarlos?",
      options:[
        {value:"nunca",   label:"Nunca, desconecto todo"},
        {value:"aveces",  label:"A veces se me pasa"},
        {value:"siempre", label:"Casi siempre quedan enchufados"}
      ]},
    { id:"agua", icon:"drop", title:"¿Cuántas duchas diarias se dan en tu casa, y de cuánto tiempo en total?",
      options:[
        {value:"cortas",    label:"Cortas, menos de 5 minutos"},
        {value:"moderadas", label:"Moderadas, unos 10 minutos"},
        {value:"largas",    label:"Largas, más de 15 minutos"}
      ]},
    { id:"refri", icon:"fridge", title:"¿Qué tan llena o antigua es tu refrigeradora?",
      options:[
        {value:"eficiente", label:"Eficiente o medio llena"},
        {value:"antigua",   label:"Muy llena o de modelo antiguo"}
      ]}
  ];

  /* Modelo de costos estimados en Soles (S/) para Lima Metropolitana */
  var COSTS = {
    personas:    { "1-2":40, "3-4":55, "5+":70 },
    terma:       { "no":0, "30":25, "60":50, "120":90 },
    iluminacion: { "baja":8, "media":22, "alta":45 },
    fantasma:    { "nunca":0, "aveces":10, "siempre":25 },
    agua:        { "cortas":15, "moderadas":30, "largas":55 },
    refri:       { "eficiente":25, "antigua":60 }
  };

  var CONSUMER_META = {
    terma:       { icon:"bolt",   name:"Terma eléctrica" },
    iluminacion: { icon:"bulb",   name:"Iluminación nocturna" },
    fantasma:    { icon:"plug",   name:"Consumo fantasma" },
    agua:        { icon:"drop",   name:"Duchas y agua caliente" },
    refri:       { icon:"fridge", name:"Refrigeradora" }
  };

  var CONSUMER_DESC = {
    terma:       "El calentador de agua es de los equipos que más electricidad usa en una casa peruana.",
    iluminacion: "Mantener varios focos encendidos por horas suma más de lo que parece a fin de mes.",
    fantasma:    "Los cargadores y equipos enchufados sin uso siguen consumiendo energía en silencio.",
    agua:        "Duchas largas significan más agua caliente y una terma trabajando más tiempo.",
    refri:       "Una refrigeradora muy llena o antigua exige más esfuerzo para mantener la temperatura."
  };

  /* Bolsa de consejos inteligentes personalizados por respuesta */
  var TIP_POOL = {
    terma: {
      "120": { text:"Baja la temperatura de tu terma a 60°C y limita su uso a una hora al día.", saving:20, icon:"bolt" },
      "60":  { text:"Instala un temporizador en tu terma para que no se quede encendida de más.", saving:12, icon:"bolt" },
      "30":  { text:"Ya usas la terma con moderación: mantener ese hábito sostiene tu ahorro.", saving:0, icon:"bolt" },
      "no":  { text:"No depender de una terma eléctrica ya te ahorra bastante cada mes.", saving:0, icon:"bolt" }
    },
    iluminacion: {
      "alta":  { text:"Cambia tus focos por LED de bajo consumo y apaga los ambientes vacíos.", saving:18, icon:"bulb" },
      "media": { text:"Apaga los focos de los ambientes que no estés usando por la noche.", saving:9, icon:"bulb" },
      "baja":  { text:"Tu uso de luz artificial ya es bajo: aprovecha también la luz natural de día.", saving:0, icon:"bulb" }
    },
    fantasma: {
      "siempre": { text:"Usa una regleta con interruptor para desconectar varios equipos a la vez.", saving:15, icon:"plug" },
      "aveces":  { text:"Antes de dormir, revisa qué cargadores quedaron enchufados sin uso.", saving:6, icon:"plug" },
      "nunca":   { text:"Desconectar todo al no usarlo es un hábito que ya te está ahorrando dinero.", saving:0, icon:"plug" }
    },
    agua: {
      "largas":    { text:"Usa un temporizador de ducha y apunta a bajar a 7 u 8 minutos.", saving:22, icon:"drop" },
      "moderadas": { text:"Cierra la llave mientras te enjabonas para ahorrar minutos de agua caliente.", saving:10, icon:"drop" },
      "cortas":    { text:"Tus duchas cortas ya cuidan el agua y la energía de tu terma.", saving:0, icon:"drop" }
    },
    refri: {
      "antigua":   { text:"Limpia el serpentín trasero de tu refrigeradora y evita sobrellenarla.", saving:14, icon:"fridge" },
      "eficiente": { text:"Mantener tu refrigeradora medio llena y ordenada ya la hace más eficiente.", saving:0, icon:"fridge" }
    }
  };

  var MAX_TOTAL = 70 + 90 + 45 + 25 + 55 + 60;

  /* Variables de control del Estado de la App */
  var answers = {};
  var currentQuestion = 0;

  /* Captura de Elementos de la Interfaz (DOM) */
  var viewIntro   = document.getElementById("view-intro");
  var viewQuiz    = document.getElementById("view-quiz");
  var viewResults = document.getElementById("view-results");

  var progressFill  = document.getElementById("quiz-progress-fill");
  var progressLabel = document.getElementById("quiz-progress-label");
  var quizIcon       = document.getElementById("quiz-icon");
  var quizQuestionEl  = document.getElementById("quiz-question-text");
  var quizOptionsEl   = document.getElementById("quiz-options");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");

  function showView(view){
    [viewIntro, viewQuiz, viewResults].forEach(function(v){ v.classList.remove("is-active"); });
    view.classList.add("is-active");
  }
/* ---------- BLOQUE 2: RENDERIZADO, NAVEGACIÓN Y CÁLCULOS MATEMÁTICOS ---------- */

  /* Dibuja la pregunta actual y sus opciones en pantalla */
  function renderQuestion(){
    var q = QUESTIONS[currentQuestion];
    progressFill.style.width = Math.round(((currentQuestion) / QUESTIONS.length) * 100) + "%";
    progressLabel.textContent = "Pregunta " + (currentQuestion + 1) + " de " + QUESTIONS.length;
    quizIcon.innerHTML = ICONS[q.icon];
    quizQuestionEl.textContent = q.title;

    quizOptionsEl.innerHTML = "";
    q.options.forEach(function(opt){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("role", "radio");
      var checked = answers[q.id] === opt.value;
      btn.setAttribute("aria-checked", checked ? "true" : "false");
      btn.innerHTML = '<span class="option-dot" aria-hidden="true"></span><span class="option-label">' + opt.label + "</span>";
      
      /* Al hacer clic, guarda la respuesta y avanza con un ligero retraso visual */
      btn.addEventListener("click", function(){
        answers[q.id] = opt.value;
        renderQuestion();
        window.setTimeout(advance, 260);
      });
      quizOptionsEl.appendChild(btn);
    });

    btnBack.style.display = currentQuestion === 0 ? "none" : "inline-flex";
    btnNext.style.display = answers[q.id] ? "inline-flex" : "none";
  }

  /* Avanza a la siguiente pregunta o calcula los resultados al terminar */
  function advance(){
    if (currentQuestion < QUESTIONS.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      computeAndShowResults();
    }
  }

  /* Listeners para los botones de navegación del cuestionario */
  btnNext.addEventListener("click", advance);
  btnBack.addEventListener("click", function(){
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    } else {
      showView(viewIntro);
    }
  });

  document.getElementById("btn-start").addEventListener("click", function(){
    currentQuestion = 0;
    answers = {};
    showView(viewQuiz);
    renderQuestion();
  });

  /* Realiza la sumatoria de costos en base a las opciones elegidas */
  function computeAndShowResults(){
    var breakdown = {};
    var total = 0;
    Object.keys(COSTS).forEach(function(key){
      var value = COSTS[key][answers[key]] || 0;
      breakdown[key] = value;
      total += value;
    });

    var level = total < 150 ? "bajo" : (total <= 250 ? "moderado" : "alto");

    renderGauge(total, level);
    renderConsumer(breakdown);
    renderTips();
    goToScreen(1);
    showView(viewResults);
  }

  /* Controla la animación del medidor de consumo (arco SVG) */
  function renderGauge(total, level){
    var gaugeWrap = document.getElementById("gauge-wrap");
    gaugeWrap.className = "gauge-wrap gauge-level-" + level;

    var fraction = Math.max(0, Math.min(1, total / MAX_TOTAL));
    var circumference = 251;
    var offset = circumference - fraction * circumference;
    var fillPath = document.getElementById("gauge-fill");
    window.requestAnimationFrame(function(){
      fillPath.style.strokeDashoffset = offset;
    });

    document.getElementById("gauge-number").textContent = "S/ " + total;

    var levelText = {
      bajo: "¡Buen trabajo! Tus hábitos actuales generan un gasto bastante controlado.",
      moderado: "Vas por buen camino, pero hay hábitos que están inflando tu recibo.",
      alto: "Tu consumo actual es elevado. Con algunos ajustes puedes notar la diferencia."
    };
    document.getElementById("result-level-text").textContent = levelText[level];

    var levelLabel = { bajo:"Gasto BAJO", moderado:"Gasto MODERADO", alto:"Gasto ALTO" };
    document.getElementById("level-pill").textContent = levelLabel[level];
  }

  /* Determina cuál fue el factor que generó mayor gasto mensual */
  function renderConsumer(breakdown){
    var topKey = null, topValue = -1;
    Object.keys(CONSUMER_META).forEach(function(key){
      if (breakdown[key] > topValue) {
        topValue = breakdown[key];
        topKey = key;
      }
    });
    if (!topKey || topValue <= 0) {
      topKey = "iluminacion";
      topValue = breakdown.iluminacion;
    }
    document.getElementById("consumer-icon").innerHTML = ICONS[CONSUMER_META[topKey].icon];
    document.getElementById("consumer-name").textContent = CONSUMER_META[topKey].name;
    document.getElementById("consumer-cost").textContent = "S/ " + topValue + " / mes";
    document.getElementById("consumer-desc").textContent = CONSUMER_DESC[topKey];
  }

  /* Filtra y ordena los 3 mejores consejos según el nivel de ahorro */
  function renderTips(){
    var candidates = [];
    Object.keys(TIP_POOL).forEach(function(category){
      var tip = TIP_POOL[category][answers[category]];
      if (tip) candidates.push(tip);
    });

    candidates.sort(function(a, b){ return b.saving - a.saving; });

    var improvement = candidates.filter(function(t){ return t.saving > 0; });
    var reinforcement = candidates.filter(function(t){ return t.saving === 0; });
    var chosen = improvement.slice(0, 3);
    if (chosen.length < 3) {
      chosen = chosen.concat(reinforcement.slice(0, 3 - chosen.length));
    }

    var list = document.getElementById("tip-list");
    list.innerHTML = "";
    chosen.forEach(function(tip){
      var card = document.createElement("div");
      card.className = "tip-card";
      var savingHTML = tip.saving > 0
        ? '<span class="tip-saving">Ahorro estimado: S/ ' + tip.saving + '/mes</span>'
        : '<span class="tip-saving">Buen hábito</span>';
      card.innerHTML =
        '<div class="tip-icon" aria-hidden="true">' + ICONS[tip.icon] + '</div>' +
        '<div><p class="tip-text">' + tip.text + '</p>' + savingHTML + '</div>';
      list.appendChild(card);
    });
  }

  /* Navegación interna entre las pestañas de resultados */
  var resultScreens = Array.prototype.slice.call(document.querySelectorAll(".result-screen"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("#results-dots .dot"));

  function goToScreen(n){
    resultScreens.forEach(function(s){
      s.classList.toggle("is-active", Number(s.getAttribute("data-screen")) === n);
    });
    dots.forEach(function(d, i){
      d.classList.toggle("is-active", i === n - 1);
    });
  }

  document.querySelectorAll("[data-goto]").forEach(function(btn){
    btn.addEventListener("click", function(){
      goToScreen(Number(btn.getAttribute("data-goto")));
    });
  });

  /* Programa el recordatorio a 30 días calculando la fecha exacta */
  document.getElementById("btn-save").addEventListener("click", function(){
    var d = new Date();
    d.setDate(d.getDate() + 30);
    var formatted = d.toLocaleDateString("es-PE", { day:"numeric", month:"long", year:"numeric" });
    var el = document.getElementById("reminder-date");
    el.textContent = "Repite tu diagnóstico el " + formatted;
    el.classList.add("is-visible");
  });

  /* Reinicia el flujo completo de la aplicación */
  document.getElementById("btn-restart").addEventListener("click", function(){
    currentQuestion = 0;
    answers = {};
    document.getElementById("reminder-date").classList.remove("is-visible");
    showView(viewIntro);
  });

})();
