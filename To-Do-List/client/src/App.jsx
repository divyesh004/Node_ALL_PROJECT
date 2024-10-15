import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Link to the external CSS file

const App = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({ title: '', image: '', price: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);

  const getProduct = () => {
    axios.get('http://localhost:8080/product')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`http://localhost:8080/product/${item.id}`, item)
        .then(() => {
          getProduct();
          setItem({ title: '', image: '', price: '', description: '' });
          setIsEdit(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios.post('http://localhost:8080/product', item)
        .then(() => {
          getProduct();
          setItem({ title: '', image: '', price: '', description: '' });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/product/${id}`)
      .then(() => getProduct())
      .catch((err) => console.log(err));
  };

  const handleEdit = (product) => {
    setItem(product);
    setIsEdit(true);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {/* Form section */}
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-header">|| Form ||</h1>
        <input
          type="text"
          name="title"
          placeholder="Enter Product Title"
          value={item.title}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="image"
          placeholder="Enter Product Image URL"
          value={item.image}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="price"
          placeholder="Enter Product Price"
          value={item.price}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Product Description"
          value={item.description}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product list section */}
      <div className="product-list">
        {data.map((el) => (
          <div key={el.id} className="product-card">
            <img src={el.image} alt={el.title} className="product-image" />
            <div className="product-details">
              <p className="product-title">{el.title}</p>
              <p className="product-price">Price: ${el.price}</p>
              <p className="product-description">{el.description}</p>
              <button onClick={() => handleDelete(el.id)} className="delete-btn">Delete</button>
              <button onClick={() => handleEdit(el)} className="edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
