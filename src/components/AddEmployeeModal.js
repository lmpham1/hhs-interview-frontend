import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";

export default function AddEmployeeModal(props) {
  const [newNurse, setNewNurse] = useState({
    first_name: "",
    last_name: "",
    email: "",
    ward: "",
  });
  const [validated, setValidated] = useState(false);

  const addNewEmployeeHandler = function (e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      let newNurseData = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        ward: e.target.ward.value,
      };
      setValidated(true);
      setNewNurse(newNurseData);
      props.addNewEmployeeHandler(newNurseData);
    }
  };

  useEffect(() => {
    //console.log(newNurse);
  }, [newNurse]);

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a new employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={addNewEmployeeHandler}>
          <Form.Group>
            <FloatingLabel label="First Name" className="mb-3">
              <Form.Control required type="text" name="first_name" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Last Name" className="mb-3">
              <Form.Control required type="text" name="last_name" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control required type="email" name="email" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Ward" className="mb-3">
              <Form.Select
                title="Ward"
                name="ward"
                id="ward"
                defaultValue={"Red"}
              >
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Button type="submit">Create Employee</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
