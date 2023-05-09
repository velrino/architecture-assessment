import { useEffect, useState } from "react";
import { Col, Divider, Row } from 'antd';

import AssessmentForm from "../../components/form";

export function RenderComponent({ formData }: any) {
    const [formDataArray, setFormDataArray] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    function randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        const arr = Object.entries(formData).map(([name, value]) => ({ name, value, time: randomBetween(5, 90) }));
        setTotal(arr.reduce((total, { time }) => total + time, 0))

        setFormDataArray(arr)
    }, [formData])

    return (<>
        <div>
            <h1>Resultado {total} dias</h1>
            {
                formDataArray.map((item, index) => (<div key={index}>
                    {item.name} : {item.value} = {item.time} dias
                </div>))
            }
        </div>
    </>)
};

export function HomePage() {
    const [formData, setFormData] = useState({});

    const handleFormChange = (values: any) => {
        setFormData(values);
    };

    return (
        <div className="top-page">
            <Row>
                <Col className="gutter-row" span={12}>
                    <AssessmentForm onChange={handleFormChange} />
                </Col>
                <Col className="gutter-row" span={6}>
                    <RenderComponent formData={formData} />
                </Col>
            </Row>
        </div>
    );

}