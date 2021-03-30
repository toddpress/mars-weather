import {
  GET_NASA_PIC_FAILURE,
  GET_NASA_PIC_STARTED,
  GET_NASA_PIC_SUCCESS,
  GET_SOLES_FAILURE,
  GET_SOLES_STARTED,
  GET_SOLES_SUCCESS,
} from './actions';

export const INITIAL_STATE = {
  loadingPicture: false,
  isNASAPicLoading: false,
  areSolesLoading: false,
  isDataLoading: false,
  backgroundImageSrc: '',
  soles: <any>[],
  selectedSol: '',
  errors: <any>[],
  searchParams: { camera: 'fhaz' }
};


export const reducer = (state = INITIAL_STATE, { type, payload = <any>{} }) => {
  switch (type) {
    case GET_NASA_PIC_STARTED:
      return {
        ...state,
        isNASAPicLoading: true,
      };
    case GET_NASA_PIC_FAILURE:
      return {
        ...state,
        errors: [...state.errors, payload.error],
        isNASAPicLoading: false,
      };
    case GET_NASA_PIC_SUCCESS:
      return {
        ...state,
        backgroundImageSrc: payload.src,
        isNASAPicLoading: false,
      };
    case GET_SOLES_STARTED:
        return {
            ...state,
            areSolesLoading: true,
        };
    case GET_SOLES_FAILURE:
        return {
            ...state,
            errors: [
                ...state.errors,
                payload.error
            ],
            areSolesLoading: false,
        };
    case GET_SOLES_SUCCESS:
        return {
            ...state,
            soles: [...state.soles, ...payload.soles],
            searchParams: { ...state.searchParams, sol: payload.soles[0].sol },
            areSolesLoading: false,
        };
    default:
      return state;
  }
};