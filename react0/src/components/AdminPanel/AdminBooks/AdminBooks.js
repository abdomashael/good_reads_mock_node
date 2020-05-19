/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Col, Row } from 'react-bootstrap'
import '../AdminCatogries/AdminCatogries.css'
import { Icon } from 'semantic-ui-react';
import axios from 'axios'
import {Redirect} from 'react-router'


function MyVerticallyCenteredModal(props) {
    const [bookName, setBookName] = useState('');
    const [athName, setAthName] = useState('');
    const [catName, setCatName] = useState('');
    const [file, setFile] = useState(null)
    const [redirect,setRedirect] = useState(false)


    const [listingCategories, setListingCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get("http://34.107.102.252:3000/category/")
            .then(res => {
                setListingCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    useEffect(() => {
        axios.get("http://34.107.102.252:3000/author/")
            .then(res => {
                setAuthors(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const submitValue = (evt) => {
        evt.preventDefault();
        const frmdetails = new FormData();
        //  frmdetails = {
        //     'bookName': bookName,
        //     'authorId': athName,
        //     'catId': catName,
        //     'coverImage': file,
        //     'brief' : "asdasdsa"
        // }
        frmdetails.append('bookName', bookName)
        frmdetails.append('authorId', athName)
        frmdetails.append('catId', catName)
        frmdetails.append('coverImage', file)
        frmdetails.append('brief' , "asdasdsa")


        console.log(frmdetails.get('bookName'));
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'JWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybWFpbCI6InJvb3RAbWFpbC5jb20iLCJpYXQiOjE1ODk0ODk5NjV9.b2vOq5SY79KgxDbHUusM5czvuUD9JsAZe-VKIW6_Z5g'
            }
        };
        axios.post('http://34.107.102.252:3000/book/', frmdetails, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setRedirect(true)
                
            })
    }




if (redirect) {
    return(
        <Redirect push to="/"></Redirect>
    )
}
else{
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ADD Book
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitValue}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Book Name
                     </Form.Label>
                        <Col sm="10">
                            <Form.Control size="lg" type="text" placeholder="Enter Book Name ..." onChange={e => setBookName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Category
                     </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" value="Choose..." onChange={e => {
                                const newArray = listingCategories.filter(cat => cat.categoryName === e.target.value ? true : false)
                                if (newArray.length > 0) {
                                    setCatName(newArray[0]._id)
                                }
                            }} >
                                {

                                    listingCategories.map(category => (

                                        <option>{category.categoryName}</option>
                                    ))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Author
                     </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" value="Choose..." onChange={e => {
                                var index = e.target.selectedIndex;
                                var optionElement = e.target.childNodes[index]
                                var option = optionElement.getAttribute('data-id');
                                console.log(option); setAthName(option)
                            }}>
                                {
                                    authors.map(author => (
                                        <option data-id={author._id}>{author.firstName + " " + author.lastName}</option>
                                    ))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <div className="mb-3">
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input type="file" file="myImage" isValid onChange={(e) => {
                                console.log({ file: e.target.files[0] });
                                setFile(e.target.files[0])
                             }
    
                            } />
                            <Form.File.Label data-browse="Button text">
                                Upload Your Image
                             </Form.File.Label>
                        </Form.File>
                    </div>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" onClick={() => { props.onHide() }}>
                        Save Changes
                      </Button>

                </Form>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
}




function AdminBooks() {
    const [modalShow, setModalShow] = React.useState(false);

    function getBooks() {
        axios.get("http://34.107.102.252:3000/book")
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const [books, setBooks] = useState([])
    useEffect(() => {
        getBooks()
    }, [])

    function deleteComponent(x) {
        console.log(x._id);
        axios.delete(`http://34.107.102.252:3000/book/${x._id}`, {
            headers: {
                JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybWFpbCI6InJvb3RAbWFpbC5jb20iLCJpYXQiOjE1ODk0ODk5NjV9.b2vOq5SY79KgxDbHUusM5czvuUD9JsAZe-VKIW6_Z5g"
            }
        }).then(res => {
            getBooks()
        })
            .catch(err => {
                console.log(err);
            })

    }
    function editComponent(x) {

    }

    return (
        <div>
            <a className="iconadjustment" onClick={() => setModalShow(true)}>
                <Icon name='add circle test' />
            </a>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>CatogoryId</th>
                        <th>AuthorId</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => (

                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>{book.bookName}</td>
                                <td>{book.catId._id}</td>
                                <td>ttt</td>
                                <td>
                                    <a onClick={
                                        () => { editComponent(book) }
                                    }>
                                        <Icon name='edit' />
                                    </a>
                                    <a onClick={
                                        () => { deleteComponent(book) }
                                    }>
                                        <Icon name='delete' />
                                    </a>
                                </td>


                            </tr>
                        ))

                    }
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    );
}

export default AdminBooks;