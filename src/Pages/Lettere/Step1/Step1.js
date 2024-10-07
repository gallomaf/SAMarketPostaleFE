import React, {useEffect, useRef} from "react";
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
import {ErrorToast} from "../../../Components/Navbar/Toast/Toast";

export default function Step1() {


  const now = 15;

  const stepClick   = localStorage.getItem("step1Click");
  const quantity    = localStorage.getItem("step2Quantity");

  //voglio fare il localStorage.clear tranne di stepClick e quantity
  localStorage.clear();


  const navigate = useNavigate();

  const [step1Click, setStep1Click] = useState(stepClick);

  //const LetterActive      = "/Images/Step1/letter-active.svg";
  const LetterActive      = `${process.env.PUBLIC_URL}/Images/Step1/letter-active.svg`;
  const LetterInactive    = `${process.env.PUBLIC_URL}/Images/Step1/Letter.svg`;
  const CartolineActive   = `${process.env.PUBLIC_URL}/Images/Step1/Caroline-active.svg`;
  const CartolineInactive = `${process.env.PUBLIC_URL}/Images/Step1/Cartolina.svg`;
  const CataloghiActive   = `${process.env.PUBLIC_URL}/Images/Cataloghi-active.svg`;
  const CataloghiInactive = `${process.env.PUBLIC_URL}/Images/Step1/Catalog.svg`;
  const GadgetActive      = `${process.env.PUBLIC_URL}/Images/Gadget-active.svg`;
  const GadgetInactive    = `${process.env.PUBLIC_URL}/Images/Step1/Gadget.svg`;

  const [inputValue, setInputValue] = useState(quantity === null ? "": quantity);

  const targetRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del submit del form
  };

  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (cardnum) => {
    // setStep1Click((prevState) => !prevState);
    setStep1Click((prevState) => (prevState === cardnum ? null : cardnum));
  };

  const handleRoutes = () => {
    localStorage.setItem("step1Click", step1Click);
    localStorage.setItem("step2Quantity", inputValue);

    if (step1Click == 1) {
      localStorage.setItem("sendoption", "Lettere");
    } else if (step1Click == 2) {
      localStorage.setItem("sendoption", "Cartoline");
    } else if (step1Click == 3) {
      localStorage.setItem("sendoption", "Cataloghi");
    } else if (step1Click == 4) {
      localStorage.setItem("sendoption", "Gadget");
    }
  };

  useEffect(() => {
    if (step1Click) {
      scrollToSection();
    }
  }, [step1Click]);

  const formValidation = () => {

    //console.log("step1Click is", step1Click);
    //console.log("inputValue is", inputValue);
    if (!step1Click || step1Click == null) {
      console.log("step1Click");
      ErrorToast("Seleziona il tipo di oggetto che vuoi spedire");
      return false;
    }
    if (!inputValue || inputValue < 100) {
      console.log("inputValue");
      ErrorToast("La quantità minima è 100 pezzi");
      return false;
    }
    //controllare step1Click

    return true;
  }

  async function nextstep() {
    try {

      if (!formValidation()) {
        return;
      }

      //handleRoutes();

      //const sendoption        = localStorage.getItem("sendoption");
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
        //console.log("step1Click is", step1Click);

        //console.log("step1Click is " + step1Click);
        //console.log("quantity is " + inputValue);
        //console.log(step1Click  && inputValue >= 100);
        if(step1Click  && inputValue >= 100) {
          navigate('/Step-3');
        }
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

              <div className=" col-rhs-inner-custom">
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
                      <div className={step1Click === 1 || step1Click === "1" ? "card2-active" : "card1"}>
                        <img src={step1Click === 1 || step1Click === "1" ? LetterActive : LetterInactive} alt="Lettere"
                             className="card1-img"/>
                      </div>
                      <p className="option-txt">Lettere</p>
                    </Col>

                    <Col onClick={() => handleClick(2)} className="cards-col">
                      <div className={step1Click === 2 || step1Click === "2" ? "card2-active" : "card1"}>
                        <img src={step1Click === 2 || step1Click === "2" ? CartolineActive : CartolineInactive}
                             alt="Cartoline" className="card2-img"/>
                      </div>
                      <p className="option-txt">Cartoline</p>
                    </Col>

                    <Col onClick={() => handleClick(3)} className="cards-col ">
                      <div className={step1Click === 3 || step1Click === "3" ? "card2-active" : "card1"}>
                        <img src={step1Click === 3 || step1Click === "3" ? CataloghiActive : CataloghiInactive}
                             alt="Cataloghi" className="card3-img"/>
                      </div>
                      <p className="option-txt">Cataloghi</p>
                    </Col>

                    <Col onClick={() => handleClick(4)} className="cards-col">
                      <div className={step1Click === 4 || step1Click === "4" ? "card2-active" : "card1"}>
                        <img src={step1Click === 4 || step1Click === "4" ? GadgetActive : GadgetInactive} alt="Gadget"
                             className="card4-img"/>
                      </div>
                      <p className="option-txt">Gadget</p>
                    </Col>

                  </div>
                </div>

                {/* inizio step2 */}
                <div>
                  <p className="step2-txt">
                    <span className="step2-txt-sp1"> Q.tà da spedire </span>
                    <span className="step2-txt-sp2"> (min 100 pezzi) </span>
                  </p>
                  <p className="rhs-st2-des">
                    Inserisci il numero totale di unità che desideri spedire. È
                    richiesto un minimo di 100 pezzi per procedere con
                    la richiesta.
                  </p>
                </div>
                <div  ref={targetRef}  className="rhs-input-btn-body">
                  <div>
                    <form className="form-ship" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                            type="number"
                            className="form-control ship-quantity-form ship-width"
                            id="exampleInputQuantity"
                            onChange={handleChange}
                            placeholder="es. 100 pezzi"
                            value={inputValue}
                        />
                      </div>
                    </form>
                    {inputValue < 100 && (
                        <p className="alert-input">
                          La quantità minima è 100 pezzi
                        </p>
                    )}
                  </div>
                </div>
                {/* fine step2 */}

              </div>


              <div className="btn-rhs-row-mb">
                {/*
                <div>
                  <button className="btn-r1"></button>
                </div>
                */
                }
                <div className="btn2-div">
                  <button
                      className={step1Click  && inputValue &&  inputValue >= 100  ? "btn-r2-active" : "btn-r2"}
                      onClick={nextstep}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                {/*
                <div>
                  <button className="btn-r1">
                    {"    INIZIA    "}
                  </button>
                </div>
                */
                }
                <div className="btn2-div w-100">
                  <button
                      className={step1Click && inputValue >= 100  ? "btn-r2-active" : "btn-r2"}
                      onClick={nextstep}
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