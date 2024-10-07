import React from "react";
import { Col } from "react-bootstrap";
import "./ColonnaSx.css"; // Questo sarà il file CSS per questo componente

const ColonnaSx = () => {
    return (
        <Col md={4} className="col-lhs">
            <div className="col-lhs-inner">
                <div className="lhs-img">
                    <img src={`${process.env.PUBLIC_URL}/Images/Step1/send-img.svg`} alt="send" />
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
                    Per maggiori informazioni su questo{" "}
                    <a
                        href="https://www.spedireadesso.com/servizio-di-stampa-imbustamento-affrancatura-ed-invio.html"
                        target="_blank"
                    >
                        nuovo  servizio postale clicca qui.
                    </a>
                </p>
            </div>
        </Col>
    );
};

export default ColonnaSx;
