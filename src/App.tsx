import React from "react";
import "./App.css";
import { Counter } from "./components/Counter";
import {Counter2} from './components/Counter2'
import { storeContext, store } from "./store/store";

const App: React.FC = () => {
  return (
    <storeContext.Provider value={store}>
      <div className="App">
        <Counter></Counter>
        <Counter2></Counter2>
      </div>
    </storeContext.Provider>
  );
};

export default App;
