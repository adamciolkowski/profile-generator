import allPossiblePairs from './allPossiblePairs';
import {allPossibleNElementArrays} from './allPossiblePairs';
import groupByCount from './groupByCount';
import containsAll from './containsAll';
import flattenDeep from 'lodash/flattenDeep';
import isEqual from 'lodash/isEqual';
import slice from 'lodash/slice';
import sortBy from 'lodash/sortBy';
import uniqWith from 'lodash/uniqWith';
import values from 'lodash/values';
import generateVariants from './variantsGenerator';
import _ from 'lodash';

export default function generate(mixture, nrOfPeople) {
    let variants = generateVariants(mixture);
    let val = values(variants);
    let allProfiles = allPossibleNElementArrays(val, nrOfPeople);
    let flat = slice(uniqWith(flattenDeep(allProfiles), isEqual), 0, nrOfPeople);
    console.log('v', val, '->', flat);
    return flat;
}
