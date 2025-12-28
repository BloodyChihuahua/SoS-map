<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<title>Mapa obrócona 45°</title>
<style>
  body { text-align: center; font-family: Arial; }
  canvas { border: 1px solid #333; max-width: 90vw; }
</style>
</head>
<body>

<h3>Mapa obrócona o 45°</h3>
<p id="coords">Kliknij w mapę</p>

<canvas id="mapCanvas" width="1299" height="1299"></canvas>

<script>
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "mapa.webp";

const SIZE = 1299;
const CENTER = SIZE / 2;
const ANGLE = 45 * Math.PI / 180; // 45°

img.onload = () => {
  ctx.translate(CENTER, CENTER);
  ctx.rotate(ANGLE);
  ctx.drawImage(img, -CENTER, -CENTER, SIZE, SIZE);
  ctx.rotate(-ANGLE);
  ctx.translate(-CENTER, -CENTER);
};

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;

  // klik na canvas
  let x = (e.clientX - rect.left) * scale;
  let y = (e.clientY - rect.top) * scale;

  // przesunięcie do środka
  x -= CENTER;
  y -= CENTER;

  // ODWROTNY obrót (-45°)
  const rx = x * Math.cos(-ANGLE) - y * Math.sin(-ANGLE);
  const ry = x * Math.sin(-ANGLE) + y * Math.cos(-ANGLE);

  // powrót do układu mapy
  const mapX = Math.round(rx + CENTER);
  const mapY = Math.round(ry + CENTER);

  if (mapX >= 1 && mapX <= SIZE && mapY >= 1 && mapY <= SIZE) {
    document.getElementById("coords").textContent =
      `X: ${mapX}, Y: ${mapY}`;

    // marker
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
    document.getElementById("coords").textContent =
      "Poza mapą";
  }
});
</script>

</body>
</html>
