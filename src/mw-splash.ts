import { LitElement, css, customElement, html, property } from 'lit-element';
import { celsiusToFahrenheit, dateFormat } from './../util.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-splash')
export class Splash extends LitElement {
  static styles = css`
    :host {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mars-logo {
        max-width: 50%;
    }
  `;

  render() {
    return html`
      <img class="mars-logo" src="./mars.svg" />
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mw-splash': Splash;
  }
}
