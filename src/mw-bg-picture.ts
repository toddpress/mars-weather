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

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-bg-picture')
export class BgPicture extends LitElement {
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

  render() {
    return html`
      <div class="mw-bg-picture">
        <slot></slot>
      </div>
    `;
  }
  async fetchPic(params: any) {
    const search_params = new URLSearchParams(params).toString();
    const url = this.apod
      ? `${NASA_APOD_URL}`
      : `${NASA_PIC_URL}?${search_params}&api_key=${NASA_API_KEY}`;
    const data = await fetch(url)
      .then((data) => data.json())
      .catch((err) => console.error(err));
    const src = this.apod
      ? data.url
      : data.photos[0]
      ? data.photos[0].img_src
      : DEFAULT_BG_PIC;
    return src;
  }
  async updated(changed: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changed);
    const background = await this.fetchPic(this.params);
    this.bgEl.style = `background: url(${background}) no-repeat center center; `;
    this.bgEl.style.backgroundSize = 'cover';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mw-bg-picture': BgPicture;
  }
}
