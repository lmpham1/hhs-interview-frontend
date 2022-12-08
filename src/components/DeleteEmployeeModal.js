import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

export default function DeleteEmployeeModal(props) {
  let nurseData = props.nurse;

  const deleteEmployeeHandler = function (e) {
    //e.preventDefault();
    props.deleteEmployeeHandler(nurseData.id);
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
            <Modal.Title>Delete employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            <b>
              {nurseData.first_name} {nurseData.last_name}
            </b>{" "}
            from the database? (This action CANNOT be undone)
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteEmployeeHandler}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}
