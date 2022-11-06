import {createDefaultLoadable, Loadable} from './loadable';
import {NewWeatherActionUnion, WeatherActionTypes} from './weather.actions';
import {withLoadable} from './with-loadable';
import {CurrentForecast} from '../types/current-forecast.type';

export interface Weather extends Loadable {
    currentForecasts: CurrentForecast[];
}

export function createDefaultWeather(): Weather {
    return {
        ...createDefaultLoadable(),
        currentForecasts: []
    };
}

function baseWeatherReducer(state: Weather = createDefaultWeather(),
                            action: NewWeatherActionUnion): Weather {
    switch (action.type) {
        case WeatherActionTypes.LoadSuccess:
        case WeatherActionTypes.InitialLoadSuccess:
            return {
                ...state,
                currentForecasts: [...state.currentForecasts, {...action.payload.currentForecast, zipcode: action.payload.zipcode}],
            };
        case WeatherActionTypes.UpdateSuccess:
            let newState = JSON.parse(JSON.stringify(state));
            newState.currentForecasts[action.payload.index] = {...action.payload.currentForecast, zipcode: action.payload.zipcode};
            return {...newState}
        case WeatherActionTypes.RemoveForecast:
            const indexToRemove = action.payload.index;
            let oldState = JSON.parse(JSON.stringify(state));
            oldState.currentForecasts.splice(indexToRemove,1);
            return {...oldState}
        default:
            return state;
    }
}


export function weatherReducer(state: Weather, action: NewWeatherActionUnion): Weather {
    return withLoadable(baseWeatherReducer, {
        initLoadActionType: WeatherActionTypes.InitialLoad,
        loadingActionType: WeatherActionTypes.Load,
        successActionType: WeatherActionTypes.LoadSuccess,
        errorActionType: WeatherActionTypes.LoadError,
        successInitActionType: WeatherActionTypes.InitialLoadSuccess,
        removeActionType: WeatherActionTypes.RemoveForecast,
        successUpdateActionType: WeatherActionTypes.UpdateSuccess
    })(state,action)
}
