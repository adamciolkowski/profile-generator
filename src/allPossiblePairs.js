export default function allPossiblePairs(elements) {
    let pairs = [];
    for (let i = 0; i < elements.length; i++) {
        for (var j = 0; j < elements.length; j++) {
            pairs.push([elements[i], elements[j]]);
        }
    }
    return pairs;
}