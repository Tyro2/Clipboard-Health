const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe("0");
	});

  it("Returns hashed event when partitionKey is not present", () => {
    const event = "event";
    const partitionKey = deterministicPartitionKey(event);
    const expectedPartitionKey = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(partitionKey).toBe(expectedPartitionKey);
  })

  it("Returns partitionKey when it's a small string", () => {
    const inputPartitionKey = "key";
    const partitionKey = deterministicPartitionKey({partitionKey: inputPartitionKey});
    expect(partitionKey).toBe(inputPartitionKey);
  });

  it("Returns stringified partitionKey when it's a small object", () => {
    const inputPartitionKey = {field: "value"};
    const partitionKey = deterministicPartitionKey({partitionKey: inputPartitionKey});
    expect(partitionKey).toBe(JSON.stringify(inputPartitionKey));
  });

  it("Returns hashed partitionKey when it's a long string", () => {
    const inputPartitionKey = 'a'.repeat(257);
    const partitionKey = deterministicPartitionKey({partitionKey: inputPartitionKey});
    const expectedPartitionKey = crypto.createHash("sha3-512").update(inputPartitionKey).digest("hex");
    expect(partitionKey).toBe(expectedPartitionKey);
  });

  it("Returns hashed partitionKey when it's a large object", () => {
    const inputPartitionKey = {field1: {field2: {field3: 'a'.repeat(257)}}};
    const partitionKey = deterministicPartitionKey({partitionKey: inputPartitionKey});
    const expectedPartitionKey = crypto.createHash("sha3-512").update(JSON.stringify(inputPartitionKey)).digest("hex");
    expect(partitionKey).toBe(expectedPartitionKey);
  });
});
