import React from "react";
import Header from "../Header/Header";
import { Container, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCard from "./PostCard";
import Post from "./Post";
import PinPost from "./PinPost";
import FilterCheckboxList from "./FilterCheckboxList";

const Homepage = () => {
  const filters = ["Academic", "Club"]

  return (
    <>
      <Header />
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs lg>
              <h4>Filter Options</h4>
              {filters.map((str) => (
                <FilterCheckboxList text={str} />
              ))}
            </Col>
            <Col xs lg={7}>
              <PostCard />
              <Post
                text={`    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facere nam sit unde obcaecati earum delectus nisi distinctio accusamus odit. Distinctio ad autem commodi facilis optio doloremque deleniti voluptas illo?
                Deleniti repudiandae possimus excepturi totam ullam, aut delectus ducimus non. Recusandae esse, nesciunt magnam fugiat nostrum ut. Dolores libero illo quas impedit dolorem, fugiat optio voluptatum ullam rem nobis quaerat?
            `}
                img={"/img/sust_1.jpg"}
              />
              <Post
                text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facere nam sit unde obcaecati earum delectus nisi distinctio accusamus odit. Distinctio ad autem commodi facilis optio doloremque deleniti voluptas illo?
                      Deleniti repudiandae possimus excepturi totam ullam, aut delectus ducimus non. Recusandae esse, nesciunt magnam fugiat nostrum ut. Dolores libero illo quas impedit dolorem, fugiat optio voluptatum ullam rem nobis quaerat?
                  `}
                img={"/img/sust_2.jpg"}
              />
            </Col>
            <Col xs lg>
              <PinPost text={`    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro atque placeat animi sapiente nam iure expedita esse optio iste quidem? Doloribus, porro. Impedit rem pariatur ratione quo inventore quas odit.
`} img={"/img/naruto.jpg"} />
              <PinPost text={`    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro atque placeat animi sapiente nam iure expedita esse optio iste quidem? Doloribus, porro. Impedit rem pariatur ratione quo inventore quas odit.
`} img={"/img/ichigo.jpg"} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
};

export default Homepage;
