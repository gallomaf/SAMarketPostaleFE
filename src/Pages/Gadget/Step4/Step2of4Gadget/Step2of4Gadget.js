import React from "react";
import "./Step2of4Gadget.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../services/client";
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
export default function Step2of4Gadget() {
  const navigate = useNavigate();
  const now = 60;
  const [sendItem, setItem] = useState();

  useEffect(() => {
    setItem(localStorage.getItem("sendoption"));
  });

  const [selectedValue, setSelectedValue] = useState("");
  const [gadgetweight, setGadgetWeight] = useState("");
  const [dropselectedValue, setDropSelectedValue] = useState("");
  const [measurement, setmeasurementValue] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
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

  const handleChangeGadget = (e) => {
    const value = e.target.value;
    setGadgetWeight(value);
    console.log("Gadget Weight is", value);
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
    if ((isChecked1 || isChecked2) && dropselectedValue) {
      navigate(`/Cartoline/Step-5?sendoption=${sendoption}`);
    }
  };

  async function nextstep() {
    try {
      const userId = localStorage.getItem("_id");
      const SenderLogoPrintQuality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
        ? "Colore"
        : "";
      const res = await axios.post(
        `${API_URL}/auth/addQA_gadget_step4b`,
        {
          id: userId,
          print_quality_sender_logo: SenderLogoPrintQuality,
          types_of_gadgets: dropselectedValue,
          weight_gadget: gadgetweight,
          measurements: measurement,
        }
      );
      if (res.status === 200) {
        console.log("Sending Option ", sendoption);
        console.log("Print Quality Sender Logo", SenderLogoPrintQuality);
        console.log("Types Of Gadgets", dropselectedValue);
        console.log("Weight of Gadget", gadgetweight);
        console.log("Measurements", measurement);

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

              <div className="col-rhs-inner">
                <div>
                  <p className="step4-txt">
                    Step 4:
                    <span className="step4-txt-sp1"> Stampa buste </span>
                  </p>
                  <p className="rhs-st4-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>

                <div className="rhs-form-gadget2-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">
                      <div className="printing-checks-contain">
                        <label className="p-envelope-label ">
                          Qualità stampa logo mittente
                        </label>

                        <div className="Printing-contain">
                          <div
                            className={
                              !isChecked1
                                ? "Printing-check1"
                                : "Printing-check-border"
                            }
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
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
                                  class="form-check-label "
                                  for="flexRadioDefault1"
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
                            <div class="form-check">
                              <input
                                class="form-check-input"
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
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
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
                      <div
                        className={
                          dropselectedValue === "Personalizzato"
                            ? "page-format-contain-gadget"
                            : ""
                        }
                      >
                        <div className="form-group cartoline-form-drop-width gadget-drop">
                          <label className="envelope-label">
                            Tipologia di gadget
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
                              <Dropdown.Item eventKey="Gadget Tecnologici ">
                                Gadget Tecnologici{" "}
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="A6">A6</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div
                          class={
                            dropselectedValue === "Personalizzato"
                              ? "form-group pg-quantity-gadget"
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

                      <div className="form-group pg-quantity-cataloghi">
                        <label className="envelope-label">
                          Peso del gadget
                        </label>
                        <input
                          type="text"
                          class="form-control peso-form"
                          id="exampleInputQuantity"
                          onChange={handleChangeGadget}
                          placeholder="es. 90g"
                        />
                        <div className="border-btm"></div>
                      </div>
                    </form>
                  </div>
                  <div className="btn-img-rhs">
                    {/* <div
                      className={
                        (isChecked1 || isChecked2) &&
                        dropselectedValue !== "Seleziona"
                          ? "d-block"
                          : "d-none"
                      }
                    >
                      <img src="/Images/Step1/envelop-img.svg" alt="Envelope" />
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="btns-envelope">
                {/* <div
                  className={
                    (isChecked1 || isChecked2) &&
                    dropselectedValue !== "Seleziona"
                      ? "envelope-img"
                      : "d-none"
                  }
                >
                  <img src="/Images/Step1/envelope-mb.svg" alt="Envelope" />
                </div> */}
                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={() => navigate(-1)}>
                      Indietro
                    </button>
                  </div>
                  <div className="btn2-div">
                    <button
                      className={
                        (isChecked1 || isChecked2) && dropselectedValue
                          ? "btn-r2-active"
                          : "btn-r2"
                      }
                      onClick={nextstep}
                    >
                      Avanti
                    </button>
                  </div>
                </div>
              </div>

              <div className="btn-rhs-row w-100">
                <div>
                  <button className="btn-r1" onClick={() => navigate(-1)}>
                    Indietro
                  </button>
                </div>
                <div className="btn2-div w-100">
                  <button
                    className={
                      (isChecked1 || isChecked2) && dropselectedValue
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
