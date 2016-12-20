import allPossiblePairs from './allPossiblePairs';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import uniqWith from 'lodash/uniqWith';

export default function generateVariants(mixture) {
    let obj = {};
    let attributes = Object.keys(mixture);
    attributes.forEach(attr => {
        obj[attr] = allVariants(mixture, attr);
    });
    return obj;
}

function allVariants(mixture, attr) {
    let variants = mixture[attr].map(v => attr + v);
    let result = allDistinctPairs(variants);
    return result.map(v => v.join(''));
}

function allDistinctPairs(elements) {
    return uniqWith(allPossiblePairs(elements).map(sortBy), isEqual);
}