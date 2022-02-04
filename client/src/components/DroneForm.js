import React, { useState, useEffect }from 'react'
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const DroneForm = ({ id, drone }) => {
    const [values, setValues] = useState(null)

    useEffect(() => {
        setValues(drone)
        console.log(values)
    },[drone, id])

    const onFinish = (values) => {
    console.log('Success:', values);
    };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    if(!values) return null

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      {/* DRONE NAME */}
    
      <Form.Item
        label="Nom du drone"
        name="name_d"
        initialValue={values.name_d}
        rules={[
          {
            required: true,
            message: 'Entrez le nom du drone',
          },
        ]}
      >
        <Input value={values.name} type='text' name='name_d'/>
      </Form.Item>

      {/* SELECT CATEGORY */}

      <Form.Item
        label="Catégorie"
        name="category_id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Sélectionnez la catégorie"
          allowClear
        >
          <Option value="D">D</Option>
          <Option value="E">E</Option>
          <Option value="F">F</Option>
          <Option value="G">G</Option>
        </Select>
      </Form.Item>

      {/* DESCRIPTION */}

      <Form.Item
        label="Description"
        name="description_d"
        initialValue={values.description_d}
        rules={[
          {
            required: true,
            message: 'Entrez une description',
          },
        ]}
      >
        <Input value={values.description_d} type='text' name='description_d'/>
      </Form.Item>

      {/* PRICE PER DAY */}

      <Form.Item
        label="Prix par jour"
        name="pricePerDay_d"
        initialValue={values.pricePerDay_d}
        rules={[
          {
            required: true,
            message: 'Entrez le prix/jours',
          },
        ]}
      >
        <Input value={values.pricePerDay_d} type='number'/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Envoyer
        </Button>
        <Button type="danger" style={{ marginLeft: '1rem' }}>
          Supprimer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DroneForm