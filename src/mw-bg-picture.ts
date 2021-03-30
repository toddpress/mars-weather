import {
  DEFAULT_BG_PIC,
  NASA_API_KEY,
  NASA_APOD_URL,
  NASA_PIC_URL,
} from '../consts';
import {
  LitElement,
  css,
  customElement,
  html,
  property,
  query,
} from 'lit-element';

import { connect } from 'pwa-helpers';
import { fetchNasaPic } from './store/actions';
import { store } from './store';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-bg-picture')
export class BgPicture extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .forecast {
      margin-top: 0.2rem;
      font-style: italic;
    }
    .divider {
      width: 100%;
      display: block;
      margin: 0.8rem 0;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .sol {
      font-weight: bold;
    }
  `;

  @query('.mw-bg-picture')
  bgEl: any;

  @property({ type: Boolean })
  apod = false;

  @property({ type: Object })
  params: any;

  @property({ type: String })
  backgroundImageSrc: any;

  render() {
    return html`
      <div class="mw-bg-picture">
        <slot></slot>
      </div>
    `;
  }
  stateChanged(state) {
    this.params = state.searchParams;
    this.backgroundImageSrc = state.backgroundImageSrc;
  }
  async updated(changed: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changed);
    await store.dispatch(fetchNasaPic());
    this.bgEl.style = `background: url(${this.backgroundImageSrc}) no-repeat center center; `;
    this.bgEl.style.backgroundSize = 'cover';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mw-bg-picture': BgPicture;
  }
}
