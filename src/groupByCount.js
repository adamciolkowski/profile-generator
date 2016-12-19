import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

export default function groupByCount(array) {
    let counts = [];
    array.forEach(e => {
        let group = find(counts, it => isEqual(it.item, e));
        if(group == null) {
            counts.push({item: e, count: 1});
        } else {
            group.count++;
        }
    });
    return counts;
}

