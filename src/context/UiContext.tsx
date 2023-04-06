import {createContext, FC, ReactNode, useContext, useReducer, useMemo} from "react";

interface Props {
    children: ReactNode
}

interface StateModifiers {
    closeSidebar: () => void,
    openSidebar: () => void,
}

interface InitialValues {
    isSidebarOpen: boolean
}

const stateModifiers = {
    openSidebar: () => {
    },
    closeSidebar: () => {
    },
}

const initialValues = {
    isSidebarOpen: false
}

interface Actions {
    type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR"
}

const uiReducer = (state: InitialValues, action: Actions) => {
    switch (action.type) {
        case "OPEN_SIDEBAR" : {
            return {
                ...state,
                isSidebarOpen: true
            }
        }
        case "CLOSE_SIDEBAR" : {
            return {
                ...state,
                isSidebarOpen: false
            }
        }
        default:
            return state
    }
}

type State = StateModifiers & InitialValues

export const UiContext = createContext<State>({
    ...stateModifiers,
    ...initialValues
})


export const UiContextProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, initialValues)

    const openSidebar = () => dispatch({type: "OPEN_SIDEBAR"})
    const closeSidebar = () => dispatch({type: "CLOSE_SIDEBAR"})


    const providerValues = useMemo(() => ({
        ...state,
        openSidebar,
        closeSidebar
    }), [state.isSidebarOpen]);

    return (
        <UiContext.Provider value={providerValues}>
            {children}
        </UiContext.Provider>
    )
}

export const useUiContext = () => {
    const context = useContext(UiContext);
    return context
}