import { faker } from "@faker-js/faker";

class MoviesFactory {
    static factory() {
        return {
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price({min : 100, max : 1000, dec : 0})),
            stock: Number(faker.commerce.price({min : 1, max : 300, dec : 0})),
            size: faker.helpers.arrayElements(["S", "M", "L", "XL"], 4),
            images: faker.image.url(),
            category: faker.helpers.arrayElements(["men", "female", "children"], 1)[0],
            description: faker.lorem.paragraph(),
        }
    }

    static create(amount, override?) {
        let movies=[];
        for (let i = 0; i < amount; i++ ) {
            movies.push({
                ...this.factory(),
                ...override
            })
        }
        return movies;
    }
}

const products = MoviesFactory.create(50)

console.log(products)

