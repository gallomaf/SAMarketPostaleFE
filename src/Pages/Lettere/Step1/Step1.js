import React from "react";
import "./Step1.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
//import { toast, ToastContainer } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";

export default function Step1() {
  const now = 15;

  const stepClick = localStorage.getItem("step1Click");

  const navigate = useNavigate();

  const [step1Click, setStep1Click] = useState(stepClick);

  const LetterActive      = "/Images/Step1/letter-active.svg";
  const LetterInactive    = "/Images/Step1/Letter.svg";
  const CartolineActive   = "/Images/Step1/Caroline-active.svg";
  const CartolineInactive = "/Images/Step1/Cartolina.svg";
  const CataloghiActive   = "/Images/Cataloghi-active.svg";
  const CataloghiInactive = "/Images/Step1/Catalog.svg";
  const GadgetActive      = "/Images/Gadget-active.svg";
  const GadgetInactive    = "/Images/Step1/Gadget.svg";


  const handleClick = (cardnum) => {
    // setStep1Click((prevState) => !prevState);
    setStep1Click((prevState) => (prevState === cardnum ? null : cardnum));
  };

  const handleRoutes = () => {
    localStorage.setItem("step1Click", step1Click);
    if (step1Click === 1) {
      localStorage.setItem("sendoption", "Lettere");
    } else if (step1Click === 2) {
      localStorage.setItem("sendoption", "Cartoline");
    } else if (step1Click === 3) {
      localStorage.setItem("sendoption", "Cataloghi");
    } else if (step1Click === 4) {
      localStorage.setItem("sendoption", "Gadget");
    }
  };

  async function nextstep() {
    try {
      //handleRoutes();

      const sendoption        = localStorage.getItem("sendoption");
      /*
      const res   = await axios.post(`${API_URL}/auth/addQA_lettere_step1`, {
        categorytag: sendoption,
      });
      */
      let resstatus = 200;
      //const res = await axios.post(`${API_URL}/auth/addQA_lettere_step1/${sendoption}`);
      if (resstatus === 200) {
        //console.log("Status 200 & Sending Option",res.data?.data?.id);
        //localStorage.setItem("_id",res?.data?.data?.id)
        handleRoutes();
        // SuccessToast("updated");
        //navigate(`/Step-2?sendoption=${sendoption}`);
        console.log("step1Click is", step1Click);
        navigate('/Step-2');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="over-flow-setting">
        <Navbar />
        <div>
          <Row className="step1-row">
            <ColonnaSx />
            <Col md={8} className="col-rhs">
              <div className="top-rhs">
                <ProgressBar now={15} />
              </div>

              <div className="col-rhs-inner">
                <div>
                  <p className="step1-txt">
                    <span> Cosa devi spedire?</span>
                  </p>
                  <p className="rhs-des">
                    Specifica il tipo di oggetto o merce che intendi spedire.
                    Questo ci aiuterà a offrirti il servizio più<br></br>{" "}
                    adeguato alle tue esigenze.
                  </p>
                </div>
                <div className="rhs-card-btn-body ">
                  <div className="cards-rhs-row pb-4">

                    <Col onClick={() => handleClick(1)} className="cards-col">
                      <div className={step1Click === 1 || step1Click === "1"  ? "card1-active" : "card1"} >
                        <img src={step1Click === 1  || step1Click === "1"  ? LetterActive : LetterInactive} alt="Lettere" className="card1-img"/>
                      </div>
                      <p className="option-txt">Lettere</p>
                    </Col>

                    <Col onClick={() => handleClick(2)} className="cards-col">
                      <div className={step1Click === 2  || step1Click === "2" ? "card1-active" : "card1"}>
                        <img src={ step1Click === 2  || step1Click === "2" ? CartolineActive : CartolineInactive } alt="Cartoline" className="card2-img"  />
                      </div>
                      <p className="option-txt">Cartoline</p>
                    </Col>

                    <Col onClick={() => handleClick(3)} className="cards-col ">
                      <div className={step1Click === 3  || step1Click === "3" ? "card1-active" : "card1"}>
                        <img src={  step1Click === 3   || step1Click === "3" ? CataloghiActive  : CataloghiInactive} alt="Cataloghi" className="card3-img"/>
                      </div>
                      <p className="option-txt">Cataloghi</p>
                    </Col>

                    <Col onClick={() => handleClick(4)} className="cards-col"  >
                      <div className={step1Click === 4  || step1Click === "4"  ? "card1-active" : "card1"}>
                        <img src={step1Click === 4  || step1Click === "4"  ? GadgetActive : GadgetInactive} alt="Gadget"  className="card4-img"/>
                      </div>
                      <p className="option-txt">Gadget</p>
                    </Col>

                  </div>
                </div>
              </div>

              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" >
                    {"    INIZIA    "}
                  </button>
                </div>
                <div className="btn2-div">
                  <button
                      className={step1Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={ !step1Click }
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1">
                    {"    INIZIA    "}
                  </button>
                </div>
                <div className="btn2-div w-100">
                  <button
                      className={step1Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={ !step1Click }
                  >
                    Avanti
                  </button>
                </div>
              </div>

              <div className="btm-rhs">
                <div>
                  <p className="quotation-req">
                    Richiesta Preventivo &gt;{" "}
                    <span className="selected-span">Cosa devi spedire?</span>
                  </p>
                </div>
                <div className="step1-progress">
                  <ProgressBar now={15} />
                  <p className="percentage-txt">{now}%</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}