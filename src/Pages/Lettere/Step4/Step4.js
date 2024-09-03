import React from "react";
import "./Step4.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";

//import { useSearchParams, useLocation, useParams } from "react-router-dom";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step4() {

  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Busta    = localStorage.getItem("step4Busta");
  const step4Misure   = localStorage.getItem("step4Misure");
  const step4Stampa   = localStorage.getItem("step4Stampa");
  //fine variabili da passare tra i vari steps

  const navigate = useNavigate();
  const [sendItem, setItem] = useState();

  //nuova versione buste
  const [formatoBuste, setFormatoBuste] = useState(step4Busta);

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const buste        = JSON.parse(localStorage.getItem('buste'));//recupero con JSON perchè è un array

  const handleFormatoBuste = (cardno) => {
    setFormatoBuste((prevState) => (prevState === cardno ? null : cardno));
  };

  //fine nuova versione buste


  const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");
  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);


  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    //console.log("Measurement Value is", value);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {

    localStorage.setItem("step4Busta",  formatoBuste);
    localStorage.setItem("step4Misure", measurement);
    let bustax = buste[formatoBuste-1].name;
    localStorage.setItem("busta", bustax);

    if (isChecked && formatoBuste) {
      localStorage.setItem("step4Stampa",   "cliente");
      navigate(`/Lettere/Step-5-2`);
    }
    else if (isChecked2 && formatoBuste) {
      localStorage.setItem("step4Stampa",   "sa");
      navigate(`/Lettere/Step-4-2`);
    }

  };

  useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
  });

  const goBack = () => {
    navigate('/Step-3');
  };

  async function nextstep() {
    try {
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
        }
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
                    Step 4:
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
                  <div className="size-contain">
                    <form className="form-envelope-main">

                      <div className="rhs-card-btn-body">
                        <div className="cards-rhs-row pb-4">
                          {buste.map((busta) => (
                              <Col key={busta.id} onClick={() => handleFormatoBuste(busta.id)} className="cards-col">
                                <div className={formatoBuste == busta.id ? "c-card-active" : "c-card"}>
                                  <img src={formatoBuste == busta.id ? busta.image : busta.imageInattiva}
                                       alt={busta.name} className="card-imgx"/>
                                </div>
                                <p className="option-txt">{busta.name}</p>
                              </Col>
                          ))}
                        </div>
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

                    </form>
                  </div>
                </div>
              </div>
              <div className="btn-rhs-row-mb">

                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div">
                  <button className={formatoBuste && (isChecked || isChecked2) ? "btn-r2-active" : "btn-r2"}
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
                  <button className={formatoBuste && (isChecked || isChecked2) ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>Avanti</button>
                </div>
              </div>
              <BreadcrumbBt breadcrumbArray={breadcrumbArray}  now={now} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
