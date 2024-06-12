import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

const authSelector = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  authSelector,
  (authState) => !!authState.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggin) => !loggin);
