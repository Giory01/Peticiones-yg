'use client';
import { useState, useEffect }  from 'react'; 
import axios from 'axios';
import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const CRUDExample = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      setUsers(prevUsers => [...prevUsers, response.data]);
      resetForm();
    } catch (error) {
      setError('Error creating user');
    }
  };

  const handleUpdate = async (userId, newData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, newData);
      const updatedUsers = users.map(user => (user.id === userId ? { ...user, ...newData } : user));
      setUsers(updatedUsers);
    } catch (error) {
      setError('Error updating user');
    }
  };

  const handleDelete = async userId => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      setError('Error deleting user');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <Container>
      <h1 className="my-4">Usuarios</h1>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {users.map(user => (
          <Col key={user.id} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email} - {user.phone}</Card.Text>
                <Button onClick={() => handleDelete(user.id)} variant="danger" className="mr-2">Eliminar</Button>
                <UpdateUser user={user} onUpdate={handleUpdate} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2>Agregar usuario</h2>
      <Form onSubmit={handleCreate} className="mb-4">
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numero</Form.Label>
          <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="primary">Agregar usuario</Button>
      </Form>
    </Container>
  );
};

const UpdateUser = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ name: user.name, email: user.email, phone: user.phone });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(user.id, formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </Form.Group>
      <Button type="submit" variant="primary">Update</Button>
    </Form>
  );
};

export default CRUDExample;
