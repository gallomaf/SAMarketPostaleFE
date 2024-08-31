import React from "react";
import "./Step3.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";

export default function Step3() {
  const now = 45;

  //variabili da passare tra i vari steps

  const step2Quantity   = localStorage.getItem("step2Quantity");

  const step3Nazione    = localStorage.getItem("step3Nazione");
  const step3QtaItalia  = localStorage.getItem("step3QtaItalia");
  const step3QtaEstero  = localStorage.getItem("step3QtaEstero");
  const sendoption      = localStorage.getItem("sendoption");

  //fine variabili da passare tra i vari steps

  const navigate = useNavigate();
  const [sendItem, setItem] = useState();
  const [step3Click, setStep3Click] = useState(step3Nazione);
  const ItaliaActive    = "/Images/Step1/Italia-active.svg";
  const ItaliaInactive  = "/Images/Step1/italia.svg.svg";
  const EsteroInactive  = "/Images/Step1/estero.svg.svg";
  const EsteroActive    = "/Images/Estero Active.svg";
  const MistoActive     = "/Images/Misto Active.svg";
  const MistoInactive   = "/Images/Step1/Misto.svg";


  const [italia, setitaliaValue] = useState(step3QtaItalia > 0 ? step3QtaItalia : "");
  const [estero, setesteroValue] = useState(step3QtaEstero > 0 ? step3QtaEstero : "");

  //crea un array con le tre nazioni e salviamolo nel localStorage
  const nazioni = [
      "-",
      "Italia",
      "Estero",
      "Misto",
  ];

  localStorage.setItem('nazioni', JSON.stringify(nazioni));

  //array composto da: elenco buste e per ogni busta la tipologia di fogli associata
  const buste = [
    { id: 1,
      name: "Busta C6 (220X110mm)",
      description: "Busta C6 (220X110mm)",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg",
      fogli: [
        { id: 0, name: "Foglio A6", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 1, name: "Foglio A5", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 2, name: "Foglio A4", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 99, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" }
      ]
    },
    { id: 2,
      name: "Busta C5 (230X162mm)",
      description: "Busta C5 (230X162mm)",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg",
      fogli: [
        { id: 0, name: "Foglio A5", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 1, name: "Foglio A4", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 99, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" }
      ]
    },
    { id: 3,
      name: "Busta DL (220X110mm)",
      description: "Busta DL (220X110mm)",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg",
      fogli: [
        { id: 0, name: "Invito/Flyer", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 1, name: "Flyer Doppio", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 2, name: "Foglio A4", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 99, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" }
      ]
    },
    { id: 4,
      name: "Busta C4 (324X229mm)",
      description: "Busta C4 (324X229mm)",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg",
      fogli: [
        { id: 0, name: "Foglio A4", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 1, name: "Foglio A3", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 99, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" }
      ]
    },
    { id: 5,
      name: "Busta C3 (297X420mm)",
      description: "Busta C3 (297X420mm)",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg",
      fogli: [
        { id: 0, name: "Foglio A3", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
        { id: 99, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" }
      ]
    },
    { id: 6,
      name: "Personalizzato",
      description: "Scegli il tuo formato",
      image: "/Images/Buste/spunta.svg",
      imageInattiva: "/Images/Buste/BUSTA_C6.svg" ,
      fogli: [
        { id: 0, name: "Personalizzato", image: "/Images/Buste/spunta.svg", imageInattiva: "/Images/Buste/BUSTA_C6.svg" },
      ]
    },
  ];

  localStorage.setItem('buste', JSON.stringify(buste));

  const handleClick3 = (cardno) => {
    setStep3Click((prevState) => (prevState == cardno ? null : cardno));
  };

  const handleItaliaInput = (e) => {
    const value = e.target.value;
    setitaliaValue(value);
  };

  const handleEsteroInput = (e) => {
    const value = e.target.value;
    setesteroValue(value);
  };

  const handleRoutes = () => {

    localStorage.setItem("step3Nazione",    step3Click);
    localStorage.setItem("step3QtaItalia",  italia);
    localStorage.setItem("step3QtaEstero",  estero);
    let nazione = nazioni[step3Click];
    localStorage.setItem("nazione", nazione);

    let opzione = sendoption;
    let step    = "Step-4";

    if(opzione !== null){
      opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+ step );
    }
  };

  const goBack = () => {
    navigate('/Step-2');
  };

  async function nextstep() {

    try {
      //se step3Click è 1 o 2, allora i valori di italia ed estero si annullano
      if(step3Click == 1 || step3Click == 2){
        setitaliaValue(0);
        setesteroValue(0);
        //console.log("italia ---> " + italia);
      }

      /*
      const userId = localStorage.getItem("_id");
      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step3`,
        {
          id: userId,
          country: RecipientCountry,
          qtaitalia: italia,
          qtaestero: estero,
        }
      );
       */

      let res_status = 200;
      if (res_status === 200) {
        handleRoutes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
      { value: sendoption, url: "/Step-1" },
      { value: step2Quantity, url: "/Step-2" },
      { value: "Scelta Nazione", url: "/Step-3" },
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
                    <span> Nazione destinatari </span>
                  </p>
                  <p className="rhs-des">
                    Seleziona il paese di destinazione della tua spedizione.
                    Questo ci permetterà di fornirti un preventivo<br></br>{" "}
                    preciso e le opzioni di spedizione disponibili.
                  </p>
                </div>
                <div className="rhs3-card-btn-body">
                  <div className="cards3-rhs-row">
                    <Col md={3} onClick={() => handleClick3(1)}   className="c-cards-col"   >
                      <div className= {step3Click == 1 ? "c-card1-active" : "c-card1"}>
                        <img
                            src={step3Click == 1 ? ItaliaActive : ItaliaInactive}
                            alt="Italia"
                            title="Italy"
                            className="c-card1-img"
                        />
                      </div>
                      <p className="option-txt">Italia</p>
                    </Col>
                    <Col
                        md={3}
                        onClick={() => handleClick3(2)}
                        className="c-cards-col"
                    >
                      <div
                          className={
                            step3Click == 2 ? "c-card2-active" : "c-card2"
                          }
                      >
                        <img
                            src={step3Click == 2 ? EsteroActive : EsteroInactive}
                            alt="Estero"
                            className="c-card2-img"
                        />
                      </div>
                      <p className="option-txt">Estero</p>
                    </Col>
                    <Col
                        md={3}
                        onClick={() => handleClick3(3)}
                        className="c-cards-col"
                    >
                      <div
                          className={
                            step3Click == 3 ? "c-card3-active" : "c-card-3"
                          }
                      >
                        <img
                            src={step3Click == 3 ? MistoActive : MistoInactive}
                            alt="Misto"
                            className="c-card3-img"
                        />
                      </div>
                      <p className="option-txt">Misto</p>
                    </Col>
                  </div>
                  <div
                      className={
                        step3Click == 3
                            ? "cards3-rhs-row"
                            : "d-none"
                      }
                  >
                    <Col
                        className="c-cards-col"
                    >
                    <label className="envelope-label">Q.tà per Italia</label>
                    <input
                        type="text"
                        className="form-control personalizzato-form"
                        id="exampleInputQuantity"
                        onChange={handleItaliaInput}
                        placeholder="es. 100"
                        value={italia}
                    />
                    </Col>
                    <Col
                        className="c-cards-col"
                    >
                      <label className="envelope-label">Q.tà per Estero</label>
                      <input
                          type="text"
                          className="form-control personalizzato-form"
                          id="exampleInputQuantity"
                          onChange={handleEsteroInput}
                          placeholder="es. 100"
                            value={estero}
                      />
                    </Col>

                  </div>
                </div>
              </div>
              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={goBack}>
                    Indietro
                  </button>
                </div>
                <div className="btn2-div">
                  <button className={step3Click ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
                    Avanti
                  </button>
                </div>
              </div>
              <div className="btn-rhs-row w-100 ">
                <div>
                  <button className="btn-r1" onClick={goBack}>
                    Indietro
                  </button>
                </div>
                <div className="btn2-div w-100">
                  <button className={step3Click ? "btn-r2-active" : "btn-r2"} onClick={nextstep}>
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
