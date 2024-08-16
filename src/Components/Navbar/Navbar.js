import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";

function CollapsibleExample() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=" bg-dark topbar d-none d-lg-block d-xl-block">
        <Container fluid className="top-bar-container">
          {/* <Navbar.Brand href="#home">
            <img src="/Images/Logo.svg" alt="Logo" />
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Spedire in Italia</Nav.Link>
              <Nav.Link href="#pricing">Spedire in Europa</Nav.Link>
              <Nav.Link href="#pricing">Spedire all'estero</Nav.Link>

              {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav className="topbar-nav-rhs">
              <Nav.Link
                eventKey={1}
                href="#FormPurchaseStamp"
                title="Form Purchase Stamp"
              >
                <img
                  src="/Images/Navbar/icon-1.svg"
                  alt="Form Purchase Stamp"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#Advertising mail quote form"
                title="Advertising mail quote form"
              >
                <img
                  src="/Images/Navbar/icon-2.svg"
                  alt="Advertising mail quote form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={3}
                href="#Envelope Shipping Order Form"
                title="Envelope Shipping Order Form"
              >
                <img
                  src="/Images/Navbar/icon-3.svg"
                  alt="Envelope Shipping Order Form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={4}
                href="#Parcel Shipping Order Form"
                title="Parcel Shipping Order Form"
              >
                <img
                  src="/Images/Navbar/icon-4.svg"
                  alt="Parcel Shipping Order Form"
                />
              </Nav.Link>

              <Nav.Link
                eventKey={5}
                href="#Suitcase Shipping Order Form"
                title="Suitcase Shipping Order Form"
              >
                <img
                  src="/Images/Navbar/icon-5.svg"
                  alt="Suitcase Shipping Order Form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={6}
                href="#Bicycle Shipping Order Form"
                title="Bicycle Shipping Order Form"
              >
                <img
                  src="/Images/Navbar/icon-6.svg"
                  alt="Bicycle Shipping Order Form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={7}
                href="#Pallet Shipping Order Form"
                title="Pallet Shipping Order Form"
              >
                <img
                  src="/Images/Navbar/icon-7.svg"
                  alt="Pallet Shipping Order Form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={8}
                href="#Quote Request Form"
                title="Quote Request Form"
              >
                <img src="/Images/Navbar/icon-8.svg" alt="Quote Request Form" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" className="navbar-btm">
        <Container fluid className="btmbar-container">
          <div className="info-icon">
            <i className="bi bi-info-square"></i>
          </div>
          <Navbar.Brand href="#home">
            <div>
              <img src="/Images/Logo.svg" alt="Logo"  className="logo-img"/>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            
            </Nav>
            <Nav className="bottombar">
              <Nav.Link eventKey={1} href="#Spedizioni Nazionali">
                Spedizioni Nazionali
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Spedizioni Internazionali
              </Nav.Link>
              <Nav.Link eventKey={3} href="#Come spedire">
                Come spedire
              </Nav.Link>
              <Nav.Link eventKey={4} href="#Blog">
                Blog
              </Nav.Link>

              <Nav.Link eventKey={5} href="#Contatti">
                Contatti
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CollapsibleExample;
