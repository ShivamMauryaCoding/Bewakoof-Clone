import { useState } from "react";
import AllRoutes from "./AllRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 1000);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[90vh]  ">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            alt=""
            width="10%"
          />
        </div>
      ) : (
        <div>
          <Navbar />
          <AllRoutes />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
