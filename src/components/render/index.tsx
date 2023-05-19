import { Badge, Card, Col, Collapse, Divider, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { DoughnutCustomChartComponent } from "../charts";
import { Trans } from "react-i18next";

export function RenderComponent({ formData }: any) {
    const [groupData, setGroupData] = useState<any>({});
    const [totalByGroup, setTotalByGroup] = useState<any>({});
    const [total, setTotal] = useState<number>(0);

    const calculateTotal = (data: any) => {
        return Math.max(data.reduce((total: any, { value }: any) => total + Number((typeof value === 'number') ? value : 0 || 0), 0), 0)
    }

    const calculateTotalByGroup = (data: any) => {
        let result: any = {};

        for (const group in data) {
            const items = data[group];
            result[group] = calculateTotal(items);
        }

        return result;
    }

    const [chartData, setChartData] = useState<any>({});

    function handleChart() {
        let lastColor = "#25aa1e";
        const colors = Object.keys(totalByGroup).map((item: any, index: number) => {
            if (lastColor === "#25aa1e" && index !== 0) {
                lastColor = "#25aa1e91"
            } else if (lastColor === "#25aa1e91") {
                lastColor = "#25aa1e40"
            } else if (lastColor === "#25aa1e40") {
                lastColor = "#25aa1e"
            }

            return lastColor;
        })

        const properties = {
            style: { minHeight: "350px" },
            data: {
                labels: Object.keys(totalByGroup),
                datasets: [
                    {
                        data: Object.values(totalByGroup),
                        backgroundColor: colors,
                        borderWidth: 1,
                        borderColor: colors,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    datalabels: {
                        display: true,
                        color: 'black',
                        font: {
                            size: 14,
                        },
                        // formatter: (value: any) => {
                        //     return `${value.toFixed(2)}`
                        // },
                        align: 'end',
                        anchor: 'end',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            color: 'black',
                        },
                    },
                    // tooltip: {
                    //     callbacks: {
                    //         label: function (context: any) {
                    //             const label = context.label || '';
                    //             const value = context.parsed;
                    //             return `${label}: ${value.toFixed(2)}%`;
                    //         },
                    //     },
                    // },
                },
            }
        }
        setChartData(properties);
    }

    useEffect(() => {
        handleChart()
    }, [totalByGroup])

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
        const resultCalculateTotalByGroup = calculateTotalByGroup(groupedArr);
        console.log({ resultCalculateTotalByGroup })
        setTotalByGroup(resultCalculateTotalByGroup)
        setGroupData(groupedArr)

        const currentTotal = calculateTotal(arr);

        setTotal(currentTotal)
    }, [formData])

    return (<>
        <Card title={<>
            <h1>Resultado {total}</h1>
        </>}>
            <Collapse>
                {
                    (Object.keys(totalByGroup).length > 0) && <Collapse.Panel header={"Chart"} key="DoughnutChartComponent">
                        <>
                            <div style={{ minWidth: "100%", overflow: 'auto' }}>
                                <DoughnutCustomChartComponent properties={chartData} />
                            </div>
                        </>

                    </Collapse.Panel>
                }
                {
                    Object.keys(groupData).map((currentItem, currentIndex) => (<Collapse.Panel header={<>
                        {currentItem} <strong>{totalByGroup[currentItem]}</strong>
                    </>} key={currentIndex}>
                        {/* <p>{groupData[item]}</p> */}
                        <Row gutter={10}>
                            {
                                groupData[currentItem].map((item: any, index: any) => (<Col className="margin-bottom-small" key={index} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                                    <Card title={`${item.name}`} className="custom-card">
                                        <Space align="baseline">
                                            <b className="mock-block">Opção</b>
                                            <span className="mock-block">{<Trans i18nKey={"render_values." + item.value} />}</span>
                                        </Space>
                                        <Divider />
                                        <Space align="baseline">
                                            <b className="mock-block">Valor</b>
                                            <span className="mock-block">{(typeof item.value === 'number') ? item.value : 0}</span>
                                        </Space>
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