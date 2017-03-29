import * as React from "react";
import * as ReactDOM from "react-dom";

export interface EventProps {
  title: string,
  description: string,
  /*
  start_date:
  end_date:
  thumbnail:
  */
}
export const Event = (props: EventProps) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </div>
)
