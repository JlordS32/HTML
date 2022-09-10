const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// window size for the canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.1;

class Player{
    constructor(){
        // player position
        this.position = {
            x: 100,
            y: 100
        };

        // player velocity
        this.velocity = {
            x: 0,
            y: 0.2
        };
        
        // player size
        this.width = 30;
        this.height = 30;
    };
    // draw function to draw player on the screen
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update(){
        this.draw();
        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else this.velocity.y = 0; 
    };
};

// instantiating player class
const player = new Player();
player.draw();
// keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    player.update();

    if (keys.right.pressed) {
        player.velocity.x = 2.5;
    }
    else if (keys.left.pressed) {
        player.velocity.x = -2.5;
    }
    else
    {
        player.velocity.x = 0;
    }
};

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = true;
            console.log(keys.left.pressed);
            break;
        case 's':
        case 'ArrowDown':
            console.log('down');
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = true;
            console.log(keys.right.pressed);
            break;
        case 'w':
        case "ArrowUp":
            player.velocity.y -= 5;
            break;
    };
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = false;
            console.log(keys.left.pressed);
            break;
        case 's':
        case 'ArrowDown':
            console.log('down');
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = false;
            console.log(keys.right.pressed);
            break;
        case 'w':
        case "ArrowUp":
            player.velocity.y -= 5;
            break;
    };
});