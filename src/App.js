import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Step1 from "./Pages/Lettere/Step1/Step1";
import Step2 from "./Pages/Lettere/Step2/Step2";
import Step3 from "./Pages/Lettere/Step3/Step3";
import Step4 from "./Pages/Lettere/Step4/Step4";
import Step4Continue from "./Pages/Lettere/Step4/Step4Continue/Step4Continue";
import Step5 from "./Pages/Lettere/Step5/Step5";
import Step2of5 from "./Pages/Lettere/Step5/Step2Of5/Step2of5";
import Step3of5 from "./Pages/Lettere/Step5/Step3of5/Step3of5";
import Step6 from "./Pages/Lettere/Step6/Step6";
import Step7 from "./Pages/Lettere/Step7/Step7";

import Step4Cartoline from "./Pages/Cartoline/Step4/Step4Cartoline";
import Step2of4Cartoline from "./Pages/Cartoline/Step4/Step2of4/Step2of4Cartoline";
import Step5Cartoline from "./Pages/Cartoline/Step5/Step5Cartoline";
import Step6Cartoline from "./Pages/Cartoline/Step6/Step6Cartoline";

import Step4Cataloghi from "./Pages/Cataloghi/Step4/Step4Cataloghi";
import Step2of4Cataloghi from "./Pages/Cataloghi/Step4/Step2of4/Step2of4Cataloghi";
import Step3of4Cataloghi from "./Pages/Cataloghi/Step4/Step3of4/Step3of4Cataloghi";

import Step4Gadget from "./Pages/Gadget/Step4/Step4Gadget";
import Step2of4Gadget from "./Pages/Gadget/Step4/Step2of4Gadget/Step2of4Gadget";

import Thankyou from "./Pages/ThankYouPg/Thankyou";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/Step-1" element={<Step1 />} />
          <Route path="/Step-2" element={<Step2 />} />
          <Route path="/Step-3" element={<Step3 />} />

          <Route path="/Lettere/Step-4" element={<Step4 />} />
          <Route path="/Lettere/Step-4-2" element={<Step4Continue />} />
          <Route path="/Lettere/Step-5" element={<Step5 />} />
          <Route path="/Lettere/Step-5-2" element={<Step2of5 />} />
          <Route path="/Lettere/Step-5-3" element={<Step3of5 />} />
          <Route path="/Lettere/Step-6" element={<Step6 />} />
          <Route path="/Lettere/Step-7" element={<Step7 />} />

          <Route path="/Cartoline/Step-4" element={<Step4Cartoline />} />
          <Route path="/Cartoline/Step-4-2" element={<Step2of4Cartoline />} />
          <Route path="/Cartoline/Step-5" element={<Step5Cartoline />} />
          <Route path="/Cartoline/Step-6" element={<Step6Cartoline />} />

          <Route path="/Cataloghi/Step-4" element={<Step4Cataloghi />} />
          <Route path="/Cataloghi/Step-4-2" element={<Step2of4Cataloghi />} />
          <Route path="/Cataloghi/Step-4-3" element={<Step3of4Cataloghi />} />

          <Route path="/Gadget/Step-4" element={<Step4Gadget />} />
          <Route path="/Gadget/Step-4-2" element={<Step2of4Gadget />} />

          <Route path="/Thankyou" element={<Thankyou />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
