import React, { PureComponent, useState } from 'react';
import '../scss/style.scss';
import '../scss/_variables.scss';
import './Animation.css';
import { ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import VisibilitySensor from 'react-visibility-sensor';
import Grow from '@mui/material/Grow';

export default function Graph2() {
    const [isVisible, setIsVisible] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            setIsVisible(true);
        }
    };

    const data2 = [
        { cause: 'Heart Disease', deaths: 65900 },
        { cause: 'Cancer', deaths: 599000 },
        { cause: 'Unintentional Injuries', deaths: 173000 },
        { cause: 'Chronic Lower Respiratory Disease', deaths: 156000 },
        { cause: 'Stroke', deaths: 147000 },
        { cause: 'Alzheimer\'s Disease', deaths: 121000 },
        { cause: 'Diabetes', deaths: 88000 },
        { cause: 'Nephritis', deaths: 51000 },
        { cause: 'Influenza and Pneumonia', deaths: 50000 },
        { cause: 'Suicide', deaths: 47000 },
    ];

    const COLORS = ['#01CDA9', '#B9F1E7'];

    return (
        <div className='row mx-0 align-items-center mobile-vertical-stack'>
            <VisibilitySensor onChange={onVisibilityChange}>
                <div className='col d-flex justify-content-center align-items-center custom-height mx-0'>
                    <div className='chart-container'>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={isVisible ? data2 : []}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cause" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="deaths" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} animationBegin={0} animationDuration={2000} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </VisibilitySensor>
            <VisibilitySensor onChange={onVisibilityChange}>
                <Grow in={isVisible} timeout={1000}>
                    <div className='col d-flex justify-content-center mx-0'>
                        <div className='text-center custom-font rounded bg-white p-3 shadow'>
                            <h2><span style={{ fontSize: '1.5em' }} className='custom-red-font'>10th</span> leading cause of death in<br /> the U.S.</h2>
                            <h3>
                                "<u className='custom-blue-font'>The Centers for Disease Control and<br /> Prevention (CDC)</u> reports suicide<br /> being a major risk factor."
                            </h3>
                        </div>
                    </div>
                </Grow>
            </VisibilitySensor>
        </div >
    )
}