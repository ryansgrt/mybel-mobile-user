import { SET_LOADING, FETCH_COMPLETE } from './TransactionAction';

const defaultFormUnit = {
    id: undefined,
    date: new Date(),
    quantity: 1,
    selectUser: '',
    sendLocation: '',
    totalPrice: '',
    unit: '',
}

const defaultFormDesign = {
    id: undefined,
    date: new Date(),
    quantity: 1,
    selectUser: '',
    sendLocation: '',
    totalPrice: '',
    design: '',
}

const initialState = {
    formUnits: [],
    formDesign: [],
    formUnit: { ...defaultFormUnit },
    formDesign: { ...defaultFormDesign }
}

function transactionReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            console.log("masuk reducer")
            return { ...state, isLoading: true }
        case FETCH_COMPLETE:
            return { ...state, isLoading: false, units: { ...payload } }
        case INCREMENT:
            return { ...state, formUnits: state.formUnits.map((counter, index) => (index === payload ? { ...counter, value: counter.value + 1 } : counter)) };
        case DECREMENT:
            return { ...state, formUnits: state.formUnits.map((counter, index) => (index === payload ? { ...counter, value: counter.value - 1 } : counter)) };
        default:
            break;
    }
}

export { initialState, transactionReducer }