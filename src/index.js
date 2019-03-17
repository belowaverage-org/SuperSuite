var ctx = null;
var canvas = null;
var RainDrops = [];
onload = function() {
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    initialize();
};
onresize = function() {
    updateResolution();
};
function initialize() {
    updateResolution();
    window.requestAnimationFrame(paint);
    startInterval();
}
function updateResolution() {
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
}
function paint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    RainDrops.forEach(function(rainDrop) {
        rainDrop.updateLocation();
    });
    RainDrops.forEach(function(rainDrop) {
        ctx.drawImage(rainDrop.image, rainDrop.x, rainDrop.y, rainDrop.image.width, rainDrop.image.height);
    });
    window.requestAnimationFrame(paint);
}
class RainDrop {
    x = 0;
    y = 0;
    speed = 0;
    lastUpdated = 0;
    image = null;
    constructor(image, speed, x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
        this.lastUpdated = performance.now();
        RainDrops.push(this);
        return this;
    }
    updateLocation() {
        var time = performance.now();
        this.y = this.y + ((time - this.lastUpdated) * this.speed);
        this.lastUpdated = time;
        if(this.y > canvas.height) {
            this.destroy();
        }
        return this;
    }
    destroy() {
        var rdIndex = 0;
        var rainDropToDestroy = this;
        RainDrops.forEach(function(rainDrop, index) {
            if(rainDrop == rainDropToDestroy) {
                RainDrops.splice(index, 1);
            }
        });
    }
}

var bonbon = new Image();
bonbon.src = './src/img/bonbon.png';
bonbon.width = 100;
bonbon.height = 60;

var bonbon2 = new Image();
bonbon2.src = './src/img/bonbon2.png';
bonbon2.width = 100;
bonbon2.height = 60;

var pop = new Image();
pop.src = './src/img/pop.png';
pop.width = 50;
pop.height = 100;

function startInterval() {
    setInterval(function() {
        new RainDrop(bonbon, .5, Math.round(Math.random() * canvas.width), -100);
        new RainDrop(bonbon2, .5, Math.round(Math.random() * canvas.width), -100);
        new RainDrop(pop, .5, Math.round(Math.random() * canvas.width), -100);
    }, 300);
}