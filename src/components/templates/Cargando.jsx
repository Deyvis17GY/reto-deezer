import React, { Fragment } from "react";
import { Spinner } from "reactstrap";

const Cargando = () => {
  return (
    <Fragment>
      <div className="cargando">
        <Spinner color="primary" className="spinner" />
      </div>
    </Fragment>
  );
};
export default Cargando;
