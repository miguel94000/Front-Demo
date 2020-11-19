import { NavigationActions } from "react-navigation";

let navigator;

// Permet la navigation à partir du context
export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};