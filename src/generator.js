import allPossiblePairs from './allPossiblePairs';
import {allPossibleNElementArrays} from './allPossiblePairs';
import groupByCount from './groupByCount';
import containsAll from './containsAll';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import uniqWith from 'lodash/uniqWith';
import values from 'lodash/values';
import generateVariants from './variantsGenerator';
import _ from 'lodash';

export default function generate(mixture, nrOfPeople) {
    let variants = generateVariants(mixture);
    let val = values(variants);
    let allProfiles = allPossibleNElementArrays(val, nrOfPeople);
    let flat = _.flattenDeep(allProfiles);
    console.log('v', val, '->', flat);
    return flat;
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