import catify from './catify';

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

    catify(document.querySelector('title'), { prefix: 'dave' });
    catify(document.querySelector('.cat'), { maxCycles: 2 });
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
