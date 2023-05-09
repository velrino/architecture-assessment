import React, { useState } from 'react';
import { Form, Radio, Button, Tabs, Card } from 'antd';

export const AssessmentForm = ({ onChange }: any) => {
    let [form, setForm] = useState<any>({})

    const changeInput = (event: any) => {
        const { name, value } = event.target;
        // const nameSplited = name.split(".")
        const currentForm = { ...form, [name]: value }

        setForm(currentForm);
        onChange(currentForm);
    }

    return (
        <>
            <Card title={<>
                <h1>Formulario</h1>
            </>}>
                <Form layout="vertical" className='text-center'>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Principal" key="1">

                            {/* Add your form items here */}
                            <Form.Item label="Qual é o tamanho do projeto que você deseja realizar?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="principal.projectSize">
                                    <Radio value="small">Pequeno</Radio>
                                    <Radio value="medium">Médio</Radio>
                                    <Radio value="large">Grande</Radio>
                                    <Radio value="extremelyLarge">Extremamente grande</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Qual é o objetivo principal da sua arquitetura de software?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="principal.architectureObjective">
                                    <Radio value="scalability">Escalabilidade</Radio>
                                    <Radio value="maintenance">Manutenção</Radio>
                                    <Radio value="performance">Desempenho</Radio>
                                    <Radio value="Outro">other</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Qual é o nível de complexidade do seu sistema?" name="systemComplexity">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="principal.systemComplexity">
                                    <Radio value="low">Baixa</Radio>
                                    <Radio value="medium">Média</Radio>
                                    <Radio value="high">Alta</Radio>
                                    <Radio value="dontKnow">Não sei</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Qual é o tipo de arquitetura de software que você está usando atualmente?" name="softwareArchitecture">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="principal.softwareArchitecture">
                                    <Radio value="monolithic">Monolítica</Radio>
                                    <Radio value="microservices">Microsserviços</Radio>
                                    <Radio value="soa">SOA (Arquitetura Orientada a Serviços)</Radio>
                                    <Radio value="dontKnow">Não sei</Radio>
                                </Radio.Group>
                            </Form.Item>

                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Security" key="2">
                            <Form.Item label="Qual é o nível de sensibilidade dos dados manipulados pelo seu sistema?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="security.securityArchitecture">
                                    <Radio value="low">Baixa</Radio>
                                    <Radio value="medium">Média</Radio>
                                    <Radio value="high">Alta</Radio>
                                    <Radio value="dontKnow">Não sei</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Qual é a política de autenticação de usuários do seu sistema?" name="authenticationPolicy">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="security.authenticationPolicy">
                                    <Radio value="uniquePassword">Senha única</Radio>
                                    <Radio value="passwordAndTwoFactorAuthentication">
                                        Senha e autenticação de dois fatores
                                    </Radio>
                                    <Radio value="digitalCertificateAuthentication">
                                        Autenticação com certificado digital
                                    </Radio>
                                    <Radio value="jwt">
                                        JWT
                                    </Radio>
                                    <Radio value="other">Outro</Radio>
                                    <Radio value="nda">Nao tem</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Qual é o nível de controle de acesso ao sistema?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="security.accessControlLevel">
                                    <Radio value="allUsersHaveFullAccess">
                                        Todos os usuários têm acesso completo
                                    </Radio>
                                    <Radio value="differentUserAccessLevelsExist">
                                        Existem diferentes níveis de acesso de usuário
                                    </Radio>
                                    <Radio value="accessIsControlledByUserFunctions">
                                        O acesso é controlado por funções de usuário
                                    </Radio>
                                    <Radio value="other">Outro</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="O seu sistema possui recursos de criptografia de dados?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="security.dataEncryption">
                                    <Radio value="allDataIsEncrypted">Sim, em todos os dados</Radio>
                                    <Radio value="someDataIsEncrypted">Sim, em alguns dados</Radio>
                                    <Radio value="consideringToImplement">
                                        Não, mas estamos considerando implementá-los
                                    </Radio>
                                    <Radio value="notConsideringToImplement">
                                        Não, não consideramos a implementação deles
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Qual é o nível de monitoramento e detecção de ameaças em tempo real?">
                                <Radio.Group optionType="button" buttonStyle="solid" className='custom-radio' onChange={changeInput} name="security.realTimeThreatDetection">
                                    <Radio value="advancedMonitoringAndDetectionSystem">
                                        Possuímos um sistema de monitoramento e detecção avançado
                                    </Radio>
                                    <Radio value="basicMonitoringAndDetectionSystem">
                                        Possuímos um sistema de monitoramento e detecção básico
                                    </Radio>
                                    <Radio value="noMonitoringAndDetectionSystem">
                                        Não possuímos um sistema de monitoramento e detecção
                                    </Radio>
                                    <Radio value="dontKnow">Não sei</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="DevOps" key="3">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="UX/Front" key="4">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Compliance" key="5">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </Tabs.TabPane>
                    </Tabs>
                </Form>
            </Card>
        </>
    );
};