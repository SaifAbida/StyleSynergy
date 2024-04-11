"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var MoviesFactory = /** @class */ (function () {
    function MoviesFactory() {
    }
    MoviesFactory.factory = function () {
        return {
            name: faker_1.faker.commerce.productName(),
            price: Number(faker_1.faker.commerce.price({ min: 100, max: 1000, dec: 0 })),
            stock: Number(faker_1.faker.commerce.price({ min: 1, max: 300, dec: 0 })),
            size: faker_1.faker.helpers.arrayElements(["S", "M", "L", "XL"], 1)[0],
            images: faker_1.faker.image.url(),
            category: faker_1.faker.helpers.arrayElements(["men", "female", "children"], 1)[0],
            description: faker_1.faker.lorem.paragraph(),
        };
    };
    MoviesFactory.create = function (amount, override) {
        var movies = [];
        for (var i = 0; i < amount; i++) {
            movies.push(__assign(__assign({}, this.factory()), override));
        }
        return movies;
    };
    return MoviesFactory;
}());
var products = MoviesFactory.create(50);
console.log(products);
