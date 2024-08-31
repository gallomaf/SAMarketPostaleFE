import React from "react";
//import { Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
//import "./ColonnaSx.css"; // Questo sarà il file CSS per questo componente
import { useNavigate } from "react-router-dom";

const BreadcrumbBt = ({ breadcrumbArray , now}) => {
    const navigate = useNavigate();

    return (
        <div className="btm-rhs">
            <div>
                <p className="quotation-req">
                    <span onClick={() => navigate(`/`)}>
                        Richiesta Preventivo
                    </span>

                    {breadcrumbArray.map((item, index) => (
                        <span key={index}>
                            &gt;{" "}
                            <span
                                onClick={() => navigate(item.url)}
                                className={index === breadcrumbArray.length - 1 ? "selected-span" : ""}
                            >
                                {item.value}
                            </span>
                            {" "}
                        </span>
                    ))}


                </p>
            </div>
            <div className="step1-progress">
                <ProgressBar now={now} />
                <p className="percentage-txt">{now}%</p>
            </div>
        </div>
    );


};

export default BreadcrumbBt;
