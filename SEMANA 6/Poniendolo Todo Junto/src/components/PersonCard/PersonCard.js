import { Component } from "react"

class PersonCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            age: this.props.age
        };
    }

    increaseAge = () => {
        this.setState(prevState => ({
            age: prevState.age + 1
        }));
    };
    render(){
        const{firstName,lastName,hairColor}=this.props;
        const { age } = this.state;
        return(
            <div className="PersonCard">
            <h1>{firstName},{lastName}</h1>
            <p>Age:{age}</p>
            <p>Hair Color:{hairColor}</p>
            <button onClick={this.increaseAge}>Birthday Button for {firstName}, {lastName}</button>
            </div>
        )
    }
}

export default PersonCard;