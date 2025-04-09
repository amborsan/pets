export interface Movable {
    move(canvas: HTMLCanvasElement): void;
  }
  export interface Drawable {
    draw(canvasContext: CanvasRenderingContext2D): void;
  }
  export type Movement = {
    x: number;
    y: number;
    speed: number;
    direction: number;
  };
  
  export class Creature implements Movable, Drawable {
    private movement: Movement;
    private color: string;
    private radius: number;
    private image: HTMLImageElement | null = null;
  
    constructor(movement: Movement, color: string, radius: number, imageUrl?: string) {
      this.movement = movement;
      this.color = color;
      this.radius = radius;
      
      if (imageUrl) {
        this.loadImage(imageUrl);
      }
    }
  
    private loadImage(url: string): void {
      this.image = new Image();
      this.image.src = url;
    }
  
    move(canvas: HTMLCanvasElement): void {
      const { x, y, speed, direction } = this.movement;
  
      // Update position based on speed and direction
      this.movement.x += speed * Math.cos(direction);
      this.movement.y += speed * Math.sin(direction);
  
      // Wrap around canvas edges
      if (this.movement.x > canvas.width) this.movement.x = 0;
      if (this.movement.x < 0) this.movement.x = canvas.width;
      if (this.movement.y > canvas.height) this.movement.y = 0;
      if (this.movement.y < 0) this.movement.y = canvas.height;
    }
  
    draw(canvasContext: CanvasRenderingContext2D): void {
      if (this.image && this.image.complete) {
        // Draw the image instead of a circle
        const size = this.radius * 2;
        canvasContext.drawImage(
          this.image,
          this.movement.x - this.radius,
          this.movement.y - this.radius,
          size,
          size
        );
        
        // Optional: add a colored circle indicator
        canvasContext.beginPath();
        canvasContext.arc(
          this.movement.x,
          this.movement.y,
          3, // small indicator dot
          0,
          Math.PI * 2
        );
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();
      } else {
        // Fallback to circle if image is not loaded
        canvasContext.beginPath();
        canvasContext.arc(
          this.movement.x,
          this.movement.y,
          this.radius,
          0,
          Math.PI * 2
        );
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();
      }
    }
  setMovement(movement: Movement) {
    this.movement = movement;
  }
  getMovement() {
    return this.movement;
  }

  setMovementX(x: number) {
    this.movement.x = x;
  }
  setMovementY(y: number) {
    this.movement.y = y;
  }
  setMovementSpeed(speed: number) {
    this.movement.speed = speed;
  }
  setMovementDirection(direction: number) {
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
  setMovementRadius(radius: number) {
    this.radius = radius;
  }
  getMovementRadius() {
    return this.radius;
  }
  setMovementColor(color: string) {
    this.color = color;
  }
  getMovementColor() {
    return this.color;
  }
  setImage(url: string): void {
    this.loadImage(url);
  }
  
  getImage(): HTMLImageElement | null {
    return this.image;
  }
}
