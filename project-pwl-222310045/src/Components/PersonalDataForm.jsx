import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PersonalDataForm() {
  const [formData, setFormData] = useState({
    npm: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setShowModal(true);
    }
    setValidated(true);
  };

  return (
    <div className="container mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formNPM">
          <Form.Label>NPM</Form.Label>
          <Form.Control
            type="text"
            name="npm"
            value={formData.npm}
            onChange={handleChange}
            pattern="\d{1,10}"
            required
            placeholder="Enter NPM"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid NPM (numeric, max 10 digits).
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter First Name"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMiddleName">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter Middle Name"
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter Last Name"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a last name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a birthdate.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>NPM: {formData.npm}</p>
          <p>Fullname: {`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}</p>
          <p>Age: {calculateAge(formData.birthdate)} years</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PersonalDataForm;