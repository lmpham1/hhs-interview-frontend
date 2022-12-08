import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";

export default function EditEmployeeModal(props) {
  let nurseData = props.nurse;
  //const [updatedNurse, setUpdatedNurse] = useState(nurseData);
  const [validated, setValidated] = useState(false);

  const updateEmployeeHandler = function (e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      let newNurseData = {
        id: nurseData.id,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        ward: e.target.ward.value,
      };
      setValidated(true);
      //setUpdatedNurse(newNurseData);
      props.updateEmployeeHandler(newNurseData);
    }
  };

  useEffect(() => {
    //console.log(updatedNurse);
    //console.log(nurseData.id);
  }, [nurseData]);

  return (
    <>
      {nurseData ? (
        <Modal centered show={props.show} onHide={props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Update employee info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form validated={validated} onSubmit={updateEmployeeHandler}>
              <Form.Group>
                <FloatingLabel label="First Name" className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    name="first_name"
                    defaultValue={nurseData.first_name}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Last Name" className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    name="last_name"
                    defaultValue={nurseData.last_name}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    defaultValue={nurseData.email}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Ward" className="mb-3">
                  <Form.Select
                    title="Ward"
                    name="ward"
                    id="ward"
                    defaultValue={nurseData.ward}
                  >
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Button type="submit">Update Employee</Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}
