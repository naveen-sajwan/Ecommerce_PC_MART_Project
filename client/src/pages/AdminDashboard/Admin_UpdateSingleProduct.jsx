import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import "./Update_Product.css"

const Admin_UpdateSingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });  
    
    // Loading state to manage form submission
    const [loading,setLoading] = useState(false);

    useEffect(()=>{  
        const fetchProduct = async()=>{
            try{
                const {data} = await axios.get(`http://localhost:5000/api/products/${id}`,{withCredentials: true});
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                })
            }catch(error){
                console.log(error);
            }
        };
        fetchProduct();
    },[id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{
      await axios.put(`http://localhost:5000/api/products/${id}`,formData,{withCredentials: true});
      alert("Product updated successfully!");
    }catch(error){
      console.log(error);
      alert("Failed to update product.");
    }finally{
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setLoading(false);
      navigate("/admin/products");
    }
  }

  return (
    <div className="update-product-container">
    <div className="update-product-card">
      <h1>Update Product</h1>

      <form onSubmit={handleSubmit} className="update-product-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <button type="submit" disabled={loading}>
          {loading?"Updating...":"Update Product"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default Admin_UpdateSingleProduct