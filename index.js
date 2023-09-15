function mapArrayToHashByKey(data, key) {
	const enumField = `_${key}s`;
	const map = {[enumField]: []};

	if (!data) return map;

	console.log("key", key);

	for (let item of data) {
		const newHash = item[key].toString();
		map[newHash] = item;
		map[enumField].push(newHash);
	}

	return map;
};

export { mapArrayToHashByKey };
