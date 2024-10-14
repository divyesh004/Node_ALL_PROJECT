import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({ id: '', title: '', image: "", price: "", description: "" });
  const [isEdit, setIsEdit] = useState(false); // To track if it's in edit mode

  const getProduct = () => {
    axios.get("http://localhost:8080/product")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`http://localhost:8080/product/${item.id}`, item)
        .then(() => {
          getProduct();
          setItem({ id: '', title: '', image: "", price: "", description: "" });
          setIsEdit(false); // Reset the edit mode after update
        })
        .catch((err) => console.log(err));
    } else {
      axios.post('http://localhost:8080/product', item)
        .then(() => {
          getProduct();
          setItem({ id: '', title: '', image: "", price: "", description: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/product/${id}`)
      .then(() => {
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (product) => {
    setItem(product); // Set the product data in the form
    setIsEdit(true);  // Set the form to edit mode
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };


  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* Form section */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>|| Form ||</h1>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={item.id}
          onChange={handleInputChange}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="title"
          placeholder="Enter Product Title"
          value={item.title}
          onChange={handleInputChange}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="image"
          placeholder="Enter Product Image URL"
          value={item.image}
          onChange={handleInputChange}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="price"
          placeholder="Enter Product Price"
          value={item.price}
          onChange={handleInputChange}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Product Description"
          value={item.description}
          onChange={handleInputChange}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{
          width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff',
          border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px'
        }}>
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product list section */}
      <div>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {data.map((el) => (
            <div key={el.id} style={{
              display: 'flex', alignItems: 'center', marginBottom: '20px',
              border: '1px solid #ddd', borderRadius: '8px', padding: '10px'
            }}>
              <img src={el.image} alt={el.title} style={{ width: '100px', marginRight: '20px', borderRadius: '8px' }} />
              <div>
                <p style={{ margin: '0 0 5px', fontWeight: 'bold', fontSize: '18px' }}>{el.title}</p>
                <p style={{ margin: '0 0 5px', color: '#555' }}>Price: ${el.price}</p>
                <p style={{ margin: '0', color: '#777' }}>{el.description}</p>
                <button onClick={() => handleDelete(el.id)} style={{
                  padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff',
                  border: 'none', borderRadius: '5px', cursor: 'pointer'
                }}>
                  Delete
                </button>
                <button onClick={() => handleEdit(el)} style={{
                  padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff',
                  border: 'none', borderRadius: '5px', cursor: 'pointer'
                }}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
