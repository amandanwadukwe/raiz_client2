import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSound from 'use-sound';
import ReactPlayer from 'react-player';
import Forum from "./Forum";
import success from '../resources/success.mp3';
import NoticeBoard from "./NoticeBoard";
import RegistrationRequests from "./RegistrationRequests";
import Community from "./Community";
import Resource from "./Resource";
import Header from "./Header";
import Messages from "./Messages";
import Account from "./Account";
import Popup from "./Popup";
import tick from "../resources/tick.png";
import backgroundVideo from "../resources/rustlingLeaves.mp4"
import Highlighter from "react-highlight-words";
import Help from "./Help";
import wormy1 from "../resources/wormy1.png";
import wormy2 from "../resources/wormy2.png";
import wormy3 from "../resources/wormy3.png";
import wormy4 from "../resources/wormy4.png";
import wormy5 from "../resources/wormy5.png";
import Footer from "./Footer";
import { Transition } from 'react-transition-group';

function Home() {
    let { email } = useParams();
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [activeNavLink, setActiveNavLink] = useState("");
    const [existingResource, setExistingResource] = useState([]);
    const [isNewResourceActivated, setIsNewResourceActivated] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [refreshContentResponse, setRefreshContentResponse] = useState(false);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [toggleNavBar, setToggleNavBar] = useState(false);
    const [activeResource, setActiveResource] = useState("");
    const [viewResource, setViewResource] = useState(false);
    const [isResourceOpen, setIsResourceOpen] = useState(false)
    const [play] = useSound(success);
    const [avatar, setAvatar] = useState("");
    const [inProp, setInProp] = useState(false);

        let image = "";
        if (avatar === "../resources/wormy1.png"){
            image = wormy1;
        } else if(avatar === "../resources/wormy2.png"){
            image = wormy2;
        } else if(avatar === "../resources/wormy3.png"){
            image = wormy3;
        } else if(avatar === "../resources/wormy4.png"){
            image = wormy4;
        } else {
            image = wormy5
        }
    
        axios.get(`https://raiz-server2.herokuapp.com/user/${email}`)
        .then(res => {
            setAvatar(res.data[0].avatar)
        })
        .catch(err => console.log(err));

    useEffect(() => {
        console.log("I have been triggered")
        axios.get(`https://raiz-server2.herokuapp.com/content`)
            .then(res => {
                setExistingResource(res.data);
            })
            .catch(err => console.log(err));
    }, [refreshContentResponse])


    useEffect(() => {
        axios.get(`https://raiz-server2.herokuapp.com/user/${email}`)
            .then(res => {

                setRole(res.data[0].role);
                setName(res.data[0].firstName);
                setLastName(res.data[0].lastName);
                setDateJoined(res.data[0].date);
            })
            .catch(err => console.log(err));
    }, [email])

    const duration = 200;

    const defaultStyle = {
        transition: `color ${duration}ms ease-in-out`,
        color: 'black',
        PointerEvent:"none",
        position:"fixed",
        top:"13vh",
        zIndex:100
    };

    const transitionStyles = {
        entering: {
            transform: 'translateX(-100vw)',
            opacity: 0,
        },
        entered: {
            opacity: 1,
            transform: 'translateX(-0px)',

            transition: `all ${duration}ms cubic-bezier(1, -0.59, 0, 1.43)`,
        },
        exiting: {
            transform: 'translateX(10px)',
        },
        exited: {
            transform: 'translateX(-100vw)',
            opacity: 0,
            transition: `all ${duration}ms cubic-bezier(1, -0.59, 0, 1.43)`,
        },

       
    };


    const togglePopup = () => {
        setIsOpen(true);
        setTimeout(() => console.log(setIsOpen(false)), 2000);
        play();
    }

    function createNewResource() {
        setIsNewResourceActivated(true);
    }

    function refreshResponse() {
        setRefreshContentResponse(true);
    }

    function goToAccount() {
        setActiveNavLink("My Account")
    }
    function toggleTheNavBar() {
        setToggleNavBar(!toggleNavBar);
    }

    function inpropLever(){
        setInProp(!inProp)
    }
    return (
        <div>
            {/* <p>You are in the home page of the backend.</p> */}
            <Header page={"home"} lever={inpropLever} email={email} toggleNavBar={toggleTheNavBar} goToAccount={goToAccount} />
            <Transition in={inProp} timeout={0}>
                    {(state) => (
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                            }}
                        >
            <nav className={!toggleNavBar ? "primary-navigation display" : "primary-navigation hide"}>
                <ul>
                    <li onClick={() => {
                        setActiveNavLink("My Account");
                        inpropLever();
                    }}><img className="avatar" src={image} alt="profile"/></li>
                    <li onClick={() => {
                        setActiveNavLink("Home");
                        inpropLever();
                    }}>Home</li>
                    {/* <li onCli
                    ck={() => {
                        setActiveNavLink("Notices");
                    }}>Notices</li> */}

                    <li className={role === "Admin" ? "display" : "hide"} onClick={() => {
                        setActiveNavLink("Requests");
                        inpropLever();
                    }}>Requests</li>
                    <li onClick={() => {
                        setActiveNavLink("Community");
                        inpropLever();
                    }}>Community</li>
                    <li onClick={() => {
                        setActiveNavLink("Messages");
                        inpropLever();
                    }}>Messages</li>
                    <li onClick={() => {
                        setActiveNavLink("Resources");
                        inpropLever();
                    }}>Resources</li>
                    <li onClick={() => {
                        setActiveNavLink("Forum");
                        inpropLever();
                    }}>Forum</li>
                </ul>
            </nav>
            </div>
                    )}
                </Transition>
            <div className="home-container">
            <div className="first-background">
                <div className="second-background">
            <div className={activeNavLink === "Home" || activeNavLink === "" ? "display" : "hide"} style={{ marginTop: "13vw" }}>
                <span className="role">Role: <strong>{role.length > 0 ? role : "Loading..."}</strong> </span>
                <h1>Hi {name.length > 0 ? name : "Loading..."} !</h1>

            </div>
            <Account activeLink={activeNavLink} email={email} dateJoined={dateJoined} firstName={name} lastName={lastName} role={role} />
            <NoticeBoard activeLink={activeNavLink} role={role} />
            <RegistrationRequests role={role} activeLink={activeNavLink} />
            <Community role={role} email={email} activeLink={activeNavLink} firstName={name} lastName={lastName} />
            <Messages email={email} activeLink={activeNavLink} firstName={name} lastName={lastName} />
            {/* Pass in user email for automatic reload */}
            <div className={activeNavLink === "Resources" ? "resources-container display" : "resources-container hide"}>
                <button type="button" onClick={createNewResource}>Add new resource</button>
                <div>
                    <div>
                        <label>Search:<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" /></label>
                    </div>
                    {existingResource.map((exResource, index) => {
                        const resourceTitle = exResource.title;
                        const resourceContent = exResource.html;
                        if (resourceTitle.replace(/_/g, " ").toLowerCase().includes(search.toLowerCase()) || resourceContent.replace(/_/g, " ").toLowerCase().includes(search.toLowerCase())) {



                            return <div className="resource">

                                <div className="resource-title">
                                    <h1> <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[search]}
                                        autoEscape={true}
                                        textToHighlight={resourceTitle.replace(/_/g, " ")}
                                    /></h1>
                                    {/* <h1 dangerouslySetInnerHTML={{ __html: resourceTitle.replace(/_/g, " ") }}></h1> */}
                                    <div>
                                        <button type="button" onClick={() => {
                                            setActiveResource(resourceTitle.replace(/_/g, " "));
                                            setViewResource(!viewResource);
                                            setIsResourceOpen(true)
                                        }}>Toggle view</button>
                                        <button type="button" onClick={() => {
                                            setTitle(resourceTitle);
                                            setContent(resourceContent);
                                            setIsNewResourceActivated(true);
                                        }}>Edit</button><button>Delete</button>
                                    </div>
                                </div>
                                {/* <div>
                {isResourceOpen && <Popup
                    content={
                    
                    <div className="popup-content"  >
                        <div dangerouslySetInnerHTML={{ __html: resourceContent }}></div>
                        <button type="button" onClick={()=>setIsResourceOpen(false)}>Close</button>
                    </div>}
                    handleClose={togglePopup}
                />}
            </div> */}
                                <div className={activeResource === resourceTitle.replace(/_/g, " ") && viewResource ? "resource-content info display" : "resource-content info hide"} dangerouslySetInnerHTML={{ __html: resourceContent }}></div>

                            </div>
                        }
                    })}
                </div>


                <Resource togglePopup={togglePopup} refresh={refreshResponse} activated={isNewResourceActivated} title={title} content={content} handleSave={() => setIsNewResourceActivated(false)} />

            </div>
            <div>
                {isOpen && <Popup
                    content={
                    
                    <div className="popup-content">
                        <p><b>Resource updated!</b></p>

                        <img className="success-image" src={tick} alt="successful deletion" />
                    </div>}
                    handleClose={togglePopup}
                />}
            </div>
            
            
            <Forum email={email} activeLink={activeNavLink} firstName={name} lastName={lastName}/>
            {/* <div className="background-video">
                <ReactPlayer url={backgroundVideo} width="100%" muted={true} playing={true} loop={true} />
            </div> */}
            
            <Help/>
            
        </div>
        </div>
        </div>
        <div className={activeNavLink === "Home" || activeNavLink === "" ? "info display" : "info hide"}>
                <p><strong>RAIS</strong> is a local charity which provides advocacy, information and support services to refugees and asylum seekers living in Lancaster and Morecambe. All of our volunteers have experience of helping asylum seekers and refugees in our city, and are committed to welcoming and supporting them.</p>
            </div>
            <div className={activeNavLink === "Home" || activeNavLink === "" ? "info display" : "info hide"}>
                <p>We provide information on matters including housing benefits, employment, education, family reunion and applying for indefinite leave to remain. We well refer of sighpost to other professsional agencies for advice where appropriate.</p>
                <p>We also provide advocacy for refugees in dealing iwth various agencies and organisations. Our volunteers can accompany people to appointments, and help with form-filling, application etc.</p>
                <p><strong>All enquires and any information given to us are treated in the strictest confidence. We never pass information to other people or agencies without the enquirer's permission.</strong></p>
            </div>
        <Footer />
        </div>
    )
}

export default Home;