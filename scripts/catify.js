
const frames = ['/ᐠ｡ꞈ｡ᐟ\\', '/ᐠ｡ꞈ_ᐟ\\', '/ᐠ_ꞈ_ᐟ\\', '/ᐠ｡ꞈ_ᐟ\\', '/ᐠ_ꞈ_ᐟ\\'];

/**
 * cycle
 * 
 * Takes an array and returns an object containing a method
 * that returns each item of the array, in sequence, one item per call.
 * 
 * Once it has reached the last item in the array it will start from
 * the beginning.
 *
 * @param {array} items
 * @returns {Object}
 */
export const cycle = items => {
    let currentIndex = 0;

    const next = () => {
        const currentItem = items[currentIndex];
        const nextIndex = currentIndex + 1;
        const shouldReset = nextIndex === items.length;

        currentIndex = shouldReset ? 0 : nextIndex;

        return currentItem;
    };

    return {
        next
    };
};

/**
 * catify
 * 
 * Takes a HTMLElement and changes it's textContent to contain
 * a series of cute cat faces.
 *
 * Options: 
 *  - Prefix: a string that gets rendered before the cute cat
 *  - maxCycles: limits the number of cycles the cute faces will be changed,
 *               defaults to infinity for infinte cuteness
 *
 * @param {HTMLElement} el
 * @param {Object} { prefix = '', maxCycles = Infinity }
 * @returns {undefined}
 */
const catify = (el, { prefix = '', maxCycles = Infinity } = {}) => {
    if (!el) {
        return;
    }

    const cycler = cycle(frames);

    let runsDone = 0;
    let cyclesDone = 0;

    const toggleFrame = () => {
        el.textContent = `${prefix} ${cycler.next()}`;
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

    return true;
};

export default catify;
