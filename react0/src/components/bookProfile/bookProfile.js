import React, { useState } from "react";
import "./bookProfile.css";
import {
  Row,
  Col,
  Dropdown,
  Card,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { MDBRating } from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import BeautyStars from "beauty-stars";

const BookProfile = (props) => {
  const {
    match: { params },
  } = props;
  console.log(JSON.parse(sessionStorage.getItem("user")).token);
  const [review, setReview] = useState("");
  const [book, setBook] = useState(0);
  const [stars, setStars] = useState(0);
  const getBook = () => {
    axios
      .get(`http://34.107.102.252:3000/book/${params.bookId}`, {
        headers: { JWT: `${JSON.parse(sessionStorage.getItem("user")).token}` },
      })
      .then((result) => {
        setBook(result.data);
        console.log(result.data);
        setStars(result.data.userData.userRating);
      });
  };

  const changeBookStatus = (bookId, operation) => {
    axios({
      method: "patch",
      url: `http://34.107.102.252:3000/user/book/change/${bookId}`,
      data: { operation: operation },
      headers: { JWT: JSON.parse(sessionStorage.getItem("user")).token },
    }).then((result) => {
      getBook();
      console.log("done axios");
    });
  };

  const onChange = (e) => {
    setReview(e.target.value);
  };

  if (book) {
    return (
      <div className=" pt-5 bookDetails">
        <Row className="mx-auto">
          <Col xs="4">
            <Card className="bookCard mx-auto">
              <Card.Img
                variant="top"
                src={`http://34.107.102.252:3000/` + book.book.coverImageName}
                className="w-75 mx-auto mt-3 h-100"
              />
              <Card.Body className="mx-auto">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="info"
                    id="dropdown-basic"
                    style={{ fontSize: "12px", minWidth: "150px" }}
                  >
                    {book.userData.userBookStatus
                      ? book.userData.userBookStatus
                      : "Want to Read"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/action-1"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (book.userData.userBookStatus == "read") {
                          changeBookStatus(book.book._id, 6);
                        } else if (book.userData.userBookStatus == "current") {
                          changeBookStatus(book.book._id, 2);
                        } else if (book.userData.userBookStatus == "want") {
                          console.log("la2");
                        } else if (book.userData.userBookStatus == "") {
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/want/${book.book._id}`,
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            getBook();
                          });
                        }
                      }}
                    >
                      Want to Read
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (book.userData.userBookStatus == "read") {
                          changeBookStatus(book.book._id, 5);
                        } else if (book.userData.userBookStatus == "current") {
                          console.log("la2");
                        } else if (book.userData.userBookStatus == "want") {
                          changeBookStatus(book.book._id, 3);
                        } else if (book.userData.userBookStatus == "") {
                          // axios.post(`http://34.107.102.252:3000/user/book/current/${book.book._id}`, {headers: { 'JWT': JSON.parse(sessionStorage.getItem("user")).token } })
                          console.log(book.book._id);
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/current/${book.book._id}`,
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            getBook();
                          });
                        }
                      }}
                    >
                      Currently reading
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (book.userData.userBookStatus == "read") {
                          console.log("la2");
                        } else if (book.userData.userBookStatus == "current") {
                          changeBookStatus(book.book._id, 1);
                        } else if (book.userData.userBookStatus == "want") {
                          changeBookStatus(book.book._id, 4);
                        } else if (book.userData.userBookStatus == "") {
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/read/${book.book._id}`,
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            getBook();
                          });
                        }
                      }}
                    >
                      Done reading
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <BeautyStars
                  size="20px"
                  activeColor="#444388"
                  value={stars}
                  onChange={(value) => {
                    if (
                      !book.userData.userRating &&
                      book.userData.userReview == ""
                    ) {
                      axios({
                        method: "post",
                        url: `http://34.107.102.252:3000/user/book/review`,
                        data: {
                          bookId: `${book.book._id}`,
                          rating: value,
                        },
                        headers: {
                          JWT: JSON.parse(sessionStorage.getItem("user")).token,
                        },
                      }).then(() => {
                        getBook();
                      });
                    } else {
                      axios({
                        method: "patch",
                        url: `http://34.107.102.252:3000/user/book/review`,
                        data: {
                          bookId: `${book.book._id}`,
                          rating: value,
                        },
                        headers: {
                          JWT: JSON.parse(sessionStorage.getItem("user")).token,
                        },
                      }).then(() => {
                        getBook();
                      });
                    }
                    setStars(value);
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs="5" className="pt-4 bookInfo">
            <h2 className="bookname">{book.book.bookName}</h2>
            <Link to={`/author/${book.book.authorId._id}`}>
              by {book.book.authorId.firstName} {book.book.authorId.lastName}
            </Link>
            <br />
            <Link to={`/categorypage/${book.book.catId._id}`}>
              {book.book.catId.categoryName}{" "}
            </Link>
            <BeautyStars
              activeColor="#444388"
              size="15px"
              value={book.bookAvgRate}
              editable={false}
            />
            <p className="mt-3">{book.book.brief}</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center w-100">
          <Col sm={10}>
            <div className="mt-5 pt-3">
              <h2 className="bookname">Reviews</h2>
              <ListGroup variant="flush">
                {book.reviews.map((review) =>
                  review.review ? (
                    <ListGroup.Item key={review._id}>
                      <span style={{ color: "#b462cb", fontWeight: "bold" }}>
                        {review.userId.firstName} {review.userId.lastName}
                      </span>{" "}
                      : {review.review}
                    </ListGroup.Item>
                  ) : (
                    ""
                  )
                )}
              </ListGroup>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="add your review.."
                  aria-label="username"
                  aria-describedby="basic-addon2"
                  as="textarea"
                  rows="4"
                  value={review}
                  onChange={onChange}
                />
                <InputGroup>
                  <Button
                    onClick={() => {
                      if (
                        book.userData.userRating ||
                        book.userData.userReview !== ""
                      ) {
                        console.log(review + stars);
                        if (!stars && review !== "") {
                          axios({
                            method: "patch",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              review: `${review}`,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        } else if (review === "" && stars) {
                          axios({
                            method: "patch",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              rating: stars,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        } else if (review === "" && !stars) {
                          alert("didn't add review nor rating");
                          console.log("didn't add review nor rating");
                        } else {
                          axios({
                            method: "patch",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              rating: stars,
                              review: `${review}`,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        }
                      } else {
                        console.log("fl else");
                        if (!stars && review !== "") {
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              review: `${review}`,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        } else if (review === "" && stars) {
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              rating: stars,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        } else if (review === "" && !stars) {
                          console.log("didn't add review nor rating");
                          alert("didn't add review nor rating");
                        } else {
                          axios({
                            method: "post",
                            url: `http://34.107.102.252:3000/user/book/review`,
                            data: {
                              bookId: `${book.book._id}`,
                              rating: stars,
                              review: `${review}`,
                            },
                            headers: {
                              JWT: JSON.parse(sessionStorage.getItem("user"))
                                .token,
                            },
                          }).then(() => {
                            setReview("");
                            getBook();
                          });
                        }
                      }
                    }}
                    variant="outline-secondary"
                    className="mt-4"
                  >
                    Add
                  </Button>
                </InputGroup>
              </InputGroup>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    getBook();
    return null;
  }
};

export default BookProfile;
