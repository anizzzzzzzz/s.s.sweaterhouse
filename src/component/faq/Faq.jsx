import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import {Collapse, ListGroup, ListGroupItem} from "reactstrap";
import './Faq.css';
import Footer from "../common/footer/Footer";

var faq=[
    {
        "id":1,
        "question":"About S.S. Sweater House",
        "answer":"We are the leading Manufacturer and Wholesaler of Woolen goods. We have been exporting the woolen goods to Canada,China"+
        ", USA,India, Japan since 1999. Sweaters/Cardigans, with wool as their raw material, are the most popular knitting sweaters."+
        " They are light and warm; tender and beautiful; delicate and smooth; soft and comfortable.",
        "collapse":false
    },
    {
        "id":2,
        "question":"What's our main product??",
        "answer":"Our main Product are:-\n" +
        "- Woolen Sweater\n" +
        "- Handwarmers\n" +
        "- Shocks\n" +
        "- Jackets\n" +
        "- Blazzers\n" +
        "- Dresses\n",
        "collapse":false
    },
    {
        "id":3,
        "question":"Where can I contact to order our product?",
        "answer":"Factory: Dhungedhara, Raniban, Balaju \n" +
        "Show Room : Thamel, J.P Road \n" +
        "Contact No: 01-4880688,01-4880788 \n"+
        "Mobile No: 9841501480 \n",
        "collapse":false
    },
    {
        "id":4,
        "question":"I've got an idea for a great new Designs. How do I tell you about it?",
        "answer":"You can email us at sshouse.sweater@gmail.com",
        "collapse":false
    }
    ];

class Faq extends Component {
    constructor(props){
        super(props);

        this.state={
            change:false,
            minRow:6
        };
        this.toggle = this.toggle.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.change !== this.state.change;
    }

    toggle(ev,qa){
        ev.preventDefault();
        qa.collapse=!qa.collapse;
        faq.splice(qa.id-1,1,qa);
        this.setState({
            change:!this.state.change
        });
    }

    createList(){
        return faq.map((qa)=>{
            return (
                <div key={qa.id} className="faq-list-section">
                    <ListGroupItem onClick={(e)=>this.toggle(e,qa)}>{qa.question}</ListGroupItem>
                    <Collapse isOpen={qa.collapse}>
                        <p className="faq-list-item-section">{qa.answer}</p>
                    </Collapse>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="faq-section">
                    <ListGroup>
                        {this.createList()}
                    </ListGroup>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Faq;