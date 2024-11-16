<script>
    import { onMount } from 'svelte';
    import { ChevronUp, Eye, EyeOff } from 'lucide-svelte';
    import P5 from 'p5-svelte';
    
    // UI State
    let isExpanded = false;
    let showManagerView = false;
    
    // Container references for responsive sizing
    let containerWidth;
    let containerHeight;
    let container;
  
    // UI Toggle Functions
    function toggleExpand() {
      isExpanded = !isExpanded;
    }
    
    function toggleManagerView() {
      showManagerView = !showManagerView;
    }
  
    // Main P5 Sketch
    const sketch = (p5) => {
      let canvas;
      let scale = 1;
      let blips = [];
      let speed = 1;
      let showText = true;
      let heatCircles = [];

      // Floor plan layout
      const rectangles = [
        { x: 50, y: 50, w: 100, h: 30 },
        { x: 200, y: 50, w: 400, h: 30 },
        { x: 50, y: 100, w: 100, h: 100 },
        { x: 200, y: 100, w: 400, h: 30 },
        { x: 200, y: 140, w: 400, h: 30 },
        { x: 250, y: 200, w: 150, h: 100 },
        { x: 450, y: 200, w: 150, h: 100 },
        { x: 50, y: 350, w: 100, h: 100 },
        { x: 200, y: 400, w: 150, h: 10 },
        { x: 200, y: 420, w: 150, h: 10 },
        { x: 200, y: 440, w: 150, h: 10 },
        { x: 400, y: 400, w: 100, h: 100 },
        { x: 550, y: 400, w: 50, h: 100 },
      ];
      
      const border = { x: 10, y: 10, w: 680, h: 520 };

      // Manager movement simulation
      class Blip {
        constructor(x, y) {
          this.pos = p5.createVector(x, y);
          this.angle = p5.random(p5.TWO_PI);
        }

        update() {
          // Calculate next position
          let nextX = this.pos.x + speed * p5.cos(this.angle);
          let nextY = this.pos.y + speed * p5.sin(this.angle);
          let nextPos = p5.createVector(nextX, nextY);

          // Handle collisions
          if (isCollidingWithRectangles(nextPos)) {
            let normal = findCollisionNormal(nextPos);
            this.angle = reflectAngle(this.angle, normal);
          } else if (isOutsideBorder(nextPos)) {
            let normal = findBorderNormal(nextPos);
            this.angle = reflectAngle(this.angle, normal);
          } else {
            this.pos = nextPos;
          }
        }

        draw() {
          p5.fill(255, 0, 0);
          p5.noStroke();
          p5.ellipse(this.pos.x / scale, this.pos.y / scale, 10, 10);
          drawVisionCone(this.pos.x / scale, this.pos.y / scale, this.angle);
        }
      }

      // P5 Setup
      p5.setup = () => {
        // Create canvas that fits container
        const canvasWidth = container.clientWidth;
        const canvasHeight = container.clientHeight;
        canvas = p5.createCanvas(canvasWidth, canvasHeight);
        
        // Calculate scale to fit original design
        scale = Math.min(canvasWidth / 800, canvasHeight / 600);
        
        // Initial styling
        p5.background(10, 30, 20);
        p5.fill(150, 255, 150);
        p5.stroke(150, 255, 150);
        p5.strokeWeight(2 * scale);
        
        // Create initial blips
        blips.push(new Blip(350 * scale, 300 * scale));
        blips.push(new Blip(100 * scale, 250 * scale));
        blips.push(new Blip(500 * scale, 17 * scale));
        
        p5.textFont('Helvetica');
        p5.textStyle(p5.BOLD);
      };

      // Handle window resizing
      p5.windowResized = () => {
        const canvasWidth = container.clientWidth;
        const canvasHeight = container.clientHeight;
        p5.resizeCanvas(canvasWidth, canvasHeight);
        scale = Math.min(canvasWidth / 800, canvasHeight / 600);
      };

      // Main draw loop
      p5.draw = () => {
        p5.background(10, 30, 20);
        p5.push();
        p5.scale(scale);
        
        // Blink text every 30 frames
        if (p5.frameCount % 30 == 0) {
          showText = !showText;
        }

        // Draw manager vision cones if view enabled
        if (showManagerView) {
          blips.forEach(blip => {
            drawVisionCone(blip.pos.x / scale, blip.pos.y / scale, blip.angle);
          });
        }

        // Draw base map
        drawMapLayout();

        // Draw manager elements if view enabled
        if (showManagerView) {
          blips.forEach(blip => {
            blip.update();
            blip.draw();
          });

          // Draw heat zones
          p5.noStroke();
          for (let circle of heatCircles) {
            let colorValue = p5.map(circle.intensity, 1, 20, 255, 0);
            p5.fill(255, colorValue, 0, 150);
            p5.ellipse(circle.x / scale, circle.y / scale, circle.size);
            
            if ((circle.size >= 100 || circle.intensity >= 20) && showText) {
              p5.fill(255, 0, 0);
              p5.textAlign(p5.CENTER, p5.CENTER);
              p5.textSize(16);
              p5.text('DANGER', circle.x / scale, circle.y / scale);
            }
          }
        }
        p5.pop();
      };

      // Mouse interaction
      p5.mousePressed = () => {
        if (!showManagerView) return;
        
        const scaledMouseX = p5.mouseX / scale;
        const scaledMouseY = p5.mouseY / scale;
        
        let clicked = false;
        for (let circle of heatCircles) {
          let distance = p5.dist(scaledMouseX, scaledMouseY, circle.x / scale, circle.y / scale);
          if (distance < circle.size / 2) {
            circle.intensity += 2;
            circle.size = p5.min(circle.size + 10, 100);
            clicked = true;
            break;
          }
        }

        if (!clicked) {
          heatCircles.push({
            x: scaledMouseX * scale,
            y: scaledMouseY * scale,
            size: 20,
            intensity: 1
          });
        }
      };

      // Helper functions
      function drawMapLayout() {
        p5.stroke(150, 255, 150);
        p5.strokeWeight(2);
        rectangles.forEach(rect => {
          p5.rect(rect.x, rect.y, rect.w, rect.h);
        });
        p5.noFill();
        p5.rect(border.x, border.y, border.w, border.h);
      }

      function drawVisionCone(x, y, angle) {
        p5.fill(150, 255, 150, 50);
        p5.noStroke();
        let coneLength = 100;
        let coneAngle = p5.PI / 6;
        p5.beginShape();
        p5.vertex(x, y);
        p5.vertex(
          x + coneLength * p5.cos(angle - coneAngle / 2),
          y + coneLength * p5.sin(angle - coneAngle / 2)
        );
        p5.vertex(
          x + coneLength * p5.cos(angle + coneAngle / 2),
          y + coneLength * p5.sin(angle + coneAngle / 2)
        );
        p5.endShape(p5.CLOSE);
      }

      function isOutsideBorder(point) {
        return point.x < border.x || point.x > border.x + border.w ||
               point.y < border.y || point.y > border.y + border.h;
      }

      function isCollidingWithRectangles(point) {
        return rectangles.some(rect => 
          point.x > rect.x && point.x < rect.x + rect.w &&
          point.y > rect.y && point.y < rect.y + rect.h
        );
      }

      function findCollisionNormal(pos) {
        for (let rect of rectangles) {
          if (pos.x > rect.x && pos.x < rect.x + rect.w &&
              pos.y > rect.y && pos.y < rect.y + rect.h) {
              
            let distToLeft = Math.abs(pos.x - rect.x);
            let distToRight = Math.abs(pos.x - (rect.x + rect.w));
            let distToTop = Math.abs(pos.y - rect.y);
            let distToBottom = Math.abs(pos.y - (rect.y + rect.h));
            
            let minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
            
            if (minDist === distToLeft) return p5.createVector(-1, 0);
            if (minDist === distToRight) return p5.createVector(1, 0);
            if (minDist === distToTop) return p5.createVector(0, -1);
            return p5.createVector(0, 1);
          }
        }
        return p5.createVector(0, 0);
      }

      function findBorderNormal(pos) {
        if (pos.x < border.x) return p5.createVector(1, 0);
        if (pos.x > border.x + border.w) return p5.createVector(-1, 0);
        if (pos.y < border.y) return p5.createVector(0, 1);
        if (pos.y > border.y + border.h) return p5.createVector(0, -1);
        return p5.createVector(0, 0);
      }

      function reflectAngle(incident, normal) {
        let incidentVector = p5.Vector.fromAngle(incident);
        let reflection = p5.Vector.sub(
          incidentVector,
          p5.Vector.mult(normal, 2 * incidentVector.dot(normal))
        );
        return reflection.heading();
      }
    };
