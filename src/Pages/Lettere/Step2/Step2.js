import React, { useEffect } from "react";
import "./Step2.css";
import Button from "react-bootstrap/Button";
import {Row, Col, Breadcrumb} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../../services/client";
import axios from "axios";
import { SuccessToast } from "../../../Components/Navbar/Toast/Toast";
import ColonnaSx from "../../../Components/Colonne/ColonnaSx";
import BreadcrumbBt from "../../../Components/Footer/BreadcrumbBt";

export default function Step2() {
  const now = 30;
  const [sendItem, setItem] = useState();

  //recupera info dal localstorage
  const step1Click  = localStorage.getItem("step1Click");
  const quantity    = localStorage.getItem("step2Quantity");
  const sendoption  = localStorage.getItem("sendoption");
  //fine recupera info dal localstorage

  //useEffect(() => {
    //setItem(localStorage.getItem("sendoption"));
    //console.log("step1Click is " + step1Click);
    //console.log("quantity is " + quantity);
  //},[]);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(quantity === null ? "":quantity);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const sendoption = queryParams.get("sendoption");

  //console.log("step1Click is " + step1Click);

  const handleRoutes = () => {
    localStorage.setItem("step2Quantity", inputValue);
    //localStorage.setItem("sendoption",sendoption);

    //console.log("inputValue is --> " +  inputValue);
    if (inputValue) {
      //navigate(`/Step-3?sendoption=${sendoption}`);
      navigate('/Step-3');
    }
  };

  const goBack = () => {
    //console.log("goBack1 /Step-1");
    navigate('/Step-1');
  };

  async function nextstep() {
    try {
      //const userId = localStorage.getItem("_id");
      /*
      const res = await axios.post(`${API_URL}/auth/addQA_lettere_step2`, {
        id: userId,
        quantity: inputValue,
      });
       */
      let resstatus = 200;
      if (resstatus === 200) {
        //console.log("quantity is ", inputValue);
        handleRoutes();
        // SuccessToast("updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const breadcrumbArray = [
    { value: sendoption, url: "/Step-1" },
    { value: "Qtà", url: "/Step-2" },
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
                  <p className="step2-txt">
                    <span className="step2-txt-sp1"> Q.tà da spedire </span>
                    <span className="step2-txt-sp2"> (min 100 pezzi) </span>
                  </p>
                  <p className="rhs-st2-des">
                    Inserisci il numero totale di unità che desideri spedire. È
                    richiesto un minimo di 100 pezzi per<br></br> procedere con
                    la richiesta.
                  </p>
                </div>
                <div className="rhs-input-btn-body">
                  <div>
                    <form className="form-ship">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control ship-quantity-form ship-width"
                          id="exampleInputQuantity"
                          onChange={handleChange}
                          placeholder="es. 100 pezzi"
                            value={inputValue}
                        />
                      </div>
                    </form>
                    {inputValue < 100 && (
                      <p className="alert-input">
                        La quantità minima è 100 pezzi
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="btn-rhs-row-mb">
                <div>
                  <button className="btn-r1" onClick={goBack} >
                    Indietro
                  </button>
                </div>
                <div className="btn2-div">
                  <button
                    className={inputValue >= 100 ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={inputValue >= 100 ? false : true}
                  >
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
                  <button
                    className={inputValue >= 100 ? "btn-r2-active" : "btn-r2"}
                    onClick={nextstep}
                    disabled={inputValue >= 100 ? false : true}
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
