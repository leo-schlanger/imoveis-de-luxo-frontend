import styled, { keyframes } from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StepView = styled.div`
  width: 100%;
  margin-top: 48px;
  margin-bottom: 16px;
  padding: 0px 10%;
`;

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translatex(50%);
  },
  to{
    opacity: 1;
    transform: translatex(0);
  }
`;

export const StepForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
  border: solid 3px ${colors.frame_color};
  width: 40%;
  margin: 20px 30%;
  padding: 30px 0px;
  margin-bottom: 20%;

  animation: ${appearFromRight} 1s;
  form {
    width: 80%;
    button {
      margin-top: 80px;
    }
  }
`;

export const PlansTable = styled.section`
  min-height: 100vh;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 2em 0 8em;
  min-height: 100vh;
  position: relative;
  border: none;
  animation: ${appearFromRight} 1s;
`;

export const PlanContainer = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto 3em;
`;

export const Plan = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: stretch;
  align-items: stretch;
  text-align: center;
  -webkit-flex: 0 1 330px;
  flex: 0 1 330px;
  margin: 1em;
  padding: 0 0 2em;
  cursor: default;
  border-radius: 10px;
  color: ${colors.sections_plans.title};
  background: ${colors.sections_plans.background};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05),
    0 15px 30px -10px rgba(0, 0, 0, 0.3);
  -webkit-transition: background 0.3s;
  transition: background 0.3s;

  &:hover {
    > div {
      color: ${colors.sections_plans.price_hover};
    }

    > div::before {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0) skewX(0deg);
      transform: translate3d(0, 0, 0) skewX(0deg);
    }
  }

  h3 {
    font-size: 2.35em;
    font-weight: 900;
    line-height: 1;
    width: 290px;
    margin: 0 auto;
    padding: 1em 1em 0em;
  }

  p {
    font-weight: bold;
    margin-bottom: 2em;
    color: ${colors.sections_plans.description};
  }

  ul {
    text-align: left;
    margin: 0;
    padding: 1em 1.25em 2em;

    li {
      margin: 0;
      padding: 2em 1em;
      list-style: none;
      text-align: center;
      color: ${colors.sections_plans.description};
    }
  }

  button {
    font-weight: bold;
    margin: 0 2em;
    padding: 1em 2em;
    border-radius: 4px;
    background: ${colors.sections_plans.price};
    -webkit-transition: background-color 0.3s, color 0.3s;
    transition: background-color 0.3s, color 0.3s;
  }

  button:hover {
    color: ${colors.sections_plans.button_text};
    background: ${colors.sections_plans.button_hover};
  }

  button:focus {
    color: ${colors.sections_plans.button_text};
    background: ${colors.sections_plans.button_hover};
  }
`;

export const PlanPrice = styled.div`
  font-size: 2em;
  font-weight: bold;
  position: relative;
  z-index: 10;
  overflow: hidden;
  padding: 0.75em;
  cursor: default;
  color: ${colors.sections_plans.price};
  background: ${colors.sections_plans.price_background};
  -webkit-transition: color 0.3s;
  transition: color 0.3s;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: ${colors.sections_plans.price_background_before};
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transform: translate3d(-150%, 0, 0) skewX(40deg);
    transform: translate3d(-150%, 0, 0) skewX(40deg);
  }

  .pricing__period {
    font-size: 0.5em;
    font-weight: normal;
    display: block;
    color: ${colors.sections_plans.price_period};
  }
`;

export const PlanSelectedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 16px;
  animation: ${appearFromRight} 1s;
`;

export const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    background-color: transparent;
  }
`;

export const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 64px;
  animation: ${appearFromRight} 1s;

  h1 {
    margin-bottom: 16px;
  }
`;
