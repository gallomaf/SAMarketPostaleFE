import React, {useEffect, useRef} from "react";
import "./Step4Cartoline.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
//import Dropdown from "react-bootstrap/Dropdown";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
//import { API_URL } from "../../../services/client";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import {ToastContainer} from "react-toastify";
import { ErrorToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";

export default function Step4Cartoline() {

  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Busta    = localStorage.getItem("step4Busta");
  const step4Misure   = localStorage.getItem("step4Misure");
  const step4Stampa   = localStorage.getItem("step4Stampa");

  const step4Lunghezza= localStorage.getItem("step4Lunghezza");
  const step4Altezza  = localStorage.getItem("step4Altezza");

  const handleLunghezzaInput = (e) => {
    const value = e.target.value;
    setlunghezzaValue(value);
  };

  const handleAltezzaInput = (e) => {
    const value = e.target.value;
    setaltezzaValue(value);
  };


  const [selectedValue, setSelectedValue] = useState(step4Busta);
  //const [dropselectedValue, setDropSelectedValue] = useState("");

  const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");
  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);

  const [lunghezza, setlunghezzaValue]  = useState(step4Lunghezza  ? step4Lunghezza : "");
  const [altezza,   setaltezzaValue]    = useState(step4Altezza   ? step4Altezza : "");


 // const [sendItem, setItem] = useState();
  const navigate = useNavigate();

  //nuova versione buste
  const [formatoBuste, setFormatoBuste] = useState(step4Busta);
  const targetRefStampa = useRef(null);

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const cartoline        = JSON.parse(localStorage.getItem('cartoline'));//recupero con JSON perchè è un array

  const scrollToSectionStampa = () => {
    if (targetRefStampa.current) {
      targetRefStampa.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormatoBuste = (cardno) => {
    setFormatoBuste((prevState) => (prevState === cardno ? null : cardno));
  };

  useEffect(() => {
    if (formatoBuste) {
      scrollToSectionStampa();
    }
  }, [formatoBuste]);

  const handleRoutes = () => {

    localStorage.setItem("step4Busta",  formatoBuste);
    localStorage.setItem("step4Misure", measurement);

    localStorage.setItem("step4Lunghezza", lunghezza);
    localStorage.setItem("step4Altezza",   altezza);

    let cartolinax = cartoline[formatoBuste-1].name;

    localStorage.setItem("cartolina", cartolinax);

    if (isChecked) {
      navigate(`/Lettere/Step-6`);
      localStorage.setItem("step4Stampa",   "cliente");
    } else if (isChecked2) {
      localStorage.setItem("step4Stampa",   "sa");
      navigate(`/Cartoline/Step-4-2`);
    }

  };

  const goBack = () => {
    navigate('/Step-3');
  };


    const formValidation = () => {
      console.log(formatoBuste);

      if (formatoBuste == 3) {
        let lunghezzaInt= parseInt(lunghezza);
        let altezzaInt  = parseInt(altezza);

        //se non sono numeri, allora return false
        if (isNaN(lunghezzaInt) || isNaN(altezzaInt)) {
          ErrorToast("Inserire un numero intero nelle misure");
          return false;
        }
        if (lunghezzaInt < 140 || lunghezzaInt > 235) {
          ErrorToast("La lunghezza deve essere compresa tra 140 e 235 mm");
          return false;
        }
        if (lunghezzaInt / altezzaInt < 1.4) {
          ErrorToast("Il rapporto lunghezza/altezza deve essere maggiore o uguale a 1,4");
          return false;
        }
      }

      if (formatoBuste == null || !formatoBuste) {
        ErrorToast("Seleziona il formato della cartolina");
        return false;
      }

      if (!isChecked && !isChecked2) {
        ErrorToast("Seleziona chi stampa le cartoline");
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
        `${API_URL}/auth/addQA_cartoline_step4a`,
        {
          id: userId,
          envelope_format: dropselectedValue,
          measurements: measurement,
          envelope_printing: EnvelopePrintingOption,
        }
      );

       */

      let res = {'status' : 200};
      if (res.status === 200) {
        handleRoutes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,          url: "/Step-1" },
    { value: step2Quantity,       url: "/Step-2" },
    { value: nazione,             url: "/Step-3" },
    { value: "Dettaglio",         url: "/Cartoline/Step-4" },
  ];

  return (
    <>
    <ToastContainer/>
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
                  <p className="step4-txt">
                    Step 3:
                    <span className="step4-txt-sp1">
                      {" "}
                      Dettagli delle cartoline
                    </span>
                  </p>
                  <p className="rhs-st4-des">
                    Qui puoi specificare le preferenze per la personalizzazione
                    delle tue cartoline. <br/>Scegli se fornire le cartoline
                    già stampate o se preferisci che ci occupiamo noi della
                    stampa.
                  </p>
                </div>
                <div className="rhs-form-btn-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">
                      <div
                        className={
                          selectedValue === "Personalizzato"
                            ? "page-format-contain"
                            : ""
                        }
                      >
                        <div className="form-group cartoline-form-drop-width">
                          <label className="envelope-label">
                            Formato Cartolina
                          </label>

                          <div className="rhs-card-btn-body">
                            <div className="cards-rhs-row pb-4">
                              {cartoline && cartoline.length > 0 ? (
                                  cartoline.map((busta) => (
                                  <Col key={busta.id} onClick={() => handleFormatoBuste(busta.id)}
                                       className="cards-col">
                                    <div className={formatoBuste == busta.id ? "card1-active" : "card1"}>
                                      <img src={formatoBuste == busta.id ? busta.image : busta.imageInattiva}
                                           alt={busta.name} className="card-imgx"/>
                                    </div>
                                    <p className="option-txt">{busta.name}</p>
                                  </Col>
                                ))
                              ) : (
                                  <a href="/Step-1">Riparti da Step 1</a>
                              )
                              }
                            </div>
                          </div>

                        </div>
                        <div className={formatoBuste == 3 ? "" : "d-none"}>
                          <p className="rhs-st4-des">
                            Il rapporto lunghezza/altezza deve essere maggiore o uguale a 1,4
                          </p>
                          <div className="cards3-rhs-row">

                            <Col className="c-cards-colx">
                              <label className="envelope-label">Lunghezza </label>
                              <div >{" "} min 140 - max 235 mm</div>
                              <input
                                  type="number"
                                  min="140"
                                  max="235"
                                  className="form-control ship-quantity-form ship-width"
                                  id="exampleInputQuantity"
                                  onChange={handleLunghezzaInput}
                                  placeholder="es. 140"
                                  value={lunghezza}
                              />
                            </Col>
                            <Col className="c-cards-colx">
                              <label className="envelope-label">Altezza </label>
                              <div>{" "} min 90 - max 120 mm</div>
                                <input
                                  type="number"
                                  min="90"
                                  max="120"
                                  className="form-control ship-quantity-form ship-width"
                                  id="exampleInputQuantity"
                                  onChange={handleAltezzaInput}
                                  placeholder="es. 90"
                                  value={altezza}
                              />
                            </Col>
                          </div>
                        </div>
                      </div>

                      <div className="printing-checks pb-4">
                        <label className="envelope-label ">
                          Stampa delle cartoline
                        </label>

                        <div   ref={targetRefStampa} className="Printing-contain">
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
                                        : "selected-ans-label"
                                  }
                                  htmlFor="flexCheckDefault1"
                              >
                                Stampate dal Cliente
                              </label>
                            </div>
                          </div>
                          <div
                            className={
                              !isChecked2
                                ? "Printing-check2"
                                : "Printing-check-border"
                            }
                          >
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
                              <label
                                  className={
                                  !isChecked2
                                    ? "form-check-label"
                                    : "selected-ans-label"
                                }
                                htmlFor="flexCheckDefault2"
                              >
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
                <button
                    className={formatoBuste && (isChecked || isChecked2) ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}>
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                <button
                    className={formatoBuste && (isChecked || isChecked2) ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}>
                    Avanti
                  </button>
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
