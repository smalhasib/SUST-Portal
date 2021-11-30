import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostCard.css";

const PostCard = (props) => {
  return (
    <>
      <Card>
        <Form>
          <Form.Group className="mb-3" controlId="formUpdateText" inline>
            <Form.Control
              size="lg"
              type="text"
              placeholder="What's your update?"
              inline
            />
          </Form.Group>
          <Button variant="primary" type="submit" inline>
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default PostCard;
