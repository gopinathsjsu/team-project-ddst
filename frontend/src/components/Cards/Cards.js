import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
// import card1 from "./card1.jpg"


export default function Sample() {
  const ref = useRef();
  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick={true} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '400px', height: '350px', margin:'30px 0px 0px 40px' }} /// these are optional style, it is not necessary
  >
    
    
    
    <FrontSide style={{ backgroundColor: '#fffffc'}} >
      <h2 className="header">Are you a traveller looking to book a flight with Jet Airways?</h2> <br /> 
      <button className="btn">Register</button>
      <button className="btn"> Login</button>
     </FrontSide>
    
    
    {/* <BackSide style={{ backgroundColor: '#fffffc'}}>
      <h3>IMDB Movie Rate Prediction</h3>
      <div className="myList">
      <li style={{fontSize: "20px"}}>Sometimes budgeting a movie can prove to be costly if the movie fails badly at the box office.</li> <br></br>
      <li style={{fontSize: "20px"}}>This Feature predicts the success of movie by providing imdb score on the basis of actors and directors using Machine Learning Algorithm</li> <br></br>
      <li style={{fontSize: "20px"}}>If you are planning to invest heavy money and resources on any movie, it is better to know if movie will earn success or not  </li>
      <p> </p>
      </div>
    </BackSide> */}
  </Flippy>


  )
}