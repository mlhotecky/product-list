import React from "react";
import { Col } from "react-flexbox-grid";
import { Check } from "@material-ui/icons";

export default function FeatureItem(props) {
  const { feature } = props;

  return (
    <Col className="feature-item" md={12}>
      <Check style={{ color: "#66ff5b" }} />
      <em>{feature}</em>
    </Col>
  );
}
