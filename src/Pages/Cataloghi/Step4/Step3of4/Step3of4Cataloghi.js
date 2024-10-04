import React, {useRef} from "react";
//import Form from "react-bootstrap/Form";
import "./Step3of4.css";
//import Button from "react-bootstrap/Button";
import { Row, Col, Nav } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
//import { useSearchParams, useLocation, useParams } from "react-router-dom";
import axios from "axios";
//import { API_URL } from "../../../../services/client";
import {ToastContainer} from "react-toastify";
import {ErrorToast, SuccessToast} from "../../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../../Components/Footer/BreadcrumbBt";
export default function Step3of4Cataloghi() {
  const now = 60;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");

  const step2Quantity = localStorage.getItem("step2Quantity");
  const nazione       = localStorage.getItem("nazione");

  const step4Formato    = localStorage.getItem("step4Formato");

  const step4ColoreCatalogo     = localStorage.getItem("step4ColoreCatalogo");
  const step4Tipo       = localStorage.getItem("step4Tipo");
  const step4Grammatura = localStorage.getItem("step4Grammatura");

  const step4StampaCatalogo = localStorage.getItem("step4StampaCatalogo");

  const step4File       = localStorage.getItem("step4File");
  const step4FileSize   = localStorage.getItem("step4FileSize");

  //fine variabili da passare tra i vari steps


  //const [sendItem, setItem] = useState();

  //useEffect(() => {
  //  setItem(localStorage.getItem("sendoption"));
  //});
  const navigate = useNavigate();

  const targetRef = useRef(null);
  //const [selectedValue, setSelectedValue] = useState("");
  const [dropselectedValue, setDropSelectedValue] = useState(step4Formato ? step4Formato : null);


  const [isChecked1, setIsChecked1]   = useState(step4ColoreCatalogo === "Bianco/Nero" );
  const [isChecked2, setIsChecked2]   = useState(step4ColoreCatalogo === "Colore" );

  const [isCheckedR1, setIsCheckedR1] = useState(step4Tipo === "Patina Lucida" );
  const [isCheckedR2, setIsCheckedR2] = useState(step4Tipo === "Patina Opaca");

  const [isCheckedG1, setIsCheckedG1] = useState(step4Grammatura === "70gr");
  const [isCheckedG2, setIsCheckedG2] = useState(step4Grammatura === "90gr");
  const [isCheckedG3, setIsCheckedG3] = useState(step4Grammatura === "115gr");
  const [isCheckedG4, setIsCheckedG4] = useState(step4Grammatura === "170gr");

  //stampa cliente o spedireadesso?
  const [isCheckedCli, setIsCheckedCli] = useState(step4StampaCatalogo == 'cliente' ? true: false);
  const [isCheckedSpa, setIsCheckedSpa] = useState(step4StampaCatalogo == 'sa' ? true : false);

  const handleChange = (e) => {
    const value = e.target.value;
  };

  //inizio gestione upload file

  // Stato per gestire il file selezionato e la visibilità dell'anteprima
  const [selectedFile, setSelectedFile]       = useState(step4File ? "https://www.spedireadesso.com/marketingpostale/uploads/" + step4File : null);

  const [previewVisible, setPreviewVisible] = useState(false);

  // Funzione per gestire il cambio del file selezionato
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewVisible(false); // Nascondi l'anteprima al cambio del file
  };

  // Funzione per visualizzare o nascondere l'anteprima
  const handlePreview = () => {
    if (selectedFile) {
      setPreviewVisible(!previewVisible);
    }
  };

  // Funzione per eliminare il file selezionato
  const handleDeleteFile = () => {
    setSelectedFile(null);
    setPreviewVisible(false);
  };

  // Funzione per formattare le dimensioni del file
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Funzione per gestire l'upload del file
  const handleUpload = async () => {
    if (!selectedFile) {
      ErrorToast("Seleziona un file prima di caricare.");
      //alert("Seleziona un file prima di caricare.");
      return;
    }

    // Crea un oggetto FormData per inviare il file al server
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Richiesta POST al server PHP con axios
      const response = await axios.post("https://www.spedireadesso.com/marketingpostale/upload.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Controllo della risposta dal server
      if (response.status === 200) {
        const { fileName, fileSize } = response.data;
        localStorage.setItem("step4File", fileName); // Salva il nome univoco del file
        localStorage.setItem("step4FileSize", fileSize); // Salva la dimensione del file
        //alert("File caricato con successo");
      }

    } catch (error) {
      console.error("Errore durante il caricamento del file:", error);
      //alert("Errore durante il caricamento del file.");
      ErrorToast("Errore durante il caricamento del file.");
    }
  };

  //fine gestione upload file


  const DropdownhandleChange = (eventKey) => {
    setDropSelectedValue(eventKey);
  };

  const handleRoutes = () => {

    const print_quality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
            ? "Colore"
            : "";
    const type_of_printing = isCheckedR1
        ? "Patina Lucida"
        : isCheckedR2
            ? "Patina Opaca"
            : "";
    const paper_weight = isCheckedG1
        ? "70gr"
        : isCheckedG2
            ? "90gr"
            : isCheckedG3
                ? "115gr"
                : isCheckedG3
                    ? "170gr"
                    : "";

    localStorage.setItem("step4ColoreCatalogo",     print_quality);
    localStorage.setItem("step4Tipo",       type_of_printing);
    localStorage.setItem("step4Grammatura", paper_weight);

    if(dropselectedValue !== "")
        localStorage.setItem("step4Formato", dropselectedValue);

    if(isCheckedCli)
      localStorage.setItem("step4StampaCatalogo", "cliente");
    if(isCheckedSpa)
      localStorage.setItem("step4StampaCatalogo", "sa");

    if (
        isCheckedCli ||
        (isCheckedSpa && (isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) && (isCheckedG1 || isCheckedG2 || isCheckedG3 || isCheckedG4))
    )
    {
      navigate(`/Lettere/Step-6`);
    }
  };

  const formValidation = () => {
    if (dropselectedValue === "") {
      ErrorToast("Seleziona il formato del catalogo");
      return false;
    }

    //se non è selezionato ne isCheckedCli ne isCheckedSpa
    if (!isCheckedCli && !isCheckedSpa) {
        ErrorToast("Seleziona chi stampa il catalogo");
    }


    if (isCheckedSpa) {
      if (!isChecked1 && !isChecked2) {
        ErrorToast("Seleziona la qualità della stampa");
        return false;
      }
      if (!isCheckedR1 && !isCheckedR2) {
        ErrorToast("Seleziona il tipo di carta");
        return false;
      }
      if (!isCheckedG1 && !isCheckedG2 && !isCheckedG3) {
        ErrorToast("Seleziona la grammatura della carta");
        return false;
      }
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
      const PrintQuality = isChecked1
        ? "Bianco/Nero"
        : isChecked2
        ? "Colore"
        : "";
      const PrintType = isCheckedR1
        ? "Patina Lucida"
        : isCheckedR2
        ? "Patina Opaca"
        : "";
      const PaperWeight = isCheckedG1
        ? "200g"
        : isCheckedG2
        ? "250g"
        : isCheckedG3
        ? "300g"
        : "";

      const res = await axios.post(`${API_URL}/auth/addQA_cataloghi_step4ab`, {
        id: userId,
        measurements: selectedValue,
        paper_weight: PaperWeight,
        // upload_graphic_file: selectedFile,
        type_of_printing: PrintType,
        print_quality: PrintQuality,
        envelope_format: dropselectedValue,
      });
      */
      let res = {status : 200};
      if (res.status === 200) {
        handleRoutes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption,          url: "/Step-1" },
    { value: step2Quantity,       url: "/Step-2" },
    { value: nazione,             url: "/Step-3" },
    { value: "Dettaglio",         url: "/Cataloghi/Step-4-2" },
  ];

  const goBack = () => {
    navigate('/Cataloghi/Step-4');
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
                    <span className="step4-txt-sp1"> Stampa catalogo </span>
                  </p>
                  <p className="rhs-st4-des">
                    Scegli la qualità e il tipo della stampa che preferisci.
                  </p>
                </div>

                <div className="rhs-form-btn-body">

                  <div className="page-format-contain">
                    <div className="form-group cartoline-form-drop-width">
                      <label className="envelope-label">
                        Formato Catalogo
                      </label>

                      <Dropdown onSelect={DropdownhandleChange}>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className={
                              dropselectedValue === "" ? "custom-drop " : "custom-drop custom-drop-border"}>
                            {!dropselectedValue || dropselectedValue == "" ? "Seleziona" : dropselectedValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {/* <Dropdown.Item eventKey="Seleziona">
                              Seleziona
                            </Dropdown.Item> */}
                          <Dropdown.Item eventKey="A5">A5</Dropdown.Item>
                          <Dropdown.Item eventKey="A4">A4</Dropdown.Item>
                          <Dropdown.Item eventKey="A3">A3</Dropdown.Item>
                          <Dropdown.Item eventKey="Personalizzato">Personalizzato</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>


                    <div
                        // className="form-group pg-quantity"
                        className={
                          dropselectedValue === "Personalizzato"
                              ? "form-group pg-quantity-personalizzato"
                              : "d-none"
                        }
                    >
                      <label className="envelope-label">
                        Dimensioni
                      </label>
                      <input
                          type="text"
                          className="form-control personalizzato-form"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="es. 21cm x 21cm"
                      />
                    </div>
                  </div>

                  <div className="printing-checks">
                    <label className="envelope-label ">
                      Stampa del catalogo
                    </label>

                    <div className="Printing-contain pb-4 ">
                      <div className={!isCheckedCli ? "Printing-check1" : "Printing-check-border"}>
                        <div className="form-check">
                          <input
                              className="form-check-input "
                              type="checkbox"
                              value=""
                              checked={isCheckedCli}
                              onChange={() => {
                                setIsCheckedCli(true);
                                setIsCheckedSpa(false);
                              }}
                              id="flexCheckDefault1"
                          />
                          <label
                              className={
                                !isCheckedCli
                                    ? "form-check-label"
                                    : "selected-check-bold"
                              }
                              htmlFor="flexCheckDefault1"
                          >
                            Stampato dal Cliente
                          </label>
                        </div>
                      </div>
                      <div className={!isCheckedSpa ? "Printing-check2" : "Printing-check-border"}>
                        <div className="form-check">
                          <input
                              className="form-check-input printing-checkbox"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault2"
                              checked={isCheckedSpa}
                              onChange={() => {
                                setIsCheckedSpa(true);
                                setIsCheckedCli(false);
                              }}
                          />
                          <label className={!isCheckedSpa ? "form-check-label" : "selected-check-bold"}
                                 htmlFor="flexCheckDefault2">
                            Stampato da Spedire Adesso
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div ref={targetRef} className={isCheckedSpa ? "" : "d-none"}>
                    <div className="radio-rowc1 ">
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
                                      src={`${process.env.PUBLIC_URL}/Images/Step1/blackwhite-check.svg`}
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
                                      src={`${process.env.PUBLIC_URL}/Images/Step1/Color-check.svg`}
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
                            Tipo di carta
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
                                    Patina lucida
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
                                    Patinata opaca
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="radio-rowc2">
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
                                      setIsCheckedG4(false);
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
                                    70g
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
                                      setIsCheckedG4(false);
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
                                    90gr
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className={!isCheckedG3 ? "Printing-check2" : "Printing-check-border2"}>
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
                                      setIsCheckedG4(false);
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
                                    115gr
                                  </label>
                                </div>
                              </div>
                            </div>


                            <div className={!isCheckedG4 ? "Printing-check2" : "Printing-check-border2"}>
                              <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefaultG4"
                                    id="flexRadioDefaultG"
                                    checked={isCheckedG4}
                                    onChange={() => {
                                      setIsCheckedG3(false);
                                      setIsCheckedG1(false);
                                      setIsCheckedG2(false);
                                      setIsCheckedG4(true);
                                    }}
                                />
                                <div className="label-img">
                                  <label className={!isCheckedG4 ? "form-check-label" : "form-check-label-selected"}
                                         htmlFor="flexRadioDefaultG4">
                                    170gr
                                  </label>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                      </form>

                      <div className="input-file-contain">
                        <label className="p-envelope-label">Upload del file grafico</label>
                        <div className={selectedFile ? "selected-file-container" : "file-contain-outer"}>
                          <div className={selectedFile ? "selected-file-con" : "file-container"}>
                            {previewVisible && selectedFile && (
                                <div className="file-preview">
                                  <img src={URL.createObjectURL(selectedFile)} alt="preview"/>
                                </div>
                            )}

                            {selectedFile ? (
                                <img src={`${process.env.PUBLIC_URL}/Images/Step1/file-icon.svg`} alt="selected-file"/>
                            ) : (
                                <img src={`${process.env.PUBLIC_URL}/Images/Step1/upload-file.svg`} alt="upload-file"/>
                            )}

                            {selectedFile ? (
                                <p className="Selected-filename">{selectedFile.name}</p>
                            ) : (
                                <div>
                                  <p className="choose-file-txt">Seleziona un file o trascinalo qui</p>
                                  <p className="file-type-txt">JPG, PNG o PDF, il file non deve superare i 10MB</p>
                                  <p>FACOLTATIVO</p>
                                </div>
                            )}

                            {selectedFile && (
                                <div className="dot-preview">
                                  <img src={`${process.env.PUBLIC_URL}/Images/Step1/dot-img.svg`} alt="dot"/>
                                  <p className="preview-txt" onClick={handlePreview}>
                                    {previewVisible ? "Nascondi Anteprima" : "Anteprima"}
                                  </p>
                                  <div className="dot-preview">
                                    <img src={`${process.env.PUBLIC_URL}/Images/Step1/dot-img.svg`} alt="dot"/>
                                    <p className="remove-img-txt" onClick={handleDeleteFile}>
                                      Elimina
                                    </p>
                                  </div>
                                </div>
                            )}
                          </div>

                          {selectedFile ? (
                              <p className="file-size-txt">{formatBytes(selectedFile.size)}</p>
                          ) : (
                              <div>
                                <input type="file" id="file-input" className="hidden" onChange={handleFileChange}/>
                                <label htmlFor="file-input" id="fileinputlabel">Seleziona file</label>
                              </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              <div className="btns-envelope">

                <div className="btn-rhs-row-mb">
                  <div>
                    <button className="btn-r1" onClick={goBack}>Indietro</button>
                  </div>
                  <div className="btn2-div">
                    <button
                        className={
                          (
                              isCheckedCli ||
                              (isCheckedSpa && (isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) && (isCheckedG1 || isCheckedG2 || isCheckedG3 || isCheckedG4))
                          )

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
                        (
                            isCheckedCli ||
                            (isCheckedSpa && (isChecked1 || isChecked2) && (isCheckedR1 || isCheckedR2) && (isCheckedG1 || isCheckedG2 || isCheckedG3 || isCheckedG4))
                        )
                            ? "btn-r2-active"
                            : "btn-r2"
                      }
                      onClick={nextstep}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <BreadcrumbBt breadcrumbArray={breadcrumbArray} now={now}/>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
