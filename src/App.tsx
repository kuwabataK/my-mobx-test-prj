import React from "react";
import "./App.css";
import { Counter } from "./components/Counter";
import { storeContext, store } from "./store/store";

const App: React.FC = () => {
  return (
    <storeContext.Provider value={store}>
      <div className="App">
        <Counter></Counter>
        <Counter></Counter>
        <Counter></Counter>
      </div>
    </storeContext.Provider>
  );
};

export default App;
