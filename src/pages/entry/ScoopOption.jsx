import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  const [isInvalid, toggleInvalid] = useState(false);
  const handleChange = (event) => {
    const scoopCount = parseFloat(event.target.value);
    const invalid =
      scoopCount < 0 || scoopCount > 10 || scoopCount !== parseInt(scoopCount);
    if (!invalid) {
      updateItemCount(name, scoopCount);
    }
    toggleInvalid(invalid);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
