import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("get-data")
export class GetData extends LitElement {
  @property({ type: String }) url: string = "";
  @property({ type: String }) method: string = "";

  firstUpdated() {
    this.getData();
  }

  _sendData(data: any) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  async getData() {
    try {
      const response = await fetch(this.url, { method: this.method });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._sendData(data);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  // getData() {
  //   fetch(this.url, { method: this.method })
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       return Promise.reject(response);
  //     })
  //     .then((data) => {
  //       this._sendData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Something went wrong", error);
  //     });
  // }
}
