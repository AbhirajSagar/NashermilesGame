import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityComponent = () => {
  const { unityContext, unityProvider } = useUnityContext({
    loaderUrl: 'build/Nashermiles Game.loader.js',
    dataUrl: 'build/Nashermiles Game.data',
    frameworkUrl: 'build/Nashermiles Game.framework.js',
    codeUrl: 'build/Nashermiles Game.wasm',
  });

  const unityContainerStyles = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

const modalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2, // Higher zIndex to overlay on top of the Unity game
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '40%',
  };

const inputStyles = {
    margin: '10px 0',
  };

  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    const handleUnityMessage = (event) => {
      console.log(typeof event);
      let eventString = String(event);
      if (eventString.includes('GameEnded')) {
        setShowForm(true);
      }
    };


window.handleUnityMessage = handleUnityMessage;

    window.addEventListener('message', window.handleUnityMessage);

    return () => {
      window.removeEventListener('message', window.handleUnityMessage);
      delete window.handleUnityMessage;
    };
  }, [unityContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Captured user information:', userInfo);
    setUserInfo({ name: '', email: '', mobile: '' });
    setShowForm(false);
  };

const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (showForm) {
      document.getElementById('nameInput').focus();
    }
  }, [showForm]);

return (
    <div style={unityContainerStyles}>
      <Unity unityProvider={unityProvider} style={{ width: '370.3px', height: '90%',}} />
      {showForm && (
        <div style={modalStyles}>
          <div style={formStyles}>
            <label style={inputStyles}>
              Name:
              <input
                id="nameInput"
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
              />

</label>
            <label style={inputStyles}>
              Mobile:
              <input
                type="tel"
                value={userInfo.mobile}
                onChange={(e) => setUserInfo({ ...userInfo, mobile: e.target.value })}
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnityComponent;