const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
console.log(c);

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.2;
const playerImage = new Image();
playerImage.src = "./img/ninja_run 2.png";

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

    this.flipX = false;
    this.width = 100;
    this.height = 100;
  }

  draw() {
    // c.fillStyle = "teal";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.save();
    // c.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);
    if (this.flipX) {
      // Flip gambar secara horizontal
      c.scale(-1, 1);
      // Geser gambar agar tetap terlihat dengan benar
      c.drawImage(playerImage, -this.position.x - this.width, this.position.y, this.width, this.height);
    } else {
      // Gambar gambar tanpa flipping
      c.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);
    }
    c.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 20;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();

const platforms = [new Platform({ x: 200, y: 500 }), new Platform({ x: 500, y: 400 }), new Platform({ x: 600, y: 200 }), new Platform({ x: 800, y: 600 })];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  // console.log('go')
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
    player.flipX = true;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
    player.flipX = false;
  } else {
    player.velocity.x = 0;
    // screen scrolling
    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  // Platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (scrollOffset > 2000) {
    console.log("You Win");
  }
}

animate();

addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    case 83:
      console.log("down");
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 10;
      playerImage.src = "./img/ninja_jump 3.png";
      break;

    default:
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 87:
      console.log("up");
      player.velocity.y += 1;
      playerImage.src = "./img/ninja_fall 1.png";
      break;

    default:
      break;
  }
});
