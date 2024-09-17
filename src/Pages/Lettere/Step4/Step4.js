import React from "react";
import "./Step4.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";

//import { useSearchParams, useLocation, useParams } from "react-router-dom";
//import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { API_URL } from "../../../services/client";
//import axios from "axios";
import {ToastContainer} from "react-toastify";
import { ErrorToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import { useRef } from "react";

export default function Step4() {

  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Busta    = localStorage.getItem("step4Busta");
  const step4Misure   = localStorage.getItem("step4Misure");
  const step4Stampa   = localStorage.getItem("step4Stampa");
  const step4Colore   = localStorage.getItem("step4Colore");
  //fine variabili da passare tra i vari steps

  const navigate = useNavigate();
  //const [sendItem, setItem] = useState();

  const targetRef = useRef(null);

  //nuova versione buste
  const [formatoBuste, setFormatoBuste] = useState(step4Busta);

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const buste        = JSON.parse(localStorage.getItem('buste'));//recupero con JSON perchè è un array

  const handleFormatoBuste = (cardno) => {
    setFormatoBuste((prevState) => (prevState === cardno ? null : cardno));
    localStorage.setItem("step52Formato",   "");
  };

  //fine nuova versione buste

  const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");
  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);

  const [isCheckedCol1, setIsCheckedCol1] = useState(step4Colore == "Bianco/Nero" ? true: false);
  const [isCheckedCol2, setIsCheckedCol2] = useState(step4Colore == "Colore" ? true: false);

  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    //console.log("Measurement Value is", value);
  };

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {

    localStorage.setItem("step4Busta",  formatoBuste);
    localStorage.setItem("step4Misure", measurement);
    let bustax = buste[formatoBuste-1].name;
    localStorage.setItem("busta", bustax);



    if (isChecked && formatoBuste) {
      localStorage.setItem("step4Stampa",   "cliente");
      localStorage.setItem("step4Colore",   "");
      navigate(`/Lettere/Step-5-2`);
    }
    else if (isChecked2 && (isCheckedCol1 || isCheckedCol2) && formatoBuste) {
      localStorage.setItem("step4Stampa",   "sa");
      localStorage.setItem("step4Colore",   isCheckedCol1 ? "Bianco/Nero" : "Colore");
      navigate(`/Lettere/Step-5-2`);
    }

  };

  useEffect(() => {
    if (isChecked2) {
      scrollToSection();
    }
  }, [isChecked2]);

  const goBack = () => {
    navigate('/Step-3');
  };

    const formValidation = () => {
    if (!formatoBuste) {
      ErrorToast("Seleziona il formato della busta");
      return false;
    }

    if (!isChecked && !isChecked2) {
      ErrorToast("Seleziona chi deve stampare le buste");
      return false;
    }

    if (isChecked2 && !isCheckedCol1 && !isCheckedCol2) {
      ErrorToast("Seleziona la qualità della stampa.");
      return false;
    }

    return true;

    }

  async function nextstep() {
    try {

      if (!formValidation()) {
        return;
      }

      /*
      const userId = localStorage.getItem("_id");
      const EnvelopePrintingOption = isChecked
        ? "Stampate dal Cliente"
        : isChecked2
        ? "Stampate da Spedire Adesso"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step4a`,
        {
          id:userId,
          envelope_format: formatoBuste,
          envelope_printing: EnvelopePrintingOption,
          measurements: measurement,
        }f
      );
       */

      let res_status = 200;
      if (res_status === 200) {
        //console.log("Envelope Printion Option is", EnvelopePrintingOption);
        //console.log("Page Format is ", formatoBuste);
        //console.log("Measurement is ", measurement);
        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,          url: "/Step-1" },
    { value: step2Quantity,       url: "/Step-2" },
    { value: nazione,             url: "/Step-3" },
    { value: "Dettaglio Buste",   url: "/Lettere/Step-4" },
  ];

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
                <ProgressBar now={now} />
              </div>

              <div className=" col-rhs-inner-custom">
                <div>
                  <p className="step4-txt">
                    Step 3:
                    <span className="step4-txt-sp1">
                      {" "}
                      Dettagli buste{" "}
                    </span>
                  </p>
                  <p className="rhs-st4-des">
                    Qui puoi specificare le preferenze per la personalizzazione
                    delle tue buste di spedizione. Scegli se<br></br> fornire le
                    buste già stampate o se preferisci che ci occupiamo noi
                    della stampa
                  </p>
                </div>
                <div className="rhs-form-btn-body">

                  <div className="cards-rhs-row pb-4">
                    {buste.map((busta) => (
                        <Col key={busta.id} onClick={() => handleFormatoBuste(busta.id)} className="cards-col">
                          <div className={formatoBuste == busta.id ? "card1-active" : "card1"}>
                            <img src={formatoBuste == busta.id ? busta.image : busta.imageInattiva}
                                 alt={busta.name} className="card-imgx"/>
                          </div>
                          <p className="option-txt">{busta.name}</p>
                        </Col>
                    ))}
                  </div>


                  <div className="rhs3-card-btn-body">
                    <div className={formatoBuste == 6 ? "cards3-rhs-row" : "d-none"}>
                      <Col className="c-cards-col">
                        <label className="envelope-label">Dimensioni </label>
                        <input
                            type="text"
                            className="form-control personalizzato-form"
                            id="exampleInputQuantity"
                            onChange={handlePersonalizzatoInput}
                            placeholder="es. 21x21 cm"
                            value={measurement}
                        />
                      </Col>
                    </div>
                  </div>

                  <div className="printing-checks">
                    <label className="envelope-label ">
                      Stampa delle buste
                    </label>

                    <div className="Printing-contain pb-4 ">
                      <div className={!isChecked ? "Printing-check1" : "Printing-check-border"}>
                        <div className="form-check">
                          <input
                              className="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isChecked}
                              onChange={() => {
                                setIsChecked(true);
                                setIsChecked2(false);
                              }}
                              id="flexCheckDefault1"
                          />
                          <label
                              className={
                                !isChecked
                                    ? "form-check-label"
                                    : "selected-check-bold"
                              }
                              htmlFor="flexCheckDefault1"
                          >
                            Stampate dal Cliente
                          </label>
                        </div>
                      </div>
                      <div className={!isChecked2 ? "Printing-check2" : "Printing-check-border"}>
                        <div className="form-check">
                          <input
                              className="form-check-input printing-checkbox"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault2"
                              checked={isChecked2}
                              onChange={() => {
                                setIsChecked2(true);
                                setIsChecked(false);
                              }}
                          />
                          <label className={!isChecked2 ? "form-check-label" : "selected-check-bold"}
                                 htmlFor="flexCheckDefault2">
                            Stampate da Spedire Adesso
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div ref={targetRef} className={isChecked2 ? "" : "d-none"}   >

                      <div className="printing-checks pb-4">
                        <label className="p-envelope-label ">
                          Qualità della stampa
                        </label>

                        <div className="Printing-contain">
                          <div
                              className={
                                !isCheckedCol1
                                    ? "Printing-check1"
                                    : "Printing-check-border"
                              }
                          >
                            <div className="form-check">
                              <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  checked={isCheckedCol1}
                                  onChange={() => {
                                    setIsCheckedCol1(true);
                                    setIsCheckedCol2(false);
                                  }}
                              />
                              <div className="label-img ">
                                <label
                                    className={
                                      !isCheckedCol1
                                          ? "form-check-label"
                                          : "selected-check-bold"
                                    }
                                    htmlFor="flexRadioDefault1"
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
                                !isCheckedCol2
                                    ? "Printing-check2"
                                    : "Printing-check-border2"
                              }
                          >
                            <div className="form-check">
                              <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked={isCheckedCol2}
                                  onChange={() => {
                                    setIsCheckedCol2(true);
                                    setIsCheckedCol1(false);
                                  }}
                              />
                              <div className="label-img">
                                <label className={!isCheckedCol2 ? "form-check-label" : "selected-check-bold"}
                                       htmlFor="flexRadioDefault2">
                                  Colore
                                </label>
                                <img src="/Images/Step1/Color-check.svg" alt="Colored"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>


                  </div>
                </div>
                <div className="btn-rhs-row-mb">

                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div">
                  <button className={formatoBuste && (isChecked || ( isChecked2 && (isCheckedCol1 || isCheckedCol2))  )? "btn-r2-active" : "btn-r2"}
                          onClick={nextstep}>
                    Avanti
                  </button>
                </div>
              </div>

              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                  <button className={formatoBuste && (isChecked || ( isChecked2 && (isCheckedCol1 || isCheckedCol2)))  ? "btn-r2-active" : "btn-r2"}
                          onClick={nextstep}>Avanti
                  </button>
                </div>
              </div>
              <BreadcrumbBt breadcrumbArray={breadcrumbArray} now={now}/>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
