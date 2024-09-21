import React from "react";
import "./Step6Cartoline.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { ErrorToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step6Cartoline() {
  const now = 98;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");

  const [number, setNumber] = useState("");

  const [email, setEmail] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  console.log("this is ", sendoption);
  const handleRoutes = () => {
    if (name && number && agency && email) {
      navigate(`/Thankyou?sendoption=${sendoption}`);
    }
  };
  const [sendItem, setItem] = useState();

  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  },[]);


  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");

      const res = await axios.post(
        `${API_URL}/auth/addQA_cartoline_step7`,
        {
          id: userId,
          First_Name: name,
          Company: agency,
          Phone_Number: number,
          Email: email,
        }
      );
      if (res.status === 200) {
        console.log("Name  ", name);
        console.log("Agency ", agency);
        console.log("Number ", number);
        console.log("Email ", email);

        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
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

              <div className="col-rhs7-inner">
                <div>
                  <p className="step1-txt">
                    Step 6:<span> Dettagli contatto </span>
                  </p>
                  <p className="rhs-des">
                    In questo step finale, ti chiediamo di fornire i tuoi
                    dettagli di contatto
                  </p>
                </div>
                <div></div>
                <div className="rhs7-card-btn-body">
                  <div className="form-check-contain">
                    <div className="forms-main">
                      <form className="form-group inputs-all">
                        <div className="w-100">
                          <input
                            type="text"
                            class={
                              name
                                ? "form-control form-custom-control outer1"
                                : "form-control form-custom-control"
                            }
                            id="exampleFormControlInput1"
                            placeholder="Nome e Cognome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                            type="text"
                            class={
                              agency
                                ? "form-control form-custom-control outer2"
                                : "form-control form-custom-control"
                            }
                            id="exampleFormControlInput2"
                            placeholder="Azienda"
                            value={agency}
                            onChange={(e) => setAgency(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                            type="tel"
                            class={
                              number
                                ? "form-control form-custom-control outer3"
                                : "form-control form-custom-control"
                            }
                            id="exampleFormControlInput3"
                            placeholder="Numero di Telefono"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                            type="email"
                            class={
                              email
                                ? "form-control form-custom-control outer4"
                                : "form-control form-custom-control"
                            }
                            id="exampleFormControlInput4"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    <div class="form-check7">
                      <input
                        class="form-check-input  "
                        type="checkbox"
                        value=""
                        checked
                        id="flexCheckDefault1"
                      />
                      <label class="form-check-label7 " for="flexCheckDefault1">
                        Con l'invio di questa richiesta, accetto espressamente i
                        Termini e Condizioni e acconsento al<br></br>{" "}
                        trattamento dei miei dati personali in conformità con la
                        Privacy Policy.
                      </label>
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
                      name && number && agency && email
                        ? "btn-r2-active"
                        : "btn-r2"
                    }
                    onClick={nextstep}
                  >
                    Invia Richiesta Preventivo
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
                      name && number && agency && email
                        ? "btn-r2-active"
                        : "btn-r2"
                    }
                    onClick={nextstep}
                  >
                    Invia Richiesta Preventivo
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
                    &gt;{" "}
                    <span
                      onClick={() => {
                        navigate(`/Cartoline/Step-5?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Elenco Destinatari
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Dettagli </span>
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
