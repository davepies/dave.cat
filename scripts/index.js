/* globals document, window */

export const catify = (el, prefix = '', maxCycles = Infinity) => {
    if (!el) {
        return;
    }

    const frames = ['/ᐠ｡ꞈ｡ᐟ\\', '/ᐠ｡ꞈ_ᐟ\\', '/ᐠ_ꞈ_ᐟ\\', '/ᐠ｡ꞈ_ᐟ\\', '/ᐠ_ꞈ_ᐟ\\'];
    let runsDone = 0;
    let cyclesDone = 0;

    const cycleFrames = frames => {
        let currentFrameIndex = 0;

        const nextFrame = () => {
            const frameToRender = frames[currentFrameIndex];
            const nextFrameIndex = currentFrameIndex + 1;
            const shouldReset = nextFrameIndex === frames.length;

            currentFrameIndex = shouldReset ? 0 : nextFrameIndex;

            return frameToRender;
        };

        return {
            nextFrame
        };
    };

    const cycler = cycleFrames(frames);

    const toggleFrame = () => {
        el.textContent = `${prefix} ${cycler.nextFrame()}`;
        const timeToNextRun = Math.random() * (2000 - 500) + 500;

        if (cyclesDone < maxCycles) {
            runsDone += 1;
            if (runsDone === frames.length) {
                cyclesDone += 1;
                runsDone = 0;
            }
            window.setTimeout(toggleFrame, timeToNextRun);
        }
    };

    toggleFrame();
};

export const addAwesomeEventListeners = doc => {
    const pillars = doc.querySelector('.pillars');

    if (!pillars) {
        return;
    }

    // event delegation
    pillars.addEventListener('mouseover', e => {
        const { target } = e;
        if (target.matches('.pillars li')) {
            target.classList.add('animated');
            target.addEventListener(
                'animationend',
                e => {
                    e.target.classList.remove('animated');
                },
                { once: true }
            );
        }
    });
};

export const init = () => {
    addAwesomeEventListeners(document);
    catify(document.querySelector('title'), 'dave');
    catify(document.querySelector('.cat'), '', 2);
};

export const listen = (document) => {
    if (
        document.readyState === 'complete' ||
        document.readyState === 'loaded' ||
        document.readyState === 'interactive'
    ) {
        init();
    } else {
        // https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
        document.addEventListener('DOMContentLoaded', init, false);
    }
};

listen(document);
