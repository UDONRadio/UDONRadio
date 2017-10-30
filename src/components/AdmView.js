import React from 'react';
import { SERVER } from '../networkGenerics';


const AdmView = (props) => (
  <iframe
    src={SERVER.api_url + '/admin'}
    id="adm-view"
    className="max-height max-width"
    title="adm"
  />
);


export default AdmView;
