import { SET_LOADING, FETCH_COMPLETE } from './UnitAction'

const defaultFormUnit = {
    id: undefined,
    name: "",
    price: 0,
    description: "",
    picture: undefined,
    idType: "",
    idVendor: ""
}

const defaultFormDesign = {
    id: undefined,
    theme: "",
    price: 0,
    picture: undefined,
    description: "",
    duration: 0,
    roomName: "",
    idVendor: ""
}

const initialState = {
    isLoading: true,
    units: [],
    designs: [],
    rooms: [],
    form: { ...defaultFormUnit },
    formDesign: { ...defaultFormDesign }
}

function productReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            console.log("masuk reducer")
            return { ...state, isLoading: true }
        case FETCH_COMPLETE:
            return { ...state, isLoading: false, units: [...payload] }
    }
}

export { initialState, productReducer }
