import LogoImage from "core-team/assets/images/logo.png";
import Image from 'next/image'

const Logo = () => {
  return (
    <Image src={LogoImage} alt="" />
  );
};

export default Logo;