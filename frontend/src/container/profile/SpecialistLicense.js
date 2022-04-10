import React, { forwardRef }from "react";

function SpecialistLicense(props,ref) {
    return (
        <div ref={ref} style={{ "display":"none"}}>
            هل انت طبيب؟ <br/>
            <label >ادخل رقم ملف الهيئه </label> <br/>
            <input ></input>
            <button className="btn btn-outline-success">ارسال</button>
        </div>
    );
}

export default forwardRef(SpecialistLicense);