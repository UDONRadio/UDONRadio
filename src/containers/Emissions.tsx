import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Emission,} from "../components/Emission";


const Inline = styled.li`
  display: inline-flex;
`;

const EmissionsUl = styled.ul`
  padding: 0px;

  display: flex;
  flex-wrap: wrap;
`

interface EmissionAPI {
  starts: string,
  ends: string,
  emission: {
    title: string,
    pitch: string,
    host: string,
    picture_link:string
  }
}
interface EmissionsState {
  list: Array<EmissionAPI>
}
export class Emissions extends React.Component<undefined, EmissionsState> {

  constructor (props) {
    super(props);
    this.state = {
      list: []
    };
    fetch("http://localhost:8000/api/emissions/")
    .then( response => response.json() )
    .then( json => {
      this.setState((prevState, props) => ({
        list: prevState.list.concat(json.results)
      })
    )})
  }

  render () {
    const listEmissions = this.state.list.slice(0,3).map((emission) =>
    <Inline key={emission.starts}>
      <Emission picture_link={emission.emission.picture_link} pitch={emission.emission.pitch} title={emission.emission.title}/>
    </Inline>
    )
    return <EmissionsUl>
      {listEmissions}
    </EmissionsUl>
  }
}
