import React from "react";
import Form from "react-bootstrap/Form";
import "./Step2of5.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
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
  const step5Pagine   = localStorage.getItem("step5Pagine");

  //
  const step52Formato = localStorage.getItem("step52Formato");
  const step52Misure  = localStorage.getItem("step52Misure");
  const step52Quantita= localStorage.getItem("step52Quantita");
  const step52Stampa  = localStorage.getItem("step52Stampa");
  //fine variabili da passare tra i vari steps

  const [formatoFogli, setFormatoFogli] = useState(step52Formato);

  const bustaSelezionata = storedBuste.find(item => item.id == step4Busta);
  //console.log(bustaSelezionata.fogli); // Stampa ["Foglio A6", "Foglio A5", "Foglio A4"]
  const fogli = bustaSelezionata.fogli;

  const handleFormatoFogli = (cardno, name) => {
    console.log("handleFormatoFogli1 >> " + name  );
    setFormatoFogli((prevState) => (prevState === name ? null : name));
    console.log("handleFormatoFogli2 >>  " +formatoFogli);
  };


  const [sendItem, setItem] = useState();
  useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
  });
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(step52Quantita > 0 ? step52Quantita: "1");
  const [measurement, setmeasurementValue] = useState(step52Misure ? step52Misure : "");
  const [dropselectedValue, setDropSelectedValue] = useState("");

  const [isChecked, setIsChecked] = useState(   step52Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2] = useState( step52Stampa == 'sa'      ? true: false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    console.log("Page Quantity is", value);
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

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {

    localStorage.setItem("step52Formato",   formatoFogli);
    localStorage.setItem("step52Misure",    measurement);
    localStorage.setItem("step52Quantita",  selectedValue);

    if (isChecked && formatoFogli) {
      localStorage.setItem("step52Stampa",   "cliente");
      navigate(`/Lettere/Step-6`);
    }
    else if (isChecked2 && formatoFogli) {
      localStorage.setItem("step52Stampa",   "sa");
      navigate(`/Lettere/Step-5-3`);
    }
  };

  const goBack = () => {

    let opzione = sendoption;

    let step = step4Stampa === 'sa' ? "Step-4-2"  : "Step-4";

    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }

  };

  async function nextstep() {
    try {
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
                    Step 5:<span> Q.tà pagine interne </span>
                  </p>
                  <p className="rhs-des">
                    Fornisci i dettagli specifici sulle pagine che intendi
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
                          <label className="envelope-label">Formato Pagina (in base al tipo di busta selezionata)</label>

                          <div className="rhs-card-btn-body">
                            <div className="cards-rhs-row pb-4">
                              {fogli.map((item) => (
                                  <Col key={item.id} onClick={() => handleFormatoFogli(item.id, item.name)}
                                       className="cards-col">
                                    <div className={formatoFogli == item.name ? "card-active" : "card"}>
                                      <img src={formatoFogli == item.name ? item.image : item.imageInattiva}
                                           alt={busta.name} className="card-img"/>
                                    </div>
                                    <p className="option-txt">{item.name}</p>
                                  </Col>
                              ))}
                            </div>
                          </div>


                          {/*
                          <Dropdown onSelect={DropdownhandleChange}>
                            <Dropdown.Toggle
                              id="dropdown-basic"
                              className={
                                dropselectedValue === ""
                                  ? "custom-drop "
                                  : "custom-drop custom-drop-border"
                              }
                            >
                              {dropselectedValue === ""
                                ? "Seleziona"
                                : dropselectedValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {/* <Dropdown.Item eventKey="Seleziona">
                              Seleziona
                            </Dropdown.Item> * /}
                              <Dropdown.Item eventKey="Personalizzato">
                                Personalizzato
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="A4">A4</Dropdown.Item>
                              <Dropdown.Item eventKey="A6">A6</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          */}

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

                      {/* <div className="page-format-contain">
                        <label className="envelope-label">Formato Pagina</label>
                        <select
                          className={
                            selectedValue
                              ? "form-select form-envelope-border"
                              : "form-select form-envelope"
                          }
                          aria-label="Default select example"
                          onChange={handleChange}
                        >
                          <option>Seleziona</option>
                          <option value="1">A4</option>
                          <option value="2">Personalizzato</option>
                          <option value="3">A6</option>
                        </select>
                      </div>
                      <div
                        className={
                          selectedValue === "2"
                            ? "form-group pg-quantity"
                            : "d-none"
                        }
                      >
                        <label className="envelope-label">
                          Quantità pagine
                        </label>
                        <input
                          type="text"
                          className="form-control pg-quantity-form"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="es. 21cm x 21cm"
                        />
                      </div> */}

                      <div className="form-group pg-quantity printing-checks input-width">
                        <label className="envelope-label">
                          Quantità pagine (max 6)
                        </label>
                        <input
                          type="number"
                          className="form-control pg-quantity-form"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="max 6 fogli"
                            value={selectedValue}
                        />
                      </div>
                      <div className="printing-checks pb-4">
                        <label className="envelope-label ">
                          Stampa lettera interna
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
                              <label className={!isChecked ? "form-check-label" : "selected-check-bold" } htmlFor="flexCheckDefault1">
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
                                id="flexCheckDefault2"
                                checked={isChecked2}
                                onChange={() => {
                                  setIsChecked2(true);
                                  setIsChecked(false);
                                }}
                              />
                              <label  className={!isChecked2 ? "form-check-label" : "selected-check-bold" } htmlFor="flexCheckDefault2">
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
                    className={
                      selectedValue &&
                        selectedValue <=6 &&
                      formatoFogli &&
                      (isChecked || isChecked2)
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
                      selectedValue &&
                      selectedValue <=6 &&
                      formatoFogli &&
                      (isChecked || isChecked2)
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
