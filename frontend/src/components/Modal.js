// components/Modal.js
import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };

    handleDueDateChange = (e) => {
        const due_date = e.target.value;
        const activeItem = { ...this.state.activeItem, due_date };
        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;
        const { activeItem } = this.state;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-title">Title</Label>
                            <Input
                                type="text"
                                id="todo-title"
                                name="title"
                                value={activeItem.title}
                                onChange={this.handleChange}
                                placeholder='Enter Todo Title'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                                type='text'
                                id='todo-description'
                                name='description'
                                value={activeItem.description}
                                onChange={this.handleChange}
                                placeholder='Enter Todo description'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-due-date">Due Date</Label>
                            <Input
                                type="datetime-local"
                                id="todo-due-date"
                                name="due_date"
                                value={activeItem.due_date}
                                onChange={this.handleDueDateChange}
                                placeholder='Enter Due Date'
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name='notifications_enabled'
                                    checked={activeItem.notifications_enabled}
                                    onChange={this.handleChange}
                                    disabled={!activeItem.due_date} // Disable if no due date
                                />
                                Notifications
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
