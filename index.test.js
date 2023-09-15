import test from 'node:test';
import assert from 'assert';
import { mapArrayToHashByKey } from "./index.js";

test("nullish value should return empty _${key}s array", () => {
	const result = mapArrayToHashByKey(null, "age");

	const expected = {
		_ages: [],
	};

	assert.deepStrictEqual(result, expected);
});

test("should properly fill with hashes", () => {
	const mockPayload = [
  {
    id: 1,
    age: 25,
    address: {
      city: "New York",
      zipCode: 10001,
    },
    name: "John",
    surname: "Doe",
  },
  {
    id: 2,
    age: 30,
    address: {
      city: "Los Angeles",
      zipCode: 90001,
    },
    name: "Jane",
    surname: "Smith",
  },
  ];

	const result = mapArrayToHashByKey(mockPayload, "age")

	const expected = {
    "25": {
      id: 1,
      age: 25,
      address: {
        city: "New York",
        "zipCode": 10001
      },
      name: "John",
      surname: "Doe"
    },
    "30": {
      id: 2,
      age: 30,
      address: {
        city: "Los Angeles",
        zipCode: 90001
      },
      name: "Jane",
      surname: "Smith"
    },
    "_ages": [
      "25",
      "30"
    ]
  };

	assert.deepStrictEqual(result, expected);
});