import React from 'react'
import LayoutComponent from '../Components/Fixed/LayoutComponent'
import AddProperty from '../Components/AddPropertyPageComponents/AddProperty'
import { useParams } from 'react-router-dom';

function AddPropertyPage() {
  const { id } = useParams(); // This will give you the id parameter from the URL

  return (
    <LayoutComponent>
    <AddProperty id={id ?? ''} />
    </LayoutComponent>
  )
}

export default AddPropertyPage