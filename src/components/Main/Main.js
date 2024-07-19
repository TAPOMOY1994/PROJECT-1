import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const toggler = () => setToggle(!toggle);

  const signInWithGoogle = () => {
    setLoadingSignIn(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoadingSignIn(false);
      })
      .catch((error) => {
        console.error('Error signing in with Google: ', error);
        setError('Failed to sign in. Please try again.');
        setLoadingSignIn(false);
      });
  };

  // Inline styles for dark mode and light mode
  const mainStyle = {
    backgroundColor: toggle ? 'black' : 'white',
    color: toggle ? 'white' : 'black',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  return (
    <div className="main" style={mainStyle}>
      <button onClick={toggler}>{toggle ? "LIGHT MODE" : "DARK MODE"}</button>
      <Nav user={user} signInWithGoogle={signInWithGoogle} loadingSignIn={loadingSignIn} error={error} />
      <div className="main-container">
        {showResult ? <Result recentPrompt={recentPrompt} loading={loading} resultData={resultData} /> : <Greeting />}
        <PromptInput onSent={onSent} input={input} setInput={setInput} />
      </div>
    </div>
  );
};

const Nav = ({ user, signInWithGoogle, loadingSignIn, error }) => (
  <div className="nav">
    <p>ChatBot</p>
    {user ? (
      <div className="user-info">
        <img src={user.photoURL} alt={user.displayName} className="user-photo" />
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>
    ) : (
      <button onClick={signInWithGoogle} disabled={loadingSignIn}>
        {loadingSignIn ? 'Signing in...' : 'Sign in with Google'}
      </button>
    )}
    {error && <p className="error-message">{error}</p>}
  </div>
);

const Result = ({ recentPrompt, loading, resultData }) => (
  <div className="result">
    <div className="result-title">
      
      <p>{recentPrompt}</p>
    </div>
    <div className="result-data">
      <img src={assets.gemini_icon} alt="Gemini Icon" />
      {loading ? (
        <div className="loader">
          <hr className="animated-bg" />
          <hr className="animated-bg" />
          <hr className="animated-bg" />
        </div>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
      )}
    </div>
  </div>
);

const Greeting = () => (
  <>
    <div className="greet">
      <p><span>Hello, Tapomoy.</span></p>
      <p>How can I help you today?</p>
    </div>
    <div className="cards">
      <Card text="Suggest beautiful places to see on an upcoming road trip" icon={assets.compass_icon} />
      <Card text="Briefly summarize this concept: urban planning" icon={assets.bulb_icon} />
      <Card text="Brainstorm team bonding activities for our work retreat" icon={assets.message_icon} />
      <Card text="Improve the readability of the following code" icon={assets.code_icon} />
    </div>
  </>
);

const Card = ({ text, icon }) => (
  <div className="card">
    <p>{text}</p>
    <img src={icon} alt="Card Icon" />
  </div>
);

const PromptInput = ({ onSent, input, setInput }) => (
  <div className="main-bottom">
    <div className="search-box">
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Enter a prompt here"
      />
      <div>
        <img src={assets.gallery_icon} width={30} alt="Gallery Icon" />
        <img src={assets.mic_icon} width={30} alt="Mic Icon" />
        {input && (
          <img
            onClick={() => onSent(input)}  // Ensure this is called with the correct input
            src={assets.send_icon}
            width={30}
            alt="Send Icon"
          />
        )}
      </div>
    </div>
    <p className="bottom-info">
      ChatBot may display inaccurate info, including about people, so
      double-check its responses. Your privacy and ChatBot Apps
    </p>
  </div>
);

export default Main;
