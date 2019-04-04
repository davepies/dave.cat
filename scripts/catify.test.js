import catify, { cycle } from './catify';

jest.useFakeTimers();

describe('catify#default', () => {
    beforeEach(() => {
        setTimeout.mockReset();
    });
    const mockHTMLElement = {
        textContent: ''
    }
    it('is a function', () => {
        expect(typeof catify).toEqual('function');
    });

    it('returns undefined if first argument is missing', () => {
        expect(catify()).toEqual(undefined);
    });

    it('returns true if first argument is passed in', () => {
        expect(catify(mockHTMLElement)).toEqual(true);
    });

    it('waits between 0.5 and 2 seconds between each tick', () => {
        catify(mockHTMLElement);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(typeof setTimeout.mock.calls[0][1]).toEqual('number');
        expect(setTimeout.mock.calls[0][1]).toBeGreaterThan(500);
        expect(setTimeout.mock.calls[0][1]).toBeLessThanOrEqual(2000);
    });

    it('sets the textContent of the given element', () => {
        const mockHTMLElement = { ...mockHTMLElement };
        catify(mockHTMLElement);
        expect(mockHTMLElement.textContent).not.toEqual('');
    });

    it('the value of textContent contains the prefix', () => {
        const mockHTMLElement = { ...mockHTMLElement };
        catify(mockHTMLElement, { prefix: 'foo' });
        expect(mockHTMLElement.textContent).toEqual(
            expect.stringContaining('foo')
        );
    });
});

describe('catify#cycle', () => {
    it('is a function', () => {
        expect(typeof cycle).toEqual('function');
    });

    it('returns an object containing .nextFrame', () => {
        expect(typeof cycle()).toEqual('object');
        expect(typeof cycle().next).toEqual('function');
    });

    it('loops through the items of an array', () => {
        const items = [1, 2, 3];
        const cycler = cycle(items);

        expect(cycler.next()).toEqual(1);
        expect(cycler.next()).toEqual(2);
        expect(cycler.next()).toEqual(3);
    });

    it('starts at the first item after a loop', () => {
        const items = [1, 2];
        const cycler = cycle(items);

        expect(cycler.next()).toEqual(1);
        expect(cycler.next()).toEqual(2);
        expect(cycler.next()).toEqual(1);
    });
});
