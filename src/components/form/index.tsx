import React from 'react';
import { Form, Radio, Button } from 'antd';

const AssessmentForm = ({ onChange }: any) => {
    const onFinish = (values: any) => {
        onChange(values);
    };

    return (
        <Form layout="vertical" onChange={onFinish}>
            {/* Add your form items here */}
            <Form.Item label="Qual é o tamanho do projeto que você deseja realizar?" name="projectSize">
                <Radio.Group>
                    <Radio value="small">Pequeno</Radio>
                    <Radio value="medium">Médio</Radio>
                    <Radio value="large">Grande</Radio>
                    <Radio value="extremelyLarge">Extremamente grande</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Add more form items for each question */}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AssessmentForm;
