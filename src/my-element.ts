import './sol';

import { LitElement, css, customElement, html, property } from 'lit-element';

import { celsiusToFahrenheit } from './../util.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   *
   */
  constructor() {
    super();
  }
  static styles = css`
    :host {
      display: block;
      display: flex;
      font-family: sans-serif;
      /* border: solid 1px gray; */
      /* padding: 16px; */
      /* max-width: 800px; */
    }
    .wrapper {
      width: 100%;
    }
    .weekly-forecast {
      display: flex;
      justify-content: space-between;
      padding: 1.6rem 0.8rem;
      margin: 0;
      width: 100%;
    }
  `;

  @property({ type: Array })
  soles = [];

  render() {
    return html`
      <div class="space-pic"></div>
      <ul class="weekly-forecast">
        ${this.soles.map((s) => html`<sol-card .sol=${s}></sol-card>`)}
      </ul>
    `;
  }

  private _onClick() {
    this.count++;
  }

  foo(): string {
    return 'foo';
  }

  async firstUpdated(changed: Map<string | number | symbol, unknown>) {
    let { descriptions, soles } = await fetch(
      'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
    this.soles = soles.slice(0, 6);
    console.log(this.soles);
    super.firstUpdated(changed);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
