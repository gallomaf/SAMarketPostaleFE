import React from "react";
import "./Step5.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
//import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step5() {
  const navigate = useNavigate();
  const now = 75;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");
  const step1Click    = localStorage.getItem("step1Click");
  const step2Quantity = localStorage.getItem("step2Quantity");
  const step3Nazione  = localStorage.getItem("step3Nazione");
  const step4Busta    = localStorage.getItem("step4Busta");
  const step4Stampa   = localStorage.getItem("step4Stampa");
  const step4Colore   = localStorage.getItem("step4Colore");
  const step5Pagine   = localStorage.getItem("step5Pagine");
  //fine variabili da passare tra i vari steps

  const [sendItem, setItem] = useState();
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
    //console.log("Step5Pagine is " + step5Pagine);
    //console.log("step5Click is " + step5Click);

  },[]);
  const [step5Click, setStep5Click] = useState(step5Pagine);
  const InternalPgActive    = "/Images/Step1/circle-tick-active.svg";
  const InternalPgInactive  = "/Images/Step1/circle-tick.svg";
  const NoInactive          = "/Images/Step1/cross-icon.svg";
  const NoActive            = "/Images/Step1/cross-active.svg";

  const handleClick5 = (cardno) => {
    setStep5Click((prevState) => (prevState === cardno ? null : cardno));
  };

  const goBack = () => {

    let opzione = sendoption;

    let step = step4Stampa === 'sa' ? "Step-4-2"  : "Step-4";

    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }

  };

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {

    localStorage.setItem("step5Pagine",   step5Click);

    if (step5Click == 1) {
      navigate(`/Lettere/Step-5-2`);
    }
    else if (step5Click == 2) {
      navigate(`/Lettere/Step-6`);
    }

  };
  async function nextstep() {
    try {
      /*
      const userId = localStorage.getItem("_id");
      const RecipientOption =
        step5Click === 1 ? "Yes" : step5Click === 2 ? "No" : "";
      const res = await axios.post(`${API_URL}/auth/addQA_lettere_step5a`, {
        id: userId,
        rec: step5Click,
      });

      */
      let res = {status:200};
      if (res.status === 200) {
        //console.log("Do you want to insert pages inside?", RecipientOption);
        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="over-flow-setting">
        <Navbar />
        <div>
          <Row className="step1-row">
            <ColonnaSx />
            <Col md={8} className="col-rhs">
              <div className="top-rhs">
                <ProgressBar now={now} />
              </div>

              <div className="col-rhs-inner-custom">
                <div>
                  <p className="step1-txt">
                    Step 5:
                    <span>Vuoi inserire pagine all'interno?</span>
                  </p>
                  <p className="rhs-des">
                    In questo passaggio hai l'opportunità di arricchire la tua
                    spedizione inserendo documenti o pagine<br></br> informative
                    all'interno delle tue buste. Questo può essere
                    particolarmente utile per includere lettere di<br></br>{" "}
                    accompagnamento, brochure informative, offerte speciali o
                    qualsiasi altro materiale promozionale che<br></br> desideri
                    condividere con i destinatari.
                  </p>
                </div>
                <div className="rhs5-card-btn-body pb-4">
                  <div className="cards5-rhs-row">
                    <Col
                      md={3}
                      onClick={() => handleClick5(1)}
                      className="c5-card-col"
                    >
                      <div className={step5Click === 1 || step5Click === "1" ? "c5-card1-active" : "c5-card1"}>
                        <img
                          src={
                            step5Click === 1 || step5Click === "1"
                              ? InternalPgActive
                              : InternalPgInactive
                          }
                          alt="Internal Page"
                          title="Internal Page"
                          className="c5-card1-img"
                        />
                      </div>
                      <p className="option-txt">
                        Si, inserisci  pagine interne
                      </p>
                    </Col>
                    <Col
                      md={3}
                      onClick={() => handleClick5(2)}
                      className="c5-card-col"
                    >
                      <div
                        className={
                          step5Click === 2 || step5Click === "2" ? "c5-card2-active" : "c5-card2"
                        }
                      >
                        <img
                          src={step5Click === 2 || step5Click === "2" ? NoActive : NoInactive}
                          alt="No, Continue on Recipients"
                          className="c5-card2-img"
                        />
                      </div>
                      <p className="option-txt">
                        No, prosegui ai<br></br> destinatari
                      </p>
                    </Col>
                  </div>
                </div>
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
              <div className="btn2-div">
                  <button
                    className={step5Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                <button
                    className={step5Click ? "btn-r2-active" : "btn-r2"}
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
                    <span
                      onClick={() => {
                        navigate(`/?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Cosa devi spedire?{" "}
                    </span>{" "}
                    &gt;
                    <span
                      onClick={() => {
                        navigate(`/Step-2?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Q.tà
                    </span>{" "}
                    &gt;
                    <span
                      onClick={() => {
                        navigate(`/Step-3?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Nazione Destinatari
                    </span>{" "}
                    &gt;
                    <span
                      onClick={() => {
                        navigate(`/Lettere/Step-4?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Dettaglio Buste{" "}
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Interno </span>
                  </p>
                </div>
                <div className="step1-progress">
                  <ProgressBar now={now} />
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
