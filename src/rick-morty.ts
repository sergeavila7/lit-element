import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import "./components/GetData";

interface Character {
  img: string;
  name: string;
  species: string;
  status: string;
}

@customElement("rick-morty")
export class RickMorty extends LitElement {
  @property({ type: String }) header = "My app";
  @property({ type: Array }) wiki: Character[] = [];

  static styles = css`
    :host {
      display: block;
    }
    .container {
      text-align: center;
    }
    get-data {
      display: none;
    }
    .card {
      background-color: #fff;
      border-radius: 2px;
      display: inline-block;
      height: 300px;
      width: 200px;
      margin: 1rem;
      position: relative;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .card:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.24);
    }
    .card img {
      width: 70%;
    }
  `;

  constructor() {
    super();
    this.addEventListener("ApiData", (e: any) => {
      this._dataFormat(e.detail.data);
    });
  }

  _dataFormat(data: any) {
    let characters: Character[] = [];

    data["results"].map((character: any) => {
      characters.push({
        img: character.image,
        name: character.name,
        species: character.species,
        status: character.status,
      });
    });
    this.wiki = characters;
  }

  renderCharacter(character: Character) {
    return html`
      <div class="card">
        <div class="card-content">
          <h2>${character.name}</h2>
          <img src="${character.img}" alt="${character.name}" />
          <p>${character.species} | ${character.status}</p>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <get-data
        url="https://rickandmortyapi.com/api/character"
        method="GET"
      ></get-data>
      <div class="container">${this.wiki.map(this.renderCharacter)}</div>
    `;
  }
}
