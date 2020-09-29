export default class GOTServices {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api/";
    }

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async getAllCharacters() {
        const characters = await this.getResourse(
            `characters?page=5&pageSize=10`
        );
        return characters.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResourse(`characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllHouses() {
        return this.getResourse(`houses`);
    }

    async getHouse(id) {
        return this.getResourse(`houses/${id}`);
    }

    async getAllBooks() {
        return this.getResourse(`books`);
    }

    async getBook(id) {
        return this.getResourse(`books/${id}`);
    }

    isData(data) {
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
            name: this.isData(character.name),
            gender: this.isData(character.gender),
            born: this.isData(character.born),
            died: this.isData(character.died),
            culture: this.isData(character.culture),
        };
    };
}
