import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import ReactJson from 'react-json-editor-ajrm';
import localeEn from 'react-json-editor-ajrm/locale/en';

export const JsonEditorComponent: any = ({ initialJsonData, onSave, buttonLabel, modalTitle, canEdit }: any) => {
    const [visible, setVisible] = useState(false);
    const [jsonData, setJsonData] = useState(initialJsonData);

    useEffect(() => {
        setJsonData(initialJsonData)
    }, [initialJsonData]);

    const showModal = () => {
        setVisible(true);
    };

    const handleSave = () => {
        if (canEdit) {
            onSave(jsonData);
            setVisible(false);
        }
    };

    const handleOnChange = (value: any) => {
        if (value.error) {
            console.log("ERROR")
            return;
        }

        setJsonData(value.jsObject)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {buttonLabel}
            </Button>
            <Modal
                title={modalTitle}
                visible={visible}
                onCancel={handleCancel}
                onOk={handleSave}
            >
                <ReactJson
                    onKeyPressUpdate={true}
                    placeholder={jsonData}
                    onChange={(value: any) => handleOnChange(value)}
                    onBlur={(value: any) => handleOnChange(value)}
                    theme="dark"
                    locale={localeEn}
                    viewOnly={canEdit ? false : true}
                />
            </Modal>
        </>
    );
};
