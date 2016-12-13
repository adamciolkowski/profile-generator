export function parse(mixture) {
    let variants = {};

    for (var i = 0; i < mixture.length; i++) {
        let featureLetter = mixture[i]
        if (!(featureLetter >= 'A' && featureLetter <= 'z'))
            continue;

        let variant = Number(mixture[i + 1])

        if (variants[mixture[i]] == null)
            variants[mixture[i]] = [variant]
        else
            variants[mixture[i]].push(variant)
    }

    return variants
}
