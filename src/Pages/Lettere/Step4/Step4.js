import React from "react";
import "./Step4.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

//import { useSearchParams, useLocation, useParams } from "react-router-dom";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
//import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";

export default function Step4() {
  const navigate = useNavigate();
  const now = 60;
  const [sendItem, setItem] = useState();

  const [selectedValue, setSelectedValue] = useState("");
  const [dropselectedValue, setDropSelectedValue] = useState("");
  const [measurement, setmeasurementValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    console.log("Selected is", value);
  };
  const DropdownhandleChange = (eventKey) => {
    setDropSelectedValue(eventKey);
    console.log("Dropdown Selected Value is ", eventKey);
  };

  const handlePersonalizzatoInput = (e) => {
    const value = e.target.value;
    setmeasurementValue(value);
    console.log("Measurement Value is", value);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sendoption = queryParams.get("sendoption");
  const handleRoutes = () => {
    if (isChecked && dropselectedValue) {
      navigate(`/Lettere/Step-5?sendoption=${sendoption}`);
    } else if (isChecked2 && dropselectedValue) {
      navigate(`/Lettere/Step-4-2?sendoption=${sendoption}`);
    }
  };

  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });
  async function nextstep() {
    try {
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
          envelope_format: dropselectedValue,
          envelope_printing: EnvelopePrintingOption,
          measurements: measurement,
        }
      );
      if (res.status === 200) {
        console.log("Envelope Printion Option is", EnvelopePrintingOption);
        console.log("Page Format is ", dropselectedValue);
        console.log("Measurement is ", measurement);
        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="over-flow-setting">
        <Navbar />
        <div>
          <Row className="step1-row">
            <Col md={4} className="col-lhs">
              <div className="col-lhs-inner">
                <div className="lhs-img">
                  <img src="/Images/Step1/send-img.svg" alt="send" />
                </div>
                <div>
                  <p className="heading-lhs">
                    Richiesta preventivo{" "}
                    <span>
                      {" "}
                      posta<br></br> massiva e pubblicitaria
                    </span>{" "}
                  </p>
                  <p className="des-lhs">
                    Attraverso questo modulo è possibile<br></br>
                    <span>richiedere un preventivo </span> per l'
                    <span>
                      invio di posta<br></br> massiva e posta pubblicitaria,
                    </span>{" "}
                    e se richiesto
                    <br></br> anche la
                    <span> stampa ed imbustamento.</span> <br></br>
                    <br></br> Il servizio include il recapito in pochi giorni
                    <br></br> della corrispondenza nelle cassette postali dei
                    <br></br>
                    destinatari indicati.
                  </p>
                </div>
              </div>
              <div>
                <p className="des-sub-lhs">
                  Per maggiori informazioni su questo
                  <span>
                    {" "}
                    nuovo<br></br> servizio postale clicca qui .
                  </span>
                </p>
              </div>
            </Col>
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
                      Dettagli delle buste da spedire{" "}
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
                      <div
                        className={
                          dropselectedValue === "Personalizzato"
                            ? "page-format-contain"
                            : ""
                        }
                      >
                        <div className="form-group form-width ">
                          <label className="envelope-label">
                            Formato Buste
                          </label>

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
                              <Dropdown.Item eventKey="Busta DL (110 x 220 mm)">
                                Busta DL (110 x 220 mm)
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="A6">A6</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div
                          class={
                            dropselectedValue === "Personalizzato"
                              ? "form-group pg-quantity"
                              : "d-none"
                          }
                        >
                          <label className="envelope-label">Dimensioni buste</label>
                          <input
                            type="text"
                            class="form-control personalizzato-form"
                            id="exampleInputQuantity"
                            onChange={handlePersonalizzatoInput}
                            placeholder="es. 21cm x 21cm"
                          />
                        </div>
                      </div>

                      {/* <div className="page-format-contain">
                        <label className="envelope-label">Formato Pagina</label>
                        <select
                          class={
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
                        class={
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
                          class="form-control pg-quantity-form"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="es. 21cm x 21cm"
                        />
                      </div> */}

                      <div className="printing-checks">
                        <label className="envelope-label ">
                          Stampa delle buste
                        </label>

                        <div className="Printing-contain pb-4 ">
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
                                className={
                                  !isChecked
                                    ? "form-check-label"
                                    : "selected-check-bold"
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
                                className={
                                  !isChecked2
                                    ? "form-check-label"
                                    : "selected-check-bold"
                                }
                                for="flexCheckDefault2"
                              >
                                Stampate da Spedire Adesso
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <div>
                    <form className="form-envelope-main">
                      <div className="form-group">
                        <label className="envelope-label">Formato Busta</label>
                        <Dropdown onSelect={DropdownhandleChange}>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className={
                              dropselectedValue === "Seleziona"
                                ? "custom-drop "
                                : "custom-drop custom-drop-border"
                            }
                          >
                            {dropselectedValue}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="Seleziona">
                              Seleziona
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Personalizzato">
                              Personalizzato
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="A4">A4</Dropdown.Item>
                            <Dropdown.Item eventKey="A6">A6</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <select
                      class={
                        selectedValue
                          ? "form-select form-envelope-border"
                          : "form-select form-envelope"
                      }
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option selected>Seleziona</option>
                      <option value="1">Busta DL (110 x 220 mm)</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>

                      <div className="printing-checks">
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
                                class="form-check-label "
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
                                class="form-check-label"
                                for="flexCheckDefault2"
                              >
                                Stampate da SpedireAdesso
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
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
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
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
                        navigate("/");
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
                    &gt;{" "}
                    <span
                      onClick={() => {
                        navigate(`/Step-3?sendoption=${sendItem}`);
                      }}
                    >
                      {" "}
                      Nazione Destinatari
                    </span>{" "}
                    &gt;
                    <span className="selected-span"> Dettaglio Buste</span>
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
