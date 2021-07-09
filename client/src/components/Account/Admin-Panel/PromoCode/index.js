import React, { useState } from "react";
import { Url } from "../../../../Endpoint/index";

function PromoCode(props) {
  const [promoCode, setPromoCodeValue] = useState("");
  const [discountedPercentage, setDiscountedPercentage] = useState("");

  const handleChange = (e) => {
    setPromoCodeValue(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscountedPercentage(e.target.value);
  };
  const generatePromoCode = (event) => {
    event.preventDefault();

    // let formData = new FormData();
    // formData.append("promoCode", promoCode);
    let data = {
      promoCode: promoCode,
      discountedPercentage: discountedPercentage,
    };
    fetch(Url + "/generatePromoCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoCode: data.promoCode,
        discountedPercentage: data.discountedPercentage,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.success) {
          setPromoCodeValue("");
          setDiscountedPercentage("");
        }
      });
  };
  return (
    <>
      <div>
        <div style={{ padding: "0px 20px" }}>
          <div>Enter Promo Code</div>
          <input
            type="text"
            onChange={(event) => {
              handleChange(event);
            }}
            name="promoCodeValue"
            placeholder="Enter Description.."
            value={promoCode}
          />

          <input
            type="text"
            onChange={(event) => {
              handleDiscountChange(event);
            }}
            name="discountedPercentage"
            placeholder="Enter Disount Percentage (only Type Number..)"
            value={discountedPercentage}
          />

          <input
            type="Submit"
            value="Submit"
            onClick={(event) => generatePromoCode(event)}
          ></input>
        </div>
      </div>
    </>
  );
}

export default PromoCode;
