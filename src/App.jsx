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

const tabIndexIds = [
  "merkle-tree",
  "java-script",
  "solidity"
];

const App = () => {
  init("583dd5bcdd6c5501fbe7dd9795d35c85");
  const styles = makeStyles(applicationStyles)();

  const [merkleRoot, setMerkleRoot] = useState('');
  const [addressListInput, setAddressListInput] = useState('');

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, index) => {
    setCurrentTab(index);
    track('View Instructions', {
      instructions: tabIndexIds[index]
    });
  };
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

  return (
    <Box>
      <Header/>

      <Container className={styles.topMargined}>
        <Typography variant="h6">Enter a list of addresses</Typography>
        <TextField fullWidth
                   multiline
                   value={addressListInput}
                   label={"0x78C298B1699BdF644Fa0b426e776E10605Ed0f46,0x3e16AC55d2ee2b1582470C6C3d4BFc3Ea2962574"}
                   onChange={handleAddressesChange}/>
        <Typography variant="h7">Separate addresses by commas, semi-colons, spaces, or newlines.</Typography><br/>
        <Button onClick={createTree} variant="outlined" className={styles.topMargined}>Generate</Button>
      </Container>

      {merkleRoot &&
      <Container className={styles.topMargined}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Merkle Tree" id="merkle-tree" aria-controls="simple-tabpanel-merkle-tree" />
          <Tab label="JavaScript" id="java-script" aria-controls="simple-tabpanel-java-script" />
          <Tab label="Solidity" id="solidity" aria-controls="simple-tabpanel-solidity" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Typography variant="h3" className={styles.topPadded}>Merkle Tree</Typography>
          <Typography variant="h6">Merkle Root</Typography>
          <CodeBlock styles={styles} id="merkleRoot" content={merkleRoot}/>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <JavaScriptCode styles={styles} addressListInput={addressListInput}/>
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
