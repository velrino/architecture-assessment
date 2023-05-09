import { useEffect, useState } from "react";
import { Col, Divider, Row } from 'antd';

import { AssessmentForm } from "../../components/form";
import { RenderComponent } from "../../components/render";

export function HomePage() {
    const [formData, setFormData] = useState({});

    const handleFormChange = (values: any) => {
        setFormData(values);
    };

    return (
        <div className="top-page">
            <Row gutter={20}>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <AssessmentForm onChange={handleFormChange} />
                </Col>
                <Col className="margin-bottom-small result-form" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <RenderComponent formData={formData} />
                </Col>
            </Row>
        </div>
    );

}