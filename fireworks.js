const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];
    let particles = [];
    const colors = ['#FF3C38', '#FFD700', '#00FFFB', '#FF7F50', '#ADFF2F'];
    const startTime = Date.now();
    const duration = 10000; // 3 seconds

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Optional sound effect
    /*
    function playExplosionSound() {
      const sound = new Audio('explosion.mp3'); // Add your own sound file
      sound.volume = 0.2;
      sound.play();
    }
    */

    class Firework {
      constructor(fromLeft) {
        this.fromLeft = fromLeft;
        this.x = fromLeft ? 0 : canvas.width;
        this.y = canvas.height;
        this.targetX = random(canvas.width / 4, (canvas.width * 3) / 4);
        this.targetY = random(100, canvas.height / 2.2);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = random(10, 13);

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / dist) * this.speed;
        this.vy = (dy / dist) * this.speed;

        this.trail = [];
        this.done = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;

        if ((this.fromLeft && this.x >= this.targetX) || (!this.fromLeft && this.x <= this.targetX)) {
          this.done = true;
          this.explode();
        }
      }

      explode() {
        const numParticles = window.innerWidth < 600 ? 30 : 60;
        for (let i = 0; i < numParticles; i++) {
          const angle = (Math.PI * 2) * (i / numParticles);
          const speed = random(4, 7);
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          particles.push(new Particle(this.x, this.y, this.color, vx, vy));
        }

        // playExplosionSound(); // Uncomment if sound is set up
      }

      draw() {
        // Draw trail
        ctx.beginPath();
        for (let i = 0; i < this.trail.length - 1; i++) {
          const p1 = this.trail[i];
          const p2 = this.trail[i + 1];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw firework head
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor(x, y, color, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.alpha -= 0.02;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(this.color)}, ${this.alpha})`;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }

    function animate() {
      const elapsed = Date.now() - startTime;

      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (elapsed < duration && Math.random() < 0.08) {
        const fromLeft = Math.random() < 0.5;
        fireworks.push(new Firework(fromLeft));
      }

      fireworks = fireworks.filter(fw => !fw.done);
      fireworks.forEach(fw => {
        fw.update();
        fw.draw();
      });

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      if (elapsed < duration || particles.length > 0 || fireworks.length > 0) {
        requestAnimationFrame(animate);
      } 
      // Optional: Auto-restart after 2s
      // else {
      //   setTimeout(() => location.reload(), 2000);
      // }
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });