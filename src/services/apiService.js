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
        return this.getResourse(`characters?page=5&pageSize=7`);
    }

    async getCharacter(id) {
        return this.getResourse(`characters/${id}`);
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
}
