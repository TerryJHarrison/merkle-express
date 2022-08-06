import React, {useState} from 'react';
import {Container, Typography, TextField, Button, Divider, Box} from '@mui/material';
import {makeStyles} from "@mui/styles";
import {MerkleTree} from 'merkletreejs';
import keccak256 from 'keccak256';
import applicationStyles from "./styles";
import CodeBlock from "./components/CodeBlock";
import Header from "./components/Header";
import { init, track } from '@amplitude/analytics-browser';

const NodeJSCode = ({styles, addressList}) => {
  return <>
    <Typography variant="h3" className={styles.topPadded}>NodeJS</Typography>
    <Typography variant="h6" className={styles.topPadded}>Setup</Typography>
    <CodeBlock styles={styles} id="jsSetup" content="npm install merkeltreejs keccack256"/>

    <Divider className={styles.topPadded}/>
    <Typography variant="h6" className={styles.topPadded}>Implementation</Typography>
    <CodeBlock styles={styles} id="jsImplementation" content={<span>
        import &#123;MerkleTree&#125; from 'merkletreejs';<br/>
        import keccak256 from 'keccak256';<br/>
        <br/>
        const addresses = [<br/>
      {addressList}
      ].map(a => keccak256(a));<br/>
        <br/>
        const merkleTree = new MerkleTree(addresses, keccak256, &#123;sortPairs: true&#125;);<br/>
        const getProof = address => return merkleTree.getHexProof(keccak256(address));<br/>
        const checkAddress = address => return merkleTree.verify(getProof(address), keccak256(address), merkleTree.getHexRoot());<br/>
      </span>}/>
  </>
}

const SolidityCode = ({styles, merkleRoot}) => {
  return <>
    <Typography variant="h3" className={styles.topPadded}>Solidity</Typography>
    <Typography variant="h6" className={styles.topPadded}>Setup</Typography>
    <CodeBlock styles={styles} id="soliditySetup" content="npm install @openzeppelin/contracts"/>

    <Divider className={styles.topPadded}/>
    <Typography variant="h6" className={styles.topPadded}>Implementation</Typography>
    <CodeBlock styles={styles} id="solidityImplementation" content={<span>
        bytes32 public merkleRoot = {merkleRoot};<br/>
        <br/>
        function checkAddress(bytes32 calldata _proof) returns bool &#123;<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(msg.sender)));<br/>
      &#125;
      </span>}/>
  </>
}

const App = () => {
  init("583dd5bcdd6c5501fbe7dd9795d35c85");
  const styles = makeStyles(applicationStyles)();

  const [merkleRoot, setMerkleRoot] = useState('');
  const [addressListInput, setAddressListInput] = useState('0x78C298B1699BdF644Fa0b426e776E10605Ed0f46\n0x3e16AC55d2ee2b1582470C6C3d4BFc3Ea2962574');

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
        <Typography variant="h6">Merkle Root</Typography>
        <CodeBlock styles={styles} id="merkleRoot" content={merkleRoot}/>
        <Divider className={styles.topPadded}/>
        <NodeJSCode styles={styles} addressList={addressList}/>
        <SolidityCode styles={styles} merkleRoot={merkleRoot}/>
      </Container>
      }
    </Box>
  );
}

export default App;
