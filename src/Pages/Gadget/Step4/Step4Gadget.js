import React, {useRef} from "react";
import "./Step4Gadget.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/client";
import {ToastContainer} from "react-toastify";
import {ErrorToast, SuccessToast} from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";
export default function Step4Gadget() {
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

  const step4Colore   = localStorage.getItem("step4Colore");
  //fine variabili da passare tra i vari steps

  const [measurement, setmeasurementValue]  = useState(step4Misure  ? step4Misure : "");

  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);

  const [isCheckedCol1, setIsCheckedCol1] = useState(step4Colore == "Bianco/Nero" ? true: false);
  const [isCheckedCol2, setIsCheckedCol2] = useState(step4Colore == "Colore" ? true: false);

  const [formatoBuste, setFormatoBuste] = useState(step4Busta);

  const targetRef = useRef(null);
  const targetRefStampa = useRef(null);

  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSectionStampa = () => {
    if (targetRefStampa.current) {
      targetRefStampa.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const busteCataloghi  = JSON.parse(localStorage.getItem('busteGadget'));//recupero con JSON perchè è un array

  const handleFormatoBuste = (cardno) => {
    setFormatoBuste((prevState) => (prevState === cardno ? null : cardno));
  };

  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    //console.log("Measurement Value is", value);
  };

  const handleRoutes = () => {

    localStorage.setItem("step4Busta", formatoBuste);
    localStorage.setItem("step4Misure", measurement);
    localStorage.setItem("step4Stampa", isChecked ? 'cliente' : isChecked2 ? 'sa' : '');

    localStorage.setItem("step4Colore", isCheckedCol1 ? 'Bianco/Nero' : isCheckedCol2 ? 'Colore' : '');

    let bustax = busteCataloghi[formatoBuste-1].name;
    localStorage.setItem("busta", bustax);

    if( (((isCheckedCol1 || isCheckedCol2) && isChecked2) || isChecked)
        && formatoBuste
        && (formatoBuste != 6 || (formatoBuste == 6 && measurement)) ) {
      navigate(`/Gadget/Step-4-2`);
    }

  };

  const formValidation = () => {

    if (!formatoBuste) {
      ErrorToast("Seleziona il formato della busta");
      return false;
    }
    if (formatoBuste == 6 && measurement == "") {
      ErrorToast("Inserisci le misure");
      return false;
    }
    if (!isChecked && !isChecked2) {
      ErrorToast("Seleziona chi stampa le buste");
      return false;
    }
    if (isChecked2 && !isCheckedCol1 && !isCheckedCol2) {
      ErrorToast("Seleziona la qualità della stampa");
      return false;
    }
    return true
  }

  async function nextstep() {
    try {

      if (!formValidation()) {
        return;
      }

      /*
      const userId = localStorage.getItem("_id");
      const PostcardPrintingOption = isChecked
        ? "Stampate dal Cliente"
        : isChecked2
        ? "Stampate da Spedire Adesso"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_gadget_step4a`,
        {
          id: userId,
          printing_of_postcards: PostcardPrintingOption,
        }
      );

       */

      let res =  {status : 200};
      if (res.status === 200) {
        //console.log("Sending Option ", sendoption)
        //console.log("Postcards Printing Option is", PostcardPrintingOption);
        
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
    { value: "Dettaglio",         url: "/Gadget/Step-4" },
  ];

  useEffect(() => {
    if (isChecked2) {
      scrollToSection();
    }
    if(formatoBuste){
      scrollToSectionStampa();
    }
  }, [isChecked2,formatoBuste]);

  const goBack = () => {
    navigate('/Step-3');
  };


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
                  <p className="step4-txt">
                    Step 3:
                    <span className="step4-txt-sp1">
                      {" "}
                      Dettagli buste
                    </span>
                  </p>
                  <p className="rhs-st4-des">
                    Qui puoi specificare le preferenze per la personalizzazione
                    delle tue buste. Scegli se fornire le buste già<br></br>{" "}
                    stampate o se preferisci che ci occupiamo noi della stampa
                  </p>
                </div>
                <div className="rhs-form-gadget-btn-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">
                      <div
                          className={"page-format-contain"}>
                        <div className="form-group cartoline-form-drop-width">
                          <label className="envelope-label">Formato Busta</label>

                          <div className="rhs-card-btn-body">
                            <div className="cards-rhs-row pb-4">
                              {busteCataloghi.map((busta) => (
                                  <Col key={busta.id} onClick={() => handleFormatoBuste(busta.id)}
                                       className="cards-col">
                                    <div className={formatoBuste == busta.id ? "card1-active" : "card1"}>
                                      <img src={formatoBuste == busta.id ? busta.image : busta.imageInattiva}
                                           alt={busta.name} className="card-imgx"/>
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


                      <div  ref={targetRefStampa}  className="printing-checks pb-4">
                        <label className="envelope-label ">
                          Stampa delle buste
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
                                Stampate da SpedireAdesso
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div ref={targetRef} className={isChecked2 ? "" : "d-none"}>
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
                                        src={`${process.env.PUBLIC_URL}/Images/Step1/blackwhite-check.svg`}
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
                                    <img
                                        src={`${process.env.PUBLIC_URL}/Images/Step1/Color-check.svg`}
                                        alt="Colored"/>
                                  </div>
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
                        (((isCheckedCol1 || isCheckedCol2) && isChecked2) || isChecked)
                        && formatoBuste
                        && (formatoBuste != 6 || (formatoBuste == 6 && measurement))

                         ? "btn-r2-active" : "btn-r2"
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
                        (((isCheckedCol1 || isCheckedCol2) && isChecked2) || isChecked)
                        && formatoBuste
                        && (formatoBuste != 6 || (formatoBuste == 6 && measurement))

                         ? "btn-r2-active" : "btn-r2"
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
