import React from 'react';
import {connect} from 'react-redux';
import Actions from '../../store/actions';
import history from '../../common/history';
import { Form, Select, Button, InputNumber, message} from 'antd';
import { UrlPath } from '../../config/config';
import 'antd/dist/antd.css'
import './index.css';
const { Option } = Select;

class DemographyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploadFail: false
        }
        this.validateMessages = {
            required: '${label} is required!',
            types: {
              email: '${label} is not a valid email!',
              number: '${label} is not a valid number!',
            },
            number: {
              range: '${label} must be between ${min} and ${max}',
            }
        }

        this.formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
              },
          };

        this.tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 10,
              },
            },
        };
    }
    
    onFinsh = (values) => {
        const demoData = values.user;
        // Change user name based on gender 
        this.props.changeName(demoData.gender === 'female' ? 'Christine' : 'Paul')
        // Send data to server 
        fetch(UrlPath.user + this.props.uid + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demoData)
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }else{
                return Promise.reject();
            }
        })
        .then((data) => {
            data = JSON.parse(data);
            // Check success or not 
            if(data.res === 'ok') {
                // Go to next page
                history.push('/questionnaire/1');
            }else{
                // Trigger error
                message.error('Upload failed. Please try again!')
            } 
        })
        .catch(() => {
            message.error('Something wrong happened. Please try again!')
        })
    }

    render() {
        return (
            <div className = "demo-container">
                <Form
                    validateMessages={this.validateMessages}
                    className="demo-form"
                    onFinish={this.onFinsh}
                > 
                    <p className="demo-form-title">
                        Personal Information
                    </p>
                    {/* Age */}
                    <Form.Item 
                        name={['user', 'age']} 
                        label="Age" 
                        rules={[{required: true}, { type: 'number', min: 0, max: 99 }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    {/* Gender */}
                    <Form.Item
                        name={['user', 'gender']}
                        label="Gender"
                        rules={[{required: true}]}
                    >
                        <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    {/* Working status */}
                    <Form.Item
                        name={['user', 'work']}
                        label="Working Status"
                        rules={[{required: true}]}
                    >
                        <Select placeholder="select your working status">
                        <Option value="full_time">Full-time</Option>
                        <Option value="part_time">Part-time</Option>
                        <Option value="student_or_further_studies">Student / Further Studies</Option>
                        <Option value="unemployed">Unemployed</Option>
                        <Option value="retired">Retired</Option>
                        </Select>
                    </Form.Item>

                    {/* Personal Income */}
                    <Form.Item 
                        name={['user', 'income']} label="Personal Yearly Income ($)" 
                        rules={[{required: true}, { type: 'number', min: 0, max: 1e8 }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <div style={{display: 'block', width: '100%', marginTop: '-1%', marginBottom: '4%'}}>
                        (If you are unemployed or a student you can enter your family yearly income)
                    </div>
                    {/* Education Level*/}
                    <Form.Item
                        name={['user', 'education']}
                        label="Education Level"
                        rules={[{required: true}]}
                    >
                        <Select placeholder="select your education level">
                        <Option value="high_school_and_lower">High School Degree or Lower</Option>
                        <Option value="bachelor">Bachelor Degree</Option>
                        <Option value="master">Master Degree</Option>
                        <Option value="doctor">Doctor Degree</Option>
                        </Select>
                    </Form.Item>

                    {/* Button */}
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (curState) => {
    console.log(curState);
    return {
        uid: curState.infoReducer.userInfo.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeName:  (...args) => dispatch(Actions.changeName(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DemographyPage);