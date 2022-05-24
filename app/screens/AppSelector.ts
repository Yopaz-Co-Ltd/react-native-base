import {RootState} from '@base/redux/RootReducer'
import {createSelector} from 'reselect'
import {AppState} from '@screens/AppReducer'

const getState = (state: RootState): AppState => state.app

const getIsLoading = createSelector(getState, (state: AppState) => state.isLoading)

const selectors = {
    getIsLoading,
}

export default selectors
