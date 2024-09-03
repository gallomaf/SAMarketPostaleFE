import React from "react";
import "./Step4Cataloghi.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState,useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/client";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";

export default function Step4Cataloghi() {
  const navigate = useNavigate();
  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Busta    = localStorage.getItem("step4Busta");
  const step4Misure   = localStorage.getItem("step4Misure");
  const step4Stampa   = localStorage.getItem("step4Stampa");
  const step4peso     = localStorage.getItem("step4peso");
  //fine variabili da passare tra i vari steps

  //nuova versione buste
  const [formatoBuste, setFormatoBuste] = useState(step4Busta);

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const busteCataloghi  = JSON.parse(localStorage.getItem('busteCataloghi'));//recupero con JSON perchè è un array

  const handleFormatoBuste = (cardno) => {
    setFormatoBuste((prevState) => (prevState === cardno ? null : cardno));
  };

  //fine nuova versione buste

  //const [sendItem, setItem] = useState();
  
  //useEffect(() => {
  //  setItem(localStorage.getItem("sendoption"));
  //});

  const [selectedValue, setSelectedValue] = useState(step4peso);//peso Catalogo
  //const [dropselectedValue, setDropSelectedValue] = useState("");
  const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");
  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    //console.log("Measurement is", value);
  };

  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    //console.log("Measurement Value is", value);
  };

  //const DropdownhandleChange = (eventKey) => {
  //  setDropSelectedValue(eventKey);
  //  console.log("Dropdown Selected Value is ", eventKey);
  //};
  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {

    /*
    const [selectedValue, setSelectedValue] = useState(step4peso);//peso Catalogo
    const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");
    const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
    const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);
     */
    localStorage.setItem("step4Busta", formatoBuste);

    localStorage.setItem("step4peso", selectedValue);
    localStorage.setItem("step4Misure", measurement);
    localStorage.setItem("step4Stampa", isChecked ? 'cliente' : isChecked2 ? 'sa' : '');

    if (isChecked ) {
      navigate(`/Lettere/Step-6`);
    } 
    else if (isChecked2 ) {

      navigate(`/Cataloghi/Step-4-2`);
    }

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
        `${API_URL}/auth/addQA_cataloghi_step4a`,
        {
          id: userId,
          envelope_format: dropselectedValue,
          measurements: measurement,
          envelope_printing: EnvelopePrintingOption,
        }
      );
      */

      let res = {status : 200};

      if (res.status === 200) {
        //console.log("Sending Option ", sendoption)
        //console.log("Envelope Printing Option is", EnvelopePrintingOption);
        //console.log("Page Format is ", dropselectedValue);
        //console.log("measurements is ", measurement);
        handleRoutes();
        //SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,          url: "/Step-1" },
    { value: step2Quantity,       url: "/Step-2" },
    { value: nazione,             url: "/Step-3" },
    { value: "Dettaglio",         url: "/Cataloghi/Step-4" },
  ];

  const goBack = () => {
    navigate('/Step-3');
  };

  return (
    <>
     <div className="over-flow-setting" >
      <Navbar />
      <div>
        <Row className="step1-row">
          <ColonnaSx />
          <Col md={8} className="col-rhs">
            <div className="top-rhs">
              <ProgressBar now={now} />
            </div>

            <div className="col-rhs-inner">
              <div>
                <p className="step4-txt">
                  Step 4:
                  <span className="step4-txt-sp1">
                    {" "}
                    Dettagli delle buste da spedire
                  </span>
                </p>
                <p className="rhs-st4-des">
                  Qui puoi specificare le preferenze per la personalizzazione
                  delle tue buste. Scegli se fornire le buste già<br></br>{" "}
                  stampate o se preferisci che ci occupiamo noi della stampa
                </p>
              </div>
              <div className="rhs-form-peso-btn-body">
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
                        <label className="envelope-label">Formato Busta</label>

                        <div className="rhs-card-btn-body">
                          <div className="cards-rhs-row pb-4">
                            {busteCataloghi.map((busta) => (
                                <Col key={busta.id} onClick={() => handleFormatoBuste(busta.id)}
                                     className="cards-col">
                                  <div className={formatoBuste == busta.id ? "card-active" : "card"}>
                                    <img src={formatoBuste == busta.id ? busta.image : busta.imageInattiva}
                                         alt={busta.name} className="card-img"/>
                                  </div>
                                  <p className="option-txt">{busta.name}</p>
                                </Col>
                            ))}
                          </div>
                        </div>

                      </div>
                      <div
                          className={
                            formatoBuste == 6
                                ? "form-group pg-quantity-personalizzato"
                                : "d-none"
                          }
                      >
                        <label className="envelope-label">
                          Inserisci misure
                        </label>
                        <input
                            type="text"
                            className="form-control personalizzato-form"
                            id="exampleInputQuantity"
                            onChange={handlePersonalizzatoInput}
                            placeholder="es. 21cm x 21cm"
                            value={measurement}
                        />
                      </div>
                    </div>


                    <div className="printing-checks pb-4">
                      <label className="envelope-label ">
                        Stampa del catalogo
                      </label>

                      <div className="Printing-contain">
                        <div
                          className={
                            !isChecked
                              ? "Printing-check1"
                              : "Printing-check-border"
                          }
                        >
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
                              Stampato dal Cliente
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
                              Stampato da SpedireAdesso
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={isChecked ? "form-group pg-quantity-cataloghi" : "d-none"}
                    >
                      <label className="envelope-label">
                        Peso singolo catalogo
                      </label>
                      <input
                        type        ="text"
                        className       ="form-control peso-form"
                        id          ="exampleInputQuantity"
                        onChange    ={handleChange}
                        placeholder ="es. 90g"
                        value       ={selectedValue}
                      />
                      <div className="border-btm">

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
                  className={
                    selectedValue && (isChecked || isChecked2)
                      ? "btn-r2-active"
                      : "btn-r2"
                  }
                  onClick={nextstep}

                >
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
                      className={
                       selectedValue && (isChecked || isChecked2)
                          ? "btn-r2-active"
                          : "btn-r2"
                      }
                      onClick={nextstep}
                    >
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
