import allPossiblePairs from './allPossiblePairs';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import uniqWith from 'lodash/uniqWith';
import _ from 'lodash';

export default function generate(mixture, nrOfPeople) {
    let attributes = Object.keys(mixture);
    if (nrOfPeople == 1) {
        return attributes
            .map(a => mixture[a].map(v => a + v).join(''));
    }
    let allVariants = attributes.map(a => mixture[a].map(v => a + v));
    let variants = allVariants[0];
    let pairs = allDistinctPairs(variants);
    return _.chain(allPossiblePairs(pairs))
        .uniqWith(areEquivalent)
        .filter(e => !containsIdenticalValues(e))
        .map(a => a.map(e => e.join('')))
        .value();
}

function containsIdenticalValues(array) {
    return _.chain(array)
            .flatten()
            .uniq()
            .size()
            .value() == 1;
}

function allDistinctPairs(elements) {
    return uniqWith(allPossiblePairs(elements).map(sortBy), isEqual);
}

function areEquivalent(a, b) {
    return a.length === b.length && containsAll(a, b) && containsAll(b, a);
}

function containsAll(array, other) {
    return _.every(array, e => contains(other, e));
}

function contains(array, element) {
    return _.some(array, e => _.isEqual(element, e));
}