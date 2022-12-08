import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import "./NurseTable.css";

export default function NurseTable(props) {
  let nurses = props.nurses;
  const [nurseToBeEdited, setNurseToBeEdited] = useState(undefined);

  return (
    <>
      {nurses.length > 0 ? (
        <Table className="nurse-table" striped size="sm" responsive>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Ward</th>
              <th></th>
            </tr>
          </thead>
          <TableBody
            nurses={nurses}
            setUpdateModalShow={props.setUpdateModalShow}
            setDeleteModalShow={props.setDeleteModalShow}
            setNurseToBeEdited={setNurseToBeEdited}
            nurseToBeEdited={nurseToBeEdited}
          />
          {nurseToBeEdited ? (
            <EditEmployeeModal
              show={props.updateModalShow}
              updateEmployeeHandler={props.updateEmployeeHandler}
              onHide={() => props.setUpdateModalShow(false)}
              nurse={nurseToBeEdited}
            />
          ) : null}
          {nurseToBeEdited ? (
            <DeleteEmployeeModal
              show={props.deleteModalShow}
              deleteEmployeeHandler={props.deleteEmployeeHandler}
              onHide={() => props.setDeleteModalShow(false)}
              nurse={nurseToBeEdited}
            />
          ) : null}
        </Table>
      ) : (
        <div>
          <span>No employee with matching criteria found</span>
        </div>
      )}
    </>
  );
}

function TableBody(props) {
  const rows = props.nurses.map((nurse, i) => {
    const onUpdateModalClicked = function (data) {
      props.setUpdateModalShow(true);
      props.setNurseToBeEdited(data);
    };
    const onDeleteModalClicked = function (data) {
      props.setDeleteModalShow(true);
      props.setNurseToBeEdited(data);
    };
    return (
      <tr key={i}>
        <td className="nurse-id">{nurse.id.substr(0, 8)}</td>
        <td>{nurse.first_name}</td>
        <td>{nurse.last_name}</td>
        <td>{nurse.email}</td>
        <td>{nurse.ward}</td>
        <td className="button-cell">
          <Button
            variant="secondary"
            onClick={() => onUpdateModalClicked(nurse)}
          >
            Update
          </Button>
        </td>
        <td className="button-cell">
          <Button variant="danger" onClick={() => onDeleteModalClicked(nurse)}>
            Delete
          </Button>
        </td>
      </tr>
    );
  });
  //console.log(TableRows);
  return <tbody className="table-body">{rows}</tbody>;
}
