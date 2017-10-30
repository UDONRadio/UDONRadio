import React from 'react';
import { SERVER } from '../networkGenerics';


const AdmView = (props) => (
  <iframe
    src={SERVER.admin_url}
    id="adm-view"
    className="max-height max-width"
    title="adm"
  />
);


export default AdmView;
