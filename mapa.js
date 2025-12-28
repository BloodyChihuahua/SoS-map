const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "mapa.webp";

const SIZE = 1299;
let markers = []; // tablica przechowująca punkty

// rysowanie mapy i wszystkich markerów
function drawMap() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(img, 0, 0, SIZE, SIZE);

  // rysujemy markery
  markers.forEach(marker => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(marker.x - 1, marker.y - 1, 5, 0, Math.PI * 2);
    ctx.fill();

    // wyświetlamy współrzędne obok markera
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(`(${marker.x}, ${marker.y})`, marker.x + 6, marker.y - 6);
  });
}

img.onload = drawMap;

// kliknięcie dodaje punkt
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor((e.clientX - rect.left) * scaleX) + 1;
  const y = Math.floor((e.clientY - rect.top) * scaleY) + 1;

  if (x >= 1 && x <= SIZE && y >= 1 && y <= SIZE) {
    // dodajemy marker
    markers.push({ x, y });
    drawMap();

    // aktualizujemy panel z ostatnim kliknięciem
    document.getElementById("coords").textContent = `Dodano punkt: X: ${x}, Y: ${y}`;
  }
});
