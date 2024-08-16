import React, { useEffect } from "react";
import "./Step2.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step2() {
  const now = 30;
  const [sendItem, setItem] = useState();
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {
    if (inputValue) {
      navigate(`/Step-3?sendoption=${sendoption}`);
    }
  };

  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");
      const res = await axios.post(`${API_URL}/auth/addQA_lettere_step2`, {
        id: userId,
        quantity: inputValue,
      });
      if (res.status === 200) {
        console.log("quantity is ", inputValue);
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
                  <p className="step2-txt">
                    <span className="step2-txt-sp1"> Q.tà da spedire </span>
                    <span className="step2-txt-sp2"> (min 100 pezzi) </span>
                  </p>
                  <p className="rhs-st2-des">
                    Inserisci il numero totale di unità che desideri spedire. È
                    richiesto un minimo di 100 pezzi per<br></br> procedere con
                    la richiesta.
                  </p>
                </div>
                <div className="rhs-input-btn-body">
                  <div>
                    <form className="form-ship">
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control ship-quantity-form ship-width"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="es. 100 pezzi"
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
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
                </div>
                <div className="btn2-div">
                  <button
                    className={inputValue >= 100 ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={inputValue >= 100 ? false : true}
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
                    className={inputValue >= 100 ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={inputValue >= 100 ? false : true}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btm-rhs">
                <div>
                  <p className="quotation-req">
                    Richiesta Preventivo &gt;{" "}
                    <span onClick={() => navigate(`/?sendoption=${sendItem}`)}>
                      {" "}
                      Cosa devi spedire?{" "}
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Q.tà</span>
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
