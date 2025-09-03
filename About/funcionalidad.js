// Funcionalidad mejorada para la página About
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Efectos interactivos para las tarjetas
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efectos para los elementos de objetivos
    const objetivoItems = document.querySelectorAll('.objetivo-item');
    objetivoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efectos para los consejos
    const consejoItems = document.querySelectorAll('.consejo-item');
    consejoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(46, 204, 113, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efectos para los juegos
    const juegoItems = document.querySelectorAll('.juego-item');
    juegoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Efectos para los botones de play
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 10px 30px rgba(255, 71, 87, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });

        // Efecto de click
        button.addEventListener('click', function(e) {
            // Crear efecto de ondas
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animación del logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Efecto parallax suave en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.welcome-section, .objetivos-section, .consejos-section');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Contador animado para estadísticas (si se agregan)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Efecto de typing para el título principal
    const mainTitle = document.querySelector('.welcome-section h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar typing después de un pequeño delay
        setTimeout(typeWriter, 500);
    }

    // Efecto de aparición gradual para las tarjetas de información
    const infoCardsContainer = document.querySelector('.info-cards');
    if (infoCardsContainer) {
        const cards = infoCardsContainer.querySelectorAll('.info-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 1000 + (index * 200));
        });
    }

    // Efecto de hover para el header
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(255, 71, 87, 0.3)';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.2)';
        });
    }

    // Efecto de partículas flotantes en el fondo
    createFloatingParticles();

    // Función para crear partículas flotantes
    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);
        
        // Crear partículas
        for (let i = 0; i < 20; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 107, 107, 0.3);
            border-radius: 50%;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }

    // Agregar CSS para la animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Efecto de scroll suave para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de resaltado para elementos en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observar todos los elementos de sección
    document.querySelectorAll('.objetivo-item, .consejo-item, .juego-item').forEach(el => {
        observer.observe(el);
    });

    // Agregar CSS para el efecto in-view
    const inViewStyle = document.createElement('style');
    inViewStyle.textContent = `
        .objetivo-item, .consejo-item, .juego-item {
            transition: all 0.6s ease;
        }
        
        .objetivo-item.in-view, .consejo-item.in-view, .juego-item.in-view {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(inViewStyle);

    console.log('🎮 Página About cargada con efectos interactivos!');
});
