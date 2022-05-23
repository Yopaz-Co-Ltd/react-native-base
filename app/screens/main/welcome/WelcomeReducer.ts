export type WelcomeState = {
    someState?: string
}

const initialState: WelcomeState = {}

const WelcomeReducer = (state: WelcomeState = initialState): WelcomeState => {
    return state
}

export default WelcomeReducer
