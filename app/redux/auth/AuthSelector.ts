import {RootState} from '@app/redux/RootReducer'
import {AuthState} from '@app/redux/auth/AuthReducer'
import {createSelector} from 'reselect'

const getAuthState = (rootState: RootState): AuthState => rootState.auth

const getLocalAccessToken = createSelector(getAuthState, (state: AuthState): string | undefined => state.accessToken)

const selectors = {
    getLocalAccessToken,
}

export default selectors
