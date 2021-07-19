/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
export const CHANGE_DURATION_FROM = createActionName('CHANGE_DURATION_FROM');
export const CHANGE_DURATION_TO = createActionName('CHANGE_DURATION_TO');
export const ADD_FILTER_TAG = createActionName('ADD_FILTER_TAG');
export const REMOVE_FILTER_TAG = createActionName('REMOVE_FILTER_TAG');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// TODO - add other action creators
export const changeDurationFrom = payload => ({ payload, type: CHANGE_DURATION_FROM });
export const changeDurationTo = payload => ({ payload, type: CHANGE_DURATION_TO });
export const changeAddFilterTag = payload => ({ payload, type: ADD_FILTER_TAG });
export const changeRemoveFilterTag = payload => ({ payload, type: REMOVE_FILTER_TAG });

// reducer
export default function reducer(statePart = [], action = {}) {
  const updatedTags = statePart.tags;
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    // TODO - handle other action types
    case CHANGE_DURATION_FROM:
      return {
        ...statePart,
        duration: {
          from: action.payload,
          to: statePart.duration.to,
        },
      };
    case CHANGE_DURATION_TO:
      return {
        ...statePart,
        duration: {
          from: statePart.duration.from,
          to: action.payload,
        },
      };
    case ADD_FILTER_TAG:
      if (updatedTags.indexOf(action.payload) == -1) {
        updatedTags.push(action.payload);
      }
      return {
        ...statePart,
        tags: updatedTags,
      };
    case REMOVE_FILTER_TAG:
      if (updatedTags.indexOf(action.payload) != -1){ 
        updatedTags.slipce(action.payload, 1);
      }
      return {
        ...statePart,
        tags: updatedTags,
      }; 

    default:
      return statePart;
  }
}
