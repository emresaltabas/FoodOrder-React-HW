import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const Checkout = (props) => {
  const [formValidation, setFormValidation] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const emptyInput = (item) => item.trim().length === 0;
  const validInput = (item) => item.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validName = !emptyInput(enteredName);
    const validStreet = !emptyInput(enteredStreet);
    const validCity = !emptyInput(enteredCity);
    const validPostal = validInput(enteredPostal);
    setFormValidation({
      name: validName,
      street: validStreet,
      postal: validPostal,
      city: validCity,
    });
    const isValidForm = validName && validCity && validPostal && validStreet;
    if (isValidForm) {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    }

    if (!isValidForm) {
      return;
    }
  };
  const nameClass = `${classes.control} ${
    !formValidation.street ? "" : "invalid"
  }`;
  const streetClass = `${classes.control} ${
    !formValidation.street ? "" : "invalid"
  }`;
  const postalClass = `${classes.control} ${
    !formValidation.street ? "" : "invalid"
  }`;
  const cityClass = `${classes.control} ${
    !formValidation.street ? "" : "invalid"
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidation.name && <p>empty name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidation.street && <p>empty street</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidation.postal && <p>invalid or empty postal</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidation.city && <p>empty city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
