import React, { useEffect, useState } from 'react'
import './test.css'
import { Card, Image, Button } from 'semantic-ui-react';
import axios from 'axios'
import Author from '../Author/Author';
import { Link } from 'react-router-dom';



function ListingAuthors() {

    const [authors, setAuthors] = useState([])
    useEffect(() => {
        axios.get("http://34.107.102.252:3000/author")
            .then(res => {
                console.log(res.data);
                
                setAuthors(res.data);
            })
            .catch(err => {
                console.log(err);

            })

    }, [])

    function clickHandler(x) {
        console.log(x);

    }
    var i = 0;
    const colorPicker = () => {

        const colors = ["yellow", "green", "red",
            "blue", "red", "orange", "olive", "teal", "pink",
            "black", "violet"]
        i = i + 1;
        return colors[i]
    }


    return (
        <div className='hi'>
            <p className="paragraphs">All Authors</p>
            <Card.Group itemsPerRow={5} >
                {
                    authors.map(author => (

                        <Card>
                            <Card.Content>
                                <Card.Header  >{author.firstName + " " + author.lastName} </Card.Header>
                                <Card.Meta>Friends of Elliot</Card.Meta>
                                <Card.Description>
                                    {author.bio}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button
                                        key={author._id}
                                        basic color={colorPicker()}>

                                        <Link to={{
                                            pathname:'/author',
                                            xy:{
                                                authorId :author._id
                                            }
                                        }}>
                                            Show Profile</Link>

                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>

                    ))
                }

                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card >
                    <Card.Content>
                        <Card.Header>Steve Sanders</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color={colorPicker()}>
                                Show Profile
          </Button>
                        </div>
                    </Card.Content>
                </Card>


            </Card.Group>
        </div>

    )
}


export default ListingAuthors
