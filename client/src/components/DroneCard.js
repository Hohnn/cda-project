import React from 'react'
import { Card, Badge, Menu } from 'antd'
const { Meta } = Card

const DroneCard = ({ drone }) => {
    return (
        <div style={{ widht: 300, margin: '1rem' }}>
<Card
            cover={
                <img style={{
                        width: '300px',
                        height: '350px',
                        objectFit: 'cover',
                        padding: '5%'
                }}  alt={drone.name}
                    src={`https://source.unsplash.com/random/${Math.ceil(Math.random() * 1000 + 300)}x350/?uav`}>
                </img>
            }
            >
                <Meta
                title={`${drone.name_d}`}
                description={`${drone.description_d} Prix : ${drone.pricePerDay_d}€/jours`}>
                </Meta>
        </Card>
        </div>
    )
}

export default DroneCard