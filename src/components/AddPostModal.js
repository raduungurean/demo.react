import ModalDialog, {ModalFooter, ModalTransition} from "@atlaskit/modal-dialog";
import Form, {Field} from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import React from "react";
import Button from "@atlaskit/button/loading-button";
import TextArea from "@atlaskit/textarea";

function AddPostModal({isOpen, onClose, onSubmit, adding}) {

    const footer = (props) => (
        <ModalFooter>
            <span />
            <Button appearance="primary" type="submit" isLoading={adding}>
                Add Post
            </Button>
        </ModalFooter>
    );

    return <ModalTransition>
        {isOpen && (
            <ModalDialog
                heading="Add Post"
                onClose={onClose}
                components={{
                    Container: ({ children, className }) => (
                        <Form onSubmit={onSubmit}>
                            {({ formProps }) => (
                                <form {...formProps} className={className}>
                                    {children}
                                </form>
                            )}
                        </Form>
                    ),
                    Footer: footer,
                }}
            >
                <Field label="Title" name="title" defaultValue="">
                    {({ fieldProps }) => <Textfield isRequired {...fieldProps} />}
                </Field>
                <Field name="body"
                       defaultValue=""
                       label="Body">
                    {({ fieldProps }) => <TextArea isRequired {...fieldProps} />}
                </Field>
            </ModalDialog>
        )}
    </ModalTransition>;
}

export default AddPostModal;