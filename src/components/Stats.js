import Layout from "./Layout";
import { PieChart, Pie, Cell } from 'recharts';
import { Link } from "react-router-dom";

function Stats({total, answered, correct}) {

    const data = [
        {
            name: 'Not Answered',
            value: total - answered
        },
        {
            name: 'Correct',
            value: correct
        },
        {
            name: 'Not Correct',
            value: answered - correct
        }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    
    return (
        <Layout>
            <PieChart width={350} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>

            <div className="mt-4">
                <ul className="list-unstyled m-0 p-0">
                    <li className="mb-2">
                        Total Questions: <span className="fw-bold">{total}</span>
                    </li>

                    <li className="mb-2">
                        Total Answered: <span className="fw-bold">{answered}</span>
                    </li>

                    <li className="mb-2">
                        Correct: <span className="fw-bold">{correct}</span>
                    </li>

                    <li className="mb-2">
                        Incorrect: <span className="fw-bold">{answered - correct}</span>
                    </li>
                </ul>
            </div>

            <div className="text-center mt-4">
                <Link to="/" className="btn btn-primary">Go to Home Page</Link>
            </div>
        </Layout>
    );
}

export default Stats;