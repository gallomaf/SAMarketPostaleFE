import React from "react";
import "./Step4Gadget.css";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../services/client";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
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
  //fine variabili da passare tra i vari steps

  const [sendItem, setItem] = useState();

  //useEffect(() => {
  //  setItem(localStorage.getItem("sendoption"));
  //});

  //const [isChecked, setIsChecked] = useState(false);
  //const [isChecked2, setIsChecked2] = useState(false);

  const [isChecked, setIsChecked]         = useState(step4Stampa == 'cliente' ? true: false);
  const [isChecked2, setIsChecked2]       = useState(step4Stampa == 'sa' ? true : false);

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);

  const handleRoutes = () => {

    localStorage.setItem("step4Stampa", isChecked ? 'cliente' : isChecked2 ? 'sa' : '');

    if (isChecked) {
      navigate(`/Lettere/Step-6`);
    }
    else if (isChecked2) {
      navigate(`/Gadget/Step-4-2`);
    }
  };

  async function nextstep() {
    try {
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
    { value: "Dettaglio",         url: "/Cataloghi/Step-4" },
  ];

  const goBack = () => {
    navigate('/Step-3');
  };


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
                <div className="rhs-form-gadget-btn-body">
                  <div className="size-contain">
                    <form className="form-envelope-main">
                      <div className="printing-checks-gadget">
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
                      isChecked || isChecked2 ? "btn-r2-active" : "btn-r2"
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
                      isChecked || isChecked2 ? "btn-r2-active" : "btn-r2"
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
