import React from "react"
import './hotBooks.css';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBView } from "mdbreact";
import {
  Link
} from 'react-router-dom';

const HotBooks = (props) => {
        return (
        
        <MDBContainer style={{"margin-bottom": "37vw"}} >

            <MDBCarousel
              activeItem={Math.floor(Math.random() * Math.floor(props.books.length) ) + 1}
              length={props.books.length}
              showControls={true}
              showIndicators={true}
              className="z-depth-1 w-25 carousel"
            >
              <MDBCarouselInner>
                {
                props.books.map((book,idx)=>(
                
                  
                  <MDBCarouselItem itemId={idx + 1}>
                  <MDBView>
                    <Link to={`/bookprofile/${book._id}`}>
                    <img
                      className="d-block w-100"
                      src={`http://34.107.102.252:3000/${book.coverImageName}`}
                      alt="First slide"
                    />
                    </Link>
                  </MDBView>
                </MDBCarouselItem>
                
                ))}
                
              </MDBCarouselInner>
              
            </MDBCarousel>
            
            <MDBCarousel
              activeItem={Math.floor(Math.random() * Math.floor(props.books.length) ) + 1}
              length={props.books.length}
              showControls={true}
              showIndicators={true}
              className="z-depth-1 w-25"
            >
              <MDBCarouselInner>
              {props.books.map((book,idx)=>(
                
                  
                <MDBCarouselItem itemId={ (idx + 1)}>
                <MDBView>
                    <Link to={`/bookprofile/${book._id}`}>
                    <img
                      className="d-block w-100"
                      src={`http://34.107.102.252:3000/${book.coverImageName}`}
                      alt="First slide"
                    />
                    </Link>
                </MDBView>
              </MDBCarouselItem>
              
              ))}
              

              </MDBCarouselInner>
              
            </MDBCarousel>
            <MDBCarousel
              activeItem={Math.floor(Math.random() * Math.floor(props.books.length) ) + 1}
              length={props.books.length}
              showControls={true}
              showIndicators={true}
              className="z-depth-1 w-25"
            >
              <MDBCarouselInner>
              {props.books.map((book,idx)=>(
                
                  
                <MDBCarouselItem itemId={ (idx + 1)}>
                <MDBView>
                    <Link to={`/bookprofile/${book._id}`}>
                    <img
                      className="d-block w-100"
                      src={`http://34.107.102.252:3000/${book.coverImageName}`}
                      alt="First slide"
                    />
                    </Link>
                </MDBView>
              </MDBCarouselItem>
              
              ))}

              </MDBCarouselInner>
              
            </MDBCarousel>
            <MDBCarousel
              activeItem={Math.floor(Math.random() * Math.floor(props.books.length) ) + 1}
              length={props.books.length}
              showControls={true}
              showIndicators={true}
              className="z-depth-1 w-25"
            >
              <MDBCarouselInner>
              {props.books.map((book,idx)=>(
                
                  
                <MDBCarouselItem itemId={ (idx + 1)}>
                <MDBView >
                    <Link to={`/bookprofile/${book._id}`}>
                    <img
                      className="d-block w-100 "
                      src={`http://34.107.102.252:3000/${book.coverImageName}`}
                      alt="First slide"
                    />
                    </Link>
                </MDBView>
              </MDBCarouselItem>
              
              ))}

              </MDBCarouselInner>
              
            </MDBCarousel>
          </MDBContainer>
        );
      }
    
      


export default HotBooks