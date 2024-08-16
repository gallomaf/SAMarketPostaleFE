import React from "react";
import "./Step5.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step5() {
  const navigate = useNavigate();
  const now = 75;
  const [sendItem, setItem] = useState();
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });
  const [step5Click, setStep5Click] = useState(0);
  const InternalPgActive = "/Images/Step1/circle-tick-active.svg";
  const InternalPgInactive = "/Images/Step1/circle-tick.svg";
  const NoInactive = "/Images/Step1/cross-icon.svg";
  const NoActive = "/Images/Step1/cross-active.svg";
  const handleClick5 = (cardno) => {
    setStep5Click((prevState) => (prevState === cardno ? null : cardno));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  console.log("this is ", sendoption);
  const handleRoutes = () => {
    if (step5Click === 1) {
      navigate(`/Lettere/Step-5-2?sendoption=${sendoption}`);
    } else if (step5Click === 2) {
      navigate(`/Lettere/Step-6?sendoption=${sendoption}`);
    }
  };
  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");
      const RecipientOption =
        step5Click === 1 ? "Yes" : step5Click === 2 ? "No" : "";
      const res = await axios.post(`${API_URL}/auth/addQA_lettere_step5a`, {
        id: userId,
        rec: step5Click,
      });
      if (res.status === 200) {
        console.log("Do you want to insert pages inside?", RecipientOption);
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
            <Col md={4} className="col-lhs">
              <div className="col-lhs-inner">
                <div className="lhs-img">
                  <img src="/Images/Step1/send-img.svg" alt="send" />
                </div>
                <div>
                  <p className="heading-lhs">
                    Richiesta preventivo{" "}
                    <span>
                      {" "}
                      posta<br></br> massiva e pubblicitaria
                    </span>{" "}
                  </p>
                  <p className="des-lhs">
                    Attraverso questo modulo è possibile<br></br>
                    <span>richiedere un preventivo </span> per l'
                    <span>
                      invio di posta<br></br> massiva e posta pubblicitaria,
                    </span>{" "}
                    e se richiesto
                    <br></br> anche la
                    <span> stampa ed imbustamento.</span> <br></br>
                    <br></br> Il servizio include il recapito in pochi giorni
                    <br></br> della corrispondenza nelle cassette postali dei
                    <br></br>
                    destinatari indicati.
                  </p>
                </div>
              </div>
              <div>
                <p className="des-sub-lhs">
                  Per maggiori informazioni su questo
                  <span>
                    {" "}
                    nuovo<br></br> servizio postale clicca qui .
                  </span>
                </p>
              </div>
            </Col>
            <Col md={8} className="col-rhs">
              <div className="top-rhs">
                <ProgressBar now={now} />
              </div>

              <div className="col-rhs-inner-custom">
                <div>
                  <p className="step1-txt">
                    Step 5:
                    <span> Do you want to insert pages inside?</span>
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
                      <div
                        className={
                          step5Click === 1 ? "c5-card1-active" : "c5-card1"
                        }
                      >
                        <img
                          src={
                            step5Click === 1
                              ? InternalPgActive
                              : InternalPgInactive
                          }
                          alt="Internal Page"
                          title="Internal Page"
                          className="c5-card1-img"
                        />
                      </div>
                      <p className="option-txt">
                        Si, inserisci<br></br> pagine interne
                      </p>
                    </Col>
                    <Col
                      md={3}
                      onClick={() => handleClick5(2)}
                      className="c5-card-col"
                    >
                      <div
                        className={
                          step5Click === 2 ? "c5-card2-active" : "c5-card2"
                        }
                      >
                        <img
                          src={step5Click === 2 ? NoActive : NoInactive}
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
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
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
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
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
