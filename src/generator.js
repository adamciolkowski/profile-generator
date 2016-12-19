import allPossiblePairs from './allPossiblePairs';
import {allPossibleNElementArrays} from './allPossiblePairs';
import groupByCount from './groupByCount';
import containsAll from './containsAll';
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
    return _.chain(allPossibleNElementArrays(pairs, nrOfPeople))
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
    let a1 = groupByCount(a);
    let a2 = groupByCount(b);
    return a1.length == a2.length && containsAll(a1, a2) && containsAll(a2, a1);
}