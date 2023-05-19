import { useEffect, useState } from "react";
import { Col, Divider, Row } from 'antd';
import axios from 'axios';

import { AssessmentForm } from "../../components/form";
import { RenderComponent } from "../../components/render";
import { JsonEditorComponent } from "../../components/json-editor";
import { ChangeThemeComponent } from "../../components/change-theme";

export function HomePage() {
    const [resultData, setResultData] = useState({});
    const [dynamicForm, setDynamicForm] = useState({});

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

    const handleSave = (updatedJsonData: any) => {
        setDynamicForm(updatedJsonData);
    }

    const handleResult = (values: any) => {
        setResultData(values);
    };

    return (
        <div className="top-page">
            <Row gutter={20} align={"middle"}>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 3 }}>
                    <JsonEditorComponent
                        initialJsonData={dynamicForm}
                        onSave={handleSave}
                        buttonLabel="Editor do formulario"
                        modalTitle="JSON Editor - formulario"
                        canEdit={true}
                    />
                </Col>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 3 }}>
                    <JsonEditorComponent
                        initialJsonData={resultData}
                        onSave={handleResult}
                        buttonLabel="JSON da Reposta"
                        modalTitle="JSON Editor - Reposta"
                        canEdit={false}
                    />
                </Col>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 3 }}>
                    <ChangeThemeComponent />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col className="margin-bottom-small" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <AssessmentForm onChange={handleResult} dynamicForm={dynamicForm} />
                </Col>
                <Col className="margin-bottom-small result-form" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <RenderComponent formData={resultData} />
                </Col>
            </Row>
        </div>
    );

}