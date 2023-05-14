import { useEffect, useState } from "react";
import { Col, Divider, Row } from 'antd';
import axios from 'axios';

import { AssessmentForm } from "../../components/form";
import { RenderComponent } from "../../components/render";

export function HomePage() {
    const [formData, setFormData] = useState({});
    const [dynamicForm, setDynamicForm] = useState({});

    const handleFormChange = (values: any) => {
        setFormData(values);
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/form-data.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
                .then((response: any) => {
                    setDynamicForm(response.data)
                })
        };

        fetchData();
    }, []);


    return (
        <div className="top-page">
            <Row gutter={20}>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <AssessmentForm onChange={handleFormChange} dynamicForm={dynamicForm} />
                </Col>
                <Col className="margin-bottom-small result-form" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <RenderComponent formData={formData} />
                </Col>
            </Row>
        </div>
    );

}