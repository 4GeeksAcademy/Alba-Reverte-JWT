import { createContext, useState, useEffect } from "react";
import getState from "./Flux.jsx";
export const Context = createContext(null);
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(getState({
			getStore: () => state.store,
			getActions: () => state.actions,
			setStore: updatedStore => setState({
				store: Object.assign(state.store, updatedStore),
				actions: { ...state.actions }
			})
		}));
		useEffect(() => {

		}, []);
		return (<Context.Provider value={state}>
			<PassedComponent {...props} />
		</Context.Provider>);
	};
	return StoreWrapper;
};

export default injectContext;