function mapArrayToHashByKey(array, key) {
    array ??= []; // if array is null | undefined
    if (!key) {   // if key is null | undefined
        key = array;
        array = [];
    }

    const enumField = `_${key}s`;
    const initialMap = {[enumField]: []};

    return array.reduce((acc, cur) => {
        if (!cur[key]) {
            return acc;
        }

        const newHash = cur[key].toString();
        acc[newHash] = cur;
        acc[enumField].push(newHash);

        return acc;
    }, initialMap);
}

export {mapArrayToHashByKey};
