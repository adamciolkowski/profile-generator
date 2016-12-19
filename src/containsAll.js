import every from 'lodash/every';
import includes from 'lodash/includes';
import isObject from 'lodash/isObject';
import partial from 'lodash/partial';
import some from 'lodash/some';

export default function containsAll(array, otherArray) {
    return every(otherArray, partial(contains, array));
}

function contains(array, elem) {
    let containsFun = isObject(elem) ? some : includes;
    return containsFun(array, elem);
}
