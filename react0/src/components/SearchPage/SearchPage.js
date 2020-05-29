import React, {useState, useEffect} from "react";

import axios from "axios";
import {MDBCol, MDBFormInline, MDBBtn, MDBInput, MDBContainer, MDBRow, MDBInputGroup} from "mdbreact";

import "./SearchPage.css";
import {Button, Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function SearchPage() {

    const getBooks = (bookname) => {
        axios
            .get(`http://34.107.102.252:3000/search/searchbook/${bookname}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setResults(res.data);
                setCardType(1);
            });
    };

    const getAuthors = (authorname) => {
        axios
            .get(`http://34.107.102.252:3000/search/searcauthor/${authorname}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setResults(res.data);
                setCardType(2);
            });
    };

    const getCategories = (categoryname) => {
        axios
            .get(`http://34.107.102.252:3000/search/searchcategory/${categoryname}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setResults(res.data);
                setCardType(3);
            });
    };

    const searchCall = (operation, searchName) => {
        console.log(operation, searchName);
        if (operation === 1) {
            getBooks(searchName);
        } else if (operation === 2) {
            getAuthors(searchName);
        } else if (operation === 3) {
            getCategories(searchName);
        } else {
            alert("Operation not valid")
        }
    };

    const [Radiobutton, setRadioButton] = useState(1);
    const [searchedResults, setResults] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [cardType, setCardType] = useState(0);
    return (
        <MDBContainer>

            <MDBRow md="2">
                <MDBFormInline className="md-form mr-auto mb-2">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"
                           aria-label="Search" onChange={(e) => setSearchName(e.target.value)}/>
                    <MDBBtn gradient="aqua" rounded size="sm" type="button" className="mr-auto"
                            onClick={() => searchCall(Radiobutton, searchName)}>
                        Search
                    </MDBBtn>
                </MDBFormInline>
            </MDBRow>
            <MDBRow>
                <MDBCol md="2">
                    <MDBRow className="mb-2">
                        <MDBInput
                            onClick={() => setRadioButton(1)}
                            checked={Radiobutton === 1 ? true : false}
                            type='radio'
                            id='radio1'
                            containerClass='mr-5'
                        />
                        <label className="labelAd">Books</label>
                    </MDBRow>

                    <MDBRow className="mb-2">
                        <MDBInput
                            onClick={() => setRadioButton(2)}
                            checked={Radiobutton === 2 ? true : false}

                            type='radio'
                            id='radio2'
                            containerClass='mr-5'
                        />
                        <label className="labelAd">Authors</label>
                    </MDBRow>

                    <MDBRow className="mb-2">
                        <MDBInput
                            onClick={() => setRadioButton(3)}
                            checked={Radiobutton === 3 ? true : false}

                            type='radio'
                            id='radio3'
                            containerClass='mr-5'
                        />
                        <label className="labelAd">Category</label>
                    </MDBRow>

                </MDBCol>

                <MDBRow>

                    {searchedResults.map(items => {
                        let img = "";
                        let header = "";
                        let info = "";
                        let linkType = 0;
                        let currId = 0;
                        if (cardType === 1) {
                            img = items.coverImageName;
                            header = items.bookName;
                            info = items.brief
                            linkType = 1;
                            currId = items._id;
                        }
                        if (cardType === 2) {
                            img = items.authorImage;
                            header = items.fullName;
                            info = items.bio;
                            linkType = 2;
                            currId = items._id;
                        }
                        if (cardType === 3) {
                            img = null;
                            header = items.categoryName;
                            info = items.summary;
                            linkType = 3;
                            currId = items._id;
                        }
                        return (
                            <MDBCol md="2">
                                <Card>
                                    <Image
                                        src={img}
                                        wrapped
                                        ui={false}/>
                                    <Card.Content>
                                        <Card.Header>
                                            {header}
                                        </Card.Header>
                                        <Card.Description>
                                            {info}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                            {(() => {
                                                if (linkType === 1) {
                                                    return (
                                                        <Link
                                                            to={`/bookprofile/${currId}`}
                                                        >
                                                            <Icon name='book'/>
                                                            Show Book Details
                                                        </Link>)
                                                }
                                                if (linkType === 2) {
                                                    return (<Link
                                                        to={{
                                                            pathname: "/author",
                                                            xy: {
                                                                authorId: currId,
                                                            },
                                                        }}
                                                    >
                                                        <Icon name='pencil'/>
                                                        Show Author Details
                                                    </Link>)
                                                }
                                                if (linkType === 3) {
                                                    return (
                                                        <Link
                                                            to={`/categorypage/${currId}`}
                                                        >
                                                            <Icon name='magic'/>
                                                            Show Category Details
                                                        </Link>
                                                    )
                                                }
                                            })()}


                                    </Card.Content>
                                </Card>
                            </MDBCol>
                        )
                    })}
                </MDBRow>

            </MDBRow>

        </MDBContainer>


    );

}

