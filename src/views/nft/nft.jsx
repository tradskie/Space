import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./nft.scss";
import styled from "styled-components";
import NFTIcon1 from '../../assets/nft/Space-logo-orange.jpg'
import NFTIcon2 from '../../assets/nft/Space-logo-orange.jpg'
import NFTIcon3 from '../../assets/nft/Space-logo-orange.jpg'
import NFTIcon4 from '../../assets/nft/Space-logo-orange.jpg'
import NFTIcon5 from '../../assets/nft/Space-logo-orange.jpg'
import NFTIcon6 from '../../assets/nft/Space-logo-orange.jpg'
import GiftImg from '../../assets/nft/blindbox.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/swiper.min.css'
SwiperCore.use([Pagination])

export const NFTBySymbol = {
  'Level 1': NFTIcon1,
  'Level 2': NFTIcon2,
  'Level 3': NFTIcon3,
  'Level 4': NFTIcon4,
  'Level 5': NFTIcon5,
  'Level 6': NFTIcon6,
}

const TokenSymbol = ({ symbol, size = 50, msize = size, className }) => {
  if (!NFTBySymbol[symbol]) {
    return <span>{symbol}</span>
  }
  return (
    <ImgBox
      className={className}
      src={NFTBySymbol[symbol] || symbol}
      size={size}
      msize={msize}
    />
  )
};


const ImgBox = styled.img`
  width:200px;
  height:240px;
`

const NFTPage = () => {
  // const [num, setNum] = useState(1)
  const [scleft,setScLeft]=useState(0)
  const refdom=useRef()

  const NFTArr = useMemo(()=>{
    return [
      {
        name: 'Level 1',
        Hashrate: '1000',
        Rarity: '1',
        Probability: '60%'
      }, {
        name: 'Level 2',
        Hashrate: '2000',
        Rarity: '2',
        Probability: '50%'
      }, {
        name: 'Level 3',
        Hashrate: '3000',
        Rarity: '3',
        Probability: '40%'
      },  {
        name: 'Level 4',
        Hashrate: '4000',
        Rarity: '4',
        Probability: '30%'
      },  {
        name: 'Level 5',
        Hashrate: '5000',
        Rarity: '5',
        Probability: '20%'
      }, {
        name: 'Level 6',
        Hashrate: '1000',
        Rarity: '1',
        Probability: '60%'
      } 
    ]
  },[window])
  const num = useMemo(()=>{
    const sl = 350
    return (scleft/sl +1).toFixed(0)
  },[scleft])
  const testFc=useCallback(()=>{
    const {scrollLeft} = refdom.current
    const wz = scleft - scrollLeft
    if(wz < -10 || wz > 10){
      setScLeft(scrollLeft)
    }
  },[])
  useEffect(()=>{
    refdom.current.addEventListener('scroll',testFc)
    // return ()=>refdom.current.remove('scroll',testFc)
  },[refdom.current?.offsetLeft])
  // console.error(NFTArr)
  return (
    <div>
      <div className="maxTopBox">
        <div className="TopBox">
          <div className="titleBox">
          SPACENFT
          </div>
          <div className="textBox">
          Function / usecase will be announced 
          </div>
{/*          <div className="textBox">
            SPACENFT is an important part of the Space Dao ecosystem. Holders can obtain SPACENFT Collections by staking sSPACE. In the near future, SPACENFT will be widely used in Space Dao's protocol governance and community activities, becoming a status symbol of SPACENFT holders in the Space Dao ecosystem.
          </div> */}
        </div>
        <div>
{/*          <img src={TopImg} alt="" className="TopImgStyle" /> */}
        </div>
        <div className="lingqu">
          <img src={GiftImg} alt="" className="Gift" />
          <span>Open a blind box</span>
        </div>
      </div>
      <div ref={refdom} className="bordBox">
        {NFTArr.map((item, key) =><div key={key} className="cord">
            <TokenSymbol symbol={item.name} alt="" className="cordimg" />
            <div>
              <div className="Entry1"><span>{item.name}</span></div>
              <div className="Entry"><span>Hashrate</span><span> {item.Hashrate}</span></div>
              <div className="Entry"><span>Rarity</span><span> {item.Rarity}</span></div>
              <div className="Entry"><span>Probability</span><span> {item.Probability}</span></div>
            </div>
          </div>)}
      </div>
      <div className="pagingStyle">
          {num}/6
      </div>
      <div className="lingqu2">
        <img src={GiftImg} alt="" className="Gift" />
        <span>Open a blind box</span>
      </div>
    </div>
  );
};

export default NFTPage;
