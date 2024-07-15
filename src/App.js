import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SignIn from "./googleSignIn/SignIn";


function App() {
  return (
    <>
    <SignIn />
      <Sidebar />
      <Main />
      
    </>
  );
}

export default App;
