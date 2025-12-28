const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "mapa.webp";

const SIZE = 1299;
const CENTER = SIZE / 2;
const ANGLE = 45 * Math.PI / 180; // 45°

img.onload = () => {
  // czyścimy canvas
  ctx.clearRect(0, 0, SIZE, SIZE);

  // rysujemy obróconą mapę
  ctx.save();
  ctx.translate(CENTER, CENTER);
  ctx.rotate(ANGLE);
  ctx.drawImage(img, -CENTER, -CENTER, SIZE, SIZE);
  ctx.restore();
};

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;

  // współrzędne kliknięcia na canvas
  let x = (e.clientX - rect.left) * scale;
  let y = (e.clientY - rect.top) * scale;

  // przenosimy do środka
  x -= CENTER;
  y -= CENTER;

  // cofamy obrót (-45°)
  const rx = x * Math.cos(-ANGLE) - y * Math.sin(-ANGLE);
  const ry = x * Math.sin(-ANGLE) + y * Math.cos(-ANGLE);

  // wracamy do układu mapy
  const mapX = Math.round(rx + CENTER);
  const mapY = Math.round(ry + CENTER);

  if (mapX >= 1 && mapX <= SIZE && mapY >= 1 && mapY <= SIZE) {
    document.getElementById("coords").textContent =
      `X: ${mapX}, Y: ${mapY}`;

    // odrysuj mapę
    img.onload();

    // marker w miejscu kliknięcia
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      x + CENTER,
      y + CENTER,
      4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  } else {
    document.getElementById("coords").textContent = "Poza mapą";
  }
});
