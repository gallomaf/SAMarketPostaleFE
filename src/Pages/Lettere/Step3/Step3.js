import React from "react";
import "./Step3.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step3() {
  const now = 45;
  const navigate = useNavigate();
  const [sendItem, setItem] = useState();
  const [step3Click, setStep3Click] = useState(0);
  const ItaliaActive = "/Images/Step1/Italia-active.svg";
  const ItaliaInactive = "/Images/Step1/italia.svg.svg";
  const EsteroInactive = "/Images/Step1/estero.svg.svg";
  const EsteroActive = "/Images/Estero Active.svg";
  const MistoActive = "/Images/Misto Active.svg";
  const MistoInactive = "/Images/Step1/Misto.svg";

  const handleClick3 = (cardno) => {
    setStep3Click((prevState) => (prevState === cardno ? null : cardno));
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {
    if (sendoption === "lettere" && step3Click) {
      navigate(`/Lettere/Step-4?sendoption=${sendoption}`);
    } else if (sendoption === "cartoline" && step3Click) {
      navigate(`/Cartoline/Step-4?sendoption=${sendoption}`);
    } else if (sendoption === "cataloghi" && step3Click) {
      navigate(`/Cataloghi/Step-4?sendoption=${sendoption}`);
    } else if (sendoption === "gadget" && step3Click) {
      navigate(`/Gadget/Step-4?sendoption=${sendoption}`);
    }
  };

  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });
  async function nextstep() {
    try {
      const RecipientCountry =
        step3Click === 1
          ? "Italy"
          : step3Click === 2
          ? "Estero"
          : step3Click === 3
          ? "Misto"
          : "";
      const userId = localStorage.getItem("_id");
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step3`,
        {
          id: userId,
          country: RecipientCountry,
        }
      );
      if (res.status === 200) {
        console.log("Recipient Country is ", RecipientCountry);
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

              <div className="col-rhs-inner">
                <div>
                  <p className="step1-txt">
                    <span> Nazione Destinatari </span>
                  </p>
                  <p className="rhs-des">
                    Seleziona il paese di destinazione della tua spedizione.
                    Questo ci permetterà di fornirti un preventivo<br></br>{" "}
                    preciso e le opzioni di spedizione disponibili.
                  </p>
                </div>
                <div className="rhs3-card-btn-body">
                  <div className="cards3-rhs-row">
                    <Col
                      md={3}
                      onClick={() => handleClick3(1)}
                      className="c-cards-col"
                    >
                      <div
                        className={
                          step3Click === 1 ? "c-card1-active" : "c-card1"
                        }
                      >
                        <img
                          src={step3Click == 1 ? ItaliaActive : ItaliaInactive}
                          alt="Italia"
                          title="Italy"
                          className="c-card1-img"
                        />
                      </div>
                      <p className="option-txt">Italia</p>
                    </Col>
                    <Col
                      md={3}
                      onClick={() => handleClick3(2)}
                      className="c-cards-col"
                    >
                      <div
                        className={
                          step3Click === 2 ? "c-card2-active" : "c-card2"
                        }
                      >
                        <img
                          src={step3Click === 2 ? EsteroActive : EsteroInactive}
                          alt="Estero"
                          className="c-card2-img"
                        />
                      </div>
                      <p className="option-txt">Estero</p>
                    </Col>
                    <Col
                      md={3}
                      onClick={() => handleClick3(3)}
                      className="c-cards-col"
                    >
                      <div
                        className={
                          step3Click === 3 ? "c-card3-active" : "c-card-3"
                        }
                      >
                        <img
                          src={step3Click === 3 ? MistoActive : MistoInactive}
                          alt="Misto"
                          className="c-card3-img"
                        />
                      </div>
                      <p className="option-txt">Misto</p>
                    </Col>
                  </div>
                </div>
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1">Indietro</button>
                </div>
                <div className="btn2-div">
                  <button
                    className={step3Click ? "btn-r2-active" : "btn-r2"}
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
                    className={step3Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btm-rhs">
                <div>
                  <p className="quotation-req">
                    Richiesta Preventivo &gt;
                    <span
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      {" "}
                      Cosa devi spedire?{" "}
                    </span>{" "}
                    &gt;
                    <span
                      onClick={() => navigate(`/Step-2?sendoption=${sendItem}`)}
                    >
                      {" "}
                      Q.tà{" "}
                    </span>{" "}
                    &gt;
                    <span className="selected-span">Nazione Destinatari</span>
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
