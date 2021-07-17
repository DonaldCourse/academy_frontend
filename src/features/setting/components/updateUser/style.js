import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

export const Container = styled(Modal)`
  position: absolute;
  width: 450px;
  overflow: auto;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #fff;
  outline: none;
  border-radius: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SubContainer = styled.form`
  padding: 20px 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GroupI = styled.div`
  // min-width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  padding: 10px 0;
`;

export const Variable = styled.div`
  font-size: 18px;
  width: 160px;
  font-weight: 600;
`;

export const value = styled.input`
  font-size: 18px;
  width: 160px;
  // border-radius: 15px;
  border: none;
  border-bottom: 0.5px solid #333333;
  width: 250px;
  padding: 4px 15px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const GroupBTN = styled.div`
  margin-left: auto;
  display: flex;
  flex=-direction: row;
`;

export const Close = styled.button`
  height: 30px;
  width: 120px;
  padding: 4px 25px;
  color: #2f8c92;
  background: none;

  border-radius: 15px;
  font-size: 15px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
  }
`;

export const Submit = styled.button`
  height: 30px;
  width: 120px;
  padding: 4px 25px;
  background: #2f8c92;
  color: #fff;

  border-radius: 15px;
  font-size: 15px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
  }
`;
