import { LitElement, css, customElement, html, property } from 'lit-element';
import { celsiusToFahrenheit, dateFormat } from '../util.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mw-sol-card')
export class SolCard extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.6rem;
      background-color: rgb(0 0 0 / 0.64);
      color: rgba(255, 255, 255, 0.76);
      font-weight: 300;
    }
    .divider,
    .forecast,
    .high,
    .low {
      font-size: 0.88em;
    }
    .date {
      font-size: 0.8em;
    }
    .divider {
      width: calc(100% + 1rem);
      display: block;
      margin: 0.8rem 0;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.3);
    }
    .forecast {
      margin: 0 0 0.4rem 0;
      font-style: italic;
    }
    .sol {
      font-size: 1em;
      color: rgb(255 255 255 / 0.9);
      margin-bottom: 0.4rem;
    }
  `;

  @property({ type: Object })
  sol = {
    abs_humidity: '--',
    atmo_opacity: 'Sunny',
    id: '2918',
    local_uv_irradiance_index: 'Moderate',
    ls: '20',
    max_gts_temp: '6',
    max_temp: '-13',
    min_gts_temp: '-90',
    min_temp: '-74',
    pressure: '839',
    pressure_string: 'Higher',
    season: 'Month 1',
    sol: '3066',
    sunrise: '06:29',
    sunset: '18:24',
    terrestrial_date: '2021-03-22',
    wind_direction: '--',
    wind_speed: '--',
  };

  render() {
    let { atmo_opacity, terrestrial_date, min_temp, max_temp, sol } = this.sol;
    return html`
      <div class="sol">Sol ${sol}</div>
      <div class="date">${dateFormat(terrestrial_date)}</div>
      <div class="divider"></div>
      <div class="forecast">${atmo_opacity}</div>
      <div class="high">High: ${~~celsiusToFahrenheit(max_temp)}&deg;F</div>
      <div class="low">Low: ${~~celsiusToFahrenheit(min_temp)}&deg;F</div>
    `;
  }

  async firstUpdated(changed: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changed);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mw-sol-card': SolCard;
  }
}
