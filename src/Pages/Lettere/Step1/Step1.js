import React from "react";
import "./Step1.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Step1() {
  const now = 15;
  const navigate = useNavigate();
  const [step1Click, setStep1Click] = useState(0);
  const LetterActive = "/Images/Step1/letter-active.svg";
  const LetterInactive = "/Images/Step1/Letter.svg";
  const CartolineActive = "/Images/Step1/Caroline-active.svg";
  const CartolineInactive = "/Images/Step1/Cartolina.svg";
  const CataloghiActive = "/Images/Cataloghi-active.svg";
  const CataloghiInactive = "/Images/Step1/Catalog.svg";
  const GadgetActive = "/Images/Gadget-active.svg";
  const GadgetInactive = "/Images/Step1/Gadget.svg";
  const handleClick = (cardnum) => {
    // setStep1Click((prevState) => !prevState);
    setStep1Click((prevState) => (prevState === cardnum ? null : cardnum));
  };
  const handleRoutes = () => {
    if (step1Click === 1) {
      localStorage.setItem("sendoption", "lettere");
    } else if (step1Click === 2) {
      localStorage.setItem("sendoption", "cartoline");
    } else if (step1Click === 3) {
      localStorage.setItem("sendoption", "cataloghi");
    } else if (step1Click === 4) {
      localStorage.setItem("sendoption", "gadget");
    }
  };
  async function nextstep() {
    try {
      handleRoutes();
      const sendoption = localStorage.getItem("sendoption");
      const res = await axios.post(`${API_URL}/auth/addQA_lettere_step1`, {
        categorytag: sendoption,
      });

      //const res = await axios.post(`${API_URL}/auth/addQA_lettere_step1/${sendoption}`);
      if (res.status === 200) {
        console.log("Status 200 & Sending Option",res.data?.data?.id);
        localStorage.setItem("_id",res?.data?.data?.id)
        handleRoutes();
        // SuccessToast("updated");
        navigate(`/Step-2?sendoption=${sendoption}`);
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
                    <Col
                      // md={2}
                      // sm={5}
                      // xsm={2}
                      onClick={() => handleClick(1)}
                      className="cards-col  "
                    >
                      <div
                        className={step1Click === 1 ? "card1-active" : "card1"}
                      >
                        <img
                          src={step1Click === 1 ? LetterActive : LetterInactive}
                          alt="Letter"
                          className="card1-img"
                        />
                      </div>
                      <p className="option-txt">Lettere</p>
                    </Col>
                    <Col
                      // md={2}
                      // sm={5}
                      // xsm={2}
                      onClick={() => handleClick(2)}
                      className="cards-col "
                    >
                      <div
                        className={step1Click === 2 ? "card2-active" : "card2"}
                      >
                        <img
                          src={
                            step1Click === 2
                              ? CartolineActive
                              : CartolineInactive
                          }
                          alt="Cartolina"
                          className="card2-img"
                        />
                      </div>
                      <p className="option-txt">Cartoline</p>
                    </Col>
                    <Col
                      // md={2}
                      // sm={5}
                      // xsm={2}
                      onClick={() => handleClick(3)}
                      className="cards-col "
                    >
                      <div
                        className={step1Click === 3 ? "card3-active" : "card-3"}
                      >
                        <img
                          src={
                            step1Click === 3
                              ? CataloghiActive
                              : CataloghiInactive
                          }
                          alt="Cataloghi"
                          className="card3-img"
                        />
                      </div>
                      <p className="option-txt">Cataloghi</p>
                    </Col>
                    <Col
                      // md={2}
                      // colsm={5}
                      // xsm={2}
                      onClick={() => handleClick(4)}
                      className="cards-col "
                    >
                      <div
                        className={step1Click === 4 ? "card4-active" : "card-4"}
                      >
                        <img
                          src={step1Click === 4 ? GadgetActive : GadgetInactive}
                          alt="Gadget"
                          className="card4-img"
                        />
                      </div>
                      <p className="option-txt">Gadget</p>
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
                    className={step1Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={ step1Click ? false : true }
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1 w-100">Indietro</button>
                </div>
                <div className="btn2-div w-100">
                  <button
                    className={step1Click ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={ step1Click ? false : true }
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
