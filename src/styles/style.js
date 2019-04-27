import styled from "styled-components";

export const MainContainer = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto");
  font-family: "Roboto", sans-serif;

  width: 100%;
  margin: 1rem auto;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  @media (min-width: 767px) {
    width: 700px;
  }

  @media (min-width: 992px) {
    width: 900px;
  }
`;

export const CardsContainer = styled.div`
  @media (min-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const CardContainer = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;

  @media (min-width: 767px) {
    width: 340px;
    margin: 10px 0;
  }

  @media (min-width: 992px) {
    width: 435px;
    margin: 10px 0;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 767px) {
    height: 250px;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardDonate = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const DonateList = styled.div`
  display: flex;
  flex-direction: row;

  > label {
    margin: 0 5px;
  }
`;

export const CardButton = styled.button`
  border: 1px solid #4398f0;
  border-radius: 5px;
  background-color: transparent;
  color: #4398f0;
  width: 80px;
  height: 30px;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    color: #fff;
    background-color: #4398f0;
  }

  &:focus {
    outline: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
  text-shadow: 0 1px 0 #fff;
  border: none;
  z-index: 2;
  margin: 10px;

  &:hover {
    color: #4398f0;
  }

  &:focus {
    outline: none;
  }
`;

export const CardText = styled.div`
  margin: 1rem;
`;

export const Message = styled.div`
  color: red;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
