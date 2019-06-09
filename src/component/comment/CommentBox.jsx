import React from "react";
import {Avatar, Button, Comment, Form, Icon, Input, List} from 'antd';
import {connect} from "react-redux";

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
        const { comments }= this.props;
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



    /*handleSubmit = (value) => {

        let data={};
        data.comment=this.state.value;
        data.commenterUsername=this.props.adminAuth.username;
        data.resumeId=this.props.id;

        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        api.postComment(this.props.adminAuth.token,data)
            .then((response)=>{
                if(response.status === 200){
                    this.setState({
                        submitting: false,
                        value: '',
                        comments: [
                            {
                                author: <p>{this.props.adminAuth.firstName+" "+this.props.adminAuth.middleName+" "+this.props.adminAuth.lastName}</p>,
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

    };*/

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
            <div>
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