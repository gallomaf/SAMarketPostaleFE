import React from "react";
import "./Step7.css";
//import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import {  useLocation } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { ErrorToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";
import {ToastContainer} from "react-toastify";


export default function Step7() {
  const now = 98;

  //variabili da passare tra i vari steps
  const sendoption    = localStorage.getItem("sendoption");
  //const step1Click    = localStorage.getItem("step1Click");
  const step2Quantity = localStorage.getItem("step2Quantity");

  const nazione       = localStorage.getItem("nazione");
  const busta         = localStorage.getItem("busta");

  const storedNazioni        = JSON.parse(localStorage.getItem('nazioni'));//recupero con JSON perchè è un array
  const step3Nazione  = localStorage.getItem("step3Nazione");
  let step3QtaItalia  = localStorage.getItem("step3QtaItalia");
  let step3QtaEstero  = localStorage.getItem("step3QtaEstero");

  const storedBuste          = JSON.parse(localStorage.getItem('buste'));//recupero con JSON perchè è un array
  const step4Busta    = localStorage.getItem("step4Busta");
  let step4Misure     = localStorage.getItem("step4Misure");
  let step4Stampa     = localStorage.getItem("step4Stampa");

  let step4Colore       = localStorage.getItem("step4Colore");//logo busta o cartoline
  const step4Tipo       = localStorage.getItem("step4Tipo");
  const step4Grammatura = localStorage.getItem("step4Grammatura");
  const step4Carta      = localStorage.getItem("step4Carta");

  const step4Gadget   = localStorage.getItem("step4Gadget");
  const step4Peso     = localStorage.getItem("step4Peso");

  const step5Pagine   = localStorage.getItem("step5Pagine");

  const step52Formato = localStorage.getItem("step52Formato");
  const step52Misure  = localStorage.getItem("step52Misure");
  const step52Quantita= localStorage.getItem("step52Quantita");
  const step52Stampa  = localStorage.getItem("step52Stampa");

  const step5InternoColore  = localStorage.getItem("step5InternoColore");
  const step5InternoStampa  = localStorage.getItem("step5InternoStampa");
  const step6Dest           = localStorage.getItem("step6Dest");
  const step6Note           = localStorage.getItem("step6Note");
  //fine variabili da passare tra i vari steps


  const navigate          = useNavigate();
  //const [sendItem, setItem]     = useState();
  const [name, setName]             = useState("");
  const [agency, setAgency]         = useState("");
  const [number, setNumber]         = useState("");
  const [email, setEmail]           = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // Stato per la checkbox
  //const location = useLocation();

  //useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
  //});

  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");
  //console.log("this is ", sendoption);
  const handleRoutes = () => {
    if (name && number && agency && email) {
      navigate(`/Thankyou?sendoption=${sendoption}`);
    }
  };

  const goBack = () => {

    let opzione = sendoption;

    //dallo step 6 posso tornare allo step 5-3, oppure 5-2 oppure 5
    let step = "Step-6";

    //il punto Step-6 è comune a tutti i prodotti, quindi sempre su Lettere
    opzione =  "Lettere";

    if(opzione !== null){
      //opzione = opzione.charAt(0).toUpperCase() + opzione.slice(1);
      navigate("/"+opzione+"/"+step);
    }

  };



  const formValidation = () => {
    if (name.length < 3) {
      ErrorToast("Il nome e cognome deve essere lungo almeno 3 caratteri.");
      return false;
    } else if (agency.length < 3) {
      ErrorToast("Il nome dell'azienda deve essere lungo almeno 3 caratteri.");
      return false;
    } else if (number.length < 8) {
      ErrorToast("Il numero di telefono deve essere lungo almeno 8 caratteri.");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ErrorToast("Inserisci un indirizzo email valido.");
      return false;
    } else if (!termsAccepted) {
      ErrorToast("Devi accettare i Termini e Condizioni per continuare.");
      return false;
    }
    return true;
  };

  async function nextstep() {
    console.log("termsAccepted " + termsAccepted);
    if (!formValidation()) {
      return;
    }

    try {
      //const userId = localStorage.getItem("_id");

      //recuperare il nome di nazione dall'array storedNazioni
      let nazione = storedNazioni[step3Nazione];

      if(parseInt(step3Nazione) < 3){
        //se nazione non è misto, azzero le altre due variabili
        step3QtaItalia = "-";
        step3QtaEstero = "-";
      }

      //recuperare il dati di busta dall'array storedBuste
      const bustaTrovata = storedBuste.find(item => item.id  == step4Busta);

      //se la busta non è personalizzata (id=6) allora non mostro le misure personalizzate
      if(parseInt(step4Busta) < 6){
        step4Misure = "-";
      }

      if(step4Stampa == 'sa'){
        step4Stampa = "SpedireAdesso";
      }
      else{
        step4Colore = "-";
      }



      const res = await axios.post(
        `${API_URL}/auth/addQA_lettere_step7Full`,
        {
          categorytag:  sendoption,
          quantity:     step2Quantity,

          country:      nazione,
          qtaitalia:    step3QtaItalia,
          qtaestero:    step3QtaEstero,

          envelope_format:    bustaTrovata.name,
          envelope_printing:  step4Stampa,
          measurements:       step4Misure,

          print_quality:      step4Colore,
          //cartoline
          print_type:         step4Tipo,
          paper_grammage:     step4Grammatura,
          paper_type:         step4Carta,

          //gadget step 4-2
          gadget:             step4Gadget,
          weight:             step4Peso,

          rec: step5Pagine,
          //step 5-2
          page_Format:                step52Formato,
          internal_pages:             step52Misure,
          number_of_pages:            step52Quantita,
          printing_of_internal_letter:step52Stampa,

          print_quality_internal:     step5InternoStampa,
          type_of_printing_internal:  step5InternoColore,

          file_customer:  step6Dest,
          note:           step6Note,

          //step7
          First_Name:   name,
          Company:      agency,
          Phone_Number: number,
          Email:        email,
        }
      );
      if (res.status === 200) {
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
    { value: "Interno",      url: "/Lettere/Step-5-2" },
    { value: "Destinatari",     url: "/Lettere/Step-6" },
    { value: "Contatto",        url: "/Lettere/Step-7" },
  ];

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
                  <p className="step1-txt">
                    Ultimo Step:<span> Dettagli contatto </span>
                  </p>
                  <p className="rhs-des">
                    In questo step finale, ti chiediamo di fornire i tuoi
                    dettagli di contatto
                  </p>
                </div>
                <div></div>
                <div className="rhs7-card-btn-body">
                  <div className="">
                    <div className="forms-main">
                      <form className="form-group inputs-all">
                        <div className="w-100">
                          <input
                              type="text"
                              className={
                                name
                                    ? "form-control form-custom-control outer1"
                                    : "form-control form-custom-control"
                              }
                              id="exampleFormControlInput1"
                              placeholder="Nome e Cognome"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                              type="text"
                              className={
                                agency
                                    ? "form-control form-custom-control outer2"
                                    : "form-control form-custom-control"
                              }
                              id="exampleFormControlInput2"
                              placeholder="Azienda"
                              value={agency}
                              onChange={(e) => setAgency(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                              type="tel"
                              className={
                                number
                                    ? "form-control form-custom-control outer3"
                                    : "form-control form-custom-control"
                              }
                              id="exampleFormControlInput3"
                              placeholder="Numero di Telefono"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <input
                              type="email"
                              className={
                                email
                                    ? "form-control form-custom-control outer4"
                                    : "form-control form-custom-control"
                              }
                              id="exampleFormControlInput4"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="form-check7">

                      <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault1"
                          checked={termsAccepted}
                          onChange={() => setTermsAccepted(!termsAccepted)} // Gestione dello stato della checkbox
                      />
                      <label
                          className="form-check-label7"
                          htmlFor="flexCheckDefault1"
                      >
                        Con l'invio di questa richiesta, accetto espressamente i
                        Termini e Condizioni e acconsento al<br></br>{" "}
                        trattamento dei miei dati personali in conformità con la
                        Privacy Policy.
                      </label>
                    </div>
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
                        name && number && agency && email && termsAccepted
                            ? "btn-r2-active"
                            : "btn-r2"
                    }
                    onClick={nextstep}
                  >
                    Invia Richiesta Preventivo
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
                      name && number && agency && email && termsAccepted
                        ? "btn-r2-active"
                        : "btn-r2"
                    }
                    onClick={nextstep}
                  >
                    Invia Richiesta Preventivo
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
