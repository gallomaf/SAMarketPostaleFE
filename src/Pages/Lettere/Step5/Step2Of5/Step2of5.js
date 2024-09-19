import React, {useRef} from "react";
//import Form from "react-bootstrap/Form";
import "./Step2of5.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import Dropdown from "react-bootstrap/Dropdown";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
//import { API_URL } from "../../../../services/client";
//import axios from "axios";
//import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
import {ToastContainer} from "react-toastify";
import { ErrorToast } from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx"
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";

export default function Step2of5() {
  const now = 75;


  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const nazione       = localStorage.getItem("nazione");
  const step2Quantity = localStorage.getItem("step2Quantity");
  const busta         = localStorage.getItem("busta");
  const step4Busta    = localStorage.getItem("step4Busta");

  const storedBuste          = JSON.parse(localStorage.getItem('buste'));//recupero con JSON perchè è un array
  const step4Stampa   = localStorage.getItem("step4Stampa");
  //const step5Pagine   = localStorage.getItem("step5Pagine");

  //
  const step52Formato = localStorage.getItem("step52Formato");
  const step52Misure  = localStorage.getItem("step52Misure");
  const step52Quantita= localStorage.getItem("step52Quantita");
  const step52Stampa  = localStorage.getItem("step52Stampa");

  const step5InternoColore   = localStorage.getItem("step5InternoColore");
  const step5InternoStampa   = localStorage.getItem("step5InternoStampa");

  //fine variabili da passare tra i vari steps

  const [formatoFogli, setFormatoFogli] = useState(step52Formato);

  const bustaSelezionata = storedBuste.find(item => item.id == step4Busta);
  //console.log(bustaSelezionata.fogli); // Stampa ["Foglio A6", "Foglio A5", "Foglio A4"]
  const fogli = bustaSelezionata.fogli;

  const handleFormatoFogli = (cardno, name) => {
    //console.log("handleFormatoFogli1 >> " + name  );
    setFormatoFogli((prevState) => (prevState === name ? null : name));
    //console.log("handleFormatoFogli2 >>  " +formatoFogli);
  };

  const targetRef = useRef(null);
  const targetRef2 = useRef(null);

  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(step52Quantita > 0 ? step52Quantita: "1");
  const [measurement, setmeasurementValue] = useState(step52Misure ? step52Misure : "");
  const [dropselectedValue, setDropSelectedValue] = useState("");

  const [isChecked,   setIsChecked]   = useState( step52Stampa == 'cliente' ? true: false);
  const [isChecked2,  setIsChecked2]  = useState( step52Stampa == 'sa'      ? true: false);

  const [isCheckedCol1, setIsCheckedCol1]   = useState(step5InternoColore == "bn"         ? true: false);
  const [isCheckedCol2, setIsCheckedCol2]   = useState(step5InternoColore == "colore"     ? true: false);

  const [isCheckedR1, setIsCheckedR1] = useState(step5InternoStampa == "solofronte" ? true: false);
  const [isCheckedR2, setIsCheckedR2] = useState(step5InternoStampa == "fronteretro"? true: false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    //console.log("Page Quantity is", value);
  };
  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
   // console.log("Measurement Value is", value);
  };
  const DropdownhandleChange = (eventKey) => {
    setDropSelectedValue(eventKey);
    //console.log("Dropdown Selected Value is ", eventKey);
  };


  useEffect(() => {
    if (formatoFogli) {
      scrollToSection();
    }
    if (isChecked2 && formatoFogli) {
      scrollToSection2();
    }
  }, [formatoFogli,isChecked2]);


  const scrollToSection = () => {
    console.log("scrollToSection");
    console.log(formatoFogli);
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const scrollToSection2 = () => {
    if (targetRef2.current) {
      targetRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleRoutes = () => {

    localStorage.setItem("step52Formato",   formatoFogli);
    localStorage.setItem("step52Misure",    measurement);
    localStorage.setItem("step52Quantita",  selectedValue);

    if (isCheckedCol1){
      localStorage.setItem("step5InternoColore",   "bn");
    }
    else if (isCheckedCol2){
      localStorage.setItem("step5InternoColore",   "colore");
    }

    if (isCheckedR1){
      localStorage.setItem("step5InternoStampa",   "solofronte");
    }
    else if (isCheckedR2){
      localStorage.setItem("step5InternoStampa",   "fronteretro");
    }

    if ( isChecked && formatoFogli) {
      localStorage.setItem("step52Stampa",   "cliente");
      localStorage.setItem("step5InternoStampa",   "");
      localStorage.setItem("step5InternoColore",   "");
      navigate(`/Lettere/Step-6`);
    }
    else if (isChecked2 && ( isCheckedCol1 || isCheckedCol2 ) && (isCheckedR1 || isCheckedR2) && formatoFogli) {
      localStorage.setItem("step52Stampa",   "sa");
      navigate(`/Lettere/Step-6`);
    }

  };

  const goBack = () => {

    let opzione = sendoption;

    let step = step4Stampa === 'sa' ? "Step-4"  : "Step-4"; //abbiamo abolito lo Step-4-2

    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }

  };

  const formValidation = () => {

        if (!formatoFogli) {
        ErrorToast("Seleziona il formato dei fogli");
        return false;
        }
        if (formatoFogli === "Personalizzato" && !measurement) {
        ErrorToast("Inserisci le misure personalizzate");
        return false;
        }
        if (!selectedValue) {
        ErrorToast("Inserisci la quantità di fogli");
        return false;
        }
        if (selectedValue > 6) {
        ErrorToast("La quantità massima di fogli è 6");
        return false;
        }
        if (!isChecked && !isChecked2) {
          ErrorToast("Seleziona chi deve stampare i fogli interni");
        return false;
        }
        if (isChecked2 && !isCheckedCol1 && !isCheckedCol2) {
        ErrorToast("Seleziona la Qualità di Stampa");
        return false;
        }
        if (isChecked2 && !isCheckedR1 && !isCheckedR2) {
        ErrorToast("Seleziona il Tipo di Stampa");
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
      const InternalLetterPrinting = isChecked
        ? "Stampate dal Cliente"
        : isChecked2
        ? "Stampate da Spedire Adesso"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step5a`,
        {
          id: userId,
          page_Format: dropselectedValue,
          measurements: measurement,
          number_of_pages: selectedValue,
          printing_of_internal_letter: InternalLetterPrinting,
        }
      ); */

        let res = {status:200};
      if (res.status === 200) {
        //console.log("Page Format is ", dropselectedValue);
        //console.log("Measurement Value is", measurement);
        //console.log("Number of pages :", selectedValue);
        //console.log("Internal Letter Printing Option is", InternalLetterPrinting);

        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,    url: "/Step-1" },
    { value: step2Quantity, url: "/Step-2" },
    { value: nazione,       url: "/Step-3" },
    { value: busta,         url: "/Lettere/Step-4" },
    { value: "Interno",     url: "/Lettere/Step-5-2" },
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

              <div className="col-rhs-inner-custom">
                <div>
                  <p className="step1-txt">
                    Step 4:<span> Dettagli fogli interni </span>
                  </p>
                  <p className="rhs-des">
                    Fornisci i dettagli specifici sui fogli che intendi
                    includere all'interno delle tue buste.
                  </p>
                </div>
                <div className="rhs5-card-btn-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">
                      <div
                          className={
                            dropselectedValue === "Personalizzato"
                                ? "page-format-contain"
                                : ""
                          }
                      >
                        <div className="form-group form-width ">
                          <label className="envelope-label">Formato fogli (in base al tipo di busta selezionata)</label>

                          <div className="rhs-card-btn-body">
                            <div className="cards-rhs-row pb-4">
                              {fogli.map((item) => (
                                  <Col key={item.id} onClick={() => handleFormatoFogli(item.id, item.name)}
                                       className="cards-col">
                                    <div className={formatoFogli == item.name ?  "card1-active" : "card1"  }>
                                      <img src={formatoFogli == item.name ? item.image : item.imageInattiva}
                                           alt={busta.name} className="card-imgx"/>
                                    </div>
                                    <p className="option-txt">{item.name}</p>
                                  </Col>
                              ))}
                            </div>
                          </div>

                        </div>
                        <div className={formatoFogli === "Personalizzato" ? "form-group pg-quantity" : "d-none"}>
                          <label className="envelope-label">
                            Misure Personalizzate
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
                        <label className="envelope-label">
                          Quantità fogli (max 6)
                        </label>
                        <input
                            type="number"
                            max="6"
                            min="1"
                            className="form-control ship-quantity-form ship-width"
                            id="exampleInputQuantity"
                            onChange={handleChange}
                            placeholder="max 6 fogli"
                            value={selectedValue}
                        />
                      </div>

                      <div className="printing-checks pb-4" ref={targetRef}>
                        <label className="envelope-label ">
                          Stampa fogli interni
                        </label>
                        <div className="Printing-contain">
                          <div className={!isChecked ? "Printing-check1" : "Printing-check-border"}>
                            <div className="form-check">
                              <input className="form-check-input " type="checkbox" value=""
                                     checked={isChecked} onChange={() => {
                                setIsChecked(true);
                                setIsChecked2(false);
                              }}
                                     id="flexCheckDefault1"
                              />
                              <label className={!isChecked ? "form-check-label" : "selected-check-bold"}
                                     htmlFor="flexCheckDefault1">
                                Stampati dal Cliente
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
                                  id="flexCheckDefault2"
                                  checked={isChecked2}
                                  onChange={() => {
                                    setIsChecked2(true);
                                    setIsChecked(false);
                                  }}
                              />
                              <label className={!isChecked2 ? "form-check-label" : "selected-check-bold"}
                                     htmlFor="flexCheckDefault2">
                                Stampati da Spedire Adesso
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={isChecked2 ? "" : "d-none"}>

                        <div className="printing-checks pb-4" ref={targetRef2}>
                          <label className="p-envelope-label ">
                            Qualità della stampa
                          </label>
                          <div className="Printing-contain">
                            <div className={!isCheckedCol1 ? "Printing-check1" : "Printing-check-border"}>
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
                                  <label className={!isCheckedCol1 ? "form-check-label " : "selected-check-bold"} htmlFor="flexRadioDefault1">
                                    Bianco/Nero
                                  </label>
                                  <img src="/Images/Step1/blackwhite-check.svg" alt="Bianco/Nero"/>
                                </div>
                              </div>
                            </div>

                            <div className={!isCheckedCol2 ? "Printing-check2" : "Printing-check-border2"}>
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
                                  <label className={!isCheckedCol2 ? "form-check-label " : "selected-check-bold"} htmlFor="flexRadioDefault2">
                                    Colore
                                  </label>
                                  <img src="/Images/Step1/Color-check.svg" alt="Colored"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="printing-checks pb-4">
                          <label className="p-envelope-label ">
                            Tipo di Stampa
                          </label>

                          <div className="Printing-contain-r2">
                            <div className={!isCheckedR1 ? "Printing-check1" : "Printing-check-border"}>
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefaultR1"
                                    id="flexRadioDefaultR1"
                                    checked={isCheckedR1}
                                    onChange={() => {
                                      setIsCheckedR1(true);
                                      setIsCheckedR2(false);
                                    }}
                                />

                                <label className={!isCheckedR1 ? "form-check-label " : "selected-check-bold"}
                                       htmlFor="flexRadioDefaultR1">
                                  Solo fronte
                                </label>
                              </div>
                            </div>

                            <div className={!isCheckedR2 ? "Printing-check2" : "Printing-check-border2"}>
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefaultR2"
                                    id="flexRadioDefaultR2"
                                    checked={isCheckedR2}
                                    onChange={() => {
                                      setIsCheckedR2(true);
                                      setIsCheckedR1(false);
                                    }}/>

                                <label className={!isCheckedR2 ? "form-check-label " : "selected-check-bold"}
                                       htmlFor="flexRadioDefaultR2">
                                  Fronte/retro
                                </label>
                              </div>
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
                      className={
                        formatoFogli &&
                        selectedValue &&
                        selectedValue <= 6 &&
                        ( isChecked || (isChecked2 && ( isCheckedCol1 || isCheckedCol2) && (isCheckedR1 || isCheckedR2) ))
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
                        formatoFogli &&
                        selectedValue &&
                        selectedValue <= 6 &&
                        ( isChecked || (isChecked2 && ( isCheckedCol1 || isCheckedCol2) && (isCheckedR1 || isCheckedR2) ))
                            ? "btn-r2-active"
                            : "btn-r2"
                      }
                      onClick={nextstep}
                  >
                    Avanti
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
