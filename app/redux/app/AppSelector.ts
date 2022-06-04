import {RootState} from '../RootReducer'
import {createSelector} from 'reselect'
import {AppState} from '@app/redux/app/AppReducer'

const getState = (state: RootState): AppState => state.app

const getIsLoading = createSelector(getState, (state: AppState) => state.isLoading)

const selectors = {
    getIsLoading,
}

export default selectors
