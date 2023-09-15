function mapArrayToHashByKey(array, key) {
	const enumField = `_${key}s`;
	const map = {[enumField]: []};

	if (!array) return map;

	console.log("key", key);

	for (let item of array) {
		const newHash = item[key].toString();
		map[newHash] = item;
		map[enumField].push(newHash);
	}

	return map;
};

export { mapArrayToHashByKey };
