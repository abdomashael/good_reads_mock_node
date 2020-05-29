import React, { useEffect, useState } from "react";
import "./NewCategories.css";
import axios from "axios";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Newarray = (props) => {
  const [array, setArray] = useState([]);
  const [type, setType] = useState("cat");

  useEffect(() => {
    console.log("cats page", props.HomePage);

    setArray(props.HomePage);
    setType(props.type);

    // if(props.cats.length >0)
    // {
    //
    // }
    // axios.get("http://34.107.102.252:3000/category/")
    //     .then(res => {

    //         setArray(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);

    //     })
  }, []);

  return (
    <div class="mainc">
      {array.map((item) => (
        <Link
          to={
            type === "cats"
              ? `/categorypage/${item._id}`
              : `/author/${item._id}`
          }
        >
          <div class="cardd">
            <div class="cardd-image">
              {
              type === "cats" ? (
                <img
                class="cardd-image w-100 h-100"
                // src = {`http://34.107.102.252:3000/${item.CategoryImage}`} when updated by omar and sho3la uncommnet this line
                src="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"
              ></img>
              ) : (
                <img
                  class="cardd-image w-100 h-100"
                  src={`http://34.107.102.252:3000/${item.authorImage}`}
                ></img>
              )}
            </div>
            <div class="cardd-text">
              <span class="date">4 days ago</span>
              <h3>{type === "cats" ? item.categoryName : item.fullName}</h3>
              <p className="cardd-p">
                {type === "cats" ? item.summary : item.bio}
              </p>
            </div>
            <div class="cardd-stats">
              <div class="stat">
                <div class="value">
                  4<sup>m</sup>
                </div>
                <div class="type">read</div>
              </div>
              <div class="stat border">
                <div class="value">5123</div>
                <div class="type">views</div>
              </div>
              <div class="stat">
                <div class="value">32</div>
                <div class="type">comments</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      }
    </div>
  );
};

export default Newarray;
