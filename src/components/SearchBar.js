import "./SearchBar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SearchBar(props) {
  return (
    <Form className="search-bar" onSubmit={props.searchSubmitHandler}>
      <Form.Group className="search-input">
        <Form.Control
          type="text"
          placeholder="Search for employee's name"
          onChange={props.searchInputHandler}
        />
      </Form.Group>
      <Button type="submit">Search</Button>
    </Form>
  );
}
