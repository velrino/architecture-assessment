import { useState } from "react";
import { Col, Divider, Row } from 'antd';

import AssessmentForm from "../../components/form";

export function RenderComponent({ formData }: any) {
    return (<>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, velit? Commodi minima rerum nostrum nihil omnis vitae dolore? Ipsam, iste maxime veniam necessitatibus voluptatem quam aliquam placeat magni illo molestias!
    </>)
};

export function HomePage() {
    const [formData, setFormData] = useState({});

    const handleFormChange = (values: any) => {
        console.log({ values })
        setFormData(values);
    };

    return (
        <div>
            HOME PAGE

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