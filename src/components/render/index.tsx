import { Badge, Card, Col, Collapse, Row } from "antd";
import { useEffect, useState } from "react";
import { DoughnutCustomChartComponent } from "../charts";

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
        let lastColor = "#1F75FE";
        const colors = Object.keys(totalByGroup).map((item: any, index: number) => {
            if (lastColor === "#1F75FE" && index !== 0) {
                lastColor = "#74BBFB"
            } else if (lastColor === "#74BBFB") {
                lastColor = "#00008B"
            } else if (lastColor === "#00008B") {
                lastColor = "#1F75FE"
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
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value.toFixed(2)}%`;
                            },
                        },
                    },
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