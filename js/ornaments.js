// Inject Dynamic Lower Ornaments Data-Attribute Driven
(function () {
    var shapes = {
        leaf: '<path d="M4 20C4 20 4 11 12 3C20 3 20 3 20 3C20 3 20 11 12 19C4 19 4 20 4 20Z" stroke="currentColor" stroke-width="1.5" fill="none"/>',
        ring: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>',
        diamond: '<path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" fill="currentColor"/>',
        square: '<rect x="6" y="6" width="12" height="12" stroke="currentColor" stroke-width="1.5" fill="none" transform="rotate(45 12 12)"/>',
        dot: '<circle cx="12" cy="12" r="3" fill="currentColor"/>',
        plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>',
        corn: '<path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 8h6M8.5 11h7M9 14h6M9.5 17h5" stroke="currentColor" stroke-width="1" opacity="0.5"/>'
    };

    var animClasses = ['shape-float', 'shape-rotate', 'shape-pulse', ''];
    var driftClasses = ['shape-drift-1', 'shape-drift-2', 'shape-drift-3', 'shape-drift-4'];

    function initLowerOrnaments() {
        var containers = document.querySelectorAll('.section-ornaments');
        containers.forEach(function (cont) {
            if (!cont) return;

            var type = cont.getAttribute('data-type') || 'particles';
            var theme = cont.getAttribute('data-theme') || 'green'; // gold, green, white
            var colorClass = 'shape-' + theme;
            var count = parseInt(cont.getAttribute('data-count') || '12', 10);

            if (type === 'float-scatter') {
                // Diverse floating shapes drifting in various directions
                var scatterCount = parseInt(cont.getAttribute('data-count') || '16', 10);
                var scatterMix = [shapes.leaf, shapes.ring, shapes.diamond, shapes.dot, shapes.plus, shapes.star, shapes.square];
                var scatterColors = theme === 'mix' ? ['shape-green', 'shape-golden-green', 'shape-gold'] : [colorClass];

                for (var s = 0; s < scatterCount; s++) {
                    var elS = document.createElement('div');
                    var drift = driftClasses[Math.floor(Math.random() * driftClasses.length)];
                    var sColor = scatterColors[Math.floor(Math.random() * scatterColors.length)];
                    elS.className = 'lower-shape ' + sColor + ' ' + drift;

                    var sizeS = Math.random() * 22 + 10; // 10px to 32px
                    elS.style.cssText = [
                        'width:' + sizeS + 'px',
                        'height:' + sizeS + 'px',
                        'left:' + (Math.random() * 94 + 3) + '%',
                        'top:' + (Math.random() * 85 + 5) + '%',
                        'opacity:' + (Math.random() * 0.12 + 0.03),
                        'animation-duration:' + (Math.random() * 10 + 8) + 's',
                        'animation-delay:' + (Math.random() * 6) + 's'
                    ].join(';');

                    var sSvg = scatterMix[Math.floor(Math.random() * scatterMix.length)];
                    elS.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%">' + sSvg + '</svg>';
                    cont.appendChild(elS);
                }
            } else if (type === 'falling-mix') {
                // Mix of falling green stars and golden-green leaves
                var countFall = parseInt(cont.getAttribute('data-count') || '18', 10);
                for (var j = 0; j < countFall; j++) {
                    var elF = document.createElement('div');
                    var shapeSvg, colorCls;
                    if (Math.random() > 0.5) {
                        shapeSvg = shapes.leaf;
                        colorCls = 'shape-golden-green';
                    } else {
                        shapeSvg = shapes.star;
                        colorCls = 'shape-green';
                    }
                    elF.className = 'lower-shape ' + colorCls + ' shape-fall';

                    var sizeF = Math.random() * 20 + 12; // 12px to 32px
                    elF.style.cssText = [
                        'width:' + sizeF + 'px',
                        'height:' + sizeF + 'px',
                        'left:' + (Math.random() * 96 + 2) + '%',
                        'top:' + (Math.random() * -20) + '%',
                        'opacity:' + (Math.random() * 0.2 + 0.1),
                        'animation-duration:' + (Math.random() * 8 + 10) + 's',
                        'animation-delay:' + (Math.random() * 10) + 's'
                    ].join(';');

                    elF.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%">' + shapeSvg + '</svg>';
                    cont.appendChild(elF);
                }
            } else if (type === 'lines') {
                // Elegant flowing moving lines (drifting left/right)
                var el1 = document.createElement('div');
                el1.className = 'lower-shape ' + colorClass + ' ornament-1';
                el1.style.cssText = 'width:120%; height:100%; left:-10%; top:0;';
                el1.innerHTML = '<svg viewBox="0 0 1200 600" preserveAspectRatio="xMinYMid slice" style="width:100%; height:100%;"><path d="M-200,400 C100,200 400,600 800,400 C1200,200 1400,500 1600,400" stroke="currentColor" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/></svg>';
                cont.appendChild(el1);

                var el2 = document.createElement('div');
                el2.className = 'lower-shape ' + colorClass + ' ornament-2';
                el2.style.cssText = 'width:120%; height:100%; left:-10%; top:0;';
                el2.innerHTML = '<svg viewBox="0 0 1200 600" preserveAspectRatio="xMinYMid slice" style="width:100%; height:100%; opacity:0.6;"><path d="M-200,300 C150,500 350,200 700,400 C1050,600 1250,300 1600,500" stroke="currentColor" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/></svg>';
                cont.appendChild(el2);
            } else {
                // Scattered particles
                var mix = [];
                if (theme === 'gold') mix = [shapes.diamond, shapes.ring, shapes.plus, shapes.square, shapes.dot];
                else if (theme === 'white') mix = [shapes.leaf, shapes.dot, shapes.diamond];
                else mix = [shapes.leaf, shapes.dot, shapes.ring, shapes.square];

                for (var i = 0; i < count; i++) {
                    var el = document.createElement('div');
                    var anim = animClasses[Math.floor(Math.random() * animClasses.length)];
                    el.className = 'lower-shape ' + colorClass + ' ' + anim;

                    // Randomize size between 14px and 40px
                    var size = Math.random() * 26 + 14;
                    el.style.cssText = [
                        'width:' + size + 'px',
                        'height:' + size + 'px',
                        'left:' + (Math.random() * 96 + 2) + '%',
                        'top:' + (Math.random() * 90 + 5) + '%',
                        'animation-duration:' + (Math.random() * 5 + 4) + 's',
                        'animation-delay:' + (Math.random() * 3) + 's'
                    ].join(';');

                    var shapeSvg = mix[Math.floor(Math.random() * mix.length)];
                    el.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%">' + shapeSvg + '</svg>';
                    cont.appendChild(el);
                }
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLowerOrnaments);
    else initLowerOrnaments();
})();
