const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// window size for the canvas
canvas.width = 1024;
canvas.height = 576;

const playerJumpForce = 10;  
let scrollOffset = 0;
const gravity = 0.2;

// i don't know why but the entire image disappears when i take it off.
const image = new Image();
image.src = "../images/platform.png"

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
    };
};

// Platform class for platform objects
class Platform{
    constructor({x, y, image}){
        this.position = {
            x,
            y   
        };

        this.width = image.width;
        this.height = image.height; 
        this.image = image;
    };

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    };
};

class GenericObject{
    constructor({x, y, image}){
        this.position = {
            x,
            y   
        };

        this.width = image.width;
        this.height = image.height; 
        this.image = image;
    };

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    };
};

function createImage(imageSrc){
    const image = new Image();
    image.src = imageSrc;
    return image;
};

const platformImage = createImage("../images/platform.png");
const backgroundImage = createImage("../images/background.png");
const hillsImage = createImage("../images/hills.png");

// instantiating player class
let player = new Player();

// platform instances
let platforms = [new Platform({x: -1, 
                               y: 470, 
                               image: platformImage}), 
                 new Platform({x: image.width-3, 
                               y: 470, 
                               image: platformImage}),
                 new Platform({x: image.width*2 + 100, 
                               y: 470, 
                               image: platformImage})];

// generic objects instances
let genericObject = [new GenericObject({x: -1,
                                        y: -1,
                                        image: backgroundImage}),
                       new GenericObject({x: -1,
                                        y: -1,
                                        image: hillsImage})];
// keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

function init(){
    // instantiating player class
    player = new Player();

    // platform instances
    platforms = [new Platform({x: -1, 
                               y: 470, 
                               image: platformImage}), 
                    new Platform({x: image.width-3, 
                               y: 470, 
                               image: platformImage}),
                    new Platform({x: image.width*2 + 100, 
                               y: 470, 
                               image: platformImage})];

    // generic objects instances
    genericObject = [new GenericObject({x: -1,
                                        y: -1,
                                        image: backgroundImage}),
                     new GenericObject({x: -1,
                                        y: -1,
                                        image: hillsImage})];
    scrollOffset = 0;
};

// Game animation. This function refreshes the game for every frame.
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0,0, canvas.width, canvas.height);
    genericObject.forEach(object => {object.draw();});
    platforms.forEach(platform => {
        platform.draw();
    });
    player.update();

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
            genericObject.forEach(object => {
                object.position.x -= 3;
            });
        }

        else if (keys.left.pressed){
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 2.5;
            });
            genericObject.forEach(object => {
                object.position.x += 3;
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

    if (player.position.y > canvas.height){
        init();
    };

    console.log(player.position.x);
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
