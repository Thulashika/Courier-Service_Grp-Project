import { 
  CButton,
  CCard, 
  CCardBody, 
  CCardFooter, 
  CCardImageOverlay, 
  CCardLink, 
  CCardText, 
  CCarousel,  
  CCarouselItem, 
  CCol, 
  CCollapse, 
  CContainer, 
  CFooter, 
  CForm, 
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CImage, 
  CLink, 
  CNav, 
  CNavbar, 
  CNavbarBrand, 
  CNavbarNav, 
  CNavItem, 
  CNavLink, 
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibInstagram, cibLinkedin, cibWhatsapp, cilEnvelopeClosed, cilLocationPin, cilPhone } from '@coreui/icons'
import yoga from '../../../src/assets/images/yoga.png'
import background1 from '../../assets/images/t1.png'
import background2 from '../../assets/images/del2.jpg'
import background3 from '../../assets/images/pB2.webp'
import trackImg from '../../assets/images/tra1.png'
import companyImg from '../../assets/images/Company.png'
import expressImage from '../../assets/images/ED.gif'; 
import parcelTrackingImage from '../../assets/images/Parcel Tracking.gif'; 
import securePackagingImage from '../../assets/images/shipping.gif';
import officeToOfficeImage from '../../assets/images/office.gif'; 
import backgroundImage from '../../assets/images/background_1.jpg';
import ContactUs_1 from '../../assets/images/contact-us.gif';
import office from '../../assets/images/office.png'
import value from '../../assets/images/value.png'
import truck from '../../assets/images/truck.png'
import employee from '../../assets/images/employee.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Step, StepLabel, Stepper } from '@mui/material'
import { PARCEL_ERRORS } from '../../const';
import NFRN from '../../assets/images/NoData.png'
import { CONTACT_US_ERRORS } from '../../const'
import { Link } from "react-scroll";
import callImage from '../../assets/images/24-hours.gif'
import emailImage from '../../assets/images/message.gif'
import hourImage from '../../assets/images/time.gif'

const headerStyle = {
  color: 'blue',
};

