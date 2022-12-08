import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Filters.css";

export default function Filters(props) {
  const optionChangeHandler = function (val) {
    setWardOptions((prevWardOptions) => {
      let newOptions = { ...prevWardOptions };
      newOptions[val] = !prevWardOptions[val];
      return newOptions;
    });
    //console.log(val);
    //props.wardFilterHandler
  };

  const [wardOptions, setWardOptions] = useState({
    Red: false,
    Green: false,
    Blue: false,
    Yellow: false,
  });

  useEffect(() => {
    let wardOptionsArray = [];
    Object.entries(wardOptions).forEach(([option, value]) => {
      if (value) {
        wardOptionsArray.push(option);
      }
    });
    props.wardFilterHandler(wardOptionsArray.join(","));
  }, [wardOptions]);

  const wardDropdownItems = Object.keys(wardOptions).map((option, i) => {
    return (
      <Dropdown.Item key={i} eventKey={option} active={wardOptions[option]}>
        {option}
      </Dropdown.Item>
    );
  });

  const optionBadges = Object.entries(wardOptions).map(([option, value]) => {
    return (
      <>
        {wardOptions[option] ? (
          <Badge pill key={option} bg="secondary">
            {option}
          </Badge>
        ) : null}
      </>
    );
  });

  return (
    <>
      <DropdownButton
        variant="secondary"
        onSelect={optionChangeHandler}
        title="Ward Filter"
      >
        {wardDropdownItems}
      </DropdownButton>
      <div className="badge-group">{optionBadges}</div>
    </>
  );
}
