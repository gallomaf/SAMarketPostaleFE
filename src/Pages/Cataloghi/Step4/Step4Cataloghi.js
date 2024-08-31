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

export default function Step4Cataloghi() {
  const navigate = useNavigate();
  const now = 60;
  const [sendItem, setItem] = useState();
  
  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });

  const [selectedValue, setSelectedValue] = useState("");
  const [dropselectedValue, setDropSelectedValue] = useState("");
  const [measurement, setmeasurementValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    console.log("Measurement is", value);
  };

  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    console.log("Measurement Value is", value);
  };

  const DropdownhandleChange = (eventKey) => {
    setDropSelectedValue(eventKey);
    console.log("Dropdown Selected Value is ", eventKey);
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  console.log("this is ", sendoption);
  const handleRoutes = () => {
    if (isChecked ) {
      navigate(`/Cartoline/Step-5?sendoption=${sendoption}`);
    } 
    else if (isChecked2 ) {
      navigate(`/Cataloghi/Step-4-2?sendoption=${sendoption}`);
    } 
  };
  async function nextstep() {
    try {
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
      if (res.status === 200) {
        console.log("Sending Option ", sendoption)
        console.log("Envelope Printing Option is", EnvelopePrintingOption);
        console.log("Page Format is ", dropselectedValue);
        console.log("measurements is ", measurement);
        handleRoutes();
        SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                        dropselectedValue === "Personalizzato"
                          ? "page-format-contain"
                          : ""
                      }
                    >
                      <div className="form-group cartoline-form-drop-width">
                        <label className="envelope-label">Formato Busta</label>

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
                            </Dropdown.Item> */}
                            <Dropdown.Item eventKey="Personalizzato">
                              Personalizzato
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="A4">A4</Dropdown.Item>
                            <Dropdown.Item eventKey="A6">A6</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div
                        class={
                          dropselectedValue === "Personalizzato"
                            ? "form-group pg-quantity-personalizzato"
                            : "d-none"
                        }
                      >
                        <label className="envelope-label">
                          Inserisci misure
                        </label>
                        <input
                          type="text"
                          class="form-control personalizzato-form"
                          id="exampleInputQuantity"
                          onChange={handlePersonalizzatoInput}
                          placeholder="es. 21cm x 21cm"
                        />
                      </div>
                    </div>

                 
                    <div className="printing-checks pb-4">
                      <label className="envelope-label ">
                        Stampa delle cartoline
                      </label>

                      <div className="Printing-contain">
                        <div
                          className={
                            !isChecked
                              ? "Printing-check1"
                              : "Printing-check-border"
                          }
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input "
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
                              class={
                                !isChecked
                                  ? "form-check-label"
                                  : "selected-ans-label"
                              }
                              for="flexCheckDefault1"
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
                          <div class="form-check">
                            <input
                              class="form-check-input printing-checkbox"
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
                              class={
                                !isChecked2
                                  ? "form-check-label"
                                  : "selected-ans-label"
                              }
                              for="flexCheckDefault2"
                            >
                              Stampate da SpedireAdesso
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class={isChecked ? "form-group pg-quantity-cataloghi" : "d-none"}
                    >
                      <label className="envelope-label">
                        Peso singolo catalogo
                      </label>
                      <input
                        type="text"
                        class="form-control peso-form"
                        id="exampleInputQuantity"
                        onChange={handleChange}
                        placeholder="es. 90g"
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
                <button className="btn-r1"  onClick={()=>(navigate(-1))}>Indietro</button>
              </div>
              <div className="btn2-div">
                <button
                  className={
                  dropselectedValue && (isChecked || isChecked2)
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
                    <button className="btn-r1"  onClick={()=>(navigate(-1))}>Indietro</button>
                  </div>
                  <div className="btn2-div w-100">
                    <button
                      className={
                       dropselectedValue && (isChecked || isChecked2)
                          ? "btn-r2-active"
                          : "btn-r2"
                      }
                      onClick={nextstep}
                    >
                      Avanti
                    </button>
                  </div>
                </div>
            <div className="btm-rhs">
              <div>
              <p className="quotation-req">
                    Richiesta Preventivo &gt;{" "}
                    <span
                      onClick={() => {
                        navigate(`/?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Cosa devi spedire?{" "}
                    </span>{" "}
                    &gt;
                    <span
                      onClick={() => {
                        navigate(`/Step-2?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Q.tà
                    </span>{" "}
                    &gt;
                    <span
                     onClick={() => {
                      navigate(`/Step-3?sendoption=${sendItem}`);
                    }}
                    >
                      {" "}
                      Nazione Destinatari
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Dettaglio </span>
                  </p>
              </div>
              <div className="step1-progress">
                <ProgressBar now={now} />
                <p className="percentage-txt">{now}%</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
}
