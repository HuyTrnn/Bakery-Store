import "./Modal.scss";
import React from "react";
import { useState, useEffect } from "react";
import FormInfo from "../Form/FormEditInfo";

function Modal(customer) {


  const handleClose = () => {
    customer.onStatus(true)
  }
  console.log(customer);

  return (
    <div class="panel overlay hidden" id="my-panel">
      <div class="panel-body">
        <div class="panel-body__change">
       
          <div className="close" onClick={handleClose}>X</div>
          <h2>Chỉnh Sửa Thông tin</h2>
                <FormInfo  props={customer.props}/>
        </div>
      </div>
    </div>
  );
}

export default Modal;
