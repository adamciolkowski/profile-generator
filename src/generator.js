export default function generate(mixture, nrOfPeople) {
    let attributes = Object.keys(mixture);
    return attributes
        .map(a => mixture[a].map(v => a + v).join(''));
}