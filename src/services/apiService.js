export default class GOTServices {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api/";
    }

    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async () => {
        const characters = await this.getResourse(
            `characters?page=5&pageSize=10`
        );
        return characters.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const character = await this.getResourse(`characters/${id}`);
        return this._transformCharacter(character);
    };

    getAllHouses = async () => {
        const houses = await this.getResourse(`houses`);
        return houses.map(this._transformHouse);
    };

    getHouse = async (id) => {
        const house = await this.getResourse(`houses/${id}`);
        return this._transformHouse(house);
    };

    getAllBooks = async () => {
        const books = await this.getResourse(`books`);
        return books.map(this._transformBook);
    };

    getBook = async (id) => {
        const book = await this.getResourse(`books/${id}`);
        return this._transformBook(book);
    };

    isSet(data) {
        if (data) {
            return data;
        } else {
            return "No data";
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
        // const arr = item.split("/");
        // return arr[arr.length - 1];
    };

    _transformCharacter = (character) => {
        return {
            id: this._extractId(character),
            name: this.isSet(character.name),
            gender: this.isSet(character.gender),
            born: this.isSet(character.born),
            died: this.isSet(character.died),
            culture: this.isSet(character.culture),
        };
    };

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            authors: this.isSet(book.authors),
            numberOfPages: this.isSet(book.numberOfPages),
        };
    };

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            currentLord: this.isSet(house.currentLord),
        };
    };
}
