import times from 'lodash/times'

export default function allPossiblePairs(elements) {
    return allPossibleNElementArrays(elements, 2);
}

export function allPossibleNElementArrays(elements, n) {
    let arrays = [];
    let indices = times(n, i => 0);
    for(let i = 0; i < Math.pow(elements.length, n); i++) {
        let array = indices.map(i => elements[i]);
        arrays.push(array);
        let index = n - 1;
        while (index >= 0) {
            if(indices[index] < elements.length - 1) {
                indices[index]++;
                break;
            } else {
                indices[index] = 0;
                index--;
            }
        }
    }
    return arrays;
}
