const crypto = require("crypto");

/**
 * @param { partitionKey?: string } event Event Object (optional)
 * @returns { string } Hex representation of the event if event is present else TRIVIAL_PARTITION_KEY, the max length supported is MAX_PARTITION_KEY_LENGTH.
 */
exports.deterministicPartitionKey = (event) => {
	const TRIVIAL_PARTITION_KEY = "0";
	const MAX_PARTITION_KEY_LENGTH = 256;
  const hash = crypto.createHash("sha3-512");

	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	}
	if (!event.partitionKey) {
		const data = JSON.stringify(event);
		return hash.update(data).digest("hex");
	}

	let candidate = event.partitionKey;
	if (typeof candidate !== "string") {
		candidate = JSON.stringify(candidate);
	}
	if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
		candidate = hash.update(candidate).digest("hex");
	}
	return candidate;
};
