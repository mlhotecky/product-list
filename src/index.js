import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import ReduxToastr from "react-redux-toastr/lib/ReduxToastr";
import {makeServer} from "./server";
import store from "./redux";
import App from './App';
import './index.css';
import '@fontsource/roboto';

makeServer();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <div>
              <App />
              <ReduxToastr
                  timeOut={3000}
                  // newestOnTop={false}
                  preventDuplicates
                  position="top-right"
                  getState={(state) => state.toastr}
                  transitionIn="fadeIn"
                  transitionOut="fadeOut"
                  progressBar
                  closeOnToastrClick
              />
          </div>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
