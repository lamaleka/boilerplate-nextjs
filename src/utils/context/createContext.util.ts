import React from "react";
import { __DEV__ } from "../env/index.util";

export function createContext<ContextType>(displayName: string) {
  const Context = React.createContext<ContextType>(null!);

  if (__DEV__) Context.displayName = displayName;

  function useContext() {
    const context = React.useContext(Context);

    if (!context) throw new Error("You can not use context outside its Provider component");

    return context;
  }

  return [Context.Provider, useContext, Context.Consumer, Context.displayName] as const;
}
