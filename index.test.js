import {describe, it} from 'node:test';
import assert from 'node:assert/strict';

import {mapArrayToHashByKey} from "./index.js";

describe("ugly-code test suite", () => {
    const inputPayload = [{
        id: 1, age: 25, address: {
            city: "New York", zipCode: 10001,
        }, name: "John", surname: "Doe",
    }, {
        id: 2, age: 30, address: {
            city: "Los Angeles", zipCode: 90001,
        }, name: "Jane", surname: "Smith",
    },];

    it("null value should return empty _${key}s array", () => {
        const expected = {
            _ages: [],
        };

        const result = mapArrayToHashByKey(null, "age");

        assert.deepStrictEqual(result, expected);
    });

    it("undefined value should return empty _${key}s array", () => {
        const expected = {
            "_somethings": []
        };

        const result = mapArrayToHashByKey(undefined, "something")

        assert.deepStrictEqual(result, expected);
    });

    it("doesn't have an input array", () => {
        const expected = {
            "_somethings": []
        };

        const result = mapArrayToHashByKey("something")

        assert.deepStrictEqual(result, expected);
    });

    it("should properly fill with hashes", () => {
        const expected = {
            "25": {
                id: 1, age: 25, address: {
                    city: "New York", zipCode: 10001
                }, name: "John", surname: "Doe"
            }, "30": {
                id: 2, age: 30, address: {
                    city: "Los Angeles", zipCode: 90001
                }, name: "Jane", surname: "Smith"
            }, "_ages": ["25", "30"]
        };

        const result = mapArrayToHashByKey(inputPayload, "age")

        assert.deepStrictEqual(result, expected);
    });

    it("doesn't find a required field", () => {
        const expected = {
            "_somethings": []
        };

        const result = mapArrayToHashByKey(inputPayload, "something")

        assert.deepStrictEqual(result, expected);
    });


    it("does have a partial element", () => {
        const inputWithoutAge = [{
            id: 1, age: 25, address: {
                city: "New York", zipCode: 10001,
            }, name: "John", surname: "Doe",
        }, {
            id: 2, address: {
                city: "Los Angeles", zipCode: 90001,
            }, name: "Jane", surname: "Smith",
        },]

        const expected = {
            "25": {
                id: 1, age: 25, address: {
                    city: "New York", zipCode: 10001
                }, name: "John", surname: "Doe"
            }, "_ages": ["25"]
        };

        const result = mapArrayToHashByKey(inputWithoutAge, "age")

        assert.deepStrictEqual(result, expected);
    });
});
