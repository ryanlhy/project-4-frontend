import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const ProductList = ({ products }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
    { products.map((product) => (
      <Card style={{ width: '18rem', margin: '10px' }} key={product.id}>
        <Card.Img variant="top" src={product.image} style={{height: '250px'}}/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description}
          </Card.Text>
          <Card.Text className="text-muted">{product.price}</Card.Text>
          <Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
    </div>
  );
}

export default ProductList;
