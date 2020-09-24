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

    async getCharacters() {
        const characters = await this.getResourse(
            `characters?page=5&pageSize=7`
        );
        return characters.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResourse(`characters/${id}`);
        return this._transformCharacter(character);
    }

    async getHouses() {
        return this.getResourse(`houses`);
    }

    async getHouse(id) {
        return this.getResourse(`houses/${id}`);
    }

    async getBooks() {
        return this.getResourse(`books`);
    }

    async getBook(id) {
        return this.getResourse(`books/${id}`);
    }

    _transformCharacter(character) {
        return {
            name: character.name || 'no information available',
            gender: character.gender || 'no information available',
            born: character.born || 'no information available',
            died: character.died || 'no information available',
            culture: character.culture || 'no information available',
        };
    }
}
