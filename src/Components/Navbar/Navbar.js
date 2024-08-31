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
              <Nav.Link href="https://www.spedireadesso.com/spedizioni-nazionali/spedire-in-italia.html">Spedire in Italia</Nav.Link>
              <Nav.Link href="https://www.spedireadesso.com/spedizioni-internazionali/spedire-in-europa.html">Spedire in Europa</Nav.Link>
              <Nav.Link href="https://www.spedireadesso.com/spedire-all-estero.html">Spedire all'estero</Nav.Link>

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
                href="https://www.spedireadesso.com/modulo-spedisci-busta.html"
                title="acquista francobollo"
              >
                <img
                  src="/Images/Navbar/icon-1.svg"
                  alt="acquista francobollo"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="https://www.spedireadesso.com/modulo-richiesta-preventivo-postale.html"
                title="Advertising mail quote form"
              >
                <img
                  src="/Images/Navbar/icon-2.svg"
                  alt="Advertising mail quote form"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={3}
                href="https://www.spedireadesso.com/modulo-ordine-spedizione.html"
                title="spedizione busta"
              >
                <img
                  src="/Images/Navbar/icon-3.svg"
                  alt="spedizione busta"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={4}
                href="#https://www.spedireadesso.com/modulo-ordine-spedizione.html"
                title="spedizione pacco"
              >
                <img
                  src="/Images/Navbar/icon-4.svg"
                  alt="spedizione pacco"
                />
              </Nav.Link>

              <Nav.Link
                eventKey={5}
                href="https://www.spedireadesso.com/modulo-ordine-spedizione.html"
                title="Spedizione valigia"
              >
                <img
                  src="/Images/Navbar/icon-5.svg"
                  alt="Spedizione valigia"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={6}
                href="https://www.spedireadesso.com/modulo-richiesta-preventivo.html"
                title="spedizione bicicletta"
              >
                <img
                  src="/Images/Navbar/icon-6.svg"
                  alt="spedizione bicicletta"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={7}
                href="https://www.spedireadesso.com/modulo-ordine-spedizione.html"
                title="spedizione pallet"
              >
                <img
                  src="/Images/Navbar/icon-7.svg"
                  alt="Spedizione pallet"
                />
              </Nav.Link>
              <Nav.Link
                eventKey={8}
                href="https://www.spedireadesso.com/modulo-richiesta-preventivo.html"
                title="modulo richiesta preventivo"
              >
                <img src="/Images/Navbar/icon-8.svg" alt="modulo richiesta preventivo" />
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
              <img src="/Images/Logo.svg" alt="SpedireAdesso"  className="logo-img"/>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            
            </Nav>
            <Nav className="bottombar">
              <Nav.Link eventKey={1} href="https://www.spedireadesso.com/spedizioni-nazionali.html" alt="spedizioni nazionali pacchi">
                Spedizioni Nazionali
              </Nav.Link>
              <Nav.Link eventKey={2} href="https://www.spedireadesso.com/spedizioni-internazionali.html" alt="spedizione internazionale">
                Spedizioni Internazionali
              </Nav.Link>
              <Nav.Link eventKey={3} href="https://www.spedireadesso.com/assistenza-spedizioni/come-spedire.html" alt="come spedire un pacco">
                Come spedire
              </Nav.Link>
              <Nav.Link eventKey={4} href="https://www.spedireadesso.com/blog.html" alt="spedireadesso blog">
                Blog
              </Nav.Link>

              <Nav.Link eventKey={5} href="https://www.spedireadesso.com/contatti.html" alt="spedireadesso contatti">
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
