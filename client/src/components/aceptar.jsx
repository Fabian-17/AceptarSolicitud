import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import io from "socket.io-client";

const Aceptar = () => {
  const [show, setShow] = useState(false);
  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const solicitudId = uuidv4(); // Genera un identificador único
    const socketConnection = io("http://localhost:3000");

    // Enviar el solicitudId al servidor después de que el socket se conecta
    socketConnection.on("connect", () => {
      socketConnection.emit("asociarSolicitudId", { solicitudId });
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleAccept = () => {
    // Envía el evento al servidor Socket.IO con el ID de la solicitud
    socket.emit("aceptarSolicitud", { solicitudId: id });

    // Cierra el modal
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Aceptar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Estás seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas aceptar la solicitud con ID {id}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-warning" onClick={handleClose}>
            Rechazar
          </Button>
          <Button className="btn btn-success" onClick={handleAccept}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Aceptar;
