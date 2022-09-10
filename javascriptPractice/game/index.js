const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// window size for the canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

const playerJumpForce = 6;  
let scrollOffset = 0;
const gravity = 0.1;

// Player class
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

// Platform class for platform objects
class Platform{
    constructor({x, y, width, height}){
        this.position = {
            x,
            y   
        };

        this.width = width;
        this.height = height;
    };

    draw(){
        c.fillStyle = 'black';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
};

// instantiating player class
const player = new Player();
const platforms = [new Platform({x: 300, y: 300, width: 180, height: 20}), 
                   new Platform({x: 700, y: 400, width: 200, height: 20}),
                   new Platform({x: 100, y: 200, width: 150, height: 20}),
                   new Platform({x: 500, y: 550, width: 100, height: 20})];

// keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

// Game animation. This function refreshes the game for every frame.
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw();
    });

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 2.5;
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -2.5;
    }
    else
    {
        player.velocity.x = 0;

        if (keys.right.pressed){
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 2.5;
            });
        }

        else if (keys.left.pressed){
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 2.5;
            });
        }
    }

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&     player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
                player.velocity.y = 0;
            }
    });

    if (scrollOffset == 1000){
        console.log('you win')
    };
 };

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = true;
            break;
        case 's':
        case 'ArrowDown':
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = true;
            break;
    };
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 's':
        case 'ArrowDown':
            console.log('down');
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = false;
            break;
        case ' ':
        case 'w':
        case "ArrowUp":
            if (player.velocity.y == 0)
                player.velocity.y -= playerJumpForce; 
            break;  
     };
}); 
 
