import React from 'react'

const SideBar = ({showAddFirmHandler,showAddProductHandler,showAllProductsHandler,showUserDetailsHandler}) => {
    return (
    <div>
      <div className="sideBarSection">
        <ul>
            <li onClick={showAddFirmHandler}>Add Firm</li>
            <li onClick={showAddProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li onClick={showUserDetailsHandler}>User Details</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
