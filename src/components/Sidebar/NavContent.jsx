import { useCallback, useState } from "react"
import { NavLink } from "react-router-dom"
import Social from "./Social"
import externalUrls from "./externalUrls"
import styled from "styled-components"
import { ReactComponent as PoolTogetherIcon } from "../../assets/icons/33-together.svg"
import { trim, shorten } from "../../helpers"
import { useAddress, useWeb3Context } from "src/hooks/web3Context"
import useBonds from "../../hooks/Bonds"
import {
  Paper,
  Link,
  Box,
  Typography as Typograp,
  SvgIcon,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import "./sidebar.scss"
import LogoImg from "../../assets/ohm/Space logo-01.jpg"
import Space1 from "../../assets/ohm/Spaceblue.png"
import Space2 from "../../assets/ohm/Spaceyellow1.png"

function NavContent() {
  const [isActive] = useState()
  const address = useAddress()
  const { bonds } = useBonds()
  const { chainID } = useWeb3Context()

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "")
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true
    }
    if (currentPath.indexOf("claim") >= 0 && page === "claim") {
      return true
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true
    }
    if (currentPath.indexOf("nft") >= 0 && page === "nft") {
      return true
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true
    }
    if (currentPath.indexOf("lending") >= 0 && page === "lending") {
      return true
    }
    if (
      (currentPath.indexOf("bonds") >= 0 ||
        currentPath.indexOf("choose_bond") >= 0) &&
      page === "bonds"
    ) {
      return true
    }
    return false
  }, [])

  const isActiveFc = useCallback(
    (name) => {
      return checkPage(null, window.location, name)
    },
    [window.location]
  )
  return (
    <Paper className="dapp-sidebar">
      <Box
        className="dapp-sidebar-inner"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://presale.spaceprojects.online/" target="_blank">
              <img src={LogoImg} alt="" style={{ width: "190px" }} />
            </Link>
          </Box>
          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <ANavLink
                href=""
                target="_blank"
                className="fxCenter"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  Presale
                </Typography>
              </ANavLink>
              <ANavLink
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard")
                }}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  Dashboard
                </Typography>
              </ANavLink>

              {/*    <ANavLink
                component={NavLink}
                id="claim-nav"
                to="/claim"
                isActive={(match, location) => {
                  return checkPage(match, location, "claim");
                }}
                bg2={Bondimg2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Bondimg} />
                  Claim SPACE Token
                </Typography>
              </ANavLink> */}

              <ANavLink
                href="https://pancakeswap.finance/"
                target="_blank"
                className="fxCenter"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  Buy SPACE
                </Typography>
              </ANavLink>

              <ANavLink
                component={NavLink}
                id="stake-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake")
                }}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  Stake
                </Typography>
              </ANavLink>

              {/* <ANavLink href="" target="_blank" className="fxCenter"
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  ROI dApps
                </Typography>
              </ANavLink> */}
              <FormControl>
                <InputLabel>
                  {" "}
                  <Typography2 variant="" className="fxCenter">
                    <ANavIcon bg1={Space1} />
                    Space dApps
                  </Typography2>
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                >
                  <ANavLink
                    href="https://spacemoneydapp.github.io/SpaceMiner/"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <MenuItem value={10}>Space Miner</MenuItem>
                  </ANavLink>
                  {/*  <ANavLink href="" target="_blank" className="fxCenter"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}>
                  <MenuItem value={30}>BUSD Space Farm</MenuItem></ANavLink> */}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>
                  {" "}
                  <Typography2 variant="" className="fxCenter">
                    <ANavIcon bg1={Space1} />
                    Eco System
                  </Typography2>
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                >
                  <ANavLink
                    href="https://spacefield.spaceprojects.online/"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <MenuItem value={10}>Space Field</MenuItem>
                  </ANavLink>
                  <ANavLink
                    href="https://lottery.spaceprojects.online/"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <MenuItem value={10}>Space Lottery</MenuItem>
                  </ANavLink>
                  <ANavLink
                    href="https://twitter.com/SpaceEcoSystem"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <MenuItem value={10}>Space Eco Twitter</MenuItem>
                  </ANavLink>
                  <ANavLink
                    href="https://t.me/SpaceEcosystem"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <MenuItem value={10}>Space Eco Telegram</MenuItem>
                  </ANavLink>
                  {/*   <ANavLink href="" target="_blank" className="fxCenter"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}>
                  <MenuItem value={20}>SpaceCake</MenuItem></ANavLink>
                <ANavLink href="" target="_blank" className="fxCenter"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Space2}>
                  <MenuItem value={30}>BUSD Space Farm</MenuItem></ANavLink> */}
                </Select>
              </FormControl>

              {/*        <ANavLink href="" target="_blank" className="fxCenter"
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={WWFarm1}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={WWFarm2} />
                  Farmer (Dev In-Progress)
                </Typography>
              </ANavLink>

              <ANavLink href="" target="_blank" className="fxCenter"
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
                 bg2={Space2}
              >
                 <Typography variant="" className="fxCenter">
                    <ANavIcon bg1={Space1} />
                      Node (Dev In-Progress)
                  </Typography>
                </ANavLink>

                <ANavLink href="" target="_blank" className="fxCenter"
                      className={`button-dapp-menu ${isActive ? "active" : ""}`}
                       bg2={Printer2}>
                        <Typography variant="" className="fxCenter">
                         <ANavIcon bg1={Printer1} />
                         Printing Machine (Dev In-Progress)
                       </Typography>
                  </ANavLink>
              
              <ANavLink
                component={NavLink}
                id="33-together-nav"
                to="/33-together"
                isActive={(match, location) => {
                  return checkPage(match, location, "33-together");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Togetherimg2}
              >
                <Typography variant="">
                  <ANavIcon bg1={Togetherimg} />
                  3,3 Staking
                </Typography>
              </ANavLink> 

              <ANavLink
                component={NavLink}
                id="nft"
                to="/nft"
                isActive={(match, location) => {
                  return checkPage(match, location, "nft");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={NFTimg2}
              >
                <Typography variant="">
                  <ANavIcon bg1={NFTimg} />
                  SPACE NFT ( More info soon )
                </Typography>
              </ANavLink>

              <ANavLink href="" target="_blank" className="fxCenter"
                      className={`button-dapp-menu ${isActive ? "active" : ""}`}
                       bg2={Farm2}>
                        <Typography variant="" className="fxCenter">
                         <ANavIcon bg1={Farm1} />
                         Farm (Coming Soon)
                       </Typography>
                  </ANavLink> */}

              <ANavLink
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds")
                }}
                bg2={Space2}
              >
                <Typography variant="" className="fxCenter">
                  <ANavIcon bg1={Space1} />
                  Bonds
                </Typography>
              </ANavLink>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  {bonds.map((bond, i) => (
                    <ANavLink
                      component={NavLink}
                      to={`/bonds/${bond.name}`}
                      key={i}
                      className={"bond"}
                    >
                      {!bond.bondDiscount ? (
                        <Typography variant="body1">
                          {bond.displayName}
                          <span className="bond-pair-roi">0%</span>
                        </Typography>
                      ) : (
                        <div variant="" className="sidebond">
                          {bond.displayName}
                          <span className="bond-pair-roi">
                            {bond.bondDiscount &&
                              trim(bond.bondDiscount * 100, 2)}
                            %
                          </span>
                        </div>
                      )}
                    </ANavLink>
                  ))}

                  <ANavLink
                    href="https://poocoin.app/tokens/"
                    target="_blank"
                    className="fxCenter"
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                    bg2={Space2}
                  >
                    <Typography variant="" className="fxCenter">
                      <ANavIcon bg1={Space1} />
                      PooCoin
                    </Typography>
                  </ANavLink>

                  <ANavLink
                    component={NavLink}
                    id="calculator-nav"
                    to="/calculator"
                    isActive={(match, location) => {
                      return checkPage(match, location, "calculator")
                    }}
                    bg2={Space2}
                  >
                    <Typography variant="" className="fxCenter">
                      <ANavIcon bg1={Space1} />
                      Calculator
                    </Typography>
                  </ANavLink>
                  <ANavLink
                    component={NavLink}
                    id="lending-nav"
                    to="/lending"
                    isActive={(match, location) => {
                      return checkPage(match, location, "lending")
                    }}
                    bg2={Space2}
                  >
                    <Typography variant="" className="fxCenter">
                      <ANavIcon bg1={Space1} />
                      lending
                    </Typography>
                  </ANavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box
          className="dapp-menu-bottom"
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <ANavLink
                  key={i}
                  href={`${externalUrls[link].url}`}
                  target="_blank"
                >
                  <Typography variant="">{externalUrls[link].icon}</Typography>
                  <Typography variant="">{externalUrls[link].title}</Typography>
                </ANavLink>
              )
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  )
}

export default NavContent

const ANavIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${(props) => props.bg1});
  background-size: 100%;
  margin-right: 12px;
`

const ANavLink = styled(Link)`
  &:hover,
  &.active {
    text-decoration: none;
    h6 {
      color: #000000;
    }
    ${ANavIcon} {
      background-image: url(${(props) => props.bg2});
    }
  }
`

const Typography = styled(Typograp)`
  display: flex;
  align-items: center;
  font-family: "Square";
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  &:hover,
  &.active {
    color: #000000;
  }
`

const Typography2 = styled(Typograp)`
  display: flex;
  align-items: center;
  font-family: "Square";
  position: relative;
  left: 34px;
  text-decoration: none;

  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  &:hover,
  &.active {
    color: #000000;
  }
`
