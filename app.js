/**
 * SOPANAM CONSTRUCTIONS — Interactive Experience
 * Inspired by oryzo.ai / Lusion Studio
 * Smooth scroll reveals, counter animations, portfolio filtering, parallax
 */

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════
    // PRELOADER
    // ═══════════════════════════════════════
    const preloader = document.getElementById('preloader');
    const preloaderCounter = document.getElementById('preloader-counter');
    const preloaderBarFill = document.getElementById('preloader-bar-fill');

    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 12 + 3;
        if (loadProgress > 100) loadProgress = 100;

        preloaderCounter.textContent = Math.floor(loadProgress);
        preloaderBarFill.style.width = loadProgress + '%';

        if (loadProgress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
                initAnimations();
            }, 600);
        }
    }, 80);

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';


    // ═══════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Scroll-based nav background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ═══════════════════════════════════════
    // SCROLL REVEAL ANIMATIONS
    // ═══════════════════════════════════════
    function initAnimations() {
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // Also trigger counter animations
        initCounters();
    }


    // ═══════════════════════════════════════
    // ANIMATED COUNTERS
    // ═══════════════════════════════════════
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current + (target >= 100 ? '+' : '+');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 100 ? '+' : '+');
            }
        }

        requestAnimationFrame(updateCounter);
    }


    // ═══════════════════════════════════════
    // PORTFOLIO FILTER
    // ═══════════════════════════════════════
    const filterBtns = document.querySelectorAll('#portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    item.style.display = '';
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    });
                } else {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // Hero Parallax removed to fix showcase visibility in new centered layout


    // ═══════════════════════════════════════
    // CONTACT FORM
    // ═══════════════════════════════════════
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = 'Request Sent ✓';
            submitBtn.style.background = 'rgba(255,237,214,0.1)';
            submitBtn.style.color = '#FFEDD6';
            submitBtn.style.borderColor = 'rgba(255,237,214,0.3)';

            setTimeout(() => {
                submitBtn.innerHTML = `Submit Architectural Request <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.borderColor = '';
                contactForm.reset();
            }, 3000);
        });
    }


    // ═══════════════════════════════════════
    // SMOOTH SCROLL SKEW EFFECT
    // ═══════════════════════════════════════
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        scrollVelocity = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;

        if (!ticking) {
            requestAnimationFrame(() => {
                const skewAmount = Math.max(-2, Math.min(2, scrollVelocity * 0.03));
                document.querySelectorAll('.feature-item, .portfolio-item, .process-step-content').forEach(el => {
                    el.style.transform = `skewY(${skewAmount}deg)`;
                });

                setTimeout(() => {
                    document.querySelectorAll('.feature-item, .portfolio-item, .process-step-content').forEach(el => {
                        el.style.transform = 'skewY(0deg)';
                    });
                }, 150);

                ticking = false;
            });
            ticking = true;
        }
    });


    // ═══════════════════════════════════════
    // PARTICLE AMBIENT BACKGROUND
    // ═══════════════════════════════════════
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;opacity:0.4;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 35;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.05;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.fadeDirection * 0.001;

            if (this.opacity <= 0.02 || this.opacity >= 0.4) {
                this.fadeDirection *= -1;
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 237, 214, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw subtle connection lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 237, 214, ${0.03 * (1 - dist / 200)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();


    // ═══════════════════════════════════════
    // MAGNETIC HOVER ON BUTTONS (Desktop)
    // ═══════════════════════════════════════
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.nav-cta-btn, .btn-submit, .hero-video-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }


    // ═══════════════════════════════════════
    // ACTIVE NAV HIGHLIGHT ON SCROLL
    // ═══════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--cream)';
            }
        });
    });



    // ═══════════════════════════════════════
    // INTERACTIVE VASTU COMPASS ENGINE
    // ═══════════════════════════════════════
    const compassPads = document.querySelectorAll('.compass-pad');
    const compassNeedle = document.getElementById('compass-needle');
    const vastuCard = document.getElementById('vastu-card');
    const vastuSanskritDir = document.getElementById('vastu-sanskrit-dir');
    const vastuDirTitle = document.getElementById('vastu-dir-title');
    const vastuElement = document.getElementById('vastu-element');
    const vastuPositiveList = document.getElementById('vastu-positive-list');
    const vastuNegativeList = document.getElementById('vastu-negative-list');
    const vastuRational = document.getElementById('vastu-rational');

    const vastuDb = {
        n: {
            sanskrit: "KUBERA - NORTH",
            title: "Wealth & Prosperity (North)",
            element: "Element: Air (Vayu)",
            positive: ["Main Entrance / Living Room", "Treasury / Safe Room", "Study Room / Library"],
            negative: ["Master Bedroom", "Kitchen (Fire element clashes)", "Toilet / Septic Tank"],
            rational: "The North direction is associated with magnetic polar forces and receives cool, indirect, and constant light throughout the day. Placements of studies and living rooms here optimize daylight comfort without introducing excessive solar heat, while placing heavy services here blocks healthy ventilation flows."
        },
        ne: {
            sanskrit: "ESHANYA - NORTH-EAST",
            title: "Sacred & Wisdom (North-East)",
            element: "Element: Water (Jala)",
            positive: ["Puja Room / Prayer Hall", "Meditation / Yoga Area", "Veranda / Balcony", "Underground Water Tank"],
            negative: ["Kitchen", "Master Bedroom (Causes restless sleep)", "Toilet / Septic Tank"],
            rational: "North-East receives the earliest gentle morning solar rays, rich in ultraviolet light which naturally disinfects the air. This makes it ideal for sacred meditation, prayer, and morning water storage where early sun-light helps purify."
        },
        e: {
            sanskrit: "ADITYA - EAST",
            title: "Health & Vitality (East)",
            element: "Element: Solar / Light (Surya)",
            positive: ["Main Entrance", "Living Room / Guest Lounge", "Bathing Room", "Veranda"],
            negative: ["Master Bedroom", "Toilet", "Septic Tank / Heavy Storage"],
            rational: "East receives the powerful morning sun, essential for healthy circadian rhythms and vitamin D synthesis. Opening this side with massive glass sliding doors or verandas allows morning light to flood the interiors, warming the home naturally."
        },
        se: {
            sanskrit: "AGNI - SOUTH-EAST",
            title: "Fire & Energy (South-East)",
            element: "Element: Fire (Agni)",
            positive: ["Kitchen / Hearth", "Electrical Panel Room", "Generator Space", "Staircase"],
            negative: ["Master Bedroom", "Puja Room (Sacred spaces conflict)", "Underground Water Tank"],
            rational: "South-East receives dry, hot midday solar radiation. Placing the kitchen here leverages this dry heat to keep cooking areas moisture-free, preventing mould and bacterial growth while avoiding the dampness of water tanks."
        },
        s: {
            sanskrit: "YAMA - SOUTH",
            title: "Stability & Protection (South)",
            element: "Element: Earth (Prithvi)",
            positive: ["Master Bedroom", "Heavy Overhead Water Tanks", "Store Room", "Main Staircase"],
            negative: ["Main Entrance", "Basement", "Puja Room"],
            rational: "South receives high-temperature thermal loads in Kerala. Placing thick, heavy concrete walls and storage zones here acts as a natural thermal mass insulator, protecting the rest of the house from solar heat gain."
        },
        sw: {
            sanskrit: "NAIRUTHI - SOUTH-WEST",
            title: "Legacy & Strength (South-West)",
            element: "Element: Earth (Prithvi)",
            positive: ["Master Bedroom", "Owner's Cabin / Office", "Heavy Machinery / Wardrobes", "Staircase"],
            negative: ["Kitchen", "Main Entrance", "Underground Water Tanks"],
            rational: "South-West is the highest solar radiation zone during the afternoon. Placing the heavy Master Bedroom here blocks direct heat transmission to central rooms, and the elevation provides maximum privacy and stable structural weights."
        },
        w: {
            sanskrit: "VARUNA - WEST",
            title: "Rain & Rest (West)",
            element: "Element: Water / Rain (Varuna)",
            positive: ["Children's Bedroom", "Dining Room", "Study Room", "Overhead Tank"],
            negative: ["Main Entrance", "Puja Room", "Kitchen"],
            rational: "West receives intense late afternoon sun and heavy monsoon wind directions in Kerala. Placing dining rooms or children's study zones here blocks afternoon glare from central spaces while enjoying cooled evening breezes."
        },
        nw: {
            sanskrit: "VAYU - NORTH-WEST",
            title: "Wind & Relationships (North-West)",
            element: "Element: Wind (Vayu)",
            positive: ["Guest Bedroom", "Granary / Store Room", "Garage / Parking", "Septic Tank / Toilet"],
            negative: ["Master Bedroom", "Puja Room", "Treasury / Safe Room"],
            rational: "North-West receives strong wind streams. Placing guest rooms, toilets, and garage areas here utilizes natural cross-ventilation to clear air pathways quickly without carrying odours into core family zones."
        }
    };

    if (compassNeedle && vastuCard) {
        compassPads.forEach(pad => {
            pad.addEventListener('click', () => {
                // Set active
                compassPads.forEach(p => p.classList.remove('active'));
                pad.classList.add('active');

                // Rotate needle
                const deg = pad.getAttribute('data-deg');
                compassNeedle.style.transform = `rotate(${deg}deg)`;

                // Update text database
                const dir = pad.getAttribute('data-dir');
                const data = vastuDb[dir];

                if (data) {
                    vastuCard.style.opacity = '0';
                    vastuCard.style.transform = 'translateY(15px)';

                    setTimeout(() => {
                        vastuSanskritDir.textContent = data.sanskrit;
                        vastuDirTitle.textContent = data.title;
                        vastuElement.textContent = data.element;

                        // List positives
                        vastuPositiveList.innerHTML = '';
                        data.positive.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
                            vastuPositiveList.appendChild(li);
                        });

                        // List negatives
                        vastuNegativeList.innerHTML = '';
                        data.negative.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
                            vastuNegativeList.appendChild(li);
                        });

                        vastuRational.textContent = data.rational;

                        vastuCard.style.opacity = '1';
                        vastuCard.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        });
    }

    // ═══════════════════════════════════════
    // 3D CANVAS EXPLODED VIEW SEQUENCER (Hero Scroll Scrub)
    // ═══════════════════════════════════════
    const seqCanvas = document.getElementById('story-canvas');
    const seqCtx = seqCanvas ? seqCanvas.getContext('2d') : null;
    const heroSection = document.getElementById('hero');
    
    const totalFrames = 40;
    const images = [];
    let loadedFramesCount = 0;
    let targetFrame = 0;
    let currentFrame = 0;

    if (seqCanvas) {
        // Pre-cache frame sequence
        const precacheCanvasImages = () => {
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const paddedIndex = String(i).padStart(3, '0');
                img.src = `images/exploded-view/ezgif-frame-${paddedIndex}.jpg`;

                img.onload = () => {
                    loadedFramesCount++;
                    if (loadedFramesCount === totalFrames) {
                        drawFrame(0);
                        requestAnimationFrame(canvasAnimateTick);
                    }
                };
                img.onerror = () => {
                    loadedFramesCount++;
                    if (loadedFramesCount === totalFrames) {
                        requestAnimationFrame(canvasAnimateTick);
                    }
                };
                images.push(img);
            }
        };

        const drawFrame = (frameIndex) => {
            if (!seqCtx || !images[frameIndex]) return;
            seqCtx.clearRect(0, 0, seqCanvas.width, seqCanvas.height);
            seqCtx.drawImage(images[frameIndex], 0, 0, seqCanvas.width, seqCanvas.height);
        };

        const canvasAnimateTick = () => {
            // Easing / lerp interpolation weight
            const lerpWeight = 0.12;
            currentFrame += (targetFrame - currentFrame) * lerpWeight;
            
            const roundedIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
            drawFrame(roundedIndex);

            requestAnimationFrame(canvasAnimateTick);
        };

        // Scroll scrubbing engine for Hero Section
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
            
            // Map scroll progress of the hero section to the 40 frames
            if (scrolled <= heroHeight * 1.2) {
                const progress = Math.min(1.0, Math.max(0.0, scrolled / (heroHeight * 1.0)));
                targetFrame = Math.round(progress * (totalFrames - 1));
            }
        });

        precacheCanvasImages();
    }

    // ═══════════════════════════════════════
    // DYNAMIC COST ESTIMATOR ENGINE
    // ═══════════════════════════════════════
    const areaSlider = document.getElementById('area-slider');
    const areaVal = document.getElementById('area-val');
    const styleOptions = document.querySelectorAll('.style-option');
    const locationSelect = document.getElementById('location-select');
    const estPrice = document.getElementById('est-price');
    const estTimeline = document.getElementById('est-timeline');
    const featureTitle = document.getElementById('feature-title');
    const featuresList = document.getElementById('features-list');

    const baseSqFtCost = 4200; 

    const styleFeatures = {
        tropical: {
            title: "Signature Tropical Modern Features Included:",
            items: [
                "Double-Height Glass Living Pavilion (Burma Teak frames)",
                "Indoor Rain-Courtyard (Nalukettu-inspired water drains)",
                "Engineered Solar Clay-Tile Shading Systems",
                "Fully Integrated Smart Home Automation (Lighting & HVAC)",
                "Vastu Shastra Spatial Alignment Architecture"
            ]
        },
        heritage: {
            title: "Traditional Heritage Fusion Features Included:",
            items: [
                "Authentic Wooden Padippura Entrance Gateway",
                "Traditional Chuttuveranda (Wrap-around shaded veranda)",
                "Granite-pillared Nalukettu Central Open Courtyard",
                "Clay roof tile layering with heat insulation systems",
                "Complete Traditional Vastu Shastra geometry mapping"
            ]
        },
        ultramodern: {
            title: "Elite Ultra Minimalist Features Included:",
            items: [
                "Dramatic Double-cantilever concrete shell design",
                "High-performance floor-to-ceiling glass panel facades",
                "Seamless Indoor-Outdoor transition pool deck",
                "Hidden architectural lighting & premium wall finishes",
                "Advanced Vastu energy-balancing spatial layouts"
            ]
        }
    };

    function calculateEstimate() {
        if (!areaSlider) return;
        const area = parseInt(areaSlider.value);
        
        areaVal.textContent = area.toLocaleString('en-IN') + ' Sq.Ft.';
        
        let styleMultiplier = 1.0;
        let selectedStyle = 'tropical';
        styleOptions.forEach(opt => {
            if (opt.classList.contains('active')) {
                styleMultiplier = parseFloat(opt.getAttribute('data-multiplier'));
                selectedStyle = opt.getAttribute('data-style');
            }
        });
        
        const selectedLocationOption = locationSelect.options[locationSelect.selectedIndex];
        const locationAdjustment = parseFloat(selectedLocationOption.getAttribute('data-adjustment'));
        
        const estimatedRawCost = area * baseSqFtCost * styleMultiplier * locationAdjustment;
        
        const lowCost = estimatedRawCost * 0.93;
        const highCost = estimatedRawCost * 1.07;
        
        function formatIndianCurrency(amount) {
            const roundedAmount = Math.round(amount);
            if (roundedAmount >= 10000000) {
                return '₹' + (roundedAmount / 10000000).toFixed(2) + ' Cr';
            } else {
                return '₹' + (roundedAmount / 100000).toFixed(1) + ' Lakhs';
            }
        }
        
        estPrice.textContent = `${formatIndianCurrency(lowCost)} - ${formatIndianCurrency(highCost)}`;
        
        const baseMonths = 10;
        const additionalMonths = Math.floor(area / 1200);
        const lowMonths = baseMonths + additionalMonths;
        const highMonths = lowMonths + 2;
        estTimeline.textContent = `${lowMonths} - ${highMonths} Months`;
        
        if (styleFeatures[selectedStyle]) {
            featureTitle.textContent = styleFeatures[selectedStyle].title;
            featuresList.innerHTML = '';
            styleFeatures[selectedStyle].items.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                featuresList.appendChild(li);
            });
        }
    }

    if (areaSlider && styleOptions.length && locationSelect) {
        areaSlider.addEventListener('input', calculateEstimate);
        
        styleOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                styleOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                calculateEstimate();
            });
        });
        
        locationSelect.addEventListener('change', calculateEstimate);
        calculateEstimate();
    }

});
