import React from "react";
import "./Step6.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
//import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";
export default function Step6() {
  const now = 90;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const nazione       = localStorage.getItem("nazione");
  const step2Quantity = localStorage.getItem("step2Quantity");
  const busta         = localStorage.getItem("busta");

  const step4Stampa          = localStorage.getItem("step4Stampa");

  const step5Pagine          = localStorage.getItem("step5Pagine");
  const step5InternoColore   = localStorage.getItem("step5InternoColore");
  const step5InternoStampa   = localStorage.getItem("step5InternoStampa");
  //
  const step52Stampa  = localStorage.getItem("step52Stampa");

  const step6Dest     = localStorage.getItem("step6Dest");
  const step6Note     = localStorage.getItem("step6Note");
  //fine variabili da passare tra i vari steps

  //const location = useLocation();
  const navigate = useNavigate();
  const [sendItem, setItem] = useState();
  useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
    //console.log("step5Pagine is " + step5Pagine);
    //console.log("step52Stampa is " + step52Stampa);

  },[]);

  const [isChecked1, setIsChecked1] = useState(step6Dest === "csv" ? true: false);
  const [isChecked2, setIsChecked2] = useState(step6Dest === "partner" ? true: false);
  const [inputenote, setInputNote]    = useState(step6Note);

  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputNote(value);
    console.log("Note is", value);
  };
  const handleRoutes = () => {


    if (isChecked1){
      localStorage.setItem("step6Dest",   "csv");
    }
    if (isChecked2){
      localStorage.setItem("step6Dest",   "partner");
    }

    localStorage.setItem("step6Note",   inputenote);

    if (isChecked1 || isChecked2) {
      navigate(`/Lettere/Step-7`);
    }
  };

  const goBack = () => {

    let opzione = sendoption;

    //dallo step 6 posso tornare allo step 5-3, oppure 5-2 oppure 5
    //if(opzione === 'Lettere'){
    let step = step5Pagine == 2  ? "Step-5" : step52Stampa == 'sa' ? "Step-5-3" : "Step-5-2";
    if(opzione ==='Cartoline'){
      step = step4Stampa == "cliente"  ? "Step-4" :  "Step-4-2";
    }
    else if(opzione ==='Cataloghi'){
      step = step4Stampa == "cliente"  ? "Step-4" :  "Step-4-3";
    }
    else if(opzione ==='Gadget'){
      step = step4Stampa == "cliente"  ? "Step-4" :  "Step-4-2";
    }


    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }

  };

  async function nextstep() {
    try {
      /*
      const userId = localStorage.getItem("_id");
      const RecipientList = isChecked1
        ? "Provided By Customer"
        : isChecked2
        ? "Provided By Partner"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step6`,
        {
          id: userId,
          file_customer: RecipientList,
          note: inputenote,
        }
      ); */
        let res = {status:200};
      if (res.status === 200) {
        //console.log("Recipient  ", RecipientList);
        //console.log("Note is ", inputenote)
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
    { value: "Destinatari",     url: "/Lettere/Step-6" },
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

              <div className="col-rhs6-inner">
                <div>
                  <p className="step1-txt">
                    Step 6:<span> Elenco destinatari </span>
                  </p>
                  <p className="rhs-des">
                    In questo importante passaggio, ti chiediamo i dettagli per
                    l'elenco completo dei destinatari.
                  </p>
                </div>
                <div></div>
                <div className="rhs6-card-btn-body">
                  <div className="Textarea-radio-whole">
                    <div>
                      <form className="form-envelope-main">
                        <div className={!isChecked1 ? "Printing-check1" : "Printing-check-border"}>
                          <div className="form-check6">
                            <input
                                className="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isChecked1}
                              onChange={() => {
                                setIsChecked1(true);
                                setIsChecked2(false);
                              }}
                              id="flexCheckDefault1"
                            />
                            <label className="form-check-label " htmlFor="flexCheckDefault1">
                              <div className={isChecked1 ? "label-head-bold" : "label-head"}>
                                Forniti dal Cliente (file CSV, Excel)
                              </div>
                              <div className="label-subhead">
                                Se hai già un elenco preciso dei destinatari,
                                puoi caricare direttamente i dati<br></br>{" "}
                                utilizzando un file in formato CSV o Excel.
                                Assicurati che il file contenga tutte le
                                <br></br> informazioni necessarie.
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className={!isChecked2 ? "Printing-check1 st6-check" : "Printing-check-border st6-check" }>
                          <div className="form-check6">
                            <input
                                className="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isChecked2}
                              onChange={() => {
                                setIsChecked2(true);
                                setIsChecked1(false);
                              }}
                              id="flexCheckDefault2"
                            />
                            <label className="form-check-label " htmlFor="flexCheckDefault2" >
                              <div className={isChecked2 ? "label-head-bold" : "label-head"}>
                                Forniti da un nostro partner
                              </div>
                              <div className="label-subhead">
                                Se non disponi di un elenco specifico dei
                                destinatari o desideri raggiungere un<br></br>{" "}
                                pubblico più ampio in determinate aree
                                geografiche, possiamo aiutarti a<br></br>{" "}
                                identificare i destinatari in base ai Codici di
                                Avviamento Postale (CAP) che fornisci.
                              </div>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="pb-4">
                      <form className="form-group">
                        <label className="textarea-label">Note</label>
                        <textarea
                            className="form-control form-textarea"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            cols="85"
                            placeholder="Lascia una nota con le specifiche dei destinatari"
                            onChange={handleChange}
                            value={inputenote}
                        >
                        </textarea>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div">
                <button className={isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100">
                <div>
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                <button className={isChecked1 || isChecked2 ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
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