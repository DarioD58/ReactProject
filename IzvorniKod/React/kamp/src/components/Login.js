import React from 'react';

function Login() {

    const [state, setState] = React.useState({
        ime: "",
        prezime: "",
        email: "",
        brtel: "",
        dob: "",
        pismo: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/test", {
            method: 'POST',
            body: JSON.stringify(state)
        }).then((response) => {
            console.log(response)
        });
    }

    const onChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(id, value)
    }


    return (
        <form  onSubmit={onSubmit}>
            <label className="text-body" for="ime">Ime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="text" name="ime" placeholder="Ime" size="50"/>
            <label className="text-body" for="prezime">Prezime: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="text" name="prezime" placeholder="Prezime" size="50"/>
            <label className="text-body" for="email">Email: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange} 
             type="email" name="email" placeholder="ivica@email.com" size="50"/>
            <label className="text-body" for="brtel">Broj telefona: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="number" name="brtel" placeholder="0999999999" size="50"/>
            <label className="text-body" for="dob">Datum rođenja: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="date" name="dob" size="50"/>
            <label className="text-body" for="pismo">Motivacijsko pismo: </label>
            <input className="bg-dark pt-3 pb-3 text-white" onChange={onChange}
             type="text" name="pismo" placeholder="Motivacija..." size="50"/>
            <input className="bg-dark text-white"
             type="submit" name="submit" placeholder="Submit" />
            <input className="bg-dark text-white" type="reset" name="res" placeholder="Reset" />
        </form>
    );
  }
  
  export default Login;