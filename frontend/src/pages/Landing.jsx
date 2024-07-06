import reactLogo from '../../public/react.svg';
import '../styles/Landing.css';

function LandingPage() {
  return (
    <>
      <div className="div-logo">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
    </>
  );
}

export default LandingPage;
