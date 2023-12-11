import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Footer, Navbar } from "./components";
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import QRCode from 'react-qr-code';
import abi from './components/abi';
import { ethers } from 'ethers';


function LaunchpadApp() {

  // Important steps:
  // 1- Create presale address using https://0xfactory.com/
  // 2- Send the tokens for presale to the presale contact address
  // 3- Update the following constants with your presale details
  const presaleAddress = "0xf5065ef05Dbb1BECd371D586447bb7d8D9Db6fe5";
  const rate = 1500;
  const presaleTokens = 5000000;
  const tokenDecimals = 18;
  

  const [currentAccount, setCurrentAccount] = useState(null);
  const [amountText, setAmountText] = useState(0);
  const [remaingTokens, setRemaingTokens] = useState(presaleTokens);

  let payAmount = "0";

  const handleAmountChange = (event) => {
    setAmountText(event.target.value);
    if(Number(event.target.value) > 0){
    }
  };


  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if(!ethereum){
      console.log("Metamask NOT Installed");
      return;
    }else{
      console.log("Metamask Installed");
    }
   }

  const connectWalletHandler = async() => { 
    const { ethereum } = window;
    if(!ethereum){
      alert("Please Install Metamask!");
    }

    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account :", accounts[0]);
      setCurrentAccount(accounts[0]);
    }catch (err){
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} variant="contained" fullWidth align="center">
        Wallet Connect
      </Button>
    )
  }

  const buyButton = () => {
    return (
      <Button onClick={buyHandler} variant="contained" fullWidth align="center">
        Buy
      </Button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  const getRemainingTokens = async() => {
    try{
      const { ethereum } = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(presaleAddress, abi, signer);

        let tokensNum = String(await contract.tokenBalance())
        tokensNum = tokensNum.substring(0,tokensNum.length - tokenDecimals);
        setRemaingTokens(Number(tokensNum));
      }
    }catch(err){
		alert("You need to connect with MetaMask.");
    	console.log(err);
    }

  }

  getRemainingTokens();
  


  const buyHandler = async() => {
    try{
      const { ethereum } = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(presaleAddress, abi, signer);

        console.log("Intialize payment");
        payAmount = String(Number(amountText) * 1000000000000000000);
        let buyDone = await contract.buyTokens({value: payAmount});
        console.log(contract);
		if(buyDone){
			alert("Congratulations, you will receive your tokens very soon");
		}else{
			alert("Something wrong, Maybe you don't have enough BNB balance.");
		}
      }
    }catch(err){
		  alert("Something wrong, Maybe you don't have enough BNB balance.");
    	console.log(err);
    }

  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
        <Navbar />
      {/* Hero unit */}
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          TOP Token Presale
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={3} alignItems="flex">
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={1}>
            <img src="https://i.ibb.co/0pNjLtt/btc.png" alt="btc" width={60} border="0"/>
            </Grid>
            <Grid item xs={11}>
              <Typography variant="p" align="left" color="text.secondary" component="p">
               TOP Token (TPN) is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, thus removing the need for third-party involvement in financial transactions.
              </Typography>
            </Grid>
          </Grid>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Presale Address: {presaleAddress}
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Token Name: TOP Token
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Symbol: TPN
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Token Address: 0x96BF6BbafEB53AEaef68A764e9e33Cd1d92f43Fe
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Token Supply : 10,000,000,000
        </Typography>    
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Tokens For Liquidity : 1,500,000,000
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
          Presale Start Time: 2023.07.11 00:00 (UTC)
        </Typography>
        <br/>
        <Divider />
        <br/>
        <Typography variant="p" align="left" color="text.secondary" component="p">
        Presale End Time: 2023.12.01 00:00 (UTC)
        </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1 }}>
            <Typography variant="h6" align="center" color="text.secondary" component="p">
            MetaMask Buy
            </Typography>
            <Typography sx={{m:2}} variant="p" align="left" color="text.secondary" component="p">
              Rate: 0.006 BNB = {rate} TPN
            </Typography>
            <Typography sx={{m:2}} variant="p" align="left" color="text.secondary" component="p">
              Tokens For Presale : 1,500,000,000
            </Typography>
            <LinearProgress sx={{m:2}} variant="determinate" value={String(((presaleTokens-remaingTokens)/presaleTokens))*100} />
            <Box sx={{m:2}}>
              <TextField value={amountText} onChange={handleAmountChange} fullWidth label="Amount in BNB" type="number" required />
            </Box>
            <Typography sx={{m:2}} variant="p" align="left" color="text.secondary" component="p">
              Get : {amountText * rate} TPN
            </Typography>
            <Box sx={{m:2}}>
              {currentAccount ? buyButton() : connectWalletButton()}
            </Box>
          </Box>

          <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, mt:2 }}>
            <Typography variant="h6" align="center" color="text.secondary" component="p">
              Direct Buy
            </Typography>
            <Typography sx={{m:2}} variant="p" align="left" color="text.secondary" component="p">
              Send BNB direct to presale address and you will receive NBTC tokens immediatly.
            </Typography>
            <Box sx={{m:2}} align="center">
              <QRCode
                title="Presale QR"
                value={presaleAddress}
              />
            </Box>
          </Box>
        </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Launchpad() {
  return <LaunchpadApp />;
}