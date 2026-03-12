// ========================================
// Luxury Section Ornaments — Hero-Level Quality
// Multi-layer: gradient curves, glowing particles, orbs, shimmer lines, floating shapes
// ========================================
(function () {
    var shapes = {
        leaf: '<path d="M4 20C4 20 4 11 12 3C20 3 20 3 20 3C20 3 20 11 12 19C4 19 4 20 4 20Z" stroke="currentColor" stroke-width="1.5" fill="none"/>',
        ring: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>',
        diamond: '<path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" fill="currentColor"/>',
        square: '<rect x="6" y="6" width="12" height="12" stroke="currentColor" stroke-width="1.5" fill="none" transform="rotate(45 12 12)"/>',
        dot: '<circle cx="12" cy="12" r="3" fill="currentColor"/>',
        plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>',
        corn: '<path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 8h6M8.5 11h7M9 14h6M9.5 17h5" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
        hexagon: '<path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>',
        wave: '<path d="M2 12Q6 6 12 12Q18 18 22 12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
    };

    var animClasses = ['shape-float', 'shape-rotate', 'shape-pulse', ''];
    var driftClasses = ['shape-drift-1', 'shape-drift-2', 'shape-drift-3', 'shape-drift-4'];
    var luxCurveClasses = ['lux-curve-1', 'lux-curve-2', 'lux-curve-3', 'lux-curve-4'];

    // Color palettes for gradient curves
    var gradientPalettes = {
        gold: [
            { s1: 'rgba(201,147,42,0.12)', s2: 'rgba(201,147,42,0.02)' },
            { s1: 'rgba(181,137,52,0.10)', s2: 'rgba(201,147,42,0.01)' },
            { s1: 'rgba(220,170,60,0.08)', s2: 'rgba(201,147,42,0.015)' },
            { s1: 'rgba(201,147,42,0.06)', s2: 'rgba(181,137,52,0.01)' }
        ],
        green: [
            { s1: 'rgba(26,71,49,0.10)', s2: 'rgba(26,71,49,0.02)' },
            { s1: 'rgba(36,81,59,0.08)', s2: 'rgba(26,71,49,0.015)' },
            { s1: 'rgba(26,71,49,0.06)', s2: 'rgba(36,81,59,0.01)' },
            { s1: 'rgba(46,91,69,0.07)', s2: 'rgba(26,71,49,0.01)' }
        ],
        mix: [
            { s1: 'rgba(201,147,42,0.10)', s2: 'rgba(201,147,42,0.02)' },
            { s1: 'rgba(26,71,49,0.08)', s2: 'rgba(26,71,49,0.015)' },
            { s1: 'rgba(201,147,42,0.07)', s2: 'rgba(181,137,52,0.01)' },
            { s1: 'rgba(26,71,49,0.06)', s2: 'rgba(36,81,59,0.01)' }
        ]
    };

    // Unique gradient ID counter
    var gradIdCounter = 0;

    // --- LAYER 1: Gradient Curves (elegant flowing lines with gradient stroke) ---
    function addGradientCurves(cont, theme, count) {
        var palette = gradientPalettes[theme] || gradientPalettes.mix;
        var curvePaths = [
            'M-200,##Y## C100,##Y1## 400,##Y2## 800,##Y3## C1200,##Y4## 1400,##Y5## 1800,##Y6##',
            'M-150,##Y## C200,##Y1## 500,##Y2## 900,##Y3## C1100,##Y4## 1350,##Y5## 1700,##Y6##',
            'M-100,##Y## C250,##Y1## 550,##Y2## 850,##Y3## C1150,##Y4## 1400,##Y5## 1750,##Y6##',
            'M-250,##Y## C150,##Y1## 450,##Y2## 750,##Y3## C1050,##Y4## 1300,##Y5## 1650,##Y6##'
        ];
        var strokeWidths = [2, 1.5, 1.2, 1];
        var numCurves = Math.min(count || 4, 4);

        for (var c = 0; c < numCurves; c++) {
            var el = document.createElement('div');
            el.className = 'lux-gradient-curve ' + luxCurveClasses[c];
            var baseY = 60 + c * 120;
            var path = curvePaths[c]
                .replace('##Y##', baseY + Math.random() * 50)
                .replace('##Y1##', baseY + 50 + Math.random() * 80 - 40)
                .replace('##Y2##', baseY - 30 + Math.random() * 70)
                .replace('##Y3##', baseY + 30 + Math.random() * 70 - 35)
                .replace('##Y4##', baseY - 20 + Math.random() * 90)
                .replace('##Y5##', baseY + 40 + Math.random() * 70 - 35)
                .replace('##Y6##', baseY + Math.random() * 60);

            var gradId = 'lux-grad-' + (gradIdCounter++);
            var col = palette[c % palette.length];
            el.innerHTML = '<svg viewBox="0 0 1600 600" preserveAspectRatio="none">' +
                '<defs><linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
                '<stop offset="0%" stop-color="' + col.s1 + '"/>' +
                '<stop offset="50%" stop-color="' + col.s1 + '"/>' +
                '<stop offset="100%" stop-color="' + col.s2 + '"/>' +
                '</linearGradient></defs>' +
                '<path d="' + path + '" stroke="url(#' + gradId + ')" stroke-width="' + strokeWidths[c] + '" fill="none" stroke-linecap="round"/>' +
                '</svg>';
            cont.appendChild(el);
        }
    }

    // --- LAYER 2: Glowing Particles (like hero fireflies) ---
    function addGlowParticles(cont, theme, count) {
        var particleClass = theme === 'white' ? 'lux-particle-white' :
                            theme === 'green' ? 'lux-particle-green' : 'lux-particle-gold';
        var mixClasses = theme === 'mix' ? ['lux-particle-gold', 'lux-particle-green'] : [particleClass];

        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            var cls = mixClasses[Math.floor(Math.random() * mixClasses.length)];
            p.className = 'lux-particle ' + cls;
            var size = Math.random() * 5 + 2;
            p.style.cssText = [
                'width:' + size + 'px',
                'height:' + size + 'px',
                'left:' + (Math.random() * 96 + 2) + '%',
                'top:' + (Math.random() * 90 + 5) + '%',
                'animation-duration:' + (Math.random() * 3 + 2) + 's',
                'animation-delay:' + (Math.random() * 4) + 's'
            ].join(';');
            cont.appendChild(p);
        }
    }

    // --- LAYER 3: Soft Gradient Orbs (ambient background glow) ---
    function addOrbs(cont, theme, count) {
        var orbClasses = theme === 'green' ? ['lux-orb-green'] :
                         theme === 'mix' ? ['lux-orb-gold', 'lux-orb-green'] : ['lux-orb-gold'];

        for (var i = 0; i < count; i++) {
            var orb = document.createElement('div');
            orb.className = 'lux-orb ' + orbClasses[Math.floor(Math.random() * orbClasses.length)];
            var size = Math.random() * 200 + 120;
            orb.style.cssText = [
                'width:' + size + 'px',
                'height:' + size + 'px',
                'left:' + (Math.random() * 80 + 5) + '%',
                'top:' + (Math.random() * 70 + 10) + '%',
                'animation-duration:' + (Math.random() * 6 + 6) + 's',
                'animation-delay:' + (Math.random() * 4) + 's'
            ].join(';');
            cont.appendChild(orb);
        }
    }

    // --- LAYER 4: Shimmer Lines (horizontal light streaks) ---
    function addShimmerLines(cont, count) {
        for (var i = 0; i < count; i++) {
            var line = document.createElement('div');
            line.className = 'lux-shimmer-line';
            var w = Math.random() * 40 + 30;
            line.style.cssText = [
                'width:' + w + '%',
                'height:1px',
                'left:' + (Math.random() * 60 + 10) + '%',
                'top:' + (Math.random() * 80 + 10) + '%',
                'opacity:' + (Math.random() * 0.3 + 0.1)
            ].join(';');
            line.style.animationDelay = (Math.random() * 5) + 's';
            cont.appendChild(line);
        }
    }

    // --- LAYER 5: Floating Shapes (existing shapes but with more variety) ---
    function addFloatingShapes(cont, theme, count) {
        var colorClass = 'shape-' + theme;
        var shapeList = [shapes.leaf, shapes.ring, shapes.diamond, shapes.dot, shapes.plus, shapes.star, shapes.square, shapes.corn, shapes.hexagon, shapes.wave];
        var scatterColors = theme === 'mix' ? ['shape-green', 'shape-golden-green', 'shape-gold'] : [colorClass];

        for (var s = 0; s < count; s++) {
            var el = document.createElement('div');
            var drift = driftClasses[Math.floor(Math.random() * driftClasses.length)];
            var sColor = scatterColors[Math.floor(Math.random() * scatterColors.length)];
            el.className = 'lower-shape ' + sColor + ' ' + drift;

            var size = Math.random() * 24 + 10;
            el.style.cssText = [
                'width:' + size + 'px',
                'height:' + size + 'px',
                'left:' + (Math.random() * 94 + 3) + '%',
                'top:' + (Math.random() * 85 + 5) + '%',
                'opacity:' + (Math.random() * 0.12 + 0.03),
                'animation-duration:' + (Math.random() * 10 + 8) + 's',
                'animation-delay:' + (Math.random() * 6) + 's'
            ].join(';');

            var sSvg = shapeList[Math.floor(Math.random() * shapeList.length)];
            el.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%">' + sSvg + '</svg>';
            cont.appendChild(el);
        }
    }

    // --- LAYER 6: Corner Accents (elegant corner flourishes) ---
    function addCornerAccents(cont, theme) {
        var color = theme === 'green' ? 'rgba(26,71,49,0.5)' :
                    theme === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(201,147,42,0.5)';

        var corners = [
            { pos: 'top:0;left:0;', transform: '' },
            { pos: 'top:0;right:0;', transform: 'transform:scaleX(-1);' },
            { pos: 'bottom:0;left:0;', transform: 'transform:scaleY(-1);' },
            { pos: 'bottom:0;right:0;', transform: 'transform:scale(-1,-1);' }
        ];

        // Pick 2 random corners
        var picked = [];
        while (picked.length < 2) {
            var idx = Math.floor(Math.random() * 4);
            if (picked.indexOf(idx) === -1) picked.push(idx);
        }

        for (var i = 0; i < picked.length; i++) {
            var c = corners[picked[i]];
            var el = document.createElement('div');
            el.className = 'lux-corner-accent';
            el.style.cssText = c.pos + c.transform + 'width:120px;height:120px;';
            el.innerHTML = '<svg viewBox="0 0 120 120" width="100%" height="100%">' +
                '<path d="M0,0 C0,60 20,80 0,120" stroke="' + color + '" stroke-width="1" fill="none"/>' +
                '<path d="M0,0 C40,0 80,20 120,0" stroke="' + color + '" stroke-width="1" fill="none"/>' +
                '<path d="M0,0 C30,30 30,30 60,60" stroke="' + color + '" stroke-width="0.5" fill="none" opacity="0.5"/>' +
                '<circle cx="0" cy="0" r="3" fill="' + color + '" opacity="0.3"/>' +
                '</svg>';
            cont.appendChild(el);
        }
    }

    // --- LAYER 7: Flowing SVG Ornaments (like hero wind patterns) ---
    function addFlowingOrnaments(cont, theme) {
        var colors = {
            gold: ['rgba(201,147,42,0.08)', 'rgba(201,147,42,0.05)'],
            green: ['rgba(26,71,49,0.06)', 'rgba(26,71,49,0.04)'],
            mix: ['rgba(201,147,42,0.07)', 'rgba(26,71,49,0.05)'],
            white: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.03)']
        };
        var cols = colors[theme] || colors.mix;

        // Left flowing pattern
        var el1 = document.createElement('div');
        el1.className = 'lux-flowing-svg';
        el1.style.cssText = 'top:-5%;left:0;width:50%;height:70%;animation:ornament-breath 14s infinite alternate ease-in-out;';
        var y1a = Math.random() * 200 + 300;
        var y1b = Math.random() * 200 + 200;
        var y1c = Math.random() * 200 + 400;
        el1.innerHTML = '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">' +
            '<path d="M-100,' + y1a + ' C150,' + (y1a + 50) + ' 250,' + y1b + ' 450,' + (y1b + 100) + ' C650,' + y1c + ' 750,' + (y1c - 50) + ' 900,' + (y1c - 100) + '" stroke="' + cols[0] + '" stroke-width="1.5"/>' +
            '<path d="M-50,' + (y1a + 100) + ' C200,' + (y1a + 150) + ' 300,' + (y1b + 100) + ' 500,' + (y1b + 200) + '" stroke="' + cols[1] + '" stroke-width="1" opacity="0.6"/>' +
            '</svg>';
        cont.appendChild(el1);

        // Right flowing pattern
        var el2 = document.createElement('div');
        el2.className = 'lux-flowing-svg';
        el2.style.cssText = 'bottom:-10%;right:-5%;width:60%;height:80%;animation:ornament-breath 18s infinite alternate-reverse ease-in-out;opacity:0.4;';
        var y2a = Math.random() * 200 + 300;
        var y2b = Math.random() * 200 + 200;
        el2.innerHTML = '<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">' +
            '<path d="M900,' + y2a + ' C650,' + (y2a + 50) + ' 550,' + y2b + ' 350,' + (y2b + 100) + ' C150,' + (y2b + 200) + ' 50,' + (y2b + 50) + ' -100,' + y2b + '" stroke="' + cols[0] + '" stroke-width="1.5"/>' +
            '<path d="M850,' + (y2a + 100) + ' C600,' + (y2a + 150) + ' 500,' + (y2b + 100) + ' 300,' + (y2b + 200) + '" stroke="' + cols[1] + '" stroke-width="1" opacity="0.5"/>' +
            '</svg>';
        cont.appendChild(el2);
    }

    // ========================================
    // MAIN: Compose luxury layers per section
    // ========================================
    function initLuxuryOrnaments() {
        var containers = document.querySelectorAll('.section-ornaments');
        containers.forEach(function (cont) {
            if (!cont) return;

            var type = cont.getAttribute('data-type') || 'particles';
            var theme = cont.getAttribute('data-theme') || 'green';
            var isDark = cont.closest('.bg-dark') || cont.closest('footer') || cont.closest('.page-hero');

            // Always add luxury layers regardless of type
            // Layer 1: Gradient Curves (3-4 flowing curves)
            addGradientCurves(cont, theme, isDark ? 3 : 4);

            // Layer 2: Glowing Particles (12-20 fireflies)
            addGlowParticles(cont, theme, isDark ? 15 : 12);

            // Layer 3: Orbs (2-3 ambient glows)
            addOrbs(cont, theme, isDark ? 3 : 2);

            // Layer 4: Shimmer Lines (2-3 light streaks)
            addShimmerLines(cont, isDark ? 3 : 2);

            // Layer 5: Floating Shapes (type-dependent count)
            var shapeCount = parseInt(cont.getAttribute('data-count') || '12', 10);
            addFloatingShapes(cont, theme, shapeCount);

            // Layer 6: Corner Accents
            addCornerAccents(cont, theme);

            // Layer 7: Flowing SVG Ornaments (wind-like patterns)
            addFlowingOrnaments(cont, theme);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLuxuryOrnaments);
    else initLuxuryOrnaments();
})();
