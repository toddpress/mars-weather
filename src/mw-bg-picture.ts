import { DEFAULT_BG_PIC, NASA_API_KEY, NASA_PIC_URL } from '../consts';
import { LitElement, css, customElement, html, property, query } from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-bg-picture')
export class BgPicture extends LitElement {
  constructor() {
    super();
  }
  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: -1;
      padding: 0.8rem 1.6rem;
    }
    .mw-bg-picture {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
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
    console.log({ params });
    const search_params = new URLSearchParams(params).toString();
    console.log('params: ', search_params);

    const { photos } = await fetch(
      `${NASA_PIC_URL}?${search_params}&api_key=${NASA_API_KEY}`
    )
      .then((data) => data.json())
      .catch((err) => console.error(err));

    const { img_src } = photos[0];
    const bgPic = img_src || DEFAULT_BG_PIC;

    console.log(photos);

    return bgPic;
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