function Landingpage() {

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showMore, setShowMore] = useState({
    express: false,
    tracking: false,
    packaging: false,
    warehouse: false,
    office: false,
  });

  const toggleShowMore = (section) => {
    setShowMore((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const locationParagraphStyle = {
    margin: '0',
    color: '#333333', 
    fontSize: '1.2rem',
    textAlign: 'center', 
    fontFamily: 'Open Sans, sans-serif',
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    padding: '20px',
    color: 'white', 
  };

  const locationStyle = {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    marginBottom: '1rem',
    padding: '1rem',
  };

  const locationHeaderStyle = {
    marginTop: '0',
    color: '#003366', 
    fontSize: '1.5rem',
    textAlign: 'center', 
    fontFamily: 'Georgia, serif',
  };

  const [contactus, setContactus] = useState({ 
    name: '', 
    email: '', 
    phoneNumber: '',
    message: '' 
  })

  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)

    const phoneRegex = /^(7[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/; 
   
    if (contactus.phoneNumber.length !== 10) {
      setError(CONTACT_US_ERRORS.PHONENUMBER_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!phoneRegex.test(contactus.phoneNumber)){
      setError(CONTACT_US_ERRORS.PHONENUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    if(isValid) {
      axios('http://localhost:6431/contactus', {
        data:contactus,
        method:'POST'
      }).then(res => {
        if (res.data.statusCode === 201) {
          window.location.reload();
          navigate('/')
        } else {
          alert("Not contacted successfully")
        }
      }).catch(err => {
        if(err.response?.data?.statusCode === 500) {
          alert(err.response.data.statusMessage)
          return
        }
        alert("Contact was not successfully")
      })
    }
  };

  const steps = [
    "Accepted", "Processed_and_Ready_to_Ship", "Shipping", "Delivered"
  ];

  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); 
  const [dialogMessage, setDialogMessage] = useState(''); 

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogMessage('');
  };

  const statusMap = {
    ACCEPTED: 0,
    Processed_and_Ready_to_Ship: 1,
    SHIPPING: 2,
    DELIVERED: 3,
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('');
    setIsValid(true);

    const BCregex = /^(?:P)?[0-9]{4}$/;

    if (trackingNumber.trim() === '') {
      setError(PARCEL_ERRORS.NUMBER_VALIDATION)
      setIsValid(false);
      setOpenDialog(true);
      return;
    }

    if (trackingNumber.length !== 5) {
      setError(PARCEL_ERRORS.NUMBER_LENGTH_VALIDATION);
      setIsValid(false);
      setOpenDialog(true);
      return;
    }

    if (!BCregex.test(trackingNumber)) {
      setError(PARCEL_ERRORS.NUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      setOpenDialog(true);
      return;
    }
    
    if (isValid) {
      axios
        .get(`http://localhost:6431/track_parcels/${trackingNumber}`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setParcel(res.data);
            setError('');
            setCurrentStep(statusMap[res.data.status.status] ?? null)
          } else {
            <CImage rounded style={{ background: 'transparent', backgroundColor: 'red' }} src={NFRN} width={200} height={200} align="center"/>
            setDialogMessage('Parcel not found');
            setOpenDialog(true);
          }
        })
        .catch((err) => {
          if (err.response?.data?.statusCode === 500) {
            setError('Parcel not found');
            setParcel(null);
            return
          }
          setError(<CImage rounded style={{ background: 'transparent', backgroundColor: 'red' }} src={NFRN} width={200} height={200} align="center"/>)
          setDialogMessage('Error occurred while fetching parcel data');
          setOpenDialog(true);
        });
    }
  };

  return (
    <div style={{ margin: '0', overflowX: 'hidden' }}>
      <CRow>
        <CRow className="mb-5"></CRow>

        <CRow className="mb-5">
          <CNavbar className={`bg-body-tertiary ${scrolled ? 'd-none' : ''}`} expand="lg" style={{ position: 'fixed', top: 0, left:0, right:0, maxWidth: '100%', zIndex: 999 }}>
            <CContainer fluid>
              <CNavbarBrand href='/' color='info'>
                <CImage src={yoga} height={75} width={75}/>
                  <strong className='text-warning'>Yoga Transport</strong>
                <div>
                  <h6>We keep improving to serve you better!</h6>
                </div>
              </CNavbarBrand>
              <CCollapse className='navbar-collapse justify-content-end' visible>
                <CNavbarNav>
                  <CNavItem>
                    <CImage src={callImage} height={25} width={25}/>
                    Call Us:
                    <CNavLink
                      href=""
                      active
                      style={{
                        textDecoration: 'none', 
                        color: 'inherit',
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'orange'} 
                      onMouseLeave={(e) => e.target.style.color = 'inherit'}
                    >
                      <strong>0779261129</strong>
                    </CNavLink>

                  </CNavItem>
                  <CNavItem>
                    <CImage src={emailImage} height={25} width={25}/>
                    Email Us:
                    <CNavLink 
                      href='https://myaccount.google.com/?hl=en&utm_source=OGB&utm_medium=act&gar=WzEyMF0&pli=1' 
                      active
                      style={{
                        textDecoration: 'none', 
                        color: 'inherit',
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'orange'} 
                      onMouseLeave={(e) => e.target.style.color = 'inherit'}
                    >
                      <strong>Yogatransport0@gmail.com</strong>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CImage src={hourImage} height={25} width={25}/>
                    Opening Hours:
                    <CNavLink active>
                      <strong>Mon-Fri: 8am – 7pm</strong>
                    </CNavLink>
                  </CNavItem>
                </CNavbarNav>
                <CButton
                  type="submit"
                  color="warning"
                  href="/login"
                  style={{ 
                    transition: 'background-color 0.3s ease', 
                    color: 'inherit',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'orange'} 
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''} 
                >
                  <strong>Login</strong>
                </CButton>

            </CCollapse>
            </CContainer>
          </CNavbar>
        </CRow>

        <CContainer>
          <CCard className="mb-3 bg-dark text-black">
            <CCardImageOverlay>
              <CRow className="mb-5">
                <CNavbar
                  className={`bg-dark ${scrolled ? 'visible' : 'd-none'}`} 
                  expand="lg"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left:0,
                    right:0,
                    width: '100vw',
                    zIndex: 999,
                  }}
                >
                  <CCol xs={6}>
                    <CNav as="nav" expand="lg" layout="fill">
                      <CCollapse className="navbar-collapse w-100" variant="underline-border" visible>
                        <CNavbarNav>
                          <CNavItem>
                            <CNavLink href="/">
                              <h4 className="text-warning">
                                Y
                                <CImage src={yoga} height={25} width={25} />
                                ga Transport
                              </h4>
                            </CNavLink>
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>

                  <CCol xs={4}>
                    <CNav as="nav" variant="underline" expand="lg" layout="fill" >
                      <CCollapse className="navbar-collapse" variant="underline-border" visible>
                        <CNavbarNav>
                          <CNavItem>
                            <Link to="/" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              Home
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="track" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              Track & Trace
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="ourservices" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              Our Services
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="findus" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              Branch
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="conatctus" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              Contact Us
                            </Link>
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>

                  <CCol xs={2}>
                    <CNav as="nav" expand="lg" layout="fill" className="justify-content-end">
                      <CCollapse className="navbar-collapse">
                        <CNavbarNav>
                          <CNavItem>
                            <CNavLink href="https://www.facebook.com/profile.php?id=61566920254278" active className="text-warning">
                              <CIcon icon={cibFacebook} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://www.instagram.com/yogatrans0/" className="text-warning">
                              <CIcon icon={cibInstagram} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://api.whatsapp.com/send?phone=+94702102700" className="text-warning">
                              <CIcon icon={cibWhatsapp} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://www.linkedin.com/in/yoga-transport-01a766333/" className="text-warning">
                              <CIcon icon={cibLinkedin} size="xl" />
                            </CNavLink>
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>
                </CNavbar>

                <CNavbar
                  className={`bg-dark ${!scrolled ? 'visible' : 'd-none'}`}
                  expand="lg"
                  style={{
                    position: 'fixed',
                    top: '125px',
                    left:0,
                    right:0, 
                    width: '100vw',
                    zIndex: 999,
                  }}
                >
                  <CCol xs={6}>
                    <CNav as="nav" expand="lg" layout="fill">
                      <CCollapse className="navbar-collapse w-100" variant="underline-border" visible>
                        <CNavbarNav>
                          <CNavItem>
                            <CNavLink href="/">
                              <h4 className="text-warning">
                                <strong>Yoga</strong>                               
                              </h4>
                            </CNavLink>
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>

                  <CCol xs={4}>
                    <CNav as="nav" variant="underline" expand="lg" layout="fill">
                      <CCollapse className="navbar-collapse" variant="underline-border" visible>
                        <CNavbarNav>
                          <CNavItem>
                            <Link to="/" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              <strong>Home</strong>
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="track" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              <strong>Track & Trace</strong>
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="ourservices" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              <strong>Our Services</strong>
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="findus" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              <strong>Branch</strong>
                            </Link>
                          </CNavItem>

                          <div style={{ width: '20px' }} />

                          <CNavItem>
                            <Link to="contactus" smooth={true} duration={500} className="text-warning mr-3" style={{ cursor: 'pointer' }}>
                              <strong>Contact Us</strong>
                            </Link>                            
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>

                  <CCol xs={2}>
                    <CNav as="nav" expand="lg" layout="fill" className="justify-content-end">
                      <CCollapse className="navbar-collapse">
                        <CNavbarNav>
                          <CNavItem>
                            <CNavLink href="https://www.facebook.com/profile.php?id=61566920254278" active className="text-warning">
                              <CIcon icon={cibFacebook} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://www.instagram.com/yogatrans0/" className="text-warning">
                              <CIcon icon={cibInstagram} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://api.whatsapp.com/send?phone=+94702102700" className="text-warning">
                              <CIcon icon={cibWhatsapp} size="xl" />
                            </CNavLink>
                          </CNavItem>
                          <CNavItem>
                            <CNavLink href="https://www.linkedin.com/in/yoga-transport-01a766333/" className="text-warning">
                              <CIcon icon={cibLinkedin} size="xl" />
                            </CNavLink>
                          </CNavItem>
                        </CNavbarNav>
                      </CCollapse>
                    </CNav>
                  </CCol>
                </CNavbar>
              </CRow>
            </CCardImageOverlay>
          </CCard>
        </CContainer>

        <CContainer>
          <br/>
            <CCarousel controls indicators dark margin= ' 0 auto'>
              <CCarouselItem>
                <CImage className="d-block w-100" src={background1} alt="slide 1"  height={700}/>
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block">
                    <h1 style={{ color: 'black' }}><br/><br/>Welcome to Our<br/> Courier Management System</h1>
                    <p style={{ color: 'black' }}>Efficient, reliable, and secure courier services at your doorstep.</p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
              </CCarouselItem>

              <CCarouselItem>
                <CImage className="d-block w-100" src={background2} alt="slide 2" height={700}/>
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block text-end">
                    <h1 style={{ color: 'black' }}>
                    <br/><br/>
                      Opportunity In Every Direction
                    </h1>
                    <p style={{ color: 'black' }}>
                      We offer a complete array of services which can be tailor made to provide the best logistics to<br/>
                      corporate entities and suit individual needs
                    </p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
              </CCarouselItem>

              <CCarouselItem>
                <CImage className="d-block w-100" src={background3} alt="slide 3" height={700}/>
                <CCardImageOverlay>
                  <CContainer>
                    <CCardText className="d-none d-md-block">
                    <h1 style={{ color: 'black' }}>
                    <br/>
                      <br/>The Largest Domestic<br/>
                      Courier Service<br/>
                      Provider in Srilanka
                    </h1>
                    <p style={{ color: 'black' }}>
                      We offer a complete array of services which can be tailor made to<br/>
                      provide the best logistics to corporate entities and to suit<br/>
                      individual needs
                    </p>
                    </CCardText>
                  </CContainer>
                </CCardImageOverlay>
              </CCarouselItem>
            </CCarousel>
        </CContainer>

        <section id="track" height={700}>
          <CCard>
            <CImage className="d-block w-100" src={trackImg} alt="slide 1"  height={700}/>
            <CCardImageOverlay>
              <br/><br/><br/><br/>
              <CContainer>
                <CCardText className="d-none d-md-block d-md-flex justify-content-center">
                  <h1 style={{ color: 'black' }}><strong>Track Your Item</strong></h1>
                </CCardText>
              </CContainer>

              <div className=" min-vh-50 d-flex flex-row align-items-center">
                  <CContainer>
                    <CRow className="justify-content-center">
                    <CCol md={12}>
                        <CCardBody>
                          <CForm>
                            <h3 className="text-dark"><strong>Track & Trace</strong></h3>
                            <CRow className="mb-3"/>
                            <CRow className="mb-3 text-center">
                              <CFormInput
                                sx={{
                                  backgroundColor: 'transparent',
                                  color: 'black', 
                                  fontSize: '1.2rem',
                                }}
                                placeholder='Tracking Number'
                                className="col-sm-4 col-form-label"
                                type="text"
                                id="inputTrackingNumber"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                              />                  
                            </CRow>

                            <CRow className='mb-5'>
                              <div className="d-grid gap-2 col-4 mx-auto">
                                <CButton color="dark" onClick={handleSearch} >Track</CButton>
                              </div>
                            </CRow>
                            {error && (
                              <Dialog open={openDialog} onClose={handleDialogClose}>
                              <DialogTitle>Tracking Information</DialogTitle>
                              <DialogContent>
                                <DialogContentText>{error}</DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
                            )}

                            <br/><br/><br/>
                            <br/><br/><br/>
                            <br/><br/>

                            <div
                              style={{
                                backgroundColor: 'rgba(10, 0, 0, 0.5)',
                                padding: '20px',
                                borderRadius: '10px',
                              }}
                            >
                              <Stepper
                                activeStep={currentStep}
                                alternativeLabel
                                sx={{
                                  '& .MuiStepLabel-label': { fontSize: '1.3rem', color: 'orange' }, 
                                  '& .MuiSvgIcon-root': { fontSize: '2.5rem', color: 'gray' },
                                  '& .Mui-completed .MuiStepLabel-label': { color: 'green' }, 
                                  '& .Mui-completed .MuiStepIcon-root': { color: 'green' }, 
                                  '& .Mui-active .MuiStepLabel-label': { color: 'black' },
                                  '& .Mui-active .MuiStepIcon-root': { color: 'black' }, 
                                }}
                              >
                                {steps.map((label) => (
                                  <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </div>
                          </CForm>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </CContainer>
              </div>
            </CCardImageOverlay>
          </CCard>
        </section>

        <section id="company" height={700}>
          <CCard>
            <CImage className="d-block w-100" src={companyImg} alt="slide 1"  height={700}/>
            <CCardImageOverlay>
              <div className=" min-vh-50 d-flex flex-row align-items-center">
                <CContainer>
                <br/><br/><br/><br/>              
                  <CRow>
                    <CCol md={4}>
                      <h1 style={{ color: 'black' }}><strong>The Company</strong></h1>
                    </CCol>
                    <CCol md={8}>
                      <h6 style={{ color: 'black' }}>
                        Yoga Transport is the largest and most experienced Domestic Courier
                        Service Company in the Srilanka handling timesnsitive documents
                        and packages for corporate and individual clients for over 34 years.
                        Over the years it has harnessed its dedication and devotion towards
                        the customer concerns. Its services and operational systems are
                        tailor made which could cater to the varying needs of the
                        customers. Speed, Security, Reliability and Accountability are
                        considered paramount in its services afforded to every customer.
                      </h6>
                      <br/><br/>
                      <CRow md={12}>
                        <CCol xs={3}>
                          <CImage src={office} alt='office' height={150}/> <br/> 
                          <h2 style={{ color: 'black' }}><strong> 3+ </strong></h2> <br/>
                          <h5 style={{ color: 'black' }}><strong> Islandwide Branches And Collection Centers </strong></h5>
                        </CCol>
                        <CCol xs={3}>
                          <CImage src={value} alt='value' height={150}/> <br/> 
                          <h2 style={{ color: 'black' }}><strong> 5000+ </strong></h2> <br/>
                          <h5 style={{ color: 'black' }}><strong> Customers Islandwide </strong></h5>
                        </CCol>
                        <CCol xs={3}>
                          <CImage src={truck} alt='truck' height={150}/> <br/> 
                          <h2 style={{ color: 'black' }}><strong> 20+ </strong></h2> <br/>
                          <h5 style={{ color: 'black' }}><strong> Owned Vehicles </strong></h5>
                        </CCol>
                        <CCol xs={3}>
                          <CImage src={employee} alt='employee' height={150}/> <br/> 
                          <h2 style={{ color: 'black' }}><strong> 100+ </strong></h2> <br/>
                          <h5 style={{ color: 'black' }}><strong> Employees </strong></h5>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CContainer>
              </div>
            </CCardImageOverlay>
          </CCard>
        </section>
      
        <section id="ourservices" height={700}>
          <CContainer 
            className="services-container" 
            style={{ padding: '2rem', 
                      borderRadius: '10px', 
                      position: 'relative', 
                      overflow: 'hidden' 
                  }}
          >
            <CRow className="justify-content-center mb-4">
              <CCol xs="auto">
                <p style={{ color: 'orange' }}>Opportunity in every direction</p>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-center">Our Services</h1>
              </CCol>
            </CRow>
            <p className="text-center" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
              YOGA Transport goes the extra mile in delivering logistics solutions to our customers with a portfolio of services tailored to their needs.
            </p>

            <CRow className="gy-4" style={{ color: '#000000' }}>
              <CCol md={6}>
                <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                            }}                        
                >             
                  <h3>Express Delivery</h3>
                  <CImage src={expressImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p><strong>Express delivery service:</strong> Provides the fastest shipping options with guaranteed delivery times.</p>
                  {showMore.express && (
                    <p style={{ fontSize: '0.95rem' }}>This service ensures that your packages are delivered quickly, with real-time tracking and priority handling. Our express delivery covers both local and international destinations.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('express')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.express ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol>

              <CCol md={6}>
                <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                          }}
                >
                  <h3>Parcel Tracking</h3>
                  <CImage src={parcelTrackingImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p><strong>Parcel tracking service:</strong> Monitor your parcel&apos;s journey in real-time.</p>
                  {showMore.tracking && (
                    <p style={{fontSize: '0.95rem' }}>With our advanced tracking system, you can view the current status, estimated delivery times, and updates. Stay informed with instant notifications and detailed tracking reports.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('tracking')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.tracking ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol>

              <CCol md={6}>
                <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px', 
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                >
                  <h3>Secure Packaging</h3>
                  <CImage src={securePackagingImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p><strong>Secure packaging service:</strong> Ensures items are packed safely for transport.</p>
                  {showMore.packaging && (
                    <p style={{fontSize: '0.95rem' }}>Our secure packaging solutions use high-quality materials to prevent damage. Whether fragile items or bulk goods, we guarantee safe and intact delivery.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('packaging')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.packaging ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol>

              {/* <CCol md={6}>
                <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                >
                  <h3>Warehouse Management Solution</h3>
                  <CImage src={warehouseImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p ><strong>Warehouse management service:</strong> Streamlines inventory management and order fulfillment.</p>
                  {showMore.warehouse && (
                    <p style={{fontSize: '0.95rem' }}>Our solutions optimize storage, reduce handling time, and improve accuracy. Advanced software integration and real-time inventory tracking ensure efficient management.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('warehouse')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.warehouse ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol> */}

              <CCol md={6}>
                <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                >
                  <h3>Office to Office Service</h3>
                  <CImage src={officeToOfficeImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p className="text-end">* Offices hold packages for 7 days.</p>
                  <p><strong>Office to office delivery service:</strong> Provides convenient delivery between business locations.</p>
                  {showMore.office && (
                    <p style={{ fontSize: '0.95rem' }}>Ideal for urgent documents and office materials. Our service ensures timely delivery with convenient pickup and drop-off scheduling.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('office')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.office ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol>

              {/* <CCol md={6}>
              <div style={{ 
                              padding: '2rem', 
                              borderRadius: '8px',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer'
                            }}

                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                >
                  <h3>Customs Clearance</h3>
                  <CImage src={customsImage} height={400} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
                  <p><strong>Customs clearance service:</strong> Simplifying cross-border shipping.</p>
                  {showMore.customs && (
                    <p style={{fontSize: '0.95rem' }}>Our team ensures a seamless customs clearance process, managing all required documentation, tariffs, and customs regulations.</p>
                  )}
                  <CButton onClick={() => toggleShowMore('customs')} color="link" style={{ color: '#ffc107' }}>
                    {showMore.customs ? 'Read Less' : 'Read More'}
                  </CButton>
                </div>
              </CCol> */}

            </CRow>
          </CContainer>
        </section>
        
        <section id="findus" height={700}>
          <CContainer fluid style={backgroundStyle}>
            <CRow className="justify-content-center">
                <div style={headerStyle}>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-center">Find Us</h1>
                </div>
            </CRow>
            <CRow className="justify-content-center">
                <CCol style={locationStyle}>
                  <h3 style={locationHeaderStyle}>Main Office</h3>
                  <p style={locationParagraphStyle}>261 1/21, 1/22 Prisma Piaza, Market Colombo-11</p>
                  <p style={locationParagraphStyle}>Colombo</p>
                  <p style={locationParagraphStyle}>Phone: 773874263</p>
                </CCol>
                <CCol style={locationStyle}>
                  <h3 style={locationHeaderStyle}>Branch  Jaffna Office</h3>
                  <p style={locationParagraphStyle}>Kantharmadam South West,Jaffna</p>
                  <p style={locationParagraphStyle}>Jaffna</p>
                  <p style={locationParagraphStyle}>Phone: 212229042</p>
                </CCol>
                <CCol style={locationStyle}>
                  <h3 style={locationHeaderStyle}>Branch Colombo Office</h3>
                  <p style={locationParagraphStyle}>No. 166, Wolfendal Street, Colombo-13</p>
                  <p style={locationParagraphStyle}>Jaffna</p>
                  <p style={locationParagraphStyle}>Phone: 114389166</p>
                </CCol>
            </CRow>
          </CContainer>
        </section>

        <CRow className="mb-5"></CRow>

        <section id="contactus" height={700}>
          <CContainer style={{ width: '80%', margin: '0 auto' }}>
            <CRow className='align-items-center'>
              <CCol xs={12} md={6}>
                <CCard style={{ width: '100%', padding: '0.5rem', minHeight: '200px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Contact Us</strong></h2>
                    <CCardBody style={{ padding: '0.5rem' }}>
                      <CForm className="row g-2"  onSubmit={handleSubmit}>
                        <CRow className='mb-2'>
                          <CCol xs={12}>
                            <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                              Name:
                            </CFormLabel>
                            <CFormInput 
                              type='text' 
                              onChange={(e) => setContactus({ ...contactus, name: e.target.value })}
                              required 
                              style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                            />
                          </CCol>
                          <CCol xs={12}>
                            <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                Email:
                            </CFormLabel>
                            <CFormInput 
                                type='email'
                                onChange={(e) => setContactus({ ...contactus, email: e.target.value })}
                                required 
                                style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                            />
                          </CCol>
                          <CCol xs={12}>
                            <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                Phone Number:
                            </CFormLabel>                                  
                            <CFormInput 
                                type='text'  
                                onChange={(e) => setContactus({ ...contactus, phoneNumber: e.target.value })}
                                style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                                required
                            />
                          </CCol>
                          <CCol xs={12}>
                            <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                              Message:
                            </CFormLabel>
                            <CFormTextarea
                              type="text" 
                              onChange={(e) => setContactus({ ...contactus, message: e.target.value })}
                              placeholder="Leave a comment here"
                              id="floatingTextarea2"
                              style={{ height: '50px', marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }}
                              required
                            />
                          </CCol>
                          {error && (
                            <CCol xs={12}>
                              <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>
                            </CCol>
                          )}
                          <CCol xs={12}>
                            <button
                              type="submit"
                              className={`btn btn-primary mt-1 ${!isValid ? 'disabled' : ''}`}
                              style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
                            >
                              Submit
                            </button>
                          </CCol>
                        </CRow>
                      </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <CImage src={ContactUs_1} width={500} />
              </CCol>
            </CRow>
          </CContainer>
        </section>
        
        <CRow className="mb-5"></CRow>

        <CContainer>
          <div style={{ position: 'relative', textAlign: 'right', width: '100%', height: '400px' }}>
            <div style={{ overflow: 'hidden', background: 'none', width: '90%', height: '400px' }}>
              <iframe
                title="University of Jaffna Map"
                className="gmap_iframe"
                width="90%"
                height="400px"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=No2 thiruvalluvar lane, arasady road, kandarmadam, jaffna.&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"              ></iframe>
            </div>
          </div>
        </CContainer>

        <CRow className="mb-5"></CRow>

        <CCardFooter style={{backgroundColor: '#000000'}} >
          <CRow className="mb-5"></CRow>
          <CContainer className='align-items-center'>
            <CRow>
              <CCol xs={6}>
              <CImage src={yoga} height={100} width={100}/> 
                <p className="text-light">Yoga Transport is the largest and most experienced Domestic Courier Service Company<br/>
                  in the Island handling time sensitive documents and<br/>
                  packages for corporate and individual clients for over 34 years.</p>
              </CCol>
              <CCol xs={3}>
                <h5 className="text-light"><strong>Quick Links</strong></h5>
                <CCardLink href='landingPage' style={{ color: '#ffc107' }}>Home</CCardLink> <br/>
                <CCardLink href='/' style={{ color: '#ffc107' }}>Our Services</CCardLink> <br/>
                <CCardLink href='/branch' style={{ color: '#ffc107' }}>Branch</CCardLink> <br/>
                <CCardLink href='' style={{ color: '#ffc107' }}>Find Us</CCardLink> <br/>
                <CCardLink href='' style={{ color: '#ffc107' }}>Contatct Us</CCardLink>
              </CCol>
              <CCol xs={3} className="text-light">
                <h5><strong>Contact Us</strong></h5>
                If you have any questions or need help, feel free to contact with our team.<br/>
                <CIcon icon={cilPhone} size="xl" style={{'--ci-primary-color': 'orange'}} /> 0779261129 <br/>
                <CIcon icon={cilEnvelopeClosed} size="xl" style={{'--ci-primary-color': 'orange'}} />   Yogatransport0@gmail.com <br/>
                <CIcon icon={cilLocationPin} size="xl" style={{'--ci-primary-color': 'orange'}} />  Kantharmadam South West,Jaffna.     
              </CCol>
            </CRow>

            <CFooter style={{backgroundColor:'#000000',padding: '1rem'}} className='align-items-center justify-content-center text-center'>
              <div>
                <span style={{ color: '#ffffff' }}>&copy; 2024 Yoga Transport | Designed by </span>
                <CLink href="https://coreui.io" style={{ color: '#ffc107' }}> CoreUI</CLink>
              </div>
            </CFooter>
          </CContainer>
        </CCardFooter>
      </CRow>
    </div>
  )
}

export default Landingpage