import React from "react";
import "./Step2of4Gadget.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
//import axios from "axios";
//import { API_URL } from "../../../../services/client";
//import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
import {ToastContainer} from "react-toastify";
import {ErrorToast, SuccessToast} from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";
export default function Step2of4Gadget() {
  const navigate = useNavigate();
  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Gadget   = localStorage.getItem("step4Gadget");
  const step4Peso     = localStorage.getItem("step4Peso");
  const step4Misure   = localStorage.getItem("step4Misure");

  const step4Colore     = localStorage.getItem("step4Colore");
  //fine variabili da passare tra i vari steps

  //const [sendItem, setItem] = useState();

  //useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
  //});

  const [selectedValue, setSelectedValue] = useState("");
  const [gadgetweight, setGadgetWeight] = useState(step4Peso ? step4Peso : "");
  const [dropselectedValue, setDropSelectedValue] = useState(step4Gadget ? step4Gadget : "");
  const [measurement, setmeasurementValue] = useState(step4Misure ? step4Misure : "");


  const [isChecked1, setIsChecked1]   = useState(step4Colore === "Bianco/Nero" );
  const [isChecked2, setIsChecked2]   = useState(step4Colore === "Colore" );

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

  const handleChangeGadget = (e) => {
    const value = e.target.value;
    setGadgetWeight(value);
   // console.log("Gadget Weight is", value);
  };


  const gadgets = [
    { id: 1, name: "Penne / matite" },
    { id: 2, name: "Calendari" },
    { id: 3, name: "Cappellini" },
    { id: 4, name: "Magliette" },
    { id: 5, name: "Block notes personalizzati" },
    { id: 6, name: "Card / Tessere" },
    { id: 7, name: "Pendrive" },
    { id: 8, name: "Porta Badge (ciondolini)" },
    { id: 9, name: "Portachiavi" },
    { id: 10, name: "Braccialetti" },
    { id: 11, name: "Segnalibri" },
    { id: 12, name: "Altro" }
  ];

  const DropdownhandleChange = (eventKey) => {
    setDropSelectedValue(eventKey);
   // console.log("Dropdown Selected Value is ", eventKey);
  };
 // const location = useLocation();
 // const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {

    localStorage.setItem("step4Gadget", dropselectedValue);
    localStorage.setItem("step4Peso", gadgetweight);
    localStorage.setItem("step4Misure", measurement);


    //console.log("Types Of Gadgets", dropselectedValue);
    //console.log("Weight of Gadget", gadgetweight);
    //console.log("Measurements", measurement);


    if (( dropselectedValue =='Altro' && measurement ) || ( dropselectedValue !== 'Altro' && dropselectedValue != ""  ) && gadgetweight) {
      navigate(`/Lettere/Step-6`);
    }
  };

  const formValidation = () => {
    if (dropselectedValue === "") {
      ErrorToast("Seleziona il tipo di gadget");
      return false;
    }
    if (dropselectedValue === "Altro" && measurement === "") {
      ErrorToast("Inserisci il tipo di gadget");
      return false;
    }
    if (gadgetweight === "") {
      ErrorToast("Inserisci il peso del gadget");
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
       */

      let res = { status: 200 };
      if (res.status === 200) {
        //console.log("Sending Option ", sendoption);
        //console.log("Print Quality Sender Logo", SenderLogoPrintQuality);
        //console.log("Types Of Gadgets", dropselectedValue);
        //console.log("Weight of Gadget", gadgetweight);
        //console.log("Measurements", measurement);

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
    { value: "Dettaglio",         url: "/Cataloghi/Step-4" },
  ];

  const goBack = () => {
    navigate('/Gadget/Step-4');
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
                    Step 4:
                    <span className="step4-txt-sp1"> Dettagli Gadget </span>
                  </p>
                  <p className="rhs-st4-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>

                <div className="rhs-form-gadget2-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">

                      <div
                          className={
                            dropselectedValue === "Altro"
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
                                      ? "custom-drop"
                                      : "custom-drop custom-drop-border"
                                }
                            >
                              {dropselectedValue === "" ? "Seleziona" : dropselectedValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {gadgets.map((gadget) => (
                                  <Dropdown.Item key={gadget.id} eventKey={gadget.name}>
                                    {gadget.name}
                                  </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>

                        </div>
                        <div
                            className={
                              dropselectedValue === "Altro"
                                  ? "form-group pg-quantity-gadget"
                                  : "d-none"
                            }
                        >
                          <label className="envelope-label">
                            Specifica Gadget
                          </label>
                          <input
                              type="text"
                              className="form-control personalizzato-form"
                              id="exampleInputQuantity"
                              onChange={handlePersonalizzatoInput}
                              placeholder="es. Calendario"
                              value={measurement}
                          />
                        </div>
                      </div>

                      <div className="form-group pg-quantity-cataloghi">
                        <label className="envelope-label">
                          Peso del gadget
                        </label>
                        <input
                            type="text"
                            className="form-control peso-form"
                            id="exampleInputQuantity"
                            onChange={handleChangeGadget}
                            placeholder="es. 90g"
                            value={gadgetweight}
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
                    <button className="btn-r1" onClick={goBack}>Indietro</button>
                  </div>
                  <div className="btn2-div">
                    <button
                      className={
                          (( dropselectedValue =='Altro' && measurement ) || ( dropselectedValue !== 'Altro' && dropselectedValue != ""  ) && gadgetweight)
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
                  <button className="btn-r1" onClick={goBack}>Indietro</button>
                </div>
                <div className="btn2-div w-100">
                  <button
                    className={
                      (( dropselectedValue =='Altro' && measurement ) || ( dropselectedValue !== 'Altro' && dropselectedValue != ""  ) && gadgetweight)
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
