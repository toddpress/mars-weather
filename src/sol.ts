import { LitElement, css, customElement, html, property } from 'lit-element';
import { celsiusToFahrenheit, dateFormat } from './../util.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('sol-card')
export class SolCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.8rem 1.6rem;
      background-color: rgba(0, 0, 0, 0.25);
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
  //   abs_humidity: '--';
  //   atmo_opacity: 'Sunny';
  //   id: '2918';
  //   local_uv_irradiance_index: 'Moderate';
  //   ls: '20';
  //   max_gts_temp: '6';
  //   max_temp: '-13';
  //   min_gts_temp: '-90';
  //   min_temp: '-74';
  //   pressure: '839';
  //   pressure_string: 'Higher';
  //   season: 'Month 1';
  //   sol: '3066';
  //   sunrise: '06:29';
  //   sunset: '18:24';
  //   terrestrial_date: '2021-03-22';
  //   wind_direction: '--';
  //   wind_speed: '--';

  //   @property({ type: String, converter: {
  //       fromAttribute(dateStr: string) {
  //         let date = new Date(dateStr);
  //         return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
  //       },
  //       toAttribute(propStr: string) {
  //         return new Intl.DateTimeFormat("en" , {
  //             dateStyle: 'short'
  //         }).format(new Date(propStr));
  //       }
  //   } })
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

  @property({ type: String })
  summary = '--';
  /**
   * High - Number - a temperature high for sol, in celsius.
   */
  @property({ type: Number })
  high = '--';

  /**
   * Low - Number - a temperature low for sol, in celsius.
   */
  @property({ type: Number })
  low = '--';

  render() {
    let { atmo_opacity, terrestrial_date, min_temp, max_temp, sol } = this.sol;
    return html`
      <div class="sol">Sol ${sol}</div>
      <div class="date">${dateFormat(terrestrial_date)}</div>
      <div class="forecast">${atmo_opacity}</div>
      <div class="divider"></div>
      <div class="high">High: ${~~celsiusToFahrenheit(max_temp)}&deg;F</div>
      <div class="low">
        Low: ${~~celsiusToFahrenheit(min_temp)}&deg;F
      </div>
    `;
  }

  async firstUpdated(changed: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changed);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sol-card': SolCard;
  }
}
