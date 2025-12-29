import "./style.css";


const app = document.querySelector<HTMLDivElement>("#app")!;

let numeroJugador: string = "";                 // lo que ingresa el usuario (como string del input)
let numeroMaquina: number = randomEntre(1, 10); // número aleatorio actual
let resultado: string = "Ingresa un número del 1 al 10.";
let esCorrecto: boolean | null = null;          // null: sin intento; true: acierto; false: fallo

// Referencias al DOM
const input = document.querySelector<HTMLInputElement>("#juego-input")!;
const boton = document.querySelector<HTMLButtonElement>("#juego-boton")!;
const resultadoDiv = document.querySelector<HTMLDivElement>("#juego-resultado")!;

// Manejo del input: actualizar numeroJugador en cada cambio
input.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  numeroJugador = target.value;
});

// Verificación al click
boton.addEventListener("click", () => {
  const elegido = Number(numeroJugador);

  // Validación mínima: entero en [1..10]
  const esValido =
    Number.isInteger(elegido) && elegido >= 1 && elegido <= 10;

  if (!esValido) {
    resultado = "⚠️ Ingresa un número entero entre 1 y 10.";
    esCorrecto = false;
    renderResultado();
    return;
  }

  // Comparar con numeroMaquina
  esCorrecto = elegido === numeroMaquina;

  if (esCorrecto) {
    resultado = `🎉 ¡Acertaste! Elegiste ${elegido} y la máquina tenía ${numeroMaquina}.`;
  } else {
    resultado = `❌ Fallaste. Elegiste ${elegido}, la máquina tenía ${numeroMaquina}. ¡Sigue intentando!`;
  }

  // Generar nuevo número para el próximo intento
  numeroMaquina = randomEntre(1, 10);

  // Opcional: limpiar input
  // numeroJugador = "";
  // input.value = "";

  // Actualizar UI
  renderResultado();
});

// Renderiza el mensaje y aplica la clase CSS dinámica
function renderResultado() {
  resultadoDiv.textContent = resultado;

  // Quitar clases previas
  resultadoDiv.classList.remove("resultado--correcto", "resultado--incorrecto");

  // Aplicar clase según esCorrecto
  if (esCorrecto === true) {
    resultadoDiv.classList.add("resultado--correcto");
  } else if (esCorrecto === false) {
    resultadoDiv.classList.add("resultado--incorrecto");
  }
}

// Utilidad: aleatorio en [min..max] inclusive
function randomEntre(min: number, max: number): number {
  const rango = max - min + 1;
  return Math.floor(Math.random() * rango) + min;
}





