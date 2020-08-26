import { SET_LOADING, FETCH_COMPLETE, EDIT_USER } from './UserAction'

const defaultFormValues = {
    id: undefined,
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    photo: undefined,
}

const initialState = {
    isLoading: true,
    form: { ...defaultFormValues }
}

function userReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            console.log("masuk reducer")
            return { ...state, isLoading: true }
        case FETCH_COMPLETE:
            console.log('masuk fetch');
            return { ...state, isLoading: false, form: { ...payload } }
        case EDIT_USER:
            return { ...state, form: { ...payload } };
    }
}

export { initialState, userReducer };