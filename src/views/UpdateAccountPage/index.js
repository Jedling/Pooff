import React, { useRef, useState } from 'react';
import { Container } from 'reactstrap'
import { User, Mail, Phone } from "react-feather";
import UpdateAccount from '../../components/UpdateAccount';
import { usePooff } from '../../context';
import useMagic from '../../actions/useMagic';
import ConfirmAccUpdate from '../ConfirmAccUpdate';

const UpdateAccountPage = () => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const phone = useRef()
  const [update, setUpdate] = useState(false)
  const [setLoggedIn] = useMagic()
  const state = usePooff()

  const user = state.loggedIn

  const updateUser = async (e) => {
    e.preventDefault()
    await fetch('/api/myuser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //check if value is falsy else use fetched user
        firstName: firstName.current.value || user.firstName,
        lastName: lastName.current.value || user.lastName,
        email: email.current.value || user.email,
        phone: phone.current.value || user.phone,
      })
    })
    setUpdate(true)
    setLoggedIn()
  }
  let inputData = [
    {
      placeholder: user.firstName,
      type: 'text',
      ref: firstName,
      // validator: '[A-ZÅÄÖ][a-zåäö]+[a-zA-ZåäöÅÄÖ-]*', // börja på stor bokstav Minst 2 bokstäver.
      validator: '[A-ZÅÄÖa-zåäö]{2,}[a-zA-ZåäöÅÄÖ-]*', // börja med vad som helst bokstav. Minst 2 bokstäver.
      id: "firstname",
      title: '',
      icon: <User className="main-icon" />
    },
    {
      placeholder: user.lastName,
      type: 'text',
      validator: '[A-ZÅÄÖa-zåäö]{2,}[a-zA-ZåäöÅÄÖ-]*',
      id: "lastname",
      ref: lastName,
      icon: <User className="main-icon" />
    },
    {
      placeholder: user.email,
      type: 'email',
      ref: email,
      validator:'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
      id: 'email',
      icon: <Mail className="main-icon" />
    },
    {
      placeholder: user.phone,
      type: 'text',
      class: 'phonenumber',
      validator: '\\d{10}',
      id: 'phone',
      ref: phone,
      icon: <Phone className="main-icon" />
    },
  ]
if(!update) {

  return (
    <Container fluid={true} className="no-gutters update-account">
      <h2 className="page-title">Uppdatera konto</h2>
      <form onSubmit={(e) => updateUser(e)}>
        <UpdateAccount inputs={inputData} />
        <input className="primary-btn save-button" type="submit" value="Uppdatera" />
      </form>
    </Container>
  )
}
return <ConfirmAccUpdate />

}

export default UpdateAccountPage