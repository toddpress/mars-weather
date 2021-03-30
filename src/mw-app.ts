import './mw-sol-card';
import './mw-bg-picture';
import './mw-splash';

import { LitElement, css, customElement, html, property } from 'lit-element';

import { NASA_ROVER_DATA_URL } from '../consts';
import { connect } from 'pwa-helpers';
import { fetchSoles } from './store/actions';
import { store } from './store';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-app')
export class App extends connect(store)(LitElement) {
  static styles = css`
    :host {
    }
    .mw-app {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
    }
    .bg-picture__inner {
      min-height: 32rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    h2 {
      color: rgb(255 255 255 / 1);
      text-align: center;
      font-weight: 100;
      font-size: 2.2rem;
      margin: 0;
      margin-bottom: 2rem;
      /* Text outline using text shadow vs. text-stroke */
      text-shadow: rgb(0 0 0 / 42%) -1px 1px 0px, rgb(0 0 0 / 42%) 1px 1px 0px,
        rgb(0 0 0 / 42%) 1px -1px 0px, rgb(0 0 0 / 42%) -1px -1px 0px,
        rgb(0 0 0 / 1) 0px 0px 3px;
      opacity: 1;
      cursor: default;
      transition: all 300ms ease-in-out;
      transition-delay: calc(6 * 60ms);
    }
    h2.hidden {
      opacity: 0;
    }
    .weekly-forecast {
      display: inline-flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      max-width: 100%;
    }
    .mw-toggle-btn {
      border: 0.1rem solid #3b1eff;
      background-color: transparent;
      color: #3b1eff;
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
      font-weight: 100;
      border-radius: 3px;
    }
    mw-bg-picture {
      margin-bottom: 0.8rem;
    }
    mw-sol-card {
      cursor: pointer;
      opacity: 1;
      transition: all 300ms ease-in-out;
    }
    mw-sol-card:not(*:first-of-type) {
      margin-left: 1.6rem;
    }
  `;

  @property({ type: Array })
  soles = [];

  @property()
  searchParams: any;

  @property({ type: Boolean })
  solDetailShown: Boolean = false;

  render() {
    return html`
      <div class="mw-app">
        <mw-bg-picture .params=${this.searchParams}>
          <div class="bg-picture__inner">
            <h2 class=${this.solDetailShown ? 'hidden' : 'shown'}>
              Mars Weather
            </h2>
            <ul class="weekly-forecast">
              ${this.soles.map(
                (s, i) =>
                  html`<mw-sol-card
                    .sol=${s}
                    style=${`${
                      this.solDetailShown
                        ? `opacity: 0; pointer-events: none; cursor: default;`
                        : ``
                    }; transition-delay: ${i * 60}ms`}
                    @click=${this._onSolClick}
                  ></mw-sol-card>`
              )}
            </ul>
          </div>
        </mw-bg-picture>
        <button class="mw-toggle-btn" @click=${this._onToggleClicked}>
          Toggle
        </button>
      </div>
    `;
  }
  stateChanged(state) {
    this.soles = state.soles;
    this.searchParams = state.searchParams;
  }
  async firstUpdated(changed: Map<string | number | symbol, unknown>) {
    // @TODO - use descriptions data to populate tooltip when hovering respective props of a sol.
    store.dispatch(fetchSoles())
    super.firstUpdated(changed);
  }
  _onToggleClicked(evt: Event) {
    evt.preventDefault();
    this.solDetailShown = !this.solDetailShown;
  }
  _onSolClick(evt: Event) {
    evt.preventDefault();
    // @TODO - 1. implement animated detail overlay cmpt, use property this.solDetailShow to toggle visibility.
    // @TODO - 2. animate detail cmpt in with expanding collapsing mw-sol-card transitions
    console.log(evt.target.sol);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mw-app': App;
  }
}
