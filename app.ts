import { Creature, Movement } from './main.js';

// Initialize the canvas after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas and its context
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    // Set canvas dimensions if not already set
    if (!canvas.width) canvas.width = window.innerWidth;
    if (!canvas.height) canvas.height = window.innerHeight;

    // Fix: Explicitly type the context as CanvasRenderingContext2D
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
        console.error("Could not get canvas context!");
        return;
    }

    // Define pet SVG URLs
    const petSvgs = [
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog%20Face.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Rabbit%20Face.png",

    ];

    // Create an array to store multiple creatures
    const creatures: Creature[] = [];

    // Create several creatures with random properties
    for (let i = 0; i < 20; i++) {
        const movement: Movement = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 0.3 + Math.random() * 2, // Increased minimum speed
            direction: Math.random() * Math.PI * 2
        };
        
        // Generate a random color
        const color = `rgb(${Math.floor(Math.random() * 255)}, 
                           ${Math.floor(Math.random() * 255)}, 
                           ${Math.floor(Math.random() * 255)})`;
        
        const radius = 20 + Math.random() * 25; // Slightly larger
        
        // Randomly select a pet SVG
        const petSvg = petSvgs[Math.floor(Math.random() * petSvgs.length)];
        
        creatures.push(new Creature(movement, color, radius, petSvg));
    }

    console.log(`Created ${creatures.length} creatures`);

    // Animation loop
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw each creature
        creatures.forEach(creature => {
            // Randomly change direction occasionally
            if (Math.random() < 0.02) {
                creature.setMovementDirection(Math.random() * Math.PI * 2);
            }
            
            creature.move(canvas);
            creature.draw(ctx);
        });
        
        // Request the next animation frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    console.log("Starting animation");
    animate();
});