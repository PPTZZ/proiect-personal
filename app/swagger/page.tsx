import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const page = () => {
  return (
    <>
      <SwaggerUI url="swagger.json" />
    </>
  );
};


export default page;
