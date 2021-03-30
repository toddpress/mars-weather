import {
  DEFAULT_BG_PIC,
  NASA_API_KEY,
  NASA_APOD_URL,
  NASA_PIC_URL,
  NASA_ROVER_DATA_URL,
} from '../../consts';

export const NASAService = {
  async fetchAPOD(): Promise<string> {
    const { url = DEFAULT_BG_PIC } = await fetch(NASA_APOD_URL)
      .then((data) => data.json())
      .catch((err) => {
        throw new Error(err.message);
      });
    return url;
  },
  async fetchRoverPic(params: any): Promise<string> {
    const search_params = new URLSearchParams(params).toString();
    const url = `${NASA_PIC_URL}?${search_params}&api_key=${NASA_API_KEY}`;

    const { photos } = await fetch(url)
      .then((data) => data.json())
      .catch((err) => {
        throw new Error(err.message);
      });
    return photos[0].img_src || '';
  },
  async fetchRoverData(): Promise<any> {
    const { descriptions, soles } = await fetch(NASA_ROVER_DATA_URL)
      .then((res) => res.json())
      .catch((err) => new Error(err.message));
    const recentSoles = soles.slice(0, 7).reverse();
    return recentSoles;
  },
};
