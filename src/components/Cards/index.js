import React from 'react';
import {Card, Button} from 'react-bootstrap';


function Cards({titulo, texto, destino}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
            {texto}
        </Card.Text>
        <a href={destino}>
            <Button variant="primary">Ir</Button>
        </a>
      </Card.Body>
    </Card>
  );
}

export default Cards;


