import { useState, useEffect } from "react";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { getTokenImage } from "../../helpers";
import { useSelector } from "react-redux";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";

import "./ohmmenu.scss";
import { busd } from "src/helpers/AllBonds";
import { useWeb3Context } from "../../hooks/web3Context";

import OhmImg from "src/assets/tokens/space.svg";
import SOhmImg from "src/assets/tokens/sspace.svg";
import TokenSymbol from "../TokenSymbol";
import styled from "styled-components";

const addTokenToWallet = (tokenSymbol, tokenAddress) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    // NOTE (appleseed): 33T token defaults to sOHM logo since we don't have a 33T logo yet
    const tokenPath = tokenSymbol === "SPACE" ? OhmImg : SOhmImg;
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function OhmMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID } = useWeb3Context();

  const networkID = chainID;

  const SSPACE_ADDRESS = addresses[networkID].SSPACE_ADDRESS;
  const SPACE_ADDRESS = addresses[networkID].SPACE_ADDRESS;
  const PT_TOKEN_ADDRESS = addresses[networkID].PT_TOKEN_ADDRESS;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "ohm-popper";
  const busdAddress = busd.getAddressForReserve(networkID);
  return (
    <Box
      component="div"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
      id="ohm-menu-button-hover"
    >
      <Button id="ohm-menu-button" size="large" variant="contained" color="secondary" title="SPACE" aria-describedby={id}>
        <SvgIcon component={InfoIcon} color="#f7941d" />
        <Typography>SPACE</Typography>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://pancakeswap.finance/swap?inputCurrency=${busdAddress}&outputCurrency=${SPACE_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="" fullWidth>
                      <Typography align="left">
                      Buy on PancakeSwap <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>

                  <Link
                    href={`https://pancakeswap.finance/add/${busdAddress}/${SPACE_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                      Get SPACE-BUSD LP <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>
                </Box>
                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>ADD TOKEN TO WALLET</p>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("SPACE", SPACE_ADDRESS)}>
                        <TokenIcon size={32} symbol="SPACE"/>
                        <Typography variant="body1">SPACE</Typography>
                      </Button>
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("sSPACE", SSPACE_ADDRESS)}>
                        <TokenIcon size={32} symbol="sSPACE"/> 
                        <Typography variant="body1">sSPACE</Typography>
                      </Button>
                      {/* <Button variant="contained" color="secondary" onClick={addTokenToWallet("33T", PT_TOKEN_ADDRESS)}>
                        <Typography variant="body1">33T</Typography>
                      </Button> */}
                    </Box>
                  </Box>
                ) : null}

                {/* <Divider color="secondary" /> */}
                {/* <Link
                  href="https://docs.olympusdao.finance/using-the-website/unstaking_lp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="large" variant="contained" color="secondary" fullWidth>
                    <Typography align="left">Unstake Legacy LP Token</Typography>
                  </Button>
                </Link> */}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default OhmMenu;

const TokenIcon = styled(TokenSymbol)`

`