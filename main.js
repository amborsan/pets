export class Creature {
    constructor(movement, color, radius, imageUrl) {
        this.image = null;
        this.movement = movement;
        this.color = color;
        this.radius = radius;
        if (imageUrl) {
            this.loadImage(imageUrl);
        }
    }
    loadImage(url) {
        this.image = new Image();
        this.image.src = url;
    }
    move(canvas) {
        const { x, y, speed, direction } = this.movement;
        // Update position based on speed and direction
        this.movement.x += speed * Math.cos(direction);
        this.movement.y += speed * Math.sin(direction);
        // Wrap around canvas edges
        if (this.movement.x > canvas.width)
            this.movement.x = 0;
        if (this.movement.x < 0)
            this.movement.x = canvas.width;
        if (this.movement.y > canvas.height)
            this.movement.y = 0;
        if (this.movement.y < 0)
            this.movement.y = canvas.height;
    }
    draw(canvasContext) {
        if (this.image && this.image.complete) {
            // Draw the image instead of a circle
            const size = this.radius * 2;
            canvasContext.drawImage(this.image, this.movement.x - this.radius, this.movement.y - this.radius, size, size);
            // Optional: add a colored circle indicator
            canvasContext.beginPath();
            canvasContext.arc(this.movement.x, this.movement.y, 3, // small indicator dot
            0, Math.PI * 2);
            canvasContext.fillStyle = this.color;
            canvasContext.fill();
            canvasContext.closePath();
        }
        else {
            // Fallback to circle if image is not loaded
            canvasContext.beginPath();
            canvasContext.arc(this.movement.x, this.movement.y, this.radius, 0, Math.PI * 2);
            canvasContext.fillStyle = this.color;
            canvasContext.fill();
            canvasContext.closePath();
        }
    }
    setMovement(movement) {
        this.movement = movement;
    }
    getMovement() {
        return this.movement;
    }
    setMovementX(x) {
        this.movement.x = x;
    }
    setMovementY(y) {
        this.movement.y = y;
    }
    setMovementSpeed(speed) {
        this.movement.speed = speed;
    }
    setMovementDirection(direction) {
        this.movement.direction = direction;
    }
    getMovementX() {
        return this.movement.x;
    }
    getMovementY() {
        return this.movement.y;
    }
    getMovementSpeed() {
        return this.movement.speed;
    }
    getMovementDirection() {
        return this.movement.direction;
    }
    setMovementRadius(radius) {
        this.radius = radius;
    }
    getMovementRadius() {
        return this.radius;
    }
    setMovementColor(color) {
        this.color = color;
    }
    getMovementColor() {
        return this.color;
    }
    setImage(url) {
        this.loadImage(url);
    }
    getImage() {
        return this.image;
    }
}
