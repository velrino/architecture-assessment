import { Card } from "antd";
import { useEffect, useState } from "react";

export function RenderComponent({ formData }: any) {
    const [formDataArray, setFormDataArray] = useState<any[]>([]);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [totalMonth, setTotalMonth] = useState<number>(0);
    const [totalMonthDays, setTotalMonthDays] = useState<number>(0);

    function randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        const arr = Object.entries(formData).map(([name, value]) => ({ name, value, time: randomBetween(5, 90) }));
        const currentTotalDays = arr.reduce((total, { time }) => total + time, 0);
        const currentTotalMonth = Math.floor(currentTotalDays / 30.44);
        const currentTotalMonthDays = (currentTotalDays % 30.44);

        setTotalDays(currentTotalDays)
        setTotalMonth(currentTotalMonth)
        setTotalMonthDays(currentTotalMonthDays)



        setFormDataArray(arr)
    }, [formData])

    return (<>
        <Card title={<>
            <h1>Resultado {totalDays} dias</h1>
            <p>{totalMonth} meses e {totalMonthDays.toFixed(0)} dias</p>
        </>}>
            {
                formDataArray.map((item, index) => (<div key={index}>
                    {item.name} : {item.value} = <b>{item.time} dias</b>
                </div>))
            }
        </Card>
    </>)
};