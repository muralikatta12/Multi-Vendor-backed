import React from 'react';

const AddFirm = () => {
  return (
    <div className="firmSection">
     
      <form className="tableForm">
      <h3 className='firmHeading'>Add Firm</h3>
        <div className="formGroup">
          <label htmlFor="firmName">Firm Name</label>
          <input type="text" id="firmName" placeholder="Enter Firm Name" required />
        </div>

        <div className="formGroup">
          <label htmlFor="firmArea">Area</label>
          <input type="text" id="firmArea" placeholder="Enter Firm Area" required />
        </div>

        {/* <div className="formGroup">
          <label htmlFor="firmCategory">Category</label>
          <input type="text" id="firmCategory" placeholder="Enter Firm Category" required />
        </div> */}
    <div className="checkboxWrapper">
      <div className="checkInp">
      <label className="categoryLabel">Category</label>
      <div className="inputsContainer">
      <div className="checkboxContainer">
        <label >Veg</label>
        
        <input type="checkbox" value="veg" />
      </div>

      <div className="checkboxContainer">
        <label >Non-Veg</label>
        <input className='checkbox' type="checkbox" value="non-veg" />
      </div>
    </div>
    <div className="checkInp">
      <label htmlFor="region">Region</label>
      <div className="inputsContainer">
        <div className="checkboxContainer">
          <label>South Indian</label>
          <input type="checkbox" value="southIndian" />
        </div>

        <div className="checkboxContainer">
          <label>North Indian</label>
          <input type="checkbox" value="northIndian" />
        </div>

        <div className="checkboxContainer">
          <label>Chinese</label>
          <input type="checkbox" value="chinese" />
        </div>  

        <div className="checkboxContainer">
          <label>Bakery</label>
          <input type="checkbox" value="bakery" />
        </div>
        
      </div>
    </div>
    </div>
  </div>
    



        <div className="formGroup">
          <label htmlFor="firmRegion">Region</label>
          <input type="text" id="firmRegion" placeholder="Enter Firm Region" required />
        </div>

        <div className="formGroup">
          <label htmlFor="firmOffer">Offer</label>
          <input type="text" id="firmOffer" placeholder="Enter Firm Offer" required />
        </div>

        <div className="formGroup">
          <label htmlFor="firmImage">Upload Image</label>
          <input type="file" id="firmImage" />
        </div>

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  );
};

export default AddFirm;
