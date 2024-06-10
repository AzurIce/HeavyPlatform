import { Modal, Button } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { CoreLoginPage } from "../pages/Admin/Login";

interface LoginModalProps {
  isOpen: () => boolean;
  setIsOpen: (value: boolean) => void;
}

const LoginModal: Component<LoginModalProps> = (props) => {
  return (
    <>
      <Modal
        open={props.isOpen()}
        onClose={() => props.setIsOpen(false)}
        sx={{display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}
      >
        {/* <Button onClick={() => props.setIsOpen(false)}>关闭</Button> */}
        <CoreLoginPage modalClose={props.setIsOpen} />
      </Modal>
    </>
  );
};

export default LoginModal;