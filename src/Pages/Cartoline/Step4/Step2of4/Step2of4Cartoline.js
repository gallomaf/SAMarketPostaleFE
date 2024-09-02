import React from "react";
//import Form from "react-bootstrap/Form";
import "./Step2of4Cartoline.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../services/client";
import { SuccessToast } from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";

export default function Step2of4Cartoline() {

  //const [sendItem, setItem] = useState();

  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");


  const step4Colore     = localStorage.getItem("step4Colore");
  const step4Tipo     = localStorage.getItem("step4Tipo");
  const step4Grammatura = localStorage.getItem("step4Grammatura");
  const step4Carta      = localStorage.getItem("step4Carta");

  //fine variabili da passare tra i vari steps


  const navigate = useNavigate();


  const [isChecked1, setIsChecked1]   = useState(step4Colore === "Bianco/Nero" );
  const [isChecked2, setIsChecked2]   = useState(step4Colore === "Colore" );

  const [isCheckedR1, setIsCheckedR1] = useState(step4Tipo === "Solo fronte" );
  const [isCheckedR2, setIsCheckedR2] = useState(step4Tipo === "Fronte/retro");

  const [isCheckedG1, setIsCheckedG1] = useState(step4Grammatura === "200gr");
  const [isCheckedG2, setIsCheckedG2] = useState(step4Grammatura === "250gr");
  const [isCheckedG3, setIsCheckedG3] = useState(step4Grammatura === "300gr");

  const [isCheckedT1, setIsCheckedT1] = useState(step4Carta === "Patina lucida");
  const [isCheckedT2, setIsCheckedT2] = useState(step4Carta === "Patina opaca");

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  //   console.log("Selected is", value);
  // };

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewVisible, setPreviewVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewVisible(false);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handlePreview = () => {
    if (selectedFile) {
      console.log("OPEN IMG");
      setPreviewVisible(!previewVisible);
    }
  };
  // const handlePreviewClick = () => {
  //   if (selectedFile) {
  //     console.log("OPEN IMG");
  //     setShowPreview(true);
  //   }
  // };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setPreviewVisible(false);
  };

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {

    //const userId = localStorage.getItem("_id");
    const print_quality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
            ? "Colore"
            : "";
    const type_of_printing = isCheckedR1
        ? "Solo fronte"
        : isCheckedR2
            ? "Fronte/retro"
            : "";
    const paper_weight = isCheckedG1
        ? "200gr"
        : isCheckedG2
            ? "250gr"
            : isCheckedG3
                ? "300gr"
                : "";
    const type_of_paper = isCheckedT1
        ? "Patina lucida"
        : isCheckedT2
            ? "Patinata opaca"
            : "";

    //inizio variabili reali
    localStorage.setItem("step4Colore",    print_quality);
    localStorage.setItem("step4Tipo",     type_of_printing);
    localStorage.setItem("step4Grammatura", paper_weight);
    localStorage.setItem("step4Carta",      type_of_paper);

    //console.log("print_quality ", print_quality);
    //console.log("type_of_printing ", type_of_printing);
    //console.log("paper_weight ", paper_weight);
    //console.log("type_of_paper ", type_of_paper);

    if (
      (isChecked1 || isChecked2) &&
      (isCheckedR1 || isCheckedR2) &&
      (isCheckedT1 || isCheckedT2) &&
      (isCheckedG1 || isCheckedG2 || isCheckedG3)
    ) {
      navigate(`/Lettere/Step-6?`);
    }
  };

  const goBack = () => {
    navigate('/Cartoline/Step-4');
  };

  async function nextstep() {
    try {



      /*
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("print_quality", print_quality);
      formData.append("type_of_printing", type_of_printing);
      formData.append("paper_weight", paper_weight);
      formData.append("type_of_paper", type_of_paper);
      if (selectedFile) {
        //formData.append("file", selectedFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };


      const res = await axios.post(
        `${API_URL}/auth/addQA_cartoline_step4ab`,
          formData
          //,
         // config

      );

       */

      let res = {status: 200};
      if (res.status === 200) {
        //console.log("print_quality ", print_quality);
        //console.log("type_of_printing ", type_of_printing);
        //console.log("paper_weight ", paper_weight);
        //console.log("type_of_paper ", type_of_paper);

        handleRoutes();
        //SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,          url: "/Step-1" },
    { value: step2Quantity,       url: "/Step-2" },
    { value: nazione,             url: "/Step-3" },
    { value: "Dettaglio",         url: "/Cartoline/Step-4" },
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

              <div className="col-rhs-inner-new overflow-auto ">
                <div>
                  <p className="step4-txt">
                    Step 4:
                    <span className="step4-txt-sp1"> Stampa Cartoline </span>
                  </p>
                  <p className="rhs-st4-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>
                <div className="rhs-form2-4-body h-100">
                  <div>
                    <div className="radio-row1">
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
                                  name="flexRadioDefault1"
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
                                        : "form-check-label-selected"
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
                                  name="flexRadioDefault2"
                                  id="flexRadioDefault2"
                                  checked={isChecked2}
                                  onChange={() => {
                                    setIsChecked2(true);
                                    setIsChecked1(false);
                                  }}
                                />
                                <div className="label-img">
                                  <label
                                      className={
                                      !isChecked2
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefault2"
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
                      </form>
                      <form className="form-envelope-main">
                        <div className="printing-checks-contain">
                          <label className="p-envelope-label ">
                            Tipo di stampa
                          </label>

                          <div className="Printing-contain">
                            <div
                              className={
                                !isCheckedR1
                                  ? "Printing-check1"
                                  : "Printing-check-border"
                              }
                            >
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
                                <div className="label-img ">
                                  <label
                                      className={
                                      !isCheckedR1
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultR1"
                                  >
                                    Solo fronte
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div
                              className={
                                !isCheckedR2
                                  ? "Printing-check2"
                                  : "Printing-check-border2"
                              }
                            >
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
                                  }}
                                />
                                <div className="label-img">
                                  <label
                                      className={
                                      !isCheckedR2
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultR2"
                                  >
                                    Fronte/retro
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="radio-row2">
                      <form className="form-envelope-main">
                        <div className="printing-checks-contain">
                          <label className="p-envelope-label ">
                            Grammatura carta
                          </label>

                          <div className="Printing-contain">
                            <div
                              className={
                                !isCheckedG1
                                  ? "Printing-check1"
                                  : "Printing-check-border"
                              }
                            >
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultG1"
                                  id="flexRadioDefaultG1"
                                  checked={isCheckedG1}
                                  onChange={() => {
                                    setIsCheckedG1(true);
                                    setIsCheckedG2(false);
                                    setIsCheckedG3(false);
                                  }}
                                />
                                <div className="label-img ">
                                  <label
                                      className={
                                      !isCheckedG1
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultG1"
                                  >
                                    250g
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div
                              className={
                                !isCheckedG2
                                  ? "Printing-check2"
                                  : "Printing-check-border2"
                              }
                            >
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultG2"
                                  id="flexRadioDefaultG2"
                                  checked={isCheckedG2}
                                  onChange={() => {
                                    setIsCheckedG2(true);
                                    setIsCheckedG1(false);
                                    setIsCheckedG3(false);
                                  }}
                                />
                                <div className="label-img">
                                  <label
                                      className={
                                      !isCheckedG2
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultG2"
                                  >
                                    300gr
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              className={
                                !isCheckedG3
                                  ? "Printing-check2"
                                  : "Printing-check-border2"
                              }
                            >
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultG3"
                                  id="flexRadioDefaultG3"
                                  checked={isCheckedG3}
                                  onChange={() => {
                                    setIsCheckedG3(true);
                                    setIsCheckedG1(false);
                                    setIsCheckedG2(false);
                                  }}
                                />
                                <div className="label-img">
                                  <label
                                      className={
                                      !isCheckedG3
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultG3"
                                  >
                                    350gr
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <form className="form-envelope-main">
                        <div className="printing-checks-contain">
                          <label className="p-envelope-label ">
                            Tipo di carta
                          </label>

                          <div className="Printing-contain">
                            <div
                              className={
                                !isCheckedT1
                                  ? "Printing-check1"
                                  : "Printing-check-border"
                              }
                            >
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultT1"
                                  id="flexRadioDefaultT1"
                                  checked={isCheckedT1}
                                  onChange={() => {
                                    setIsCheckedT1(true);
                                    setIsCheckedT2(false);
                                  }}
                                />
                                <div className="label-img ">
                                  <label
                                      className={
                                      !isCheckedT1
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultT1"
                                  >
                                    Patina lucida
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div
                              className={
                                !isCheckedT2
                                  ? "Printing-check2"
                                  : "Printing-check-border2"
                              }
                            >
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultT2"
                                  id="flexRadioDefaultT2"
                                  checked={isCheckedT2}
                                  onChange={() => {
                                    setIsCheckedT2(true);
                                    setIsCheckedT1(false);
                                  }}
                                />
                                <div className="label-img">
                                  <label
                                      className={
                                      !isCheckedT2
                                        ? "form-check-label"
                                        : "form-check-label-selected"
                                    }
                                    htmlFor="flexRadioDefaultT2"
                                  >
                                    Patinata opaca
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* <div className="file-row ">
                      <div className="input-file-contain">
                        <label className="p-envelope-label ">
                          Upload del file grafico
                        </label>
                        <div
                          className={
                            selectedFile
                              ? "selected-file-container"
                              : "file-contain-outer"
                          }
                        >
                          <div
                            className={
                              selectedFile
                                ? "selected-file-con"
                                : "file-container"
                            }
                          >
                            {selectedFile ? (
                              <img
                                src="/Images/Step1/file-icon.svg"
                                alt="selected-file"
                              />
                            ) : (
                              <img
                                src="/Images/Step1/upload-file.svg"
                                alt="upload-file"
                              />
                            )}

                            {selectedFile ? (
                              <p className="Selected-filename">
                                {selectedFile.name}
                              </p>
                            ) : (
                              <div>
                                <p className="choose-file-txt">
                                  Seleziona un file o trascinalo qui
                                </p>
                                <p className="file-type-txt">
                                  JPG, PNG o PDF, il file non deve superare i
                                  10MB
                                </p>
                              </div>
                            )}

                            {selectedFile ? (
                              <div className="dot-preview">
                                <img
                                  src="/Images/Step1/dot-img.svg "
                                  alt="dot"
                                />
                                <p
                                  className="preview-txt"
                                  onClick={handlePreviewClick}
                                >
                                  Anteprima
                                </p>
                              </div>
                            ) : (
                              " "
                            )}
                            {selectedFile ? (
                              <div className="dot-preview">
                                <img
                                  src="/Images/Step1/dot-img.svg "
                                  alt="dot"
                                />
                                <p
                                  className="remove-img-txt"
                                  onClick={handlePreviewClick}
                                >
                                  Elimina
                                </p>
                              </div>
                            ) : (
                              " "
                            )}
                          </div>
                          {selectedFile ? (
                            <p className="file-size-txt">
                              {formatBytes(selectedFile.size)}
                            </p>
                          ) : (
                            <div>
                              <input
                                type="file"
                                id="file-input"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              <label id="fileinputlabel" htmlFor="file-input">
                                Seleziona file
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div> */}

                    <div className="file-row">
                      <div className="input-file-contain">
                        <label className="p-envelope-label">
                          Upload del file grafico
                        </label>
                        <div
                          className={
                            selectedFile
                              ? "selected-file-container"
                              : "file-contain-outer"
                          }
                        >
                          <div
                            className={
                              selectedFile
                                ? "selected-file-con"
                                : "file-container"
                            }
                          >
                            {previewVisible && selectedFile && (
                              <div className="file-preview">
                                <img
                                  src={URL.createObjectURL(selectedFile)}
                                  alt="preview"
                                />
                              </div>
                            )}

                            {selectedFile ? (
                              <img
                                src="/Images/Step1/file-icon.svg"
                                alt="selected-file"
                              />
                            ) : (
                              <img
                                src="/Images/Step1/upload-file.svg"
                                alt="upload-file"
                              />
                            )}

                            {selectedFile ? (
                              <p className="Selected-filename">
                                {selectedFile.name}
                              </p>
                            ) : (
                              <div>
                                <p className="choose-file-txt">
                                  Seleziona un file o trascinalo qui
                                </p>
                                <p className="file-type-txt">
                                  JPG, PNG o PDF, il file non deve superare i
                                  10MB
                                </p>
                                <p>FACOLTATIVO</p>
                              </div>
                            )}

                            {selectedFile && (
                              <div className="dot-preview">
                                <img
                                  src="/Images/Step1/dot-img.svg"
                                  alt="dot"
                                />
                                <p
                                  className="preview-txt"
                                  onClick={handlePreview}
                                >
                                  {previewVisible
                                    ? "Nascondi Anteprima"
                                    : "Anteprima"}
                                </p>
                                <div className="dot-preview">
                                  <img
                                    src="/Images/Step1/dot-img.svg"
                                    alt="dot"
                                  />
                                  <p
                                    className="remove-img-txt"
                                    onClick={handleDeleteFile}
                                  >
                                    Elimina
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {selectedFile ? (
                            <p className="file-size-txt">
                              {formatBytes(selectedFile.size)}
                            </p>
                          ) : (
                            <div>
                              <input
                                type="file"
                                id="file-input"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              <label htmlFor="file-input" id="fileinputlabel">
                                Seleziona file
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="btn-img-rhs pb-4">
                    <div></div>
                    <div
                      className={
                        (isChecked1 || isChecked2) &&
                        (isCheckedR1 || isCheckedR2) &&
                        (isCheckedT1 || isCheckedT2) &&
                        (isCheckedG1 || isCheckedG2 || isCheckedG3) &&
                        selectedFile
                          ? "d-block"
                          : "d-none"
                      }
                    >
                      <img
                        src="/Images/Cartoline/Step4-Stampa.svg"
                        alt="Envelope"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="btns-envelope">
                {/* <div
                  className={
                    (isChecked1 || isChecked2) &&
                    (isCheckedR1 || isCheckedR2) &&
                    (isCheckedT1 || isCheckedT2) &&
                    (isCheckedG1 || isCheckedG2 || isCheckedG3) &&
                    selectedFile
                      ? "envelope-img"
                      : "d-none"
                  }
                >
                  <img
                    src="/Images/Cartoline/Step4-Stampa.svg"
                    alt="Envelope"
                  />
                </div> */}
                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={goBack}>Indietro</button>
                  </div>
                  <div className="btn2-div">
                  <button
                      className={
                        (isChecked1 || isChecked2) &&
                        (isCheckedR1 || isCheckedR2) &&
                        (isCheckedT1 || isCheckedT2) &&
                        (isCheckedG1 || isCheckedG2 || isCheckedG3)
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
                      (isChecked1 || isChecked2) &&
                      (isCheckedR1 || isCheckedR2) &&
                      (isCheckedT1 || isCheckedT2) &&
                      (isCheckedG1 || isCheckedG2 || isCheckedG3)
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
