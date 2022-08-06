import React, {useState} from 'react';
import {Container, Typography, TextField, Button, Box, Tab, Tabs} from '@mui/material';
import {makeStyles} from "@mui/styles";
import {MerkleTree} from 'merkletreejs';
import keccak256 from 'keccak256';
import applicationStyles from "./styles";
import CodeBlock from "./components/CodeBlock";
import Header from "./components/Header";
import { init, track } from '@amplitude/analytics-browser';
import JavaScriptCode from "./components/JavaScriptCode";
import SolidityCode from "./components/SolidityCode";
import TabPanel from "./components/TabPanel";

const App = () => {
  init("583dd5bcdd6c5501fbe7dd9795d35c85");
  const styles = makeStyles(applicationStyles)();

  const [merkleRoot, setMerkleRoot] = useState('');
  const [addressListInput, setAddressListInput] = useState('0x78C298B1699BdF644Fa0b426e776E10605Ed0f46\n0x3e16AC55d2ee2b1582470C6C3d4BFc3Ea2962574');

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);
  const handleAddressesChange = event => setAddressListInput(event.target.value);

  const createTree = () => {
    const addressList = addressListInput.split(/[;,\n\r\s]+/g);
    const leaves = addressList.filter(x => x !== "").map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
    const root = tree.getHexRoot().toString()
    setMerkleRoot(root);
    track('Generate Tree', {
      numLeaves: leaves.length
    });
  }

  const addressList = addressListInput.split(/[;,\n\r\s]+/g).filter(x => x !== "").map(x => <>&nbsp;&nbsp;&nbsp;&nbsp;{x},<br/></>);

  return (
    <Box>
      <Header/>

      <Container className={styles.topMargined}>
        <Typography variant="h6">Enter a list of addresses</Typography>
        <TextField fullWidth
                   multiline
                   value={addressListInput}
                   onChange={handleAddressesChange}/>
        <Typography variant="h7">Separate addresses by commas, semi-colons, spaces, or newlines.</Typography><br/>
        <Button onClick={createTree} variant="outlined" className={styles.topMargined}>Generate Proof</Button>
      </Container>

      {merkleRoot &&
      <Container className={styles.topMargined}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Merkle Tree" id="0" aria-controls="simple-tabpanel-0" />
          <Tab label="JavaScript" id="1" aria-controls="simple-tabpanel-1" />
          <Tab label="Solidity" id="2" aria-controls="simple-tabpanel-2" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Typography variant="h3" className={styles.topPadded}>Merkle Tree</Typography>
          <Typography variant="h6">Merkle Root</Typography>
          <CodeBlock styles={styles} id="merkleRoot" content={merkleRoot}/>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <JavaScriptCode styles={styles} addressList={addressList}/>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <SolidityCode styles={styles} merkleRoot={merkleRoot}/>
        </TabPanel>
      </Container>
      }
    </Box>
  );
}

export default App;
