import React from "react";
import arrowsIconLeft from "../../assets/icons/circle-arrow-left-solid.svg";
import arrowsIconRight from "../../assets/icons/circle-arrow-right-solid.svg";
const itemPerPage = 3;
const ArrowIconPagination = (props) => {
  const {
    numberOfItem,
    disabled,
    itemPerPage,
    currentSlidePosition,
    setCurrentSlidePosition,
  } = props;

  const handleClickArrowRight = () => {
    if (!disabled) {
      if (currentSlidePosition * itemPerPage + itemPerPage < numberOfItem) {
        setCurrentSlidePosition((c) => c + 1);
      }
    }
  };

  const handleClickArrowLeft = () => {
    if (!disabled) {
      if (currentSlidePosition >= 1) {
        setCurrentSlidePosition((c) => c - 1);
      }
    }
  };
  const renderArrowIcon = () => {
    if (currentSlidePosition === 0) {
      return (
        <img
          id="arrow-icon-right"
          onClick={handleClickArrowRight}
          src={arrowsIconRight}
          alt=""
        />
      );
    } else if (
      currentSlidePosition * itemPerPage >=
      numberOfItem - itemPerPage
    ) {
      return (
        <img
          id="arrow-icon-left"
          onClick={handleClickArrowLeft}
          src={arrowsIconLeft}
          alt=""
        />
      );
    } else {
      return (
        <>
          <img
            id="arrow-icon-left"
            onClick={handleClickArrowLeft}
            src={arrowsIconLeft}
            alt=""
          />
          <img
            id="arrow-icon-right"
            onClick={handleClickArrowRight}
            src={arrowsIconRight}
            alt=""
          />
        </>
      );
    }
  };
  return (
    <>
      {numberOfItem > itemPerPage && <div id="icon">{renderArrowIcon()}</div>}
    </>
  );
};

export default ArrowIconPagination;
