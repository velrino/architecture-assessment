import React, { useEffect, useState } from 'react';
import { Form, Radio, Button, Tabs, Card } from 'antd';

export const AssessmentForm = ({ onChange, dynamicForm }: any) => {
    let [form, setForm] = useState<any>({})
    let [currentDynamicForm, setCurrentDynamicForm] = useState<any>({})

    useEffect(() => {
        console.log(dynamicForm)
        setCurrentDynamicForm(dynamicForm)
    }, [dynamicForm]);

    const changeInput = (event: any) => {
        const { name, value } = event.target;
        // const nameSplited = name.split(".")
        const currentForm = { ...form, [name]: value }

        setForm(currentForm);
        onChange(currentForm);
    }

    const renderFormItems = () => {
        return Object.entries(currentDynamicForm).map(([tabKey, formItems]: any) => (
            <Tabs.TabPane tab={tabKey} key={tabKey}>
                {formItems.map((item: any, index: any) => (
                    <Form.Item key={index} label={item.label} name={item.name}>
                        <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            className='custom-radio'
                            onChange={changeInput}
                            name={tabKey.concat(".").concat(item.name)}
                        >
                            {item.options.map((option: any, optionIndex: any) => (
                                <Radio key={optionIndex} value={option.value}>{option.label}</Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                ))}
            </Tabs.TabPane>
        ));
    };

    return (
        <>
            <Card title={<>
                <h1>Formulario</h1>
            </>}>
                <Form layout="vertical" className='text-center'>
                    <Tabs defaultActiveKey="1">
                        {renderFormItems()}
                    </Tabs>
                </Form>
            </Card>
        </>
    );
};