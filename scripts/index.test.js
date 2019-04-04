import test from 'tape';

import { catify } from './index.js';

test('it can catify', t => {
    t.plan(1);
    t.equal(typeof catify === 'function', true);
});
