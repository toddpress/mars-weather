import { NASA } from './../services'

export const GET_SOLES_STARTED = 'GET_SOLES_STARTED';
export const GET_SOLES_SUCCESS = 'GET_SOLES_SUCCESS';
export const GET_SOLES_FAILURE = 'GET_SOLES_FAILURE';

export const GET_NASA_PIC_STARTED = 'GET_NASA_PIC_STARTED';
export const GET_NASA_PIC_SUCCESS = 'GET_NASA_PIC_SUCCESS';
export const GET_NASA_PIC_FAILURE = 'GET_NASA_PIC_FAILURE';


export const fetchNasaPicStarted = () => ({
    type: GET_NASA_PIC_STARTED
})
export const fetchNasaPicSuccess = (src: string) => ({
    type: GET_NASA_PIC_SUCCESS,
    payload: { src }
})
export const fetchNasaPicFailure = (error: string) => ({
  type: GET_NASA_PIC_FAILURE,
  payload: { error },
});

export const fetchSolsStarted = () => ({
    type: GET_SOLES_STARTED
})
export const fetchSolsSuccess = (soles: Array<any>) => ({
    type: GET_SOLES_SUCCESS,
    payload: { soles }
})
export const fetchSolsFailure = (error: string) => ({
  type: GET_SOLES_FAILURE,
  payload: { error },
});

export const fetchNasaPic = (isAPOD: boolean = false) => async (dispatch, getState) => {
    dispatch(fetchNasaPicStarted());
    try {
        const searchParams = { ...getState().searchParams, ...(getState().soles.length && { sol: getState().soles[0].sol })  };
        const src = isAPOD ? await NASA.fetchAPOD() : await NASA.fetchRoverPic(searchParams);
        dispatch(fetchNasaPicSuccess(src))
    } catch(e) {
        dispatch(fetchNasaPicFailure(e.message))
    }
}

export const fetchSoles = () => async (dispatch) => {
  dispatch(fetchSolsStarted());
  try {
    const soles= await NASA.fetchRoverData();
    dispatch(fetchSolsSuccess(soles));
  } catch (e) {
    dispatch(fetchSolsFailure(e.message));
  }
};