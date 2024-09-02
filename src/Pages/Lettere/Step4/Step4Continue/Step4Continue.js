import React from "react";
import "./Step4Continue.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState,useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../../services/client";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";

export default function Step4Continue() {

  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");
  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");
  const busta         = localStorage.getItem("busta");

  const step4Colore     = localStorage.getItem("step4Colore");
  const step4Tipo       = localStorage.getItem("step4Tipo");
  const step4Grammatura = localStorage.getItem("step4Grammatura");
  //fine variabili da passare tra i vari steps

  const navigate    = useNavigate();
  //const [sendItem,setItem]=useState();

  //useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
    //console.log("step4Colore is " + step4Colore);
   //},[]);

  const [selectedValue, setSelectedValue] = useState("");
  const [isChecked1, setIsChecked1]     = useState(step4Colore == "Bianco/Nero" ? true: false);
  const [isChecked2, setIsChecked2]     = useState(step4Colore == "Colore" ? true: false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    //console.log("Selected is", value);
  };
  const location = useLocation();

  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);

  const handleRoutes = () => {

    if (isChecked1){
      localStorage.setItem("step4Colore",   "Bianco/Nero");
    }
    if (isChecked2){
      localStorage.setItem("step4Colore",   "Colore");
    }
    if (isChecked1 || isChecked2) {
      //console.log("isChecked1 " + isChecked1 + " isChecked2 " + isChecked2);
      navigate(`/Lettere/Step-5-2`);
    }
  };

  const goBack = () => {

    //console.log("goBack /Lettere/Step-4");
    let opzione = sendoption;

    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/Step-4");
    }

  };

  async function nextstep() {
    try {
      /*
      const userId = localStorage.getItem("_id");
      const EnvelopePrintingOption = isChecked1 ? "Bianco/Nero" : isChecked2 ? "Colore" : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step4b`,
        {
          id: userId,
          print_quality:EnvelopePrintingOption
        }
      );
      */

      let res_status = 200;
      if (res_status === 200) {
        //console.log("Print Quality is", EnvelopePrintingOption);
        //toast.success('This is a success toast');
        handleRoutes();
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
                  <p className="step4-txt">
                    Step 4:
                    <span className="step4-txt-sp1"> Stampa logo sulla busta</span>
                  </p>
                  <p className="rhs-st4-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>
                <div className="rhs-form-cont-btn-body">
                  <div>
                    <form className="form-envelope-main">
                      <div className="printing-checks-contain">
                        <label className="p-envelope-label ">
                          Qualità della stampa
                        </label>

                        <div className="Printing-contain">
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
                              !isChecked2
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
                                checked={isChecked2}
                                onChange={() => {
                                  setIsChecked2(true);
                                  setIsChecked1(false);
                                }}
                              />
                              <div className="label-img">
                                <label className={ !isChecked2  ? "form-check-label"  : "selected-check-bold" } htmlFor="flexRadioDefault2">
                                  Colore
                                </label>
                                <img  src="/Images/Step1/Color-check.svg" alt="Colored"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="btn-img-rhs mb-4 ">

                    <div className={isChecked1 ? "d-block mb-4 " : "d-none"}>
                      <img className="step2__img" src="/Images/Step1/italia.svg.svg" alt="Envelope"/>
                    </div>

                    <div className={isChecked2 ? "d-block mb-4 " : "d-none"}>
                      <img className="step2__img" src="/Images/Step1/Italia-active.svg" alt="Envelope"/>
                    </div>

                  </div>
                </div>
              </div>

              <div className="btns-envelope  ">
                {/* <div
                  className={
                    isChecked1 || isChecked2 ? "envelope-img me-4" : "d-none"
                  }
                >
                  <img src="/Images/Step1/envelope-mb.svg" alt="Envelope" />
                </div> */}
                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={goBack}>Indietro</button>
                  </div>
                  <div className="btn2-div">
                    <button className={ isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"} onClick = {nextstep}>
                      Avanti
                    </button>
                  </div>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                  <button className={ isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"}     onClick={nextstep}>
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
