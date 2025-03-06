import React from 'react'

const AddProduct = () => {
  return (
    <div className="firmSection">
     
    <form className="tableForm">
    <h3 className='firmHeading'>Add Product</h3>
      <div className="formGroup">
        <label htmlFor="product Name">Product Name</label>
        <input type="text" id="firmName" placeholder="Enter Firm Name" required />
      </div>

      <div className="formGroup">
        <label htmlFor="Price">Price</label>
        <input type="text" id="firmArea" placeholder="Enter Product Price" required />
      </div>

      <div className="formGroup">
        <label htmlFor="Product Category">Category</label>
        <input type="text" id="Product Category" placeholder="Enter Firm Category" required />
      </div>

      <div className="formGroup">
        <label htmlFor="BestSeller">BestSeller</label>
        <input type="text" id="firmRegion" placeholder="Enter Product BestSeller" required />
      </div>

      <div className="formGroup">
        <label htmlFor="Description">Description</label>
        <input type="text" id="firmOffer" placeholder="Enter Product Description" required />
      </div>

      <div className="formGroup">
        <label htmlFor="Product Image">Product Image</label>
        <input type="file" id="firmImage" />
      </div>

      <div className="btnSubmit">
        <button type="submit">Submit</button>
      </div>

    </form>
  </div>
  )
}

export default AddProduct
