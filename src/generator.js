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
    let allProfiles = getAllPermutations(val, nrOfPeople);

    let flat = allProfiles;
    console.log('v', val, '->', flat);
    return flat;
}

export function getAllPermutations(val, nrOfPeople) {
    let generatedFeatures = val[0];
    let stopGenerating = false;
    for(let i = 1; i < val.length; i++) {
        let lastLength = generatedFeatures.length;
        for (let j = 0; j < lastLength; j++) {
            let featureToJoin = generatedFeatures[j]
            for (let k = 0; k < val[i].length; k++) {
                let joinedElement = featureToJoin + val[i][k];
                if (k == 0)
                    generatedFeatures[j] = joinedElement;
                else if (generatedFeatures.length < nrOfPeople)
                    generatedFeatures.push(joinedElement);
                else {
                    stopGenerating = true;
                    break;
                }
            }

            if (stopGenerating)
                break;
        }

        if (stopGenerating)
            break;
    }

    if (generatedFeatures.length > nrOfPeople)
        return generatedFeatures.slice(0, nrOfPeople);
    return generatedFeatures;
}
