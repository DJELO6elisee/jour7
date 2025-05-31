
// Système d'animations au scroll
class ScrollAnimations {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Observer pour les éléments de révélation générale
        this.createRevealObserver();

        // Observer spécial pour les éléments de timeline
        this.createTimelineObserver();

        // Observer pour les éléments avec animations customisées
        this.createCustomObserver();

        // Initialiser les animations au chargement de la page
        this.initLoadAnimations();
    }

    createRevealObserver() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer tous les éléments avec la classe reveal
        document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => {
            revealObserver.observe(el);
        });

        this.observers.push(revealObserver);
    }

    createTimelineObserver() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay) || 0;

                    setTimeout(() => {
                        // Animer l'élément principal
                        entry.target.classList.add('revealed');

                        // Animer le cercle de timeline avec un petit délai
                        const circle = entry.target.querySelector('.timeline-circle');
                        if (circle) {
                            setTimeout(() => {
                                circle.classList.add('revealed');
                            }, 200);
                        }
                    }, delay);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observer tous les éléments de timeline
        document.querySelectorAll('.timeline-item').forEach(el => {
            timelineObserver.observe(el);
        });

        this.observers.push(timelineObserver);
    }

    createCustomObserver() {
        const customObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animations spéciales pour différents types d'éléments
                    if (entry.target.classList.contains('value-card')) {
                        this.animateValueCard(entry.target);
                    }

                    if (entry.target.classList.contains('concept-card')) {
                        this.animateConceptCard(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        // Observer les cartes de valeurs et concepts
        document.querySelectorAll('.value-card, .concept-card').forEach(el => {
            customObserver.observe(el);
        });

        this.observers.push(customObserver);
    }

    animateValueCard(card) {
        const icon = card.querySelector('svg');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');

        // Animation séquentielle
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 0);

        setTimeout(() => {
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }
        }, 200);

        setTimeout(() => {
            if (title) title.style.opacity = '1';
        }, 400);

        setTimeout(() => {
            if (description) description.style.opacity = '1';
        }, 600);
    }

    animateConceptCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';

        // Effet de bounce subtil
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
            }, 200);
        }, 100);
    }

    initLoadAnimations() {
        // Animation de hover dynamique pour les liens de navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.textShadow = 'none';
            });
        });

        // Animation de parallax légère pour les éléments de fond
        window.addEventListener('scroll', this.handleParallax.bind(this));

        // Animation des boutons avec effet de vague
        this.initButtonAnimations();
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[class*="rotate-slow"]');

        parallaxElements.forEach(el => {
            const speed = 0.1;
            el.style.transform = `rotate(${scrolled * speed}deg)`;
        });
    }

    initButtonAnimations() {
        document.querySelectorAll('.pulse-on-hover').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px rgba(41, 77, 196, 0.3)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        });
    }

    // Méthode pour nettoyer les observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
    }
}

// Animation de marquee améliorée
function enhanceMarquee() {
    const marqueeItems = document.querySelectorAll('.marquee-content img');
    marqueeItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Animation de typing pour les textes importants
function addTypingAnimation() {
    const shimmerElements = document.querySelectorAll('.shimmer');
    shimmerElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                el.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 2000);
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le système d'animations
    const scrollAnimations = new ScrollAnimations();

    // Améliorer le marquee
    enhanceMarquee();

    // Ajouter l'animation de typing
    addTypingAnimation();

    // Animation d'entrée pour le logo
    const logo = document.querySelector('header img[alt*="Logo"]');
    if (logo) {
        logo.style.transform = 'scale(0)';
        setTimeout(() => {
            logo.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logo.style.transform = 'scale(1)';
        }, 100);
    }

    // Animation staggered pour les éléments de navigation
    const navItems = document.querySelectorAll('header nav a'); // Cible plus spécifiquement les liens du header
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
});

// Performance : Pause les animations quand la page n'est pas visible
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('[class*="animate"], .floating-card, .rotate-slow');
    if (document.hidden) {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
