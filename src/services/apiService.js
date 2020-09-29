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
        return this.getResourse(`houses`);
    };

    getHouse = async (id) => {
        return this.getResourse(`houses/${id}`);
    };

    getAllBooks = async () => {
        return this.getResourse(`books`);
    };

    getBook = async (id) => {
        return this.getResourse(`books/${id}`);
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
            culture: this.isSet(character.gender),
        };
    };
}
