import { Buffer } from "buffer";
global.Buffer = Buffer;

import FooterView from "../components/FooterView";
import LandingView from "../views/_landingView";

export default function IndexPage() {
  return (
    <>
      <LandingView />
      <FooterView current="home" />
    </>
  );
}
