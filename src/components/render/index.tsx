import { Badge, Card, Col, Collapse, Row } from "antd";
import { useEffect, useState } from "react";

export function RenderComponent({ formData }: any) {
    const [groupData, setGroupData] = useState<any>({});
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const arr = Object.entries(formData).map(([name, value]) => {
            const nameSplited = name.split(".")
            return { name: nameSplited[1], group: nameSplited[0], value }
        });

        const groupedArr = arr.reduce((result: any, obj) => {
            const group = obj.group;
            if (!result[group]) {
                result[group] = [];
            }
            result[group].push(obj);
            return result;
        }, {});

        const test = Object.keys(groupedArr)

        setGroupData(groupedArr)

        const currentTotalDays = Math.max(arr.reduce((total, { value }) => total + Number(value), 0), 0);

        setTotal(currentTotalDays)
    }, [formData])

    return (<>
        <Card title={<>
            <h1>Resultado {total}</h1>
        </>}>
            <Collapse activeKey={Object.keys(groupData).map((currentItem, currentIndex) => currentIndex)}>
                {
                    Object.keys(groupData).map((currentItem, currentIndex) => (<Collapse.Panel header={currentItem} key={currentIndex}>
                        {/* <p>{groupData[item]}</p> */}
                        <Row gutter={10}>
                            {
                                groupData[currentItem].map((item: any, index: any) => (<Col className="margin-bottom-small" key={index} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                                    <Card title={item.name} className="custom-card">
                                        {/* <p className="text-ellipsis">{item.value}</p> */}
                                        <b>valor {(item.value) ? item.value : 0} </b>
                                    </Card>
                                </Col>))
                            }
                        </Row>
                    </Collapse.Panel>))
                }
            </Collapse>

        </Card>
    </>)
};