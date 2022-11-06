import {Loadable, onDefault, onLoadableError, onLoadableLoad, onLoadableSuccess} from './loadable';

export interface Action{
    type: string;
}

export interface ReducerFunction<T, U extends Action>{
    (state: T, action: U): T;
}

export interface ActionTypes {
    initLoadActionType: string | string[];
    loadingActionType: string | string[];
    successActionType: string | string[];
    errorActionType: string | string[];
    successInitActionType: string | string[];
    removeActionType: string | string[];
    successUpdateActionType: string | string[];
}

export function withLoadable<T extends Loadable, U extends Action = Action>
(reducer: ReducerFunction<T, U>, {initLoadActionType, loadingActionType, successActionType,
    errorActionType, successInitActionType, removeActionType, successUpdateActionType}: ActionTypes) {
    return (state: T, action: U): T => {
        if (matchType(removeActionType, action.type)) {
            state = onDefault(state);
        }
        if (matchType(initLoadActionType, action.type)) {
            state = onDefault(state);
        }
        if (matchType(loadingActionType, action.type)) {
            state = onLoadableLoad(state);
        }
        if (matchType(successActionType, action.type)) {
            state = onLoadableSuccess(state);
        }
        if (matchType(errorActionType, action.type)) {
            state = onLoadableError(state, (action as any).error);
        }
        if(matchType(successInitActionType, action.type)){
            state = onDefault(state);
        }
        if(matchType(successUpdateActionType, action.type)){
            state = onDefault(state);
        }
        return reducer(state, action);
    };
}


function matchType(actionType: string | string[], type: string): boolean {
    return typeof actionType === 'string' ? actionType === type : actionType.indexOf(type) !== -1;
}
