import { Badge, Card, Col, Collapse, Row } from "antd";
import { useEffect, useState } from "react";

export function RenderComponent({ formData }: any) {
    const [formDataArray, setFormDataArray] = useState<any[]>([]);
    const [groupData, setGroupData] = useState<any>({});
    const [totalDays, setTotalDays] = useState<number>(0);
    const [totalMonth, setTotalMonth] = useState<number>(0);
    const [totalMonthDays, setTotalMonthDays] = useState<number>(0);

    function randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

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

        const currentTotalDays = arr.reduce((total, { value }) => total + Number(value), 0);
        const currentTotalMonth = Math.floor(currentTotalDays / 30.44);
        const currentTotalMonthDays = (currentTotalDays % 30.44);

        setTotalDays(currentTotalDays)
        setTotalMonth(currentTotalMonth)
        setTotalMonthDays(currentTotalMonthDays)



        setFormDataArray(arr)
    }, [formData])

    return (<>
        <Card title={<>
            <h1>Resultado {totalDays}</h1>
            {/* <p>{totalMonth} meses e {totalMonthDays.toFixed(0)} dias</p> */}
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
                                        <b>valor {item.value} </b>
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