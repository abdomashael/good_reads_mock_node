import React, { useState, useEffect } from "react";
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import './ListingCategories.css';
import axios from 'axios';
import Pagenation from "../Pagentaion/Pagentaion";
import { Link } from "react-router-dom";


const ListingCategories = () => {
    const [categories, setCategories] = useState([]);


    const [filtered, setfiltred] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const pageNumberHandler = (number) => {
        setPageNumber(number);
    };

    useEffect(() => {
        const start = 5 * (pageNumber - 1);
        const end = start + 5;
        const filtred = categories.slice(start, end);
        setfiltred(filtred);
    }, [pageNumber]);

    useEffect(() => {
        const filtred = categories.slice(0, 5);
        setfiltred(filtred);
    }, [categories]);

    const getCategories = () => {
        axios.get('http://34.107.102.252:3000/category/')
            .then(result => {
                setCategories(result.data)
                console.log(result.data)
            })

    }
    if (categories[1]) {
        return (
            <>
                <h1 className="tittle">All Categories</h1>
                <Card.Group itemsPerRow={5} className="container mt-5">
                    {filtered.map(category => (
                        <Card key={category._id} border="info" className="categoryCrads">
                            <Card.Content>
                                <Card.Header>{category.categoryName}</Card.Header>
                                <Card.Description className="fonts">{category.summary}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Link to={`/categorypage/${category._id}`}>
                                    <Icon name='info' />
                        More details
                     </Link>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                <Pagenation pageNumberHandler={pageNumberHandler} type={3}></Pagenation>
            </>
        );
    }
    else {
        getCategories();
        return null;
    }
}

export default ListingCategories