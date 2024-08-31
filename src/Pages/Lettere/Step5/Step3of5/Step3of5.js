import React from "react";
import Form from "react-bootstrap/Form";
import "./Step3of5.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";
export default function Step3of5() {
  const now = 75;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const nazione       = localStorage.getItem("nazione");
  const step2Quantity = localStorage.getItem("step2Quantity");
  const busta         = localStorage.getItem("busta");
  const step4Stampa   = localStorage.getItem("step4Stampa");


  const step5InternoColore   = localStorage.getItem("step5InternoColore");
  const step5InternoStampa   = localStorage.getItem("step5InternoStampa");
  const step6Dest   = localStorage.getItem("step6Dest");
  //fine variabili da passare tra i vari steps


  const [sendItem, setItem] = useState();
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1]   = useState(step5InternoColore == "bn"         ? true: false);
  const [isChecked2, setIsChecked2]   = useState(step5InternoColore == "colore"     ? true: false);
  const [isCheckedR1, setIsCheckedR1] = useState(step5InternoStampa == "solofronte" ? true: false);
  const [isCheckedR2, setIsCheckedR2] = useState(step5InternoStampa == "fronteretro"? true: false);
  const location = useLocation();

  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");

  const handleRoutes = () => {

    if (isChecked1){
      localStorage.setItem("step5InternoColore",   "bn");
    }
    else if (isChecked2){
      localStorage.setItem("step5InternoColore",   "colore");
    }

    if (isCheckedR1){
      localStorage.setItem("step5InternoStampa",   "solofronte");
    }
    else if (isCheckedR2){
      localStorage.setItem("step5InternoStampa",   "fronteretro");
    }

    if ((isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2)) {
      navigate(`/Lettere/Step-6`);
    }
  };

  const goBack = () => {
    //console.log("goBack /Lettere/Step-5-2");
    let opzione = sendoption;
    let step    =  "Step-5-2" ;
    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }
  };

  async function nextstep() {
    try {
      /*
      const userId = localStorage.getItem("_id");
      const PrintQuality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
        ? "Colore"
        : "";
      const PrintType = isCheckedR1
        ? "Solo fronte"
        : isCheckedR2
        ? "Fronte/retro"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step5b`,
        {
          id: userId,
          print_quality: PrintQuality,
          type_of_printing: PrintType,
        }
      ); */
        let res = { status: 200 };
      if (res.status === 200) {
        //console.log("Printing  Quality :", PrintQuality);
        //console.log("Printing Type :", PrintType);

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
      <div className="over-flow-setting">
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
                  <p className="step1-txt">
                    Step 5:<span> Stampa lettera interna </span>
                  </p>
                  <p className="rhs-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>
                <div className="rhs5-card-btn-body">
                  <div>
                    <form className="form-envelope-main">
                      <div className="printing-checks-contain">
                        <label className="p-envelope-label ">
                          Qualità della stampa
                        </label>
                        <div className="Printing-contain-r1">
                          <div
                            className={
                              !isChecked1
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
                                checked={isChecked1}
                                onChange={() => {
                                  setIsChecked1(true);
                                  setIsChecked2(false);
                                }}
                              />
                              <div className="label-img ">
                                <label
                                  className={
                                    !isChecked1
                                      ? "form-check-label "
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

                          <div className={!isChecked2 ? "Printing-check2" : "Printing-check-border2"}>
                            <div className="form-check">
                              <input
                                  className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked={isChecked2}
                                onChange={() => {
                                  setIsChecked2(true);
                                  setIsChecked1(false);
                                }}
                              />
                              <div className="label-img">
                                <label className={!isChecked2 ? "form-check-label " : "selected-check-bold"} htmlFor="flexRadioDefault2">
                                  Colore
                                </label>
                                <img
                                  src="/Images/Step1/Color-check.svg"
                                  alt="Colored"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="printing-checks-contain check-row2">
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

                              <label className={!isCheckedR1 ? "form-check-label " : "selected-check-bold"} htmlFor="flexRadioDefaultR1">
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

                              <label className={!isCheckedR2 ? "form-check-label " : "selected-check-bold"} htmlFor="flexRadioDefaultR2">
                                Fronte/retro
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/*
                  <div className="btn-img-rhs pb-4">
                    <div></div>
                    <div
                      className={
                        (isChecked1 || isChecked2) &&
                        (isCheckedR1 || isCheckedR2)
                          ? "envelope-img"
                          : "d-none"
                      }
                    >
                      <img src="/Images/Step1/Paper.svg" alt="Envelope" />
                    </div>
                  </div>
                  */}

                </div>
              </div>
              <div className="btns-envelope">
                <div className={(isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) ? "envelope-img" : "d-none"}>
                  <img src="/Images/Step1/Paper.svg" alt="Envelope" />
                </div>
                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={goBack}>Indietro</button>
                  </div>
                  <div className="btn2-div">
                  <button className={(isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
                      Avanti
                    </button>
                  </div>
                </div>
              </div>

              <div className="btn-rhs-row w-100">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                <button className={(isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
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
