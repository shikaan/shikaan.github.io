import React from "react";

module.exports = jest.fn().mockImplementation((props) =>
  React.createElement("img", props)
)
