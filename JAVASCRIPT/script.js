let audio = document.getElementById("musica");
let tiempoTexto = document.getElementById("tiempo");
let btn = document.getElementById("btn");
let barraVolumen = document.getElementById("volumen");
let barraMusica = document.getElementById("barraMusica");

let tiempoGuardado = localStorage.getItem("tiempoMusica");
let volumenGuardado = localStorage.getItem("volumenMusica");
let sonandoGuardado = localStorage.getItem("sonandoMusica");

if (volumenGuardado !== null) {
  audio.volume = parseFloat(volumenGuardado);
  barraVolumen.value = volumenGuardado;
} else {
  audio.volume = 0.5;
}

audio.addEventListener("loadedmetadata", function () {
  if (tiempoGuardado !== null) {
    audio.currentTime = parseFloat(tiempoGuardado);
  }

  barraMusica.max = Math.floor(audio.duration);

  let total = formatearTiempo(audio.duration || 0);
  let actual = formatearTiempo(audio.currentTime || 0);
  tiempoTexto.textContent = actual + " / " + total;

  if (sonandoGuardado === "true") {
    audio.play().then(() => {
      btn.textContent = "Pause";
    }).catch(() => {
      btn.textContent = "Play";
    });
  }
});

function togglePlay() {
  if (audio.paused) {
    audio.play();
    btn.textContent = "Pause";
    localStorage.setItem("sonandoMusica", "true");
  } else {
    audio.pause();
    btn.textContent = "Play";
    localStorage.setItem("sonandoMusica", "false");
  }
}

function cambiarVolumen(valor) {
  audio.volume = valor;
  localStorage.setItem("volumenMusica", valor);
}

function formatearTiempo(segundos) {
  let min = Math.floor(segundos / 60);
  let seg = Math.floor(segundos % 60);

  if (seg < 10) {
    seg = "0" + seg;
  }

  return min + ":" + seg;
}

audio.addEventListener("timeupdate", function () {
  localStorage.setItem("tiempoMusica", audio.currentTime);

  barraMusica.value = Math.floor(audio.currentTime);

  let actual = formatearTiempo(audio.currentTime);
  let total = formatearTiempo(audio.duration || 0);
  tiempoTexto.textContent = actual + " / " + total;
});

barraMusica.addEventListener("input", function () {
  audio.currentTime = barraMusica.value;
  localStorage.setItem("tiempoMusica", audio.currentTime);
});

window.addEventListener("beforeunload", function () {
  localStorage.setItem("tiempoMusica", audio.currentTime);
  localStorage.setItem("sonandoMusica", !audio.paused);
});
