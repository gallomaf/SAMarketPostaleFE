import React from "react";
import Form from "react-bootstrap/Form";
import "./Step3of5.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
export default function Step3of5() {
  const now = 75;
  const [sendItem, setItem] = useState();
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isCheckedR1, setIsCheckedR1] = useState(false);
  const [isCheckedR2, setIsCheckedR2] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {
    if ((isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2)) {
      navigate(`/Lettere/Step-6?sendoption=${sendoption}`);
    }
  };
  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");
      const PrintQuality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
        ? "Colore"
        : "";
      const PrintType = isCheckedR1
        ? "Solo fronte"
        : isCheckedR2
        ? "Fronte/retro"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step5b`,
        {
          id: userId,
          print_quality: PrintQuality,
          type_of_printing: PrintType,
        }
      );
      if (res.status === 200) {
        console.log("Printing  Quality :", PrintQuality);
        console.log("Printing Type :", PrintType);


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
                    Step 5:<span> Stampa lettera interna </span>
                  </p>
                  <p className="rhs-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>
                <div className="rhs5-card-btn-body">
                  <div>
                    <form className="form-envelope-main">
                      <div className="printing-checks-contain">
                        <label className="p-envelope-label ">
                          Qualità della stampa
                        </label>

                        <div className="Printing-contain-r1">
                          <div
                            className={
                              !isChecked1
                                ? "Printing-check1"
                                : "Printing-check-border"
                            }
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                checked={isChecked1}
                                onChange={() => {
                                  setIsChecked1(true);
                                  setIsChecked2(false);
                                }}
                              />
                              <div className="label-img ">
                                <label
                                  className={
                                    !isChecked1
                                      ? "form-check-label "
                                      : "selected-check-bold"
                                  }
                                  for="flexRadioDefault1"
                                >
                                  Bianco/Nero
                                </label>
                                <img
                                  src="/Images/Step1/blackwhite-check.svg"
                                  alt="Black and White"
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              !isChecked2
                                ? "Printing-check2"
                                : "Printing-check-border2"
                            }
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked={isChecked2}
                                onChange={() => {
                                  setIsChecked2(true);
                                  setIsChecked1(false);
                                }}
                              />
                              <div className="label-img">
                                <label
                                  className={
                                    !isChecked2
                                      ? "form-check-label "
                                      : "selected-check-bold"
                                  }
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Colore
                                </label>
                                <img
                                  src="/Images/Step1/Color-check.svg"
                                  alt="Colored"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="printing-checks-contain check-row2">
                        <label className="p-envelope-label ">
                          Tipo di Stampa
                        </label>

                        <div className="Printing-contain-r2">
                          <div
                            className={
                              !isCheckedR1
                                ? "Printing-check1"
                                : "Printing-check-border"
                            }
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefaultR1"
                                id="flexRadioDefaultR1"
                                checked={isCheckedR1}
                                onChange={() => {
                                  setIsCheckedR1(true);
                                  setIsCheckedR2(false);
                                }}
                              />

                              <label
                                className={
                                  !isCheckedR1
                                    ? "form-check-label "
                                    : "selected-check-bold"
                                }
                                class="form-check-label "
                                for="flexRadioDefaultR1"
                              >
                                Solo fronte
                              </label>
                            </div>
                          </div>

                          <div
                            className={
                              !isCheckedR2
                                ? "Printing-check2"
                                : "Printing-check-border2"
                            }
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefaultR2"
                                id="flexRadioDefaultR2"
                                checked={isCheckedR2}
                                onChange={() => {
                                  setIsCheckedR2(true);
                                  setIsCheckedR1(false);
                                }}
                              />

                              <label
                                className={
                                  !isCheckedR2
                                    ? "form-check-label "
                                    : "selected-check-bold"
                                }
                                class="form-check-label"
                                for="flexRadioDefaultR2"
                              >
                                Fronte/retro
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="btn-img-rhs pb-4">
                    <div></div>
                    <div
                      className={
                        (isChecked1 || isChecked2) &&
                        (isCheckedR1 || isCheckedR2)
                          ? "envelope-img"
                          : "d-none"
                      }
                    >
                      <img src="/Images/Step1/Paper.svg" alt="Envelope" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btns-envelope">
                <div
                  className={
                    (isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2)
                      ? "envelope-img"
                      : "d-none"
                  }
                >
                  <img src="/Images/Step1/Paper.svg" alt="Envelope" />
                </div>
                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={() => navigate(-1)}>
                      Indietro
                    </button>
                  </div>
                  <div className="btn2-div">
                    <button
                      className={
                        (isChecked1 || isChecked2) &&
                        (isCheckedR1 || isCheckedR2)
                          ? "btn-r2-active"
                          : "btn-r2"
                      }
                      onClick={nextstep}
                    >
                      Avanti
                    </button>
                  </div>
                </div>
              </div>

              <div className="btn-rhs-row w-100">
                <div>
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
                </div>
                <div className="btn2-div w-100">
                  <button
                    className={
                      (isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2)
                        ? "btn-r2-active"
                        : "btn-r2"
                    }
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
