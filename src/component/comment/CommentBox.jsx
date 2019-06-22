import React from "react";
import {Avatar, Button, Comment, Form, Icon, Input, List} from 'antd';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {saveComment} from "../../api/CommentApi";
import moment from "moment";

const TextArea = Input.TextArea;


const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);
class CommentBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        };
    }

    componentWillMount(){
        console.log(this.props.productId);
        const { comments }= this.props;
        console.log(comments);
        let commentsArr=[];
        comments.forEach((item,index)=>{
            commentsArr.push({
                author:<p>{item.user.usersGivenName.firstName}{" "} {item.user.usersGivenName.middleName}{" "}  {item.user.usersGivenName.lastName}</p>,
                avatar: (<Avatar >{item.user.usersGivenName.firstName.charAt(0)}</Avatar>),
                content: item.comment,
                datetime: <p>{item.createdDate}</p>,

            })
        });
        this.setState({
            comments:commentsArr
        })
    }



    handleSubmit = (value) => {

        let data={};
        data.comment=this.state.value;
        data.commenterUsername=this.props.userSession.username;
        data.productId=this.props.productId;

        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        saveComment(data, this.props.userSession.token)
            .then((response)=>{
                if(response.status === 200){
                    this.setState({
                        submitting: false,
                        value: '',
                        comments: [
                            {
                                author: <p>{this.props.userSession.firstName+" "+this.props.userSession.middleName+" "+this.props.userSession.lastName}</p>,
                                avatar: (<Avatar >U</Avatar>),
                                content: <p>{this.state.value}</p>,
                                datetime: moment().fromNow(),
                            },
                            ...this.state.comments,
                        ],
                    })
                }
                return response.json();
            });

    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
            <div>
                <h4>Comments</h4>
                {
                    this.props.userSession.username !== "" && this.props.userSession.token !==""?
                        <Link to="/login">login to make comment.</Link>:null
                }
                <Comment
                    avatar={
                        <Avatar  size="large">
                            <Icon style={{color:'#FFF',fontSize:'20px', marginTop:'8px'}} type="user" />
                        </Avatar>
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        userSession: state.getUserSession
    }
};

export default connect(mapStateToProps,null)(CommentBox);