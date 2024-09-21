import React from "react";
import "./Step5Cartoline.css"//;
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
export default function Step5Cartoline() {
  const [sendItem, setItem] = useState();

  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  }, []);
  const now = 90;
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [inputnote, setInputNote] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  console.log("this is ", sendoption);
  const handleChange = (e) => {
    const value = e.target.value;
    setInputNote(value);
    console.log("Note is", value);
  };
  const handleRoutes = () => {
    if (isChecked1 || isChecked2) {
      navigate(`/Cartoline/Step-6?sendoption=${sendoption}`);
    }
  };
  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");
      const RecipientList = isChecked1
        ? "Provided By Customer"
        : isChecked2
        ? "Provided By Partner"
        : "";
      const res = await axios.post(`${API_URL}/auth/addQA_cartoline_step6`, {
        id: userId,
        file_customer: RecipientList,
        note: inputnote,
      });
      if (res.status === 200) {
        console.log("Recipient  ", RecipientList);
        console.log("Note is ", inputnote);
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

              <div className=" col-rhs6-inner-custom">
                <div>
                  <p className="step1-txt">
                    Step 5:<span> Elenco destinatari </span>
                  </p>
                  <p className="rhs-des">
                    In questo importante passaggio, ti chiediamo i dettagli per
                    l'elenco completo dei destinatari.
                  </p>
                </div>
                <div></div>
                <div className="rhs6-card-btn-body">
                  <div className="Textarea-radio-whole">
                    <div>
                      <form className="form-envelope-main">
                        <div
                          className={
                            !isChecked1
                              ? "Printing-check1"
                              : "Printing-check-border"
                          }
                        >
                          <div class="form-check6">
                            <input
                              class="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isChecked1}
                              onChange={() => {
                                setIsChecked1(true);
                                setIsChecked2(false);
                              }}
                              id="flexCheckDefault1"
                            />
                            <label
                              class="form-check-label "
                              for="flexCheckDefault1"
                            >
                              <div
                                className={
                                  isChecked1 ? "label-head-bold" : "label-head"
                                }
                              >
                                Forniti dal Cliente (file CSV, Excel)
                              </div>
                              <div className="label-subhead">
                                Se hai già un elenco preciso dei destinatari,
                                puoi caricare direttamente i dati<br></br>{" "}
                                utilizzando un file in formato CSV o Excel.
                                Assicurati che il file contenga tutte le
                                <br></br> informazioni necessarie.
                              </div>
                            </label>
                          </div>
                        </div>
                        <div
                          className={
                            !isChecked2
                              ? "Printing-check1 st6-check"
                              : "Printing-check-border st6-check"
                          }
                        >
                          <div class="form-check6">
                            <input
                              class="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isChecked2}
                              onChange={() => {
                                setIsChecked2(true);
                                setIsChecked1(false);
                              }}
                              id="flexCheckDefault2"
                            />
                            <label
                              class="form-check-label "
                              for="flexCheckDefault2"
                            >
                              <div
                                className={
                                  isChecked2 ? "label-head-bold" : "label-head"
                                }
                              >
                                Forniti da noi in base al CAP
                              </div>
                              <div className="label-subhead">
                                Se non disponi di un elenco specifico dei
                                destinatari o desideri raggiungere un<br></br>{" "}
                                pubblico più ampio in determinate aree
                                geografiche, possiamo aiutarti a<br></br>{" "}
                                identificare i destinatari in base ai Codici di
                                Avviamento Postale (CAP) che fornisci.
                              </div>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="pb-4">
                      <form class="form-group">
                        <label className="textarea-label">Note</label>
                        <textarea
                          class="form-control form-textarea"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          cols="85"
                          placeholder="Lascia una nota con le specifiche dei destinatari"
                          onChange={handleChange}
                        ></textarea>
                      </form>
                    </div>
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
                    className={
                      isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"
                    }
                    onClick={nextstep}
                  >
                    Avanti
                  </button>
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
                      isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"
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
                    &gt;{" "}
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
                    &gt;{" "}
                    <span
                      onClick={() => {
                        navigate(`/Cartoline/Step-4?sendoption=${sendItem}`);
                      }}
                    >
                      Dettaglio
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Elenco Destinatari </span>
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
