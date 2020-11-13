import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Button(props) {
  const className = [props.className];
  if (props.isPrimary) className.push("btn-primary");
  if (props.isLarge) className.push("btn-lg");
  if (props.isSmall) className.push("btn-sm");
  if (props.isBlock) className.push("btn-block");
  if (props.hasShadow) className.push("btn-shadow");

  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  if (props.isDisabled || props.isLoading) {
    if (props.isDisabled) className.push("disabled"); // "disable" diambil dari boostrap
    return (
      <span className={className.join(" ")} style={props.style}>
        {props.isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm mx-5"></span>
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          props.children
        )}
      </span>
    );
  }

  if (props.type === "link") {
    if (props.isExternal) {
      return (
        <a
          href={props.href}
          className={className.join(" ")}
          style={props.style}
          target={props.target === "_blank" ? "_blank":undefined}
          rel={props.target === "_blank" ? "nooperner noreferrer":undefined}
        >
          {props.children}
        </a>
      );
    } else {
      return (
        //"Link" ini digunakan ketika mau nge Link ke dalam website sendiri
        <Link
          to={props.href}
          className={className.join(" ")}
          style={props.style}
          onClick={onClick}
        >
          {props.children}
        </Link>
      );
    }
  }
  return (
    <button
      className={className.join(" ")}
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link"]),
  onClick: propTypes.func, //
  target: propTypes.string, // target Untuk link external
  href: propTypes.string, //
  className: propTypes.string, //
  isDisabled: propTypes.bool, // untuk pengecekan apakah si button/link disable
  isLoading: propTypes.bool, // untuk membuat button ada animasinya
  isSmall: propTypes.bool, // buat varian ukuran(untuk kecil)
  isLarge: propTypes.bool, // buat varian ukuran(untuk besar)
  isBlock: propTypes.bool, //
  isExternal: propTypes.bool, // untuk mengarahkan ke link luar
  hasShadow: propTypes.bool // buat button ada shadownya
};