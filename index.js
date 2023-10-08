const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
console.log(c);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.2;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "teal";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

const player = new Player();

function animate() {
  requestAnimationFrame(animate);
  // console.log('go')
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      break;

    case 68:
      console.log("right");
      break;

    case 83:
      console.log("down");
      break;

    case 87:
      console.log("up");
      break;

    default:
      break;
  }
});
