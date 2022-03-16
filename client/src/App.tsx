import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
// import ThemeContext from './contexts/ThemeContext';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import { AuthProvider } from './contexts/AuthContext';
import Hello from './components/hello/Hello';
import SignUp from './pages/sign-up/SignUp';
import TwoFactor from './pages/login/TwoFactor';
import { connect } from 'react-redux';

function App({ theme }: { theme: string }) {
  // const [theme, setTheme] = useState(
  //   localStorage.getItem('theme') || 'theme-auto'
  // );
  console.log(theme);
  return (
    <AuthProvider>
      {/* <ThemeContext.Provider value={{ theme, setTheme }}> */}
        <div className={`App ${theme}`}>
          <BrowserRouter>
            <Header />
            <Hello />
            <main>
              <Routes>
                {/* Main Route */}
                <Route path="/" element={<Home />} />

                {/* Chat Route */}
                <Route path="/chat" element={<Chat />} />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/2FA" element={<TwoFactor />} />

                {/* Sign Up Route */}
                <Route path="/sign-up" element={<SignUp />} />

                {/* Default Route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      {/* </ThemeContext.Provider> */}
    </AuthProvider>
  );
}

const mapStateToProps = (state: { theme: string }) => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps)(App);
