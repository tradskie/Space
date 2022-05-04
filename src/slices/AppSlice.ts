import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as OlympusStakingv2 } from "../abi/OlympusStakingv2.json";
import { abi as SPACE } from "../abi/Space.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { setAll, getMarketPrice, getDisplayBalance } from "../helpers";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";
import { treasuryBalanceAll } from "src/helpers/AllBonds";

const initialState = {
  loading: false,
  loadingMarketPrice: false,
};

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    let marketPrice;
    try {
      const originalPromiseResult = await dispatch(
        loadMarketPrice({ networkID: networkID, provider: provider })
      ).unwrap();
      marketPrice = originalPromiseResult?.marketPrice;
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.error("Returned a null response from dispatch(loadMarketPrice)");
      return;
    }

    if (!provider) {
      console.error(
        "failed to connect to provider, please connect your wallet"
      );
      return {
        stakingTVL: 0,
        marketPrice,
        marketCap: 0,
        circSupply: 0,
        totalSupply: 0,
        treasuryMarketValue: 0,
      };
    }
    const currentBlock = await provider.getBlockNumber();

    const stakingContract = new ethers.Contract(
      addresses[networkID].STAKING_ADDRESS as string,
      OlympusStakingv2,
      provider
    );

    const sohmMainContract = new ethers.Contract(
      addresses[networkID].SSPACE_ADDRESS as string,
      sOHMv2,
      provider
    );
    const ohmMainContract = new ethers.Contract(
      addresses[networkID].SPACE_ADDRESS as string,
      SPACE,
      provider
    );

    const ohmBalance = await ohmMainContract.balanceOf(
      addresses[networkID].STAKING_ADDRESS
    );
    const stakingTVL = (ohmBalance * marketPrice) / 1000000000;

    const totalSupply = Number(
      getDisplayBalance(await ohmMainContract.totalSupply(), 9)
    );

    // Calculating staking
    const epoch = await stakingContract.epoch();
    const stakingReward = epoch.distribute;
    const epochNumber = epoch.number;
    const endBlock = epoch.endBlock;
    const circ = await sohmMainContract.circulatingSupply();
    const stakingRebase = stakingReward / circ;

    const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
    const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

    const currentIndex = await stakingContract.index();
    const circSupply = circ / 1e9;
    const marketCap = totalSupply * marketPrice;
    const Staked = circSupply;
    const treasuryMarketValue = await treasuryBalanceAll(networkID, provider);

    return {
      currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
      currentBlock,
      epochNumber,
      endBlock,
      fiveDayRate,
      stakingAPY,
      stakingTVL,
      Staked,
      stakingRebase,
      marketCap,
      marketPrice,
      circVal: circ,
      circSupply,
      totalSupply,
      treasuryMarketValue,
    } as IAppData;
  }
);

/**
 * checks if app.slice has marketPrice already
 * if yes then simply load that state
 * if no then fetches via `loadMarketPrice`
 *
 * `usage`:
 * ```
 * const originalPromiseResult = await dispatch(
 *    findOrLoadMarketPrice({ networkID: networkID, provider: provider }),
 *  ).unwrap();
 * originalPromiseResult?.whateverValue;
 * ```
 */
export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrice;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrice) {
      // go get marketPrice from app.state
      marketPrice = state.app.marketPrice;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
        const originalPromiseResult = await dispatch(
          loadMarketPrice({ networkID: networkID, provider: provider })
        ).unwrap();
        marketPrice = originalPromiseResult?.marketPrice;
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error(
          "Returned a null response from dispatch(loadMarketPrice)"
        );
        return;
      }
    }
    return { marketPrice };
  }
);

/**
 * - fetches the OHM price from CoinGecko (via getTokenPrice)
 * - falls back to fetch marketPrice from ohm-dai contract
 * - updates the App.slice when it runs
 */
const loadMarketPrice = createAsyncThunk(
  "app/loadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk) => {
    let marketPrice: number;
    try {
      marketPrice = await getMarketPrice({ networkID, provider });
    } catch (e) {
      console.error(e);
      marketPrice = 0;
    }
    return { marketPrice };
  }
);

interface IAppData {
  readonly circSupply: number;
  readonly epochNumber: number;
  readonly currentIndex?: string;
  readonly currentBlock?: number;
  readonly endBlock?: number;
  readonly fiveDayRate?: number;
  readonly marketCap: number;
  readonly circVal?: number;
  readonly marketPrice: number;
  readonly stakingAPY?: number;
  readonly stakingRebase?: number;
  readonly stakingTVL: number;
  readonly totalSupply: number;
  readonly treasuryMarketValue?: number;
  readonly Staked?: number;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadMarketPrice.pending, (state, action) => {
        state.loadingMarketPrice = true;
      })
      .addCase(loadMarketPrice.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loadingMarketPrice = false;
      })
      .addCase(loadMarketPrice.rejected, (state, { error }) => {
        state.loadingMarketPrice = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, (app) => app);