</script>
  
  <div class="bg-surface-light rounded-xl overflow-hidden {isExpanded ? 'h-[600px]' : 'h-48'} transition-all duration-300">
    <!-- Header -->
    <div class="p-4 flex items-center justify-between bg-surface-dim border-b">
        <div class="flex items-center gap-2">
            <button
                class="p-2 rounded-full hover:bg-surface-dim transition-colors"
                class:text-primary-red={showManagerView}
                on:click={toggleManagerView}
            >
                {#if showManagerView}
                    <Eye size={20} />
                {:else}
                    <EyeOff size={20} />
                {/if}
            </button>
            <h2 class="text-base font-medium">Workplace Map</h2>
        </div>
        <button
            class="p-2 rounded-full hover:bg-surface-dim transition-colors transform"
            class:rotate-180={isExpanded}
            on:click={toggleExpand}
        >
            <ChevronUp size={20} />
        </button>
    </div>

    <!-- P5 Canvas Container -->
    <div 
        class="relative w-full h-full flex items-center justify-center bg-[#0a1e14]" 
        bind:this={container}
        bind:clientWidth={containerWidth}
        bind:clientHeight={containerHeight}
    >
        <P5 {sketch} />
    </div>
</div>

<style>
    :global(canvas) {
        display: block !important;
    }
</style>