import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import { FirebaseService } from "./firebase/FirebaseService";
const RoutesComponent = lazy(() => import("./routes/RoutesComponent"));

function App() {
  return (
    <>
      <FirebaseService>
        <Router>
          <Suspense
            fallback={
              <div className="App-header">
                <Oval
                  height={50}
                  width={50}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            }
          >
            <RoutesComponent />
          </Suspense>
        </Router>
      </FirebaseService>
      <ToastContainer />
    </>
  );
}

export default App;
