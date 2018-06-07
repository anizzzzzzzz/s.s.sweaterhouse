import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import {Card, CardBody, Collapse, ListGroup, ListGroupItem} from "reactstrap";

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
        "answer":"Our main Product are:-" +
        "[list]Woolen Sweater[/list]" +
        "[list]Handwarmers[/list]" +
        "[list]Shocks[/list]" +
        "[list]Jackets[/list]" +
        "[list]Blazzers[/list]" +
        "[list]Dresses[/list]",
        "collapse":false
    },
    {
        "id":3,
        "question":"Where can I contact to order our product?",
        "answer":"Factory: Dhungedhara, Raniban, Balaju\n" +
        "Show Room : Thamel, J.P Road\n" +
        "Contact No: 01-4880688,01-4880788\n" +
        "Mobile No: 9841501480\n" +
        "S.S Sweater House\n",
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
            change:false
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
                <div key={qa.id}>
                    <ListGroupItem onClick={(e)=>this.toggle(e,qa)}>{qa.question}</ListGroupItem>
                    <Collapse isOpen={qa.collapse}>
                        <Card>
                            <CardBody>
                                {qa.answer}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="faq-section">
                <NavigationBar/>
                <ListGroup>
                    {this.createList()}
                </ListGroup>

            </div>
        )
    }
}

export default Faq;