import logo from './logo.svg';
import './App.css';
import IncreOrDecre from './IncreOrDecre';
import { Provider } from 'react-redux';
import store from './redux/store';
import SignUp from './componet/signUp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Listing from './componet/listing';
import ViewDetails from './componet/ViewDetails';


function App() {
  return (
    <>
      <Provider store={store}>
        {/* <IncreOrDecre /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/create" element={<SignUp />} />
            <Route path="Update/:id" element={<SignUp />} />
            <Route path="/view/:id" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
