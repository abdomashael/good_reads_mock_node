import React, { useState, useEffect } from "react";
import "./categoryProfile.css";
import Book from "./images/book.png";
import { Link } from "react-router-dom";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import axios from "axios";

const CategoryProfile = (props) => {
  const {
    match: { params },
  } = props;
  console.log(params.categoryId);
  const [category, setCategory] = useState([]);
  const getCategory = () => {
    
    axios
      .get(`http://34.107.102.252:3000/book/`, {
        params: {
          catID: params.categoryId,
        },
      })
      .then((result) => {
        setCategory(result.data);
      });
  };

  useEffect(()=>{
    getCategory()
    
  },[])

    return (
      <div className="categoryProfile pr-4 pt-4">
        <h2 className="w-100" style={{ textAlign: "center" }}>
          {category.categoryName}
        </h2>

        <Card.Group itemsPerRow={3} className="container mt-5">
          {category.map((book) => (
            <Card>
              <Image
                src={`http://34.107.102.252:3000/${book.bookImage}`}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{book.bookName}</Card.Header>
                <Card.Meta>
                  {book.authorId.firstName + " " + book.authorId.lastName}
                </Card.Meta>
                <Card.Meta>{book.catId.categoryName}</Card.Meta>
                <Card.Description>{book.brief}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Link to={`/bookprofile/${book._id}`}>Show Book</Link>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>

        {/* <Card.Group itemsPerRow={4} className="container mt-5">
          <Card>
            <Image
              src="https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Book Name</Card.Header>
              <Card.Meta>Author name</Card.Meta>
              <Card.Description>this is the book brief</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="book" />
                More details
              </a>
            </Card.Content>
          </Card>
          <Card>
            <Image
              src="https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Book Name</Card.Header>
              <Card.Meta>Author name</Card.Meta>
              <Card.Description>this is the book brief</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="book" />
                More details
              </a>
            </Card.Content>
          </Card>
          <Card>
            <Image
              src="https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Book Name</Card.Header>
              <Card.Meta>Author name</Card.Meta>
              <Card.Description>this is the book brief</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="book" />
                More details
              </a>
            </Card.Content>
          </Card>
          <Card>
            <Image
              src="https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Book Name</Card.Header>
              <Card.Meta>Author name</Card.Meta>
              <Card.Description>this is the book brief</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="book" />
                More details
              </a>
            </Card.Content>
          </Card>
          <Card>
            <Image
              src="https://www.booktopia.com.au/blog/wp-content/uploads/2018/12/the-arsonist.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Book Name</Card.Header>
              <Card.Meta>Author name</Card.Meta>
              <Card.Description>this is the book brief</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="book" />
                More details
              </a>
            </Card.Content>
          </Card>
      </Card.Group> */}
      </div>
    );
  
};

export default CategoryProfile;
