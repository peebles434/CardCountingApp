import { useContext } from "react";
import { RootStoreContext } from "./rootStore";
import { useObserver } from "mobx-react";

export const useStoreFromContextHelper = (
  context,
  storeSelector,
  dataSelector
) => {
  const value = useContext(context);
  if (!value) {
    throw new Error(
      `Context: ${context.displayName || ""} is null or undefined`
    );
  }
  const mobxStore = storeSelector(value);
  return useObserver(() => {
    return dataSelector(mobxStore);
  });
};
