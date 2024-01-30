import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/styledButton/StyledButton";
import TradingPic from "../../assets/trading-graphic.png";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const points = [
    "Sharpen your skills.",
    "Explore strategies. ",
    "Gain confidence risk-free.",
  ];

  return (
    <section className="home-container">
        <div>
          <h2>
            Start Trading <br /> Now.{" "}
          </h2>
          {points.map((point) => (
            <h4 key={point}>{point}</h4>
          ))}
          <StyledButton
            color={"dark"}
            onclick={() => {
              navigate("/signUp");
            }}
          >
            Sign Up
          </StyledButton>
          <StyledButton
            color={"light"}
            onclick={() => {
              navigate("/login");
            }}
          >
            Log in
          </StyledButton>
        </div>
        <img src={TradingPic} alt="" />
    </section>
  );
};

export default LandingPage;
