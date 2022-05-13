import React, { forwardRef }from "react";
import axios from "axios";
function SpecialistLicense(props,ref) {


    const addLicensenumber = async (e) => {
        e.preventDefault()
        try {
          const form = e.target
          const LicenseBody = {
            Licensenumber: form.elements.Licensenumber.value,
          }
          form.reset()
          await axios.post(`/MyMediForm/auth/upgrade`, LicenseBody, {
            headers: {
              Authorization: localStorage.tokenSocial,
            },
          })
          alert("شكرا لك , سيتم مراجعه طلبك ")
        } catch (error) {
       
            alert(error)
        }
      }

    return (
        <form ref={ref} style={{ "display":"none"}} onSubmit={addLicensenumber}>
            هل انت طبيب؟ <br/>
            <label >ادخل رقم ملف الهيئه </label> <br/>
            <input type="number" required name="Licensenumber"  ></input>
            <button  type="submit" className="btn btn-outline-success">ارسال</button>
        </form>
    );
}

export default forwardRef(SpecialistLicense);