import React from "react";
import Verification from "./Verification";

export default function Home(props) {
  return props.isVerified !== "verified" ? <Verification /> : <div></div>;
}
