import Advertisement from '../Advertisement/Advertisement';
import SubContents from '../SubContents/SubContents';
import './Main.css'

const Main= () =>{
    return(
        <div className="main">
            <div className="container">
                <SubContents/>
                <SubContents/>
                <SubContents/>
            </div>
            <div className="downContainer">
                <Advertisement/>
            </div>
        </div>
    )
}

export default Main;