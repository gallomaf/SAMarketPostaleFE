import React from "react";
import "./Thankyou.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Thankyou() {
  const navigate = useNavigate();

  return (
    <>
    <div style={{height:"100vh",overflow:"hidden"}}>

    
      <Navbar />
      <div className="thankyou-whole">
        <div>
          <img src="/Images/thankyou.svg " alt="Thankyou"  className="thankyou-web"/>
        </div>
        <div>
          <img src="/Images/thankyou-mb.svg " alt="Thankyou"  className="thankyou-mb"/>
        </div>
        <div>
          <p className="head-thankyou">
            Grazie per aver richiesto un preventivo postale!{" "}
          </p>
          <p className="subtext-thankyou">
            Il nostro team elaborerà la richiesta inviando a breve la nostra
            miglior offerta!{" "}
          </p>
        </div>
        <div className="btns-thankyou">
          <button
            className="btn-neworder"
            onClick={() => {
              navigate("/");
            }}
          >
            Effettua un nuovo ordine
          </button>
          <button
            className="btn-back-home"
            onClick={() => {
              navigate("/");
            }}
          >
            Torna alla homepage
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
