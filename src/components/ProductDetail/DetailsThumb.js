import React, { Component } from "react";

export class DetailsThumb extends Component {
  render() {
    const { images, handleTab } = this.props;

    return (
      <div className="thumb">
        {images.map((img, index) => (
          <img
            style={{ hover: "boxShadow: 0 0 2px 1px rgba(0, 140, 186, 0.5)" }}
            src={img.url}
            alt=""
            key={index}
            onClick={() => handleTab(index)}
          />
        ))}
      </div>
    );
  }
}

export default DetailsThumb;
