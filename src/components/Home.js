import "./Home.css";
import { useEffect, useState } from "react";
import NurseTable from "./NurseTable";
import SearchBar from "./SearchBar";
import getMany from "../api/getMany";
import Filters from "./Filters";
import Button from "react-bootstrap/Button";
import AddEmployeeModal from "./AddEmployeeModal";
import addEmployee from "../api/addEmployee";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import editEmployee from "../api/editEmployee";
import deleteEmployee from "../api/deleteEmployee";
import Pagination from "react-bootstrap/Pagination";

export default function Home() {
  const [nurses, setNurses] = useState([]);
  const [query, setQuery] = useState({
    name: "",
    ward: "",
  });
  const [addModalShow, setAddModalShow] = useState(false);
  const [addSuccessShow, setAddSuccessShow] = useState(false);
  const [updateSuccessShow, setUpdateSuccessShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteSuccessShow, setDeleteSuccessShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [noOfPages, setNoOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const searchInputHandler = (e) => {
    setQuery((prevQuery) => {
      let newQuery = { ...prevQuery };
      newQuery.name = e.target.value;
      return newQuery;
    });
  };

  const wardFilterHandler = (wardOptions) => {
    setQuery((prevQuery) => {
      let newQuery = { ...prevQuery };
      newQuery.ward = wardOptions;
      return newQuery;
    });
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const results = await getMany(query);
    setNoOfPages(results.noOfPages);
    setNurses(results.nurses);
    setCurrentPage(0);
  };

  const addNewEmployeeHandler = async (data) => {
    const result = await addEmployee(data);
    if (result) {
      setAddSuccessShow(true);
      setAddModalShow(false);
    }
  };

  const updateEmployeeHandler = async (data) => {
    const result = await editEmployee(data);
    if (result) {
      setUpdateSuccessShow(true);
      setUpdateModalShow(false);
      setNurses((prevNurses) => {
        let nurses = [...prevNurses];
        let updatedIndex = nurses.findIndex((nurse) => nurse.id === data.id);
        nurses[updatedIndex].first_name = data.first_name;
        nurses[updatedIndex].last_name = data.last_name;
        nurses[updatedIndex].email = data.email;
        nurses[updatedIndex].ward = data.ward;
        return nurses;
      });
    }
  };

  const deleteEmployeeHandler = async (id) => {
    const result = await deleteEmployee(id);
    if (result) {
      setDeleteSuccessShow(true);
      setDeleteModalShow(false);
      setNurses((prevNurses) => {
        let nurses = [...prevNurses];
        let deletedIndex = nurses.findIndex((nurse) => nurse.id === id);
        nurses.splice(deletedIndex, 1);
        return nurses;
      });
    }
  };

  const pageChangeHandler = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const asyncGetMany = async () => {
      let results = await getMany(query, currentPage);
      return results;
    };
    asyncGetMany().then((results) => {
      setNurses(results.nurses);

      setNoOfPages(results.noOfPages);
    });
  }, [currentPage]);

  useEffect(() => {
    //console.log(nurses);
  }, [nurses]);

  return (
    <>
      <div className="page-header">
        <h2>HHS Nurse Database</h2>
      </div>
      <div className="body-container">
        <div className="search-container">
          <SearchBar
            query={query}
            searchInputHandler={searchInputHandler}
            searchSubmitHandler={searchSubmitHandler}
          />
        </div>
        <div className="filters-container">
          <div className="filter-row">
            <Filters wardFilterHandler={wardFilterHandler} />
          </div>
          <Button className="add-button" onClick={() => setAddModalShow(true)}>
            Add New Employee
          </Button>
          <AddEmployeeModal
            show={addModalShow}
            onHide={() => setAddModalShow(false)}
            addNewEmployeeHandler={addNewEmployeeHandler}
          />
        </div>
        <ToastContainer position="top-end" className="toast-container">
          <Toast
            bg="success"
            className="success-toast"
            show={addSuccessShow}
            onClose={() => setAddSuccessShow(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>Success!</Toast.Header>
            <Toast.Body>New employee added successfully!</Toast.Body>
          </Toast>
          <Toast
            bg="success"
            className="success-toast"
            show={updateSuccessShow}
            onClose={() => setUpdateSuccessShow(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>Success!</Toast.Header>
            <Toast.Body>Employee info updated successfully!</Toast.Body>
          </Toast>
          <Toast
            bg="success"
            className="success-toast"
            show={deleteSuccessShow}
            onClose={() => setDeleteSuccessShow(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>Success!</Toast.Header>
            <Toast.Body>Employee deleted successfully!</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="table-container">
          <NurseTable
            nurses={nurses}
            updateEmployeeHandler={updateEmployeeHandler}
            updateModalShow={updateModalShow}
            setUpdateModalShow={setUpdateModalShow}
            deleteEmployeeHandler={deleteEmployeeHandler}
            deleteModalShow={deleteModalShow}
            setDeleteModalShow={setDeleteModalShow}
          ></NurseTable>
        </div>
        <div className="pagination-footer">
          {noOfPages > 1 ? (
            <CustomPagination
              pageChangeHandler={pageChangeHandler}
              noOfPages={noOfPages}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

function CustomPagination(props) {
  let paginationItem = [];
  for (let p = 0; p < props.noOfPages; p++) {
    paginationItem.push(
      <Pagination.Item
        key={p + 1}
        active={props.currentPage === p}
        onClick={() => props.pageChangeHandler(p)}
      >
        {p + 1}
      </Pagination.Item>
    );
  }

  return <Pagination>{paginationItem}</Pagination>;
}
